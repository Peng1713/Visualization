'use client';

import React from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SunOutlined,
  MoonOutlined,
  LayoutOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  FullscreenOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Badge, Avatar, Tooltip, Space, Menu } from 'antd';
import { css } from '@emotion/css';
import { useAppStore } from '@/store';
import { useRouter } from 'next/navigation';
import type { ThemeMode, LayoutMode } from '@/types';
import { menuItems } from './Sidebar';

const getHeaderStyles = (themeMode: ThemeMode) => ({
  header: css`
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    background: ${themeMode === 'dark'
      ? 'rgba(15, 15, 35, 0.9)'
      : 'rgba(255, 255, 255, 0.95)'};
    backdrop-filter: blur(12px);
    border-bottom: 1px solid ${themeMode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'};
    z-index: 100;
  `,
  left: css`
    display: flex;
    align-items: center;
    gap: 16px;
  `,
  topMenuWrapper: css`
    .ant-menu {
      background: transparent !important;
      border: none !important;
      line-height: 62px !important;
    }
    .ant-menu-item {
      border-radius: 8px !important;
    }
  `,
  right: css`
    display: flex;
    align-items: center;
    gap: 4px;
  `,
  iconBtn: css`
    color: ${themeMode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.65)'} !important;
    &:hover {
      color: #1677ff !important;
      background: ${themeMode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'} !important;
    }
  `,
  avatar: css`
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 12px;
    border-radius: 8px;
    transition: all 0.3s;
    &:hover {
      background: ${themeMode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'};
    }
  `,
  username: css`
    color: ${themeMode === 'dark' ? '#e5e5e5' : '#1a1a1a'};
    font-size: 14px;
    @media (max-width: 768px) {
      display: none;
    }
  `,
  logo: css`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-right: 20px;
    cursor: pointer;
  `,
  logoIcon: css`
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #1677ff 0%, #00d4ff 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 900;
    color: white;
  `,
  logoText: css`
    font-size: 16px;
    font-weight: 700;
    color: ${themeMode === 'dark' ? '#fff' : '#1a1a1a'};
    @media (max-width: 768px) {
      display: none;
    }
  `,
});

interface HeaderProps {
  current: string;
  onMenuClick: (key: string) => void;
  showTopNav?: boolean;
  isMobile?: boolean;
  onMobileMenuClick?: () => void;
}

export default function AppHeader({ current, onMenuClick, showTopNav, isMobile, onMobileMenuClick }: HeaderProps) {
  const router = useRouter();
  const themeMode = useAppStore((s) => s.themeMode);
  const layoutMode = useAppStore((s) => s.layoutMode);
  const collapsed = useAppStore((s) => s.collapsed);
  const userInfo = useAppStore((s) => s.userInfo);
  const setThemeMode = useAppStore((s) => s.setThemeMode);
  const setLayoutMode = useAppStore((s) => s.setLayoutMode);
  const setCollapsed = useAppStore((s) => s.setCollapsed);
  const logout = useAppStore((s) => s.logout);
  const s = getHeaderStyles(themeMode);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const userMenuItems = [
    { key: 'profile', icon: <UserOutlined />, label: '个人中心' },
    { key: 'settings', icon: <SettingOutlined />, label: '账户设置' },
    { type: 'divider' as const },
    { key: 'logout', icon: <LogoutOutlined />, label: '退出登录', danger: true },
  ];

  return (
    <div className={s.header}>
      <div className={s.left}>
        {showTopNav && (
          <div className={s.logo}>
            <div className={s.logoIcon}>DV</div>
            <span className={s.logoText}>DataVision</span>
          </div>
        )}

        {isMobile && (
          <Button
            type="text"
            icon={<MenuUnfoldOutlined />}
            onClick={onMobileMenuClick}
            className={s.iconBtn}
          />
        )}

        {!isMobile && !showTopNav && (
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className={s.iconBtn}
          />
        )}

        {showTopNav && (
          <div className={s.topMenuWrapper}>
            <Menu
              mode="horizontal"
              selectedKeys={[current]}
              items={menuItems}
              onClick={({ key }) => onMenuClick(key)}
            />
          </div>
        )}
      </div>

      <div className={s.right}>
        <Tooltip title={themeMode === 'dark' ? '切换亮色' : '切换暗色'}>
          <Button
            type="text"
            icon={themeMode === 'dark' ? <SunOutlined /> : <MoonOutlined />}
            onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
            className={s.iconBtn}
          />
        </Tooltip>

        <Tooltip title={layoutMode === 'side' ? '切换顶部导航' : '切换侧边导航'}>
          <Button
            type="text"
            icon={<LayoutOutlined />}
            onClick={() => setLayoutMode(layoutMode === 'side' ? 'top' : 'side')}
            className={s.iconBtn}
          />
        </Tooltip>

        <Tooltip title="全屏">
          <Button
            type="text"
            icon={<FullscreenOutlined />}
            onClick={toggleFullscreen}
            className={s.iconBtn}
          />
        </Tooltip>

        <Badge count={5} size="small" offset={[-4, 4]}>
          <Button type="text" icon={<BellOutlined />} className={s.iconBtn} />
        </Badge>

        <Dropdown
          menu={{
            items: userMenuItems,
            onClick: ({ key }) => {
              if (key === 'logout') handleLogout();
            },
          }}
          placement="bottomRight"
        >
          <div className={s.avatar}>
            <Avatar
              size={32}
              icon={<UserOutlined />}
              style={{ background: 'linear-gradient(135deg, #1677ff, #00d4ff)' }}
            />
            <span className={s.username}>{userInfo?.username || 'Admin'}</span>
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
