"use client";

import {
  LockOutlined,
  LoginOutlined,
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { css, keyframes } from "@emotion/css";
import { Button, Card, Form, Input, Select, Space, Spin, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppContext } from "@/contexts/app-context";

const { Title, Text } = Typography;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-16px); }
  100% { transform: translateY(0px); }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pageClassName = css`
  min-height: 100vh;
  display: grid;
  place-items: center;
  position: relative;
  overflow: hidden;
  padding: 20px;
  background:
    radial-gradient(circle at 12% 10%, rgba(47, 136, 255, 0.45), transparent 40%),
    radial-gradient(circle at 82% 80%, rgba(19, 194, 194, 0.35), transparent 42%),
    linear-gradient(140deg, #0a1023 10%, #121b3b 48%, #0a1326 100%);
`;

const orbBaseClass = css`
  position: absolute;
  border-radius: 50%;
  filter: blur(1px);
  opacity: 0.7;
  pointer-events: none;
`;

const cardClassName = css`
  width: min(450px, 92vw);
  border-radius: 16px !important;
  border: 1px solid rgba(157, 179, 212, 0.3) !important;
  background: rgba(14, 24, 48, 0.55) !important;
  backdrop-filter: blur(14px);
  box-shadow: 0 20px 55px rgba(7, 14, 32, 0.5);
`;

interface LoginFormValues {
  username: string;
  password: string;
  role: "admin" | "analyst" | "viewer";
}

export default function LoginPage() {
  const { hydrated, user, login } = useAppContext();
  const router = useRouter();

  const resolveRedirectPath = () => {
    if (typeof window === "undefined") {
      return "/dashboard";
    }
    const raw = new URLSearchParams(window.location.search).get("redirect");
    if (!raw) {
      return "/dashboard";
    }
    try {
      const decoded = decodeURIComponent(raw);
      return decoded.startsWith("/") ? decoded : "/dashboard";
    } catch {
      return "/dashboard";
    }
  };

  useEffect(() => {
    if (hydrated && user) {
      router.replace("/dashboard");
    }
  }, [hydrated, router, user]);

  const handleSubmit = (values: LoginFormValues) => {
    login({ username: values.username.trim(), role: values.role });
    router.replace(resolveRedirectPath());
  };

  if (!hydrated || user) {
    return (
      <div className={pageClassName}>
        <Spin size="large" description="加载中..." />
      </div>
    );
  }

  return (
    <div className={pageClassName}>
      <div
        className={orbBaseClass}
        style={{
          width: 280,
          height: 280,
          background: "rgba(47,136,255,0.35)",
          top: -70,
          left: -60,
          animation: `${float} 5s ease-in-out infinite`,
        }}
      />
      <div
        className={orbBaseClass}
        style={{
          width: 360,
          height: 360,
          background: "rgba(19,194,194,0.24)",
          right: -100,
          bottom: -140,
          animation: `${float} 8s ease-in-out infinite`,
        }}
      />
      <div
        className={orbBaseClass}
        style={{
          width: 380,
          height: 380,
          border: "1px solid rgba(124, 170, 242, 0.25)",
          top: "50%",
          left: "55%",
          marginTop: -190,
          marginLeft: -190,
          animation: `${rotate} 24s linear infinite`,
        }}
      />

      <Card className={cardClassName}>
        <Space vertical size={12} style={{ width: "100%" }}>
          <div>
            <Space align="center">
              <ThunderboltOutlined style={{ color: "#69b1ff" }} />
              <Text style={{ color: "#b6c7f5" }}>智析可视化平台</Text>
            </Space>
            <Title level={3} style={{ marginTop: 6, marginBottom: 4, color: "#fff" }}>
              欢迎登录
            </Title>
            <Text style={{ color: "rgba(217, 230, 255, 0.72)" }}>
              支持主题切换、布局切换、权限路由预留
            </Text>
          </div>

          <Form<LoginFormValues>
            layout="vertical"
            initialValues={{ role: "admin", username: "admin" }}
            onFinish={handleSubmit}
            requiredMark={false}
          >
            <Form.Item
              name="username"
              label={<span style={{ color: "#d7e4ff" }}>账号</span>}
              rules={[{ required: true, message: "请输入账号" }]}
            >
              <Input
                size="large"
                placeholder="请输入账号"
                prefix={<UserOutlined />}
                autoComplete="username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span style={{ color: "#d7e4ff" }}>密码</span>}
              rules={[
                { required: true, message: "请输入密码" },
                { min: 6, message: "密码至少 6 位" },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="请输入密码"
                prefix={<LockOutlined />}
                autoComplete="current-password"
              />
            </Form.Item>

            <Form.Item
              name="role"
              label={<span style={{ color: "#d7e4ff" }}>角色（演示权限）</span>}
              rules={[{ required: true, message: "请选择角色" }]}
            >
              <Select
                size="large"
                options={[
                  { label: "管理员（全部权限）", value: "admin" },
                  { label: "分析师（无系统设置）", value: "analyst" },
                  { label: "访客（仅大屏+监控）", value: "viewer" },
                ]}
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              icon={<LoginOutlined />}
              block
            >
              进入系统
            </Button>
          </Form>

          <Space align="start">
            <SafetyCertificateOutlined style={{ color: "#95de64", marginTop: 2 }} />
            <Text style={{ color: "rgba(217, 230, 255, 0.8)" }}>
              当前为演示登录，后续可直接替换为真实接口并回填 token / 权限码。
            </Text>
          </Space>
        </Space>
      </Card>
    </div>
  );
}
