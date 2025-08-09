'use client';

import { VacancyCard, VacancySkeleton } from 'entities/vacancy-card';
import { useEffect, useState, useCallback } from 'react';
import { getVacancies } from 'shared/api/vacancies';

import { EmptyState } from 'shared/ui/empty-state';

const PAGE_SIZE = 10;

export default function VacanciesPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [vacancies, setVacancies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadPage = useCallback(async (pageNum: number) => {
    setLoading(true);

    const { data: newData, error: loadError } = await getVacancies(pageNum, PAGE_SIZE);

    if (loadError) {
      setLoading(false);
      return;
    }

    if (!newData || newData.length === 0) {
      setHasMore(false);
      setLoading(false);
      return;
    }

    if (newData.length < PAGE_SIZE) {
      setHasMore(false);
    }

    setVacancies((prev) => {
      const existingIds = new Set(prev.map((v) => v.id));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const uniqueNew = newData.filter((item: any) => !existingIds.has(item.id));
      return [...prev, ...uniqueNew];
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    loadPage(1);
  }, [loadPage]);

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

  useEffect(() => {
    if (page === 1) return;
    loadPage(page);
  }, [page, loadPage]);

  return (
    <>
      <h2>Вакансии</h2>
      {vacancies.length === 0 && (
        <EmptyState
          title={'Новых вакансий пока нет'}
          description={
            'В настоящий момент вакансии не размещены. Следите за обновлениями — мы обязательно сообщим, когда они появятся.'
          }
        />
      )}
      {vacancies.map((vacancy) => (
        <VacancyCard key={vacancy.id} {...vacancy} />
      ))}
      {loading && <VacancySkeleton />}
    </>
  );
}
