import { API_BASE, fetchApi } from './api';

export const getFooterData = async () => {
  return fetchApi(`${API_BASE}/api/globals/footer?locale=undefined&draft=false&depth=0`);
};
