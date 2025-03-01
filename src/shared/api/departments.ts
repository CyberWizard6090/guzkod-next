import { fetchApi } from './api';

export const getDepartments = async () => {
  return fetchApi('/api/departments?limit=100');
};

export const getDepartmentById = async (departmentID: string) => {
  return fetchApi(`/api/departments/${departmentID}?locale=undefined&draft=false&depth=2`);
};
