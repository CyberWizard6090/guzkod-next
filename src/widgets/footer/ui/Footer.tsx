import { getFooterData } from 'shared/api/footer';
import styles from './Footer.module.scss';
import clsx from 'clsx';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from 'react';

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
        {pageData.map((column: { id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; List: any[]; }) => (
          <div key={column.id} className={styles['footer__column']}>
            <h4 className={styles['footer__title']}>{column.title}</h4>
            <ul className={styles['footer__links']}>
              {column.List.map((link: { id: Key | null | undefined; href: string | undefined; text: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) => (
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
    </footer>
  );
};
