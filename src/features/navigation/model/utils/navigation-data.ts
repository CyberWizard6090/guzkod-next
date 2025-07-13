import { NavigationItem } from '../types/navigation';

export const sidebarData: NavigationItem[] = [
  {
    id: 'nav-home',
    label: 'Главная',
    link: '/',
    blockType: 'navitem',
  },
  {
    id: 'nav-feedback',
    label: 'Отзыв',
    link: '/feedback',
    blockType: 'navitem',
  },
  {
    id: 'nav-reviews',
    label: 'Отзыв',
    link: '/reviews',
    blockType: 'navitem',
  },
  {
    id: 'nav-articles',
    label: 'Новости и профилактика',
    link: '/article',
    blockType: 'navitem',
  },
  {
    id: 'nav-staff-departments',
    label: 'Персонал и отделения',
    blockType: 'navdropdown',
    list: [
      {
        id: 'nav-personnel',
        label: 'Персонал',
        link: '/personnel',
        blockType: 'navitem',
      },
      {
        id: 'nav-departments',
        label: 'Отделения',
        link: '/departments',
        blockType: 'navitem',
      },
    ],
  },
  {
    id: 'nav-vacancies',
    label: 'Вакансии',
    link: '/vacancies',
    blockType: 'navitem',
  },
];
