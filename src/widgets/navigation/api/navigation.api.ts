import { fetchApi } from 'shared/api/api';
import { SITE_URL } from 'shared/consts/site.constants';

export const getNavigation = () => {
  return fetchApi(SITE_URL + 'api/globals/nav?locale=undefined&draft=false&depth=0');
};
