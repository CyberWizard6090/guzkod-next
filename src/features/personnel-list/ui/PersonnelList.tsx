'use client';

import { useEffect, useState, useCallback } from 'react';
import { EmployeeList, EmployeeSkeletonList } from 'widgets/employee-list';
import { getPersonnel } from 'shared/api/personnel';
import { SectionTitle } from 'shared/ui/section-title';
import {  PersonnelType } from 'shared/types/employee';
import { Pagination } from 'shared/ui/pagination';

const PAGE_SIZE = 10;

export const PersonnelList = () => {
  const [page, setPage] = useState(1);
 const [data, setData] = useState<PersonnelType>({
  docs: [],
  totalPages: 0,
  hasNextPage: false,
  hasPrevPage: false,
  limit: 10,
  nextPage: null,
  page: 1,
  pagingCounter: 1,
  prevPage: null,
  totalDocs: 0,
});
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
      setError(new Error('Нет данных'));
      setLoading(false);
      return;
    }

    setData(newData); // при переключении страниц перезаписываем список
    setLoading(false);
  }, []);

  useEffect(() => {
    loadPage(page);

     window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, loadPage]);

  if (error) {
    return <h2>Ошибка: {error.message}</h2>;
  }

  if (loading && data.docs.length === 0) {
    return <EmployeeSkeletonList count={8} />;
  }

  return (
    <>
      <SectionTitle>Список сотрудников</SectionTitle>
      <EmployeeList List={data.docs} />
      {loading && <EmployeeSkeletonList count={3} />}
      <Pagination totalPages={data.totalPages} currentPage={page} onPageChange={setPage} />
    </>
  );
};
