'use client';

import { useEffect, useState } from 'react';
import { EmployeeList, EmployeeSkeletonList } from 'widgets/EmployeeList';
import { getPersonnel } from 'shared/api/personnel';

export default function PersonnelPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await getPersonnel();
        setData(result.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <>
        <EmployeeSkeletonList count={8} />
      </>
    );
  }

  if (error) {
    return (
      <>
        <h2>Ошибка: {error.message}</h2>
      </>
    );
  }

  return (
    <>
      <h2>Список сотрудников</h2>
      <EmployeeList List={data} />
    </>
  );
}
