
import { API_BASE, fetchApi } from './api';

export const getPageById = async (pageId: string) => {
  return fetchApi(`${API_BASE}/api/pages/${pageId}?locale=undefined&draft=false&depth=1`);
};
