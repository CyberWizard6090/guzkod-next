import { getFooterData } from 'shared/api/footer';
import styles from './Footer.module.scss';
import clsx from 'clsx';
import Link from 'next/link';

type Link = {
  text: string;
  href: string;
  id: string;
};

type Column = {
  title: string;
  List: Link[];
  id: string;
};

export const Footer = async () => {
  const data = await getFooterData();
  const pageData = data.List ?? [];

  return (
    <footer className={clsx(styles['footer'], 'shadow')}>
      <div className={styles['footer__container']}>
        {pageData.map((column: Column) => (
          <div key={column.id} className={styles['footer__column']}>
            <h4 className={styles['footer__title']}>{column.title}</h4>
            <ul className={styles['footer__links']}>
              {column.List.map((link: Link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className={styles['footer__link']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles['footer__sitemap']}>
        <Link href="/sitemap" className={styles['footer__link']}>
          Карта сайта
        </Link>
      </div>
    </footer>
  );
};
