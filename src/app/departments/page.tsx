'use client';
import { useEffect, useState } from 'react';
import { getDepartments } from 'shared/api/departments';
import { DepartmentCard } from 'entities/department';

export default function DepartmentsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      const result = await getDepartments();
      setData(result.data);
      setError(result.error);
      setLoading(result.loading);
    })();
  }, []);

  if (loading) {
    return (
      <div className="DepartmentsPage animation-reveal">
        <h2>Загрузка...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="DepartmentsPage animation-reveal">
        <h2>Ошибка загрузки: {error.message}</h2>
      </div>
    );
  }

  return (
    <div className="DepartmentsPage animation-reveal">
      {data.map((department, index) => (
        <DepartmentCard key={index} department={department} />
      ))}
    </div>
  );
}
