/**
 * 路由配置类型 - 预留权限控制扩展
 * 可后续根据接口返回或权限配置动态生成
 */
export interface RouteMeta {
  title: string;
  icon?: string;
  /** 所需权限码，空数组表示无需权限 */
  permission?: string[];
  /** 所需角色，空数组表示无需角色 */
  roles?: string[];
  /** 是否隐藏 */
  hidden?: boolean;
  /** 子路由 */
  children?: RouteConfig[];
}

export interface RouteConfig {
  path: string;
  component?: string;
  meta: RouteMeta;
  /** 重定向路径 */
  redirect?: string;
}

const settingsPermission = 'systemSettings';

/** 预定义路由配置 - 后续可改为从接口获取 */
export const ROUTES_CONFIG: RouteConfig[] = [
  {
    path: '/dashboard',
    meta: {
      title: '数据大屏',
      icon: 'DashboardOutlined',
      permission: [],
      roles: [],
    },
  },
  {
    path: '/analytics',
    meta: {
      title: '数据分析',
      icon: 'LineChartOutlined',
      permission: [],
      roles: [],
    },
  },
  {
    path: '/reports',
    meta: {
      title: '报表中心',
      icon: 'FileTextOutlined',
      permission: [],
      roles: [],
    },
  },
  {
    path: '/settings',
    meta: {
      title: '系统设置',
      icon: 'SettingOutlined',
      permission: [settingsPermission],
      roles: [],
    },
  },
];
