'use client';

import React from 'react';
import { Menu } from 'antd';
import {
  DashboardOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  SettingOutlined,
  TeamOutlined,
  FileTextOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { useAppStore } from '@/store';
import type { ThemeMode } from '@/types';

const menuItems = [
  { key: '/dashboard', icon: <DashboardOutlined />, label: '数据大屏' },
  {
    key: '/dashboard/analytics',
    icon: <BarChartOutlined />,
    label: '数据分析',
  },
  {
    key: 'charts',
    icon: <LineChartOutlined />,
    label: '图表中心',
    children: [
      { key: '/dashboard/charts/line', icon: <LineChartOutlined />, label: '折线图' },
      { key: '/dashboard/charts/bar', icon: <BarChartOutlined />, label: '柱状图' },
      { key: '/dashboard/charts/pie', icon: <PieChartOutlined />, label: '饼图' },
    ],
  },
  { key: '/dashboard/users', icon: <TeamOutlined />, label: '用户管理' },
  { key: '/dashboard/reports', icon: <FileTextOutlined />, label: '报表管理' },
  { key: '/dashboard/apps', icon: <AppstoreOutlined />, label: '应用中心' },
  { key: '/dashboard/settings', icon: <SettingOutlined />, label: '系统设置' },
];

const getSidebarStyles = (themeMode: ThemeMode, collapsed: boolean) => ({
  wrapper: css`
    height: 100%;
    display: flex;
    flex-direction: column;
    background: ${themeMode === 'dark'
      ? 'linear-gradient(180deg, #0f0f23 0%, #1a1a35 100%)'
      : 'linear-gradient(180deg, #ffffff 0%, #f8f9ff 100%)'};
    border-right: 1px solid ${themeMode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'};
    transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
    overflow: hidden;
  `,
  logo: css`
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 0 16px;
    border-bottom: 1px solid ${themeMode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'};
    cursor: pointer;
    flex-shrink: 0;
  `,
  logoIcon: css`
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #1677ff 0%, #00d4ff 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 900;
    color: white;
    flex-shrink: 0;
  `,
  logoText: css`
    font-size: 16px;
    font-weight: 700;
    color: ${themeMode === 'dark' ? '#fff' : '#1a1a1a'};
    white-space: nowrap;
    overflow: hidden;
    transition: opacity 0.3s, width 0.3s;
    opacity: ${collapsed ? 0 : 1};
    width: ${collapsed ? '0' : 'auto'};
  `,
  menuArea: css`
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 8px 0;
    .ant-menu {
      background: transparent !important;
      border: none !important;
    }
    .ant-menu-item, .ant-menu-submenu-title {
      margin: 4px 8px !important;
      border-radius: 10px !important;
      height: 44px !important;
      line-height: 44px !important;
      transition: all 0.25s !important;
    }
    .ant-menu-item-selected {
      background: ${themeMode === 'dark'
        ? 'linear-gradient(135deg, rgba(22, 119, 255, 0.25) 0%, rgba(0, 212, 255, 0.15) 100%)'
        : 'linear-gradient(135deg, rgba(22, 119, 255, 0.12) 0%, rgba(22, 119, 255, 0.06) 100%)'} !important;
      box-shadow: ${themeMode === 'dark'
        ? '0 0 12px rgba(22, 119, 255, 0.2)'
        : '0 2px 8px rgba(22, 119, 255, 0.15)'};
    }
  `,
});

interface SidebarProps {
  current: string;
  onMenuClick: (key: string) => void;
}

export default function Sidebar({ current, onMenuClick }: SidebarProps) {
  const themeMode = useAppStore((s) => s.themeMode);
  const collapsed = useAppStore((s) => s.collapsed);
  const s = getSidebarStyles(themeMode, collapsed);

  return (
    <div className={s.wrapper}>
      <div className={s.logo}>
        <div className={s.logoIcon}>DV</div>
        <span className={s.logoText}>DataVision</span>
      </div>
      <div className={s.menuArea}>
        <Menu
          mode="inline"
          selectedKeys={[current]}
          defaultOpenKeys={['charts']}
          items={menuItems}
          inlineCollapsed={collapsed}
          onClick={({ key }) => onMenuClick(key)}
        />
      </div>
    </div>
  );
}

export { menuItems };
