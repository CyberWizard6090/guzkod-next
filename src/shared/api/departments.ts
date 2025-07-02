import { SITE_URL } from 'shared/consts/site.constants';
import { fetchApi } from './api';

export const getDepartments = async () => {
  const result = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: null as any[] | null,
    error: null as Error | null,
    loading: true,
  };

  try {
    const response = await fetchApi('/api/departments?limit=100');
    result.data = response?.docs ?? [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    result.error = err;
  } finally {
    result.loading = false;
  }

  return result;
};

export const getDepartmentById = async (departmentID: string) => {
  return fetchApi(
    SITE_URL + `api/departments/${departmentID}?locale=undefined&draft=false&depth=2`,
  );
};
