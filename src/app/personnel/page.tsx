'use client';

import { useEffect, useState, useCallback } from 'react';
import { EmployeeList, EmployeeSkeletonList } from 'widgets/EmployeeList';
import { getPersonnel } from 'shared/api/personnel';

const PAGE_SIZE = 10;

export default function PersonnelPage() {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadPage = useCallback(async (pageNum: number) => {
    setLoading(true);
    setError(null);

    const { data: newData, error: loadError } = await getPersonnel(pageNum, PAGE_SIZE);

    if (loadError) {
      setError(loadError);
      setLoading(false);
      return;
    }

    if (!newData) {
      setError(new Error('No data received'));
      setLoading(false);
      return;
    }

    // Если пришло меньше данных, значит это последняя страница
    if (newData.length < PAGE_SIZE) {
      setHasMore(false);
    }

    // Добавляем новые данные
    setData((prev) => {
      const existingIds = new Set(prev.map((item) => item.id));
      const uniqueNew = newData.filter((item) => !existingIds.has(item.id));
      return [...prev, ...uniqueNew];
    });
    setLoading(false);
  }, []);

  // Загрузка первой страницы при монтировании
  useEffect(() => {
    loadPage(1);
  }, [loadPage]);

  // Подгрузка следующей страницы при достижении низа страницы
  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [loading, hasMore]);

  // Загружаем данные при смене страницы
  useEffect(() => {
    if (page === 1) return; // Первую страницу уже загрузили
    loadPage(page);
  }, [page, loadPage]);

  if (error) {
    return <h2>Ошибка: {error.message}</h2>;
  }

  if (loading && data.length === 0) {
    return <EmployeeSkeletonList count={8} />;
  }

  return (
    <>
      <h2>Список сотрудников</h2>
      <EmployeeList List={data} />
      {loading && <EmployeeSkeletonList count={3} />}
      {!hasMore && <p>Больше данных нет</p>}
    </>
  );
}
