'use client';
import { useEffect, useState } from 'react';
import { getDepartments } from 'shared/api/departments';
import { DepartmentCard } from 'entities/department';
import { Loader } from 'shared/ui/loader';

export default function DepartmentsPage() {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      const result = await getDepartments();
      setData(result.data ?? []);
      setError(result.error);
      setLoading(result.loading);
    })();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h2>Ошибка загрузки: {error.message}</h2>;
  }

  return (
    <>
      {data.map((department, index) => (
        <DepartmentCard key={index} department={department} />
      ))}
    </>
  );
}
