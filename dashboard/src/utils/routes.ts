import type { RouteConfig, UserInfo } from '@/types';

export function filterRoutesByPermission(
  routes: RouteConfig[],
  userInfo: UserInfo | null
): RouteConfig[] {
  if (!userInfo) return [];

  return routes.reduce<RouteConfig[]>((acc, route) => {
    if (route.roles && route.roles.length > 0) {
      const hasPermission = route.roles.some((role) =>
        userInfo.roles.includes(role)
      );
      if (!hasPermission) return acc;
    }

    const filtered: RouteConfig = { ...route };
    if (route.children) {
      filtered.children = filterRoutesByPermission(route.children, userInfo);
    }

    acc.push(filtered);
    return acc;
  }, []);
}

export function hasRoutePermission(
  path: string,
  routes: RouteConfig[],
  userInfo: UserInfo | null
): boolean {
  if (!userInfo) return false;

  for (const route of routes) {
    if (route.path === path) {
      if (!route.roles || route.roles.length === 0) return true;
      return route.roles.some((role) => userInfo.roles.includes(role));
    }
    if (route.children) {
      const found = hasRoutePermission(path, route.children, userInfo);
      if (found) return true;
    }
  }
  return false;
}
