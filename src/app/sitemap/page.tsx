import { getNavigation } from 'features/navigation/model/api/navigation.api';
import styles from './sitemap.module.scss';
import { Block } from 'shared/ui/block';
import Link from 'next/link';

type SitemapItem = {
  label: string;
  url?: string;
  children?: SitemapItem[];
};

const buildSitemap = (items: any[]): SitemapItem[] =>
  items
    .filter((item) => item.blockType !== 'navseparator')
    .map((item) => ({
      label: item.label,
      url: item.url,
      children:
        item.blockType === 'navdropdown' && item.children?.length
          ? buildSitemap(item.children)
          : undefined,
    }));

const SitemapNode = ({ item }: { item: SitemapItem }) => {
  const hasChildren = !!item.children?.length;

  return (
    <li className={styles['sitemap__node']}>
      <span
        className={`${styles['sitemap__label']} ${
          hasChildren ? styles['sitemap__label--parent'] : ''
        }`}
      >
        {item.url ? <Link href={item.url}>{item.label}</Link> : <>{item.label}</>}
      </span>

      {hasChildren && (
        <ul className={styles['sitemap__children']}>
          {item.children!.map((child) => (
            <SitemapNode key={child.label} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default async function SitemapPage() {
  const navigation = await getNavigation();
  const items = buildSitemap(navigation.items || []);

  return (
    <Block className={styles.sitemap}>
      <h1 className={styles['sitemap__title']}>Карта сайта</h1>
      <ul className={styles['sitemap__tree']}>
        {items.map((item) => (
          <SitemapNode key={item.label} item={item} />
        ))}
      </ul>
    </Block>
  );
}
