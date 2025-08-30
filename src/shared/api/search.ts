import { fetchApi } from './api';

export const getSearchResults = async (query: string) => {
  return fetchApi(`/api/search?query=${query}`);
};
