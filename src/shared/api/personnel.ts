import { fetchApi } from './api';
export const getPersonnel = async () => {
  return fetchApi(`/api/employee/`);
};
export const getEmployeeById = async (employeeID: string) => {
  return fetchApi(`/api/employee/${employeeID}?locale=undefined&draft=false&depth=1`);
};
