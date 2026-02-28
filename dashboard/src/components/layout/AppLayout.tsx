'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { css } from '@emotion/css';
import { useAppStore } from '@/store';
import { useResponsive } from '@/hooks/useResponsive';
import Sidebar from './Sidebar';
import AppHeader from './Header';
import { Drawer } from 'antd';
import type { ThemeMode } from '@/types';

const getLayoutStyles = (themeMode: ThemeMode) => ({
  container: css`
    display: flex;
    height: 100vh;
    overflow: hidden;
    background: ${themeMode === 'dark' ? '#0a0a1a' : '#f0f2f5'};
    transition: background 0.3s;
  `,
  sidebarDesktop: css`
    flex-shrink: 0;
    transition: width 0.3s cubic-bezier(0.2, 0, 0, 1);
    overflow: hidden;
  `,
  main: css`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-width: 0;
  `,
  content: css`
    flex: 1;
    overflow: auto;
    padding: 0;
    position: relative;
  `,
});

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile } = useResponsive();
  const themeMode = useAppStore((s) => s.themeMode);
  const layoutMode = useAppStore((s) => s.layoutMode);
  const collapsed = useAppStore((s) => s.collapsed);
  const setCollapsed = useAppStore((s) => s.setCollapsed);
  const token = useAppStore((s) => s.token);
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const s = getLayoutStyles(themeMode);

  useEffect(() => {
    if (!token) {
      router.replace('/login');
    }
  }, [token, router]);

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile, setCollapsed]);

  const handleMenuClick = (key: string) => {
    router.push(key);
    if (isMobile) {
      setMobileDrawer(false);
    }
  };

  const currentKey = pathname || '/dashboard';

  if (!token) return null;

  const showSidebar = layoutMode === 'side' && !isMobile;
  const showTopNav = layoutMode === 'top' && !isMobile;

  return (
    <div className={s.container}>
      {showSidebar && (
        <div
          className={s.sidebarDesktop}
          style={{ width: collapsed ? 80 : 240 }}
        >
          <Sidebar current={currentKey} onMenuClick={handleMenuClick} />
        </div>
      )}

      {isMobile && (
        <Drawer
          open={mobileDrawer}
          onClose={() => setMobileDrawer(false)}
          placement="left"
          width={240}
          styles={{ body: { padding: 0 } }}
          closable={false}
        >
          <Sidebar current={currentKey} onMenuClick={handleMenuClick} />
        </Drawer>
      )}

      <div className={s.main}>
        <AppHeader
          current={currentKey}
          onMenuClick={handleMenuClick}
          showTopNav={showTopNav}
          isMobile={isMobile}
          onMobileMenuClick={() => setMobileDrawer(true)}
        />
        <div className={s.content}>{children}</div>
      </div>
    </div>
  );
}
