import { fetchApi } from './api';

export const getPersonnel = async () => {
  const result = {
    data: null as any[] | null,
    error: null as Error | null,
    loading: true,
  };

  try {
    const response = await fetchApi(`/api/employee/`);
    result.data = response?.docs ?? [];
  } catch (err: any) {
    result.error = err;
  } finally {
    result.loading = false;
  }

  return result;
};
export const getEmployeeById = async (employeeID: string) => {
  return fetchApi(
    `http://localhost:4000/api/employee/${employeeID}?locale=undefined&draft=false&depth=1`,
  );
};
