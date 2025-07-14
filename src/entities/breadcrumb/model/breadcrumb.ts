import { fetchPageTitle, fetchArticleTitle } from './api';

type Breadcrumb = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  link?: string;
  list?: NavItem[];
};

function flattenNav(items: NavItem[]): NavItem[] {
  return items.reduce((acc, item) => {
    acc.push(item);
    if (item.list) {
      acc.push(...flattenNav(item.list));
    }
    return acc;
  }, [] as NavItem[]);
}

/**
 * Поиск статичной крошки из навигации
 */
function findStaticBreadcrumb(path: string, navItems: NavItem[]): string | null {
  const flat = flattenNav(navItems);
  const found = flat.find((item) => item.link === path);
  return found ? found.label : null;
}

/**
 * Парсер динамической части по URL сегментам
 */
async function getDynamicLabel(segment: string, id: string): Promise<string | null> {
  switch (segment) {
    case 'article':
      return await fetchArticleTitle(id);
    default:
      // тут можно добавить другие парсеры
      return await fetchPageTitle(id);
  }
}

/**
 * Главная функция генерации массива крошек
 */
export async function buildBreadcrumbs(path: string, navItems: NavItem[]): Promise<Breadcrumb[]> {
  const segments = path.split('/').filter(Boolean);
  const crumbs: Breadcrumb[] = [{ label: 'Главная', href: '/' }];

  let accumulatedPath = '';

  for (let i = 0; i < segments.length; i++) {
    accumulatedPath += `/${segments[i]}`;

    let label = findStaticBreadcrumb(accumulatedPath, navItems);

    if (!label) {
      if (segments[i - 1] === 'article') {
        label = await getDynamicLabel('article', segments[i]);
      } else if (i === segments.length - 1) {
        label = await getDynamicLabel('page', segments[i]);
      }
    }

    if (!label) {
      label = segments[i].replace(/[-_]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    }

    crumbs.push({ label, href: accumulatedPath });
  }

  return crumbs;
}
