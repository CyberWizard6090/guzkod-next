import { fetchApi } from './api';

export const getDepartments = async () => {
  const result = {
    data: null as any[] | null,
    error: null as Error | null,
    loading: true,
  };

  try {
    const response = await fetchApi('/api/departments?limit=100');
    result.data = response?.docs ?? [];
  } catch (err: any) {
    result.error = err;
  } finally {
    result.loading = false;
  }

  return result;
};


export const getDepartmentById = async (departmentID: string) => {
  return fetchApi(`http://localhost:4000/api/departments/${departmentID}?locale=undefined&draft=false&depth=2`);
};
