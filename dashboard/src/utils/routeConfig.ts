import type { RouteConfig } from '@/types';

export const routeConfig: RouteConfig[] = [
  {
    path: '/dashboard',
    name: '数据大屏',
    roles: [],
  },
  {
    path: '/dashboard/analytics',
    name: '数据分析',
    roles: ['admin', 'analyst'],
  },
  {
    path: '/dashboard/charts',
    name: '图表中心',
    children: [
      { path: '/dashboard/charts/line', name: '折线图', roles: [] },
      { path: '/dashboard/charts/bar', name: '柱状图', roles: [] },
      { path: '/dashboard/charts/pie', name: '饼图', roles: [] },
    ],
  },
  {
    path: '/dashboard/users',
    name: '用户管理',
    roles: ['admin'],
  },
  {
    path: '/dashboard/reports',
    name: '报表管理',
    roles: ['admin', 'analyst'],
  },
  {
    path: '/dashboard/apps',
    name: '应用中心',
    roles: [],
  },
  {
    path: '/dashboard/settings',
    name: '系统设置',
    roles: ['admin'],
  },
];
