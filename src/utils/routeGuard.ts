import { useAuthStore } from '@/store/authStore';
import type { RouteMeta } from '@/types/route';

/**
 * 路由权限守卫 - 预留扩展
 * 可根据用户权限、角色或接口返回动态控制路由访问
 */
export function checkRouteAccess(meta: RouteMeta): boolean {
  const { hasPermission, hasRole } = useAuthStore.getState();

  if (meta.hidden) return false;

  if (meta.permission && meta.permission.length > 0) {
    const hasAccess = meta.permission.some((p) => hasPermission(p));
    if (!hasAccess) return false;
  }

  if (meta.roles && meta.roles.length > 0) {
    const hasAccess = meta.roles.some((r) => hasRole(r));
    if (!hasAccess) return false;
  }

  return true;
}

/**
 * 过滤有权限的路由
 */
export function filterAccessibleRoutes<T extends { meta: RouteMeta }>(
  routes: T[]
): T[] {
  return routes.filter((route) => checkRouteAccess(route.meta));
}
