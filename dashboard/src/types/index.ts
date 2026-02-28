export type ThemeMode = 'light' | 'dark';
export type LayoutMode = 'side' | 'top';

export interface UserInfo {
  id: string;
  username: string;
  avatar?: string;
  roles: string[];
  permissions: string[];
}

export interface RouteConfig {
  path: string;
  name: string;
  icon?: React.ReactNode;
  children?: RouteConfig[];
  roles?: string[];
  hidden?: boolean;
  component?: React.ComponentType;
}

export interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}
