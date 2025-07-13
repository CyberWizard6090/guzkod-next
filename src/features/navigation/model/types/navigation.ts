export type NavigationItem = NavItem | NavDropdown | NavSeparator;

export type NavSeparator = {
  id: string;
  label: string;
  blockType: 'navseparator';
};

export type NavItem = {
  id: string;
  label: string;
  link: string;
  blockType: 'navitem';
  blockName?: string;
};

export type NavDropdown = {
  id: string;
  label: string;
  blockType: 'navdropdown';
  blockName?: string;
  list: NavItem[];
};

export type NavigationResponse = {
  layout: NavigationItem[];
  globalType: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};
