'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Icon from 'shared/assets/svg/bootstrap-icons-1.11.2/chevron-down.svg';

import { transliterateForURL } from 'shared/lib/transliterateForURL';
import clsx from 'clsx';
import { NavDropdown, NavItem } from 'features/navigation/model/types/navigation';

export const TreeItem = ({ label, list = [] }: NavDropdown) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="navigation__tree">
      <button
        className="navigation__tree-header"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={`submenu-${transliterateForURL(label)}`}
      >
        {label}
        <span className={`navigation__tree-icon ${isExpanded ? 'open' : ''}`}>
          <Icon aria-hidden={!isExpanded} />
        </span>
      </button>

      <ul
        id={`submenu-${transliterateForURL(label)}`}
        role="menu"
        className={clsx(
          'navigation__submenu',
          isExpanded ? 'navigation__submenu--expanded' : 'navigation__submenu--collapsed',
        )}
      >
        {list?.map((item: NavItem, index: number) => (
          <li key={index} role="menuitem">
            <Link href={item.link || '#'} className="navigation__link">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
