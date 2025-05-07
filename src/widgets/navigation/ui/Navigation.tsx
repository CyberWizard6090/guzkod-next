import { useEffect, useState } from 'react';
import { NavigationView } from './NavigationView';
import { NavigationItem } from '../types';
import { getNavigation } from '../api/navigation.api';

export const Navigation = () => {
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
          id: 'personnel-id', // Укажи реальные ID, если нужно
        },
        {
          label: 'Отделения',
          link: '/departments',
          id: 'departments-id',
        },
      ],
    },
  ];

  const [data, setData] = useState<any>({ layout: [] });

  useEffect(() => {
    getNavigation().then((navigationData) => {
      setData(navigationData);
    });
  }, []);

  const merged = [...sidebarData, ...data.layout];
  return <NavigationView items={merged} />;
};
