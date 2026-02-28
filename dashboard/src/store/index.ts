import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeMode, LayoutMode, UserInfo } from '@/types';

interface AppState {
  themeMode: ThemeMode;
  layoutMode: LayoutMode;
  collapsed: boolean;
  userInfo: UserInfo | null;
  token: string | null;

  setThemeMode: (mode: ThemeMode) => void;
  setLayoutMode: (mode: LayoutMode) => void;
  setCollapsed: (collapsed: boolean) => void;
  setUserInfo: (info: UserInfo | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      themeMode: 'dark',
      layoutMode: 'side',
      collapsed: false,
      userInfo: null,
      token: null,

      setThemeMode: (mode: ThemeMode) => set({ themeMode: mode }),
      setLayoutMode: (mode: LayoutMode) => set({ layoutMode: mode }),
      setCollapsed: (collapsed: boolean) => set({ collapsed }),
      setUserInfo: (info: UserInfo | null) => set({ userInfo: info }),
      setToken: (token: string | null) => set({ token }),
      logout: () => set({ userInfo: null, token: null }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        themeMode: state.themeMode,
        layoutMode: state.layoutMode,
        token: state.token,
        userInfo: state.userInfo,
      }),
    }
  )
);
