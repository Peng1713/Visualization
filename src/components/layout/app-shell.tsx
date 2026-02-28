"use client";

import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { css } from "@emotion/css";
import {
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Grid,
  Layout,
  Menu,
  Result,
  Segmented,
  Space,
  Switch,
  Tag,
  Typography,
  type MenuProps,
} from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import { APP_ROUTES, getAccessibleRoutes } from "@/config/routes";
import { useAppContext } from "@/contexts/app-context";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const headerClassName = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 0 16px;
  background: linear-gradient(90deg, rgba(47, 136, 255, 0.15), rgba(95, 215, 196, 0.1));
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(138, 152, 177, 0.2);
`;

const brandClassName = css`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 170px;
`;

const logoClassName = css`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 700;
  background: linear-gradient(135deg, #1677ff, #13c2c2);
  box-shadow: 0 8px 20px rgba(23, 119, 255, 0.4);
`;

const contentClassName = css`
  padding: 16px;
  min-height: calc(100vh - 64px);

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const AppShell = ({ children }: { children: ReactNode }) => {
  const {
    user,
    themeMode,
    navigationMode,
    setNavigationMode,
    setThemeMode,
    logout,
    canAccess,
  } = useAppContext();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;

  const accessibleRoutes = useMemo(
    () => getAccessibleRoutes(user?.permissions ?? []),
    [user?.permissions],
  );

  const menuItems = useMemo<MenuProps["items"]>(
    () =>
      accessibleRoutes.map((route) => ({
        key: route.path,
        icon: route.icon,
        label: route.title,
      })),
    [accessibleRoutes],
  );

  const selectedMenuKeys = useMemo(() => {
    const matched =
      accessibleRoutes.find((route) => pathname === route.path) ??
      accessibleRoutes.find((route) => pathname.startsWith(`${route.path}/`));
    return matched ? [matched.path] : [];
  }, [accessibleRoutes, pathname]);

  const activeRoute = useMemo(
    () =>
      APP_ROUTES.find((route) => pathname === route.path) ??
      APP_ROUTES.find((route) => pathname.startsWith(`${route.path}/`)),
    [pathname],
  );

  const hasCurrentPermission = activeRoute
    ? canAccess(activeRoute.permission)
    : true;
  const shouldShowSider = navigationMode === "side" && !isMobile;
  const shouldShowTopMenu = navigationMode === "top" && !isMobile;

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    setDrawerOpen(false);
    router.push(String(key));
  };

  const userDropdownItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: `当前角色：${user?.role ?? "-"}`,
      disabled: true,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "退出登录",
      danger: true,
      onClick: () => {
        logout();
        router.replace("/login");
      },
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {shouldShowSider && (
        <Sider
          width={236}
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          theme={themeMode}
          breakpoint="lg"
        >
          <div
            style={{
              margin: 16,
              padding: "10px 12px",
              borderRadius: 10,
              background: "linear-gradient(120deg, #1677ff, #13c2c2)",
              color: "#fff",
              textAlign: "center",
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
          >
            {collapsed ? "VCC" : "Visualization Hub"}
          </div>
          <Menu
            theme={themeMode}
            mode="inline"
            items={menuItems}
            selectedKeys={selectedMenuKeys}
            onClick={handleMenuClick}
          />
        </Sider>
      )}

      <Layout>
        <Header className={headerClassName}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {isMobile ? (
              <Button
                icon={<MenuOutlined />}
                onClick={() => setDrawerOpen(true)}
                aria-label="打开菜单"
              />
            ) : shouldShowSider ? (
              <Button
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed((prev) => !prev)}
                aria-label="折叠菜单"
              />
            ) : null}

            <div className={brandClassName}>
              <span className={logoClassName}>V</span>
              <div>
                <Text strong>智析可视化平台</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  高性能多端数据驾驶舱
                </Text>
              </div>
            </div>
          </div>

          {shouldShowTopMenu && (
            <Menu
              mode="horizontal"
              items={menuItems}
              selectedKeys={selectedMenuKeys}
              onClick={handleMenuClick}
              style={{ flex: 1, minWidth: 260, marginInline: 20 }}
            />
          )}

          <Space size={10} wrap>
            {!isMobile && (
              <Segmented
                value={navigationMode}
                onChange={(value) =>
                  setNavigationMode(value as "side" | "top")
                }
                options={[
                  { label: "侧边导航", value: "side" },
                  { label: "顶部导航", value: "top" },
                ]}
              />
            )}
            <Switch
              checked={themeMode === "dark"}
              onChange={(checked) => setThemeMode(checked ? "dark" : "light")}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
            />
            <Tag color="blue">{user?.username}</Tag>
            <Dropdown menu={{ items: userDropdownItems }} trigger={["click"]}>
              <Avatar
                style={{ cursor: "pointer", backgroundColor: "#2f88ff" }}
                icon={<UserOutlined />}
              />
            </Dropdown>
          </Space>
        </Header>

        <Content className={contentClassName}>
          {!hasCurrentPermission && activeRoute ? (
            <Result
              status="403"
              title="403"
              subTitle={`你当前角色无权访问「${activeRoute.title}」`}
              extra={
                <Button type="primary" onClick={() => router.push("/dashboard")}>
                  返回大屏首页
                </Button>
              }
            />
          ) : (
            children
          )}
        </Content>
      </Layout>

      <Drawer
        title="导航菜单"
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={260}
      >
        <div style={{ marginBottom: 16 }}>
          <Text type="secondary" style={{ display: "block", marginBottom: 6 }}>
            布局模式
          </Text>
          <Segmented
            block
            value={navigationMode}
            onChange={(value) => setNavigationMode(value as "side" | "top")}
            options={[
              { label: "侧边", value: "side" },
              { label: "顶部", value: "top" },
            ]}
          />
        </div>
        <Menu
          mode="inline"
          items={menuItems}
          selectedKeys={selectedMenuKeys}
          onClick={handleMenuClick}
        />
      </Drawer>
    </Layout>
  );
};
