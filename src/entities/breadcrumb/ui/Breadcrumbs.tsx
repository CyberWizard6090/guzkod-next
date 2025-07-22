'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

import { buildBreadcrumbs } from '../model/breadcrumb';
import { RootState } from 'shared/stores';
import styles from './breadcrumbs.module.scss';

export const Breadcrumbs = () => {
  const pathname = usePathname();
  const navItems = useSelector((state: RootState) => state.navigation.items);
  const [breadcrumbs, setBreadcrumbs] = useState<{ label: string; href: string }[]>([]);

  useEffect(() => {
    async function fetchCrumbs() {
      const crumbs = await buildBreadcrumbs(pathname, navItems);
      setBreadcrumbs(crumbs);
    }
    fetchCrumbs();
  }, [pathname, navItems]);

  return (
    <nav aria-label="breadcrumbs" className={`${styles.breadcrumbs} mb-4`}>
      <ol>
        {breadcrumbs.map(({ label, href }, idx) => (
          <li key={idx} className={styles['breadcrumb-item']}>
            <Link href={href} className={styles.link}>
              {label}
            </Link>
            {idx < breadcrumbs.length - 1 && <span>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};
