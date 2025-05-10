import { fetchApi } from './api';

export const getPageById = async (pageId: string) => {
  return fetchApi(`/api/pages/${pageId}?locale=undefined&draft=false&depth=1`);
};
