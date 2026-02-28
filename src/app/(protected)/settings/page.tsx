"use client";

import { Card, Radio, Space, Table, Tag, Typography } from "antd";
import { PageHero } from "@/components/common/page-hero";
import { ROLE_PERMISSION_MAP } from "@/config/routes";
import { useAppContext } from "@/contexts/app-context";

const { Text } = Typography;

const roleRows = Object.entries(ROLE_PERMISSION_MAP).map(([role, permissions]) => ({
  key: role,
  role,
  permissions,
}));

export default function SettingsPage() {
  const { themeMode, navigationMode, setThemeMode, setNavigationMode } =
    useAppContext();

  return (
    <>
      <PageHero
        title="系统设置"
        description="当前页用于预留个性化设置与权限中心接口，已支持主题和导航布局即时切换。"
        tags={["暗黑/明亮", "导航模式", "角色权限"]}
      />

      <Space direction="vertical" size={12} style={{ width: "100%" }}>
        <Card title="外观设置">
          <Space direction="vertical" size={16}>
            <div>
              <Text type="secondary">主题模式</Text>
              <br />
              <Radio.Group
                style={{ marginTop: 8 }}
                value={themeMode}
                onChange={(event) => setThemeMode(event.target.value)}
                options={[
                  { label: "浅色主题", value: "light" },
                  { label: "深色主题", value: "dark" },
                ]}
              />
            </div>

            <div>
              <Text type="secondary">导航布局</Text>
              <br />
              <Radio.Group
                style={{ marginTop: 8 }}
                value={navigationMode}
                onChange={(event) => setNavigationMode(event.target.value)}
                options={[
                  { label: "侧边导航", value: "side" },
                  { label: "顶部导航", value: "top" },
                ]}
              />
            </div>
          </Space>
        </Card>

        <Card title="角色权限预留（可替换为接口返回）">
          <Table
            pagination={false}
            dataSource={roleRows}
            columns={[
              { title: "角色", dataIndex: "role" },
              {
                title: "权限码",
                dataIndex: "permissions",
                render: (permissions: string[]) => (
                  <Space wrap>
                    {permissions.map((permission) => (
                      <Tag color="blue" key={permission}>
                        {permission}
                      </Tag>
                    ))}
                  </Space>
                ),
              },
            ]}
          />
        </Card>
      </Space>
    </>
  );
}
