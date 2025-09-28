import { API_BASE, fetchApi } from './api';
import {  PersonnelType } from 'shared/types/employee';

export const getPersonnel = async (page = 1, limit = 10) => {
  const result = {

    data: [] as PersonnelType,
    error: null as Error | null,
    loading: true,
  };

  try {
    const response = await fetchApi(`/api/employee?page=${page}&limit=${limit}`);
    result.data = response ?? [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    result.error = err;
  } finally {
    result.loading = false;
  }

  return result;
};

export const getEmployeeById = async (employeeID: string) => {
  return fetchApi(`${API_BASE}/api/employee/${employeeID}?locale=undefined&draft=false&depth=1`);
};
