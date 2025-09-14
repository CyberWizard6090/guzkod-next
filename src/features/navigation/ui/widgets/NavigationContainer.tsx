import { getNavigation } from 'features/navigation/model/api/navigation.api';
import { NavigationView } from '../views/NavigationView';
import { NavigateProps } from 'features/navigation/model/types/navigation';

// серверный компонент
export const NavigationContainer = async () => {
  const result: NavigateProps = await getNavigation();
  return <NavigationView items={result.items} />;
};
