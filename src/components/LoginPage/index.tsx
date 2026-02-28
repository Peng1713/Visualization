'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/store/authStore';
import { css } from '@emotion/react';
import dynamic from 'next/dynamic';

const ParticlesBg = dynamic(() => import('./ParticlesBg'), { ssr: false });

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      login(
        {
          id: '1',
          username: values.username,
          name: values.username,
          roles: ['admin'],
          permissions: ['*'],
        },
        'demo-token'
      );
      message.success('登录成功');
      router.push('/dashboard');
    } catch {
      message.error('登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div css={containerStyle}>
      <ParticlesBg />
      <div css={overlayStyle} />
      <div css={contentStyle}>
        <div css={cardStyle}>
          <div css={headerStyle}>
            <div css={logoStyle}>
              <span className="icon">◈</span>
            </div>
            <h1 css={titleStyle}>数据可视化平台</h1>
            <p css={subtitleStyle}>智能分析 · 实时洞察 · 决策赋能</p>
          </div>
          <Form
            name="login"
            onFinish={onFinish}
            size="large"
            autoComplete="off"
            css={formStyle}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: 'rgba(255,255,255,0.5)' }} />}
                placeholder="用户名"
                css={inputStyle}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: 'rgba(255,255,255,0.5)' }} />}
                placeholder="密码"
                css={inputStyle}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                css={buttonStyle}
              >
                登 录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

const containerStyle = css`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0d1b2a 100%);
`;

const overlayStyle = css`
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse at 20% 80%, rgba(0, 150, 255, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(138, 43, 226, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(0, 255, 200, 0.05) 0%, transparent 70%);
  pointer-events: none;
`;

const contentStyle = css`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  padding: 1rem;
`;

const cardStyle = css`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  
  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const headerStyle = css`
  text-align: center;
  margin-bottom: 2rem;
`;

const logoStyle = css`
  margin-bottom: 1rem;
  .icon {
    font-size: 3rem;
    background: linear-gradient(135deg, #00d4ff, #7c3aed);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
    animation: pulse 2s ease-in-out infinite;
  }
`;

const titleStyle = css`
  color: #fff;
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  letter-spacing: 0.1em;
`;

const subtitleStyle = css`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
`;

const formStyle = css`
  .ant-form-item {
    margin-bottom: 1.25rem;
  }
`;

const inputStyle = css`
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 12px !important;
  color: #fff !important;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
  
  &:hover, &:focus {
    border-color: rgba(0, 212, 255, 0.5) !important;
    box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.2) !important;
  }
  
  input {
    background: transparent !important;
    color: #fff !important;
  }
`;

const buttonStyle = css`
  height: 48px !important;
  font-size: 1rem !important;
  font-weight: 600 !important;
  border-radius: 12px !important;
  background: linear-gradient(135deg, #00d4ff, #0099ff) !important;
  border: none !important;
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.4) !important;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 25px rgba(0, 212, 255, 0.5) !important;
  }
`;
