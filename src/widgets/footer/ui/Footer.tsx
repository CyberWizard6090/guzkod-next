import { getFooterData } from 'shared/api/footer';
import styles from './footer.module.scss';
import clsx from 'clsx';

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
  let pageData: Column[] = [];

  const data = await getFooterData();
  pageData = data.List ?? [];

  return (
    <footer className={clsx(styles.footer, 'shadow')}>
      <div className={styles['footer-container']}>
        {pageData.map((column) => (
          <div key={column.id} className={styles['footer-column']}>
            <h4 className={styles['footer-title']}>{column.title}</h4>
            <ul className={styles['footer-links']}>
              {column.List.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className={styles['footer-link']}
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
