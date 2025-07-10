import { API_BASE, fetchApi } from './api';

export const getNavigation = () => {
  return fetchApi(`${API_BASE}/api/globals/home-page`);
};
