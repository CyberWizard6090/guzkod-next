import { fetchApi } from 'shared/api/api';

export const getNavigation = () => {
  return fetchApi('http://localhost:4000/api/globals/nav?locale=undefined&draft=false&depth=0');
};
