import { API_BASE, fetchApi } from './api';

export const getVacancies = async (page = 1, limit = 10) => {
  const result = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: null as any[] | null,
    error: null as Error | null,
    loading: true,
  };

  try {
    const response = await fetchApi(`/api/vacancies?page=${page}&limit=${limit}`);

    result.data = response?.docs ?? [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    result.error = err;
  } finally {
    result.loading = false;
  }

  return result;
};
export const getVacanciesById = async (vacanciesId: string) => {
  return fetchApi(
    `${API_BASE}/api/vacancies/${vacanciesId}?locale=undefined&draft=false&depth=1`,
  );
};
