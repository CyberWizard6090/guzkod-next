import { API_BASE, fetchApi } from './api';

export const getSearchResults = async (query: string) => {
  return fetchApi(`${API_BASE}/api/search?query=${query}`);
};
