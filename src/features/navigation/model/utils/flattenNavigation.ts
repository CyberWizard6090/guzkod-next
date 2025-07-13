import { NavigationItem } from '../types/navigation';

export const flattenNavigation = (items: NavigationItem[]): { label: string; link: string }[] => {
  const result: { label: string; link: string }[] = [];

  const walk = (nodes: NavigationItem[]) => {
    for (const item of nodes) {
      switch (item.blockType) {
        case 'navitem':
          result.push({
            label: item.label,
            link: item.link,
          });
          break;

        case 'navdropdown':
          if ('list' in item && Array.isArray(item.list)) {
            for (const child of item.list) {
              result.push({
                label: child.label,
                link: child.link,
              });
            }
          }
          break;

        case 'navseparator':
          break;

        default:
          console.warn('Unknown navigation block type:', item);
      }
    }
  };

  walk(items);
  return result;
};
