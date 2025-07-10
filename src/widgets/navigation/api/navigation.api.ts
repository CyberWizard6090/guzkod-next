import { API_BASE, fetchApi } from 'shared/api/api';

export const getNavigation = () => {
  return fetchApi(`${API_BASE}/api/globals/nav?locale=undefined&draft=false&depth=0`);
};
