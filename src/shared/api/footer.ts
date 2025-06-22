import { fetchApi } from './api';

export const getFooterData = async () => {
  return fetchApi('/api/globals/footer?locale=undefined&draft=false&depth=0');
};
