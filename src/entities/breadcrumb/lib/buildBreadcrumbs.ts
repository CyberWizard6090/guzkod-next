import { NavigationItem } from 'features/navigation/model/types/navigation';

type Breadcrumb = {
  label: string;
  href: string;
};

export function buildBreadcrumbs(pathname: string, items: NavigationItem[]): Breadcrumb[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: Breadcrumb[] = [];
  let currentItems = items;
  let href = '';

  for (const segment of segments) {
    const match = currentItems.find((item) => {
      if (item.blockType === 'navitem') {
        return item.link?.split('/').filter(Boolean).pop() === segment;
      }
      if (item.blockType === 'navdropdown') {
        return item.list.some(
          (subItem) =>
            subItem.blockType === 'navitem' &&
            subItem.link?.split('/').filter(Boolean).pop() === segment,
        );
      }
      return false;
    });

    if (!match) break;

    if (match.blockType === 'navitem') {
      href = match.link!;
      breadcrumbs.push({ label: match.label, href });
    } else if (match.blockType === 'navdropdown') {
      const found = match.list.find(
        (sub) =>
          sub.blockType === 'navitem' && sub.link?.split('/').filter(Boolean).pop() === segment,
      ) as NavigationItem;

      if (found) {
        href = found.link!;
        breadcrumbs.push({ label: found.label, href });
        currentItems = []; // нельзя глубже
      }
    }
  }

  return breadcrumbs;
}
