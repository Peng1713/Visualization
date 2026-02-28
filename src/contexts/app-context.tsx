"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  ROLE_PERMISSION_MAP,
  hasPermission,
  type NavigationMode,
  type PermissionCode,
  type ThemeMode,
  type UserRole,
} from "@/config/routes";

const STORAGE_USER_KEY = "vcc:user";
const STORAGE_PREFS_KEY = "vcc:prefs";

export interface AuthUser {
  username: string;
  role: UserRole;
  permissions: PermissionCode[];
  token: string;
}

interface LoginPayload {
  username: string;
  role: UserRole;
}

interface AppPreferences {
  themeMode: ThemeMode;
  navigationMode: NavigationMode;
}

interface AppContextValue {
  hydrated: boolean;
  user: AuthUser | null;
  themeMode: ThemeMode;
  navigationMode: NavigationMode;
  login: (payload: LoginPayload) => void;
  logout: () => void;
  setThemeMode: (mode: ThemeMode) => void;
  setNavigationMode: (mode: NavigationMode) => void;
  canAccess: (permission: PermissionCode) => boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

const DEFAULT_PREFERENCES: AppPreferences = {
  themeMode: "dark",
  navigationMode: "side",
};

const safeParse = <T,>(rawValue: string | null): T | null => {
  if (!rawValue) {
    return null;
  }
  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return null;
  }
};

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [themeMode, setThemeMode] = useState<ThemeMode>(
    DEFAULT_PREFERENCES.themeMode,
  );
  const [navigationMode, setNavigationMode] = useState<NavigationMode>(
    DEFAULT_PREFERENCES.navigationMode,
  );

  useEffect(() => {
    const storedUser = safeParse<AuthUser>(localStorage.getItem(STORAGE_USER_KEY));
    const storedPreferences = safeParse<AppPreferences>(
      localStorage.getItem(STORAGE_PREFS_KEY),
    );

    if (storedUser) {
      setUser(storedUser);
    }

    if (storedPreferences) {
      setThemeMode(storedPreferences.themeMode);
      setNavigationMode(storedPreferences.navigationMode);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (user) {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_USER_KEY);
    }
  }, [hydrated, user]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    localStorage.setItem(
      STORAGE_PREFS_KEY,
      JSON.stringify({ themeMode, navigationMode }),
    );
  }, [hydrated, navigationMode, themeMode]);

  const login = useCallback(({ username, role }: LoginPayload) => {
    const permissions = ROLE_PERMISSION_MAP[role];
    const nextUser: AuthUser = {
      username,
      role,
      permissions,
      token: `mock-token-${Date.now()}`,
    };
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const canAccess = useCallback(
    (permission: PermissionCode) =>
      user ? hasPermission(user.permissions, permission) : false,
    [user],
  );

  const contextValue = useMemo<AppContextValue>(
    () => ({
      hydrated,
      user,
      themeMode,
      navigationMode,
      login,
      logout,
      setThemeMode,
      setNavigationMode,
      canAccess,
    }),
    [
      hydrated,
      user,
      themeMode,
      navigationMode,
      login,
      logout,
      setThemeMode,
      setNavigationMode,
      canAccess,
    ],
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
};
