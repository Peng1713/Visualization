'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Layout,
  Menu,
  Button,
  Dropdown,
  Avatar,
  Space,
  ConfigProvider,
  theme as antdTheme,
} from 'antd';
import {
  DashboardOutlined,
  LineChartOutlined,
  FileTextOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LayoutOutlined,
  BgColorsOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useLayoutStore } from '@/store/layoutStore';
import { useAuthStore } from '@/store/authStore';
import { css } from '@emotion/react';
import type { MenuProps } from 'antd';
import { filterAccessibleRoutes } from '@/utils/routeGuard';
import { ROUTES_CONFIG } from '@/types/route';

const iconMap: Record<string, React.ReactNode> = {
  DashboardOutlined: <DashboardOutlined />,
  LineChartOutlined: <LineChartOutlined />,
  FileTextOutlined: <FileTextOutlined />,
  SettingOutlined: <SettingOutlined />,
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { navPosition, themeMode, toggleNavPosition, toggleTheme } =
    useLayoutStore();
  const { user, logout } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);

  const routes = filterAccessibleRoutes(ROUTES_CONFIG);
  const menuItems: MenuProps['items'] = routes.map((r) => ({
    key: r.path,
    icon: r.meta.icon ? iconMap[r.meta.icon] : undefined,
    label: r.meta.title,
  }));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', themeMode === 'dark');
      document.documentElement.setAttribute('data-theme', themeMode);
    }
  }, [themeMode, mounted]);

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: () => {
        logout();
        router.replace('/');
      },
    },
  ];

  const themeConfig = {
    algorithm:
      themeMode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: '#00d4ff',
      borderRadius: 8,
    },
  };

  if (!mounted) return null;

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout
        css={layoutStyle}
        className={themeMode === 'dark' ? 'dark-layout' : 'light-layout'}
      >
        {navPosition === 'left' ? (
          <Layout.Sider
            width={240}
            collapsed={collapsed}
            collapsedWidth={80}
            css={siderStyle(themeMode)}
            breakpoint="lg"
            onBreakpoint={(broken) => {
              if (broken) setCollapsed(true);
            }}
          >
            <div css={logoStyle(collapsed)}>
              <span>{collapsed ? '◈' : '◈ 数据大屏'}</span>
            </div>
            <Menu
              mode="inline"
              selectedKeys={[pathname]}
              items={menuItems}
              onClick={({ key }) => router.push(key)}
              css={menuStyle(themeMode)}
            />
          </Layout.Sider>
        ) : (
          <Layout.Header css={headerStyle(themeMode)}>
            <div css={headerLeftStyle}>
              <span css={logoTextStyle}>◈ 数据大屏</span>
              <Menu
                mode="horizontal"
                selectedKeys={[pathname]}
                items={menuItems}
                onClick={({ key }) => router.push(key)}
                css={horizontalMenuStyle(themeMode)}
              />
            </div>
            <Space>
              <Button
                type="text"
                icon={<LayoutOutlined />}
                onClick={toggleNavPosition}
                title="切换导航位置"
              />
              <Button
                type="text"
                icon={<BgColorsOutlined />}
                onClick={toggleTheme}
                title="切换主题"
              />
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <Space css={userSpaceStyle}>
                  <Avatar size="small" style={{ backgroundColor: '#00d4ff' }}>
                    {user?.name?.[0] || 'U'}
                  </Avatar>
                  <span>{user?.name || '用户'}</span>
                </Space>
              </Dropdown>
            </Space>
          </Layout.Header>
        )}
        <Layout>
          {navPosition === 'left' && (
            <div css={topBarStyle(themeMode)}>
              <Space>
                <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                />
                <Button
                  type="text"
                  icon={<LayoutOutlined />}
                  onClick={toggleNavPosition}
                  title="切换导航位置"
                />
                <Button
                  type="text"
                  icon={<BgColorsOutlined />}
                  onClick={toggleTheme}
                  title="切换主题"
                />
              </Space>
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <Space css={userSpaceStyle}>
                  <Avatar size="small" style={{ backgroundColor: '#00d4ff' }}>
                    {user?.name?.[0] || 'U'}
                  </Avatar>
                  <span>{user?.name || '用户'}</span>
                </Space>
              </Dropdown>
            </div>
          )}
          <Layout.Content css={contentStyle(themeMode, navPosition)}>{children}</Layout.Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

const layoutStyle = css`
  min-height: 100vh;
`;

const siderStyle = (theme: string) => css`
  background: ${theme === 'dark' ? '#0d1117' : '#fff'} !important;
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 768px) {
    position: fixed !important;
    z-index: 100;
    height: 100vh;
    left: 0;
    top: 0;
  }
`;

const logoStyle = (collapsed: boolean) => css`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00d4ff;
  font-size: ${collapsed ? '1.5rem' : '1.1rem'};
  font-weight: 600;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

const logoTextStyle = css`
  color: #00d4ff;
  font-weight: 600;
  font-size: 1.1rem;
  margin-right: 2rem;
  white-space: nowrap;
`;

const menuStyle = (theme: string) => css`
  flex: 1;
  border-right: none !important;
  background: transparent !important;
  padding: 1rem 0;
  .ant-menu-item {
    margin: 4px 12px;
    border-radius: 8px;
    color: ${theme === 'dark' ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)'};
  }
  .ant-menu-item-selected {
    background: rgba(0, 212, 255, 0.15) !important;
    color: #00d4ff !important;
  }
`;

const headerStyle = (theme: string) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  background: ${theme === 'dark' ? '#0d1117' : '#fff'} !important;
  border-bottom: 1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'};
  height: 64px;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    height: auto;
    padding: 0.5rem 1rem;
  }
`;

const headerLeftStyle = css`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
`;

const horizontalMenuStyle = (theme: string) => css`
  flex: 1;
  min-width: 0;
  border: none !important;
  background: transparent !important;
  line-height: 62px;
  .ant-menu-item {
    color: ${theme === 'dark' ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)'};
  }
  .ant-menu-item-selected {
    color: #00d4ff !important;
  }
  @media (max-width: 768px) {
    .ant-menu-item {
      padding: 0 12px !important;
      font-size: 0.85rem;
    }
  }
`;

const topBarStyle = (theme: string) => css`
  height: 48px;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${theme === 'dark' ? '#161b22' : '#fafafa'};
  border-bottom: 1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'};
`;

const userSpaceStyle = css`
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  &:hover {
    background: rgba(0, 212, 255, 0.1);
  }
`;

const contentStyle = (theme: string, navPos: 'left' | 'top') => css`
  padding: 1.5rem;
  min-height: calc(100vh - ${navPos === 'top' ? 64 : 48}px);
  background: ${theme === 'dark' ? '#0a0d12' : '#f5f5f5'};
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
