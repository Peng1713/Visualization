import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type NavPosition = 'left' | 'top';
export type ThemeMode = 'light' | 'dark';

interface LayoutState {
  navPosition: NavPosition;
  themeMode: ThemeMode;
  setNavPosition: (position: NavPosition) => void;
  setThemeMode: (mode: ThemeMode) => void;
  toggleNavPosition: () => void;
  toggleTheme: () => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      navPosition: 'left',
      themeMode: 'dark',
      setNavPosition: (navPosition) => set({ navPosition }),
      setThemeMode: (themeMode) => set({ themeMode }),
      toggleNavPosition: () =>
        set((state) => ({
          navPosition: state.navPosition === 'left' ? 'top' : 'left',
        })),
      toggleTheme: () =>
        set((state) => ({
          themeMode: state.themeMode === 'light' ? 'dark' : 'light',
        })),
    }),
    { name: 'layout-settings' }
  )
);
