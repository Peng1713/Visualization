import {
  BarChartOutlined,
  DashboardOutlined,
  RadarChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { ReactNode } from "react";

export type ThemeMode = "light" | "dark";
export type NavigationMode = "side" | "top";
export type UserRole = "admin" | "analyst" | "viewer";

export type PermissionCode =
  | "dashboard:view"
  | "analysis:view"
  | "monitor:view"
  | "settings:view";

export interface AppRouteDefinition {
  key: string;
  path: string;
  title: string;
  permission: PermissionCode;
  icon: ReactNode;
  description: string;
}

export const APP_ROUTES: AppRouteDefinition[] = [
  {
    key: "dashboard",
    path: "/dashboard",
    title: "数据大屏",
    permission: "dashboard:view",
    icon: <DashboardOutlined />,
    description: "全局核心指标与运营趋势总览",
  },
  {
    key: "analysis",
    path: "/analysis",
    title: "业务分析",
    permission: "analysis:view",
    icon: <BarChartOutlined />,
    description: "分维度分析与指标钻取",
  },
  {
    key: "monitor",
    path: "/monitor",
    title: "实时监控",
    permission: "monitor:view",
    icon: <RadarChartOutlined />,
    description: "系统健康、告警与链路状态",
  },
  {
    key: "settings",
    path: "/settings",
    title: "系统设置",
    permission: "settings:view",
    icon: <SettingOutlined />,
    description: "主题、布局与权限配置预留",
  },
];

export const ROLE_PERMISSION_MAP: Record<UserRole, PermissionCode[]> = {
  admin: ["dashboard:view", "analysis:view", "monitor:view", "settings:view"],
  analyst: ["dashboard:view", "analysis:view", "monitor:view"],
  viewer: ["dashboard:view", "monitor:view"],
};

export const hasPermission = (
  userPermissions: PermissionCode[],
  requiredPermission: PermissionCode,
): boolean => userPermissions.includes(requiredPermission);

export const getAccessibleRoutes = (
  userPermissions: PermissionCode[],
): AppRouteDefinition[] =>
  APP_ROUTES.filter((route) => hasPermission(userPermissions, route.permission));
