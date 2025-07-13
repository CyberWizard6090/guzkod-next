import { API_BASE, fetchApiWithState } from 'shared/api/api';
import { NavigationResponse } from '../types/navigation';

export const getNavigation = async (): Promise<{
  data: NavigationResponse | null;
  error: Error | null;
  loading: boolean;
}> => {
  return fetchApiWithState(`${API_BASE}/api/globals/nav?locale=undefined&draft=false&depth=0`);
};
