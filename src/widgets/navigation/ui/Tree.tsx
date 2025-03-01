import React, { useState } from 'react';
import { Item } from './Item';
import { Collapse } from 'react-collapse';
import { ReactComponent as Icon } from 'shared/assets/svg/bootstrap-icons-1.11.2/chevron-down.svg';
type Props = {
  children?: React.ReactNode;
  label: string;
  list: any;
};

export const Tree = ({ children, label, list }: Props) => {
  const [showChildren, setShowChildren] = useState(false);

  const handleClick = () => {
    setShowChildren(!showChildren);
  };
  return (
    <div className="nav_menu-content_tree">
      <div
        onClick={handleClick}
        className="nav_menu_tree-header Tree hover__item ui-vertical-navigation-item__wrapper"
      >
        <span>{label}</span>
        <div className={`nav_menu_tree-header-icon ${showChildren ? 'open' : 'closed'}`}>
          <Icon />
        </div>
      </div>
      <Collapse isOpened={showChildren}>
        <div className="nav_menu-content_tree-list">
          {children}
          {list &&
            list.map((item: any) => <Item key={item.label} label={item.label} link={item.link} />)}
        </div>
      </Collapse>
    </div>
  );
};
