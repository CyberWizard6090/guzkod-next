import { fetchApi } from 'shared/api/api';

export const getNavigation = () => {
  return fetchApi('/api/globals/nav?locale=undefined&draft=false&depth=0');
};
