'use client';

import { useState } from 'react';
import { TabItem } from '../model/types';
import styles from './Tabs.module.scss';
import clsx from 'clsx';


type TabsProps = {
  tabs: TabItem[];
  defaultActiveId?: string;
  className?: string;
};

export const Tabs = ({ tabs, defaultActiveId, className }: TabsProps) => {
  const initialTab = tabs.find(tab => tab.id === defaultActiveId) ?? tabs[0];
  const [activeTabId, setActiveTabId] = useState(initialTab.id);

  return (
    <div className={clsx(styles.tabsContainer, className)}>
      <div className={styles.tabList}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={clsx(styles.tabButton, {
              [styles.active]: tab.id === activeTabId,
            })}
            onClick={() => setActiveTabId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.tabContent}>
        {tabs.find((tab) => tab.id === activeTabId)?.content}
      </div>
    </div>
  );
};
