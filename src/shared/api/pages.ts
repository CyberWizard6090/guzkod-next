import { API_BASE, fetchApi } from './api';

export const getPageById = async (pageId: string) => {
  return fetchApi(`${API_BASE}/api/pages/${pageId}?locale=undefined&draft=false&depth=1`);
};
export const getPageByUrl = async (url: string) => {
  const data = await fetchApi(
    `${API_BASE}/api/pages?where[url][equals]=${encodeURIComponent(url)}&depth=1`,
  );

  return data?.docs?.[0] ?? null;
};

export const getPage = async (identifier: string) => {
  if (!identifier) return null;

  const byUrl = await getPageByUrl(identifier);
  if (byUrl) return byUrl;

  const byId = await getPageById(identifier);
  if (byId) return byId;

  return null;
};
