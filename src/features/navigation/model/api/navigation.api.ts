import { API_BASE, fetchApi } from 'shared/api/api';

export const getNavigation = async () => {
  return fetchApi(`${API_BASE}/api/globals/navigation?locale=undefined&draft=false&depth=0`);
};
