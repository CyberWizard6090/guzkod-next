import { NavigationView } from './NavigationView';
import { NavigationItem } from '../types';
import { getNavigation } from '../api/navigation.api';

export const Navigation = async () => {
  const sidebarData: NavigationItem[] = [
    {
      label: 'Главная',
      link: '/',
      blockType: 'navitem',
    },
    {
      label: 'Отзыв',
      link: '/feedback',
      blockType: 'navitem',
    },
    {
      label: 'Новости и профилактика',
      link: '/article',
      blockType: 'navitem',
    },
    {
      label: 'Персонал и отделения',
      link: '',
      blockType: 'navdropdown',
      list: [
        {
          label: 'Персонал',
          link: '/personnel',
          id: 'personnel-id',
        },
        {
          label: 'Отделения',
          link: '/departments',
          id: 'departments-id',
        },
      ],
    },
    {
      label: 'Вакансии',
      link: '/vacancies',
      blockType: 'navitem',
    },
  ];

  const data = await getNavigation();

  const merged = [...sidebarData, ...data.layout];
  return <NavigationView items={merged} />;
};
