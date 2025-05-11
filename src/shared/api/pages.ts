import { SITE_HOST } from 'shared/consts/site.constants';
import { fetchApi } from './api';

export const getPageById = async (pageId: string) => {
  return fetchApi(`${SITE_HOST}/api/pages/${pageId}?locale=undefined&draft=false&depth=1`);
};
