import { fetchApi } from './api';

export const getArticles = async () => {
  return fetchApi('/api/article?limit=3');
};

export const getAllArticles = async () => {
  return fetchApi('/api/article');
};
