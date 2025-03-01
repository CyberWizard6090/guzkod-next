import { fetchApi } from './api';

export const getArticles = async () => {
  return fetchApi('/api/article?limit=3');
};
