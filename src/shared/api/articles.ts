import { fetchApi } from './api';

export const getArticles = async () => {
  return fetchApi('/api/article?limit=3');
};

export const getAllArticles = async () => {
  return fetchApi('/api/article');
};

export const getArticleById = async (pageId: string) => {
  return fetchApi(`http://localhost:4000/api/article/${pageId}?locale=undefined&draft=false&depth=1`);
};
