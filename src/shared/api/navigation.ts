import { fetchApi } from './api';

export const getNavigation = () => {
  return fetchApi('http://localhost:4000/api/globals/home-page');
};
