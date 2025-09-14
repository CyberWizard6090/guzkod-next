'use client';

//   return (
//     <div className="navigation__tree">
//       <button
//         className="navigation__tree-header"
//         onClick={() => setIsExpanded(!isExpanded)}
//         aria-expanded={isExpanded}
//         aria-controls={`submenu-${transliterateForURL(label)}`}
//       >
//         {label}
//         <span className={`navigation__tree-icon ${isExpanded ? 'open' : ''}`}>
//           <Icon aria-hidden={!isExpanded} />
//         </span>
//       </button>

//       <ul
//         id={`submenu-${transliterateForURL(label)}`}
//         role="menu"
//         className={clsx(
//           'navigation__submenu',
//           isExpanded ? 'navigation__submenu--expanded' : 'navigation__submenu--collapsed',
//         )}
//       >
//         {list?.map((item: NavItem, index: number) => (
//           <li key={index} role="menuitem">
//             <Link href={item.link || '#'} className="navigation__link">
//               {item.label}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
import { useState } from 'react';
import { Separator } from './Separator';
import { Item } from './Item';
import { NavigationItem } from 'features/navigation/model/types/navigation';
import Icon from 'shared/assets/svg/bootstrap-icons-1.11.2/chevron-down.svg';
import { transliterateForURL } from 'shared/lib/transliterateForURL';

type TreeItemProps = {
  label: string;
  children: NavigationItem[];
};

export const TreeItem = ({ label, children }: TreeItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <li className={`navigation__dropdown ${isExpanded ? 'open' : ''}`}>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={`submenu-${transliterateForURL(label)}`}
        className="navigation__dropdown-label"
      >
        {label}
        <span className={`navigation__dropdown-icon ${isExpanded ? 'open' : ''}`}>
          <Icon aria-hidden={!isExpanded} />
        </span>
      </button>
      {isExpanded && (
        <ul className="navigation__dropdown-list">
          {children.map((child) => {
            if (child.blockType === 'navitem') {
              return <Item key={child.id} label={child.label} url={child.url ?? '#'} />;
            }
            if (child.blockType === 'navseparator') {
              return <Separator key={child.id} label={child.label} />;
            }
            if (child.blockType === 'navdropdown' && Array.isArray(child.children)) {
              return (
                <TreeItem key={child.id} label={child.label}>
                  {child.children}
                </TreeItem>
              );
            }
          })}
        </ul>
      )}
    </li>
  );
};
