export type NavigationItem = {
  label: string;
  link?: string;
  list?: TreeItemType[] | [];
  blockType?: 'navitem' | 'navdropdown' | 'navseparator';
};

export type TreeItemType = {
  label: string;
  link: string;
  id: string;
};
