import { fetchApi } from './api';

export const getHomePage = () => {
  return fetchApi('http://localhost:4000/api/globals/home-page');
};
