import { ArticleResponse } from 'shared/types/article';
import { API_BASE, fetchApi, fetchApiWithState } from './api';

export const getArticles = async () => {
  return fetchApi('/api/article?limit=3');
};

export const getAllArticles = async (
  page = 1,
  limit = 10,
): Promise<{
  data: ArticleResponse | null;
  error: Error | null;
  loading: boolean;
}> => {
  return fetchApiWithState(`/api/article?page=${page}&limit=${limit}`);
};

export const getArticleById = async (pageId: string) => {
  return fetchApi(`${API_BASE}/api/article/${pageId}?locale=undefined&draft=false&depth=1`);
};
