import { API_BASE, fetchApi } from './api';

export const getHomePage = () => {
  return fetchApi(`${API_BASE}/api/globals/home-page`);
};
