import { SITE_URL } from 'shared/consts/site.constants';
import { fetchApi } from './api';

export const getHomePage = () => {
  return fetchApi(SITE_URL + 'api/globals/home-page');
};
