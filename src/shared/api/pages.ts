import { fetchApi } from './api';

export const getPageById = async (pageId: string) => {
  return fetchApi(`/api/pages/${pageId}?locale=undefined&draft=false&depth=1`);
};

export const getArticleById = async (pageId: string) => {
  return fetchApi(`/api/article/${pageId}?locale=undefined&draft=false&depth=1`);
};
