import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import { Link } from 'react-router-dom';
import { ReactComponent as Icon } from 'shared/assets/svg/bootstrap-icons-1.11.2/chevron-down.svg';
import { NavigationItem, TreeItemType } from '../types';
import { transliterateForURL } from 'shared/lib/transliterateForURL';

export const TreeItem = ({ label, list = [] }: NavigationItem) => {
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

      <Collapse isOpened={isExpanded}>
        <ul
          id={`submenu-${transliterateForURL(label)}`}
          role="menu"
          className="navigation__submenu"
        >
          {list?.map((item: TreeItemType, index) => (
            <li key={index} role="menuitem">
              <Link to={item.link || '#'} className="navigation__sublink">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Collapse>
    </div>
  );
};
