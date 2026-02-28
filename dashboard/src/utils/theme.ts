import type { ThemeConfig } from 'antd';
import type { ThemeMode } from '@/types';

export const getAntdTheme = (mode: ThemeMode): ThemeConfig => ({
  token: {
    colorPrimary: '#1677ff',
    borderRadius: 8,
    ...(mode === 'dark'
      ? {
          colorBgContainer: '#141414',
          colorBgLayout: '#0a0a0a',
          colorBgElevated: '#1f1f1f',
          colorText: '#e5e5e5',
          colorTextSecondary: '#a0a0a0',
          colorBorder: '#303030',
        }
      : {
          colorBgContainer: '#ffffff',
          colorBgLayout: '#f5f5f5',
          colorBgElevated: '#ffffff',
        }),
  },
  algorithm: mode === 'dark' ? undefined : undefined,
});

export const themeVars = {
  dark: {
    '--bg-primary': '#0a0a0a',
    '--bg-secondary': '#141414',
    '--bg-card': '#1a1a2e',
    '--bg-card-hover': '#16213e',
    '--text-primary': '#e5e5e5',
    '--text-secondary': '#a0a0a0',
    '--border-color': '#303030',
    '--accent-blue': '#00d4ff',
    '--accent-green': '#00ff88',
    '--accent-purple': '#a855f7',
    '--accent-orange': '#ff6b35',
    '--accent-pink': '#ff2d78',
    '--gradient-1': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    '--gradient-2': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    '--gradient-3': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    '--shadow': '0 4px 24px rgba(0, 0, 0, 0.4)',
  },
  light: {
    '--bg-primary': '#f0f2f5',
    '--bg-secondary': '#ffffff',
    '--bg-card': '#ffffff',
    '--bg-card-hover': '#f8f9ff',
    '--text-primary': '#1a1a1a',
    '--text-secondary': '#666666',
    '--border-color': '#e8e8e8',
    '--accent-blue': '#1677ff',
    '--accent-green': '#52c41a',
    '--accent-purple': '#722ed1',
    '--accent-orange': '#fa8c16',
    '--accent-pink': '#eb2f96',
    '--gradient-1': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    '--gradient-2': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    '--gradient-3': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    '--shadow': '0 4px 24px rgba(0, 0, 0, 0.08)',
  },
} as const;
