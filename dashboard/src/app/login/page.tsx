'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input, Button, message, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { css, keyframes } from '@emotion/css';
import { useAppStore } from '@/store';

const particleFloat = keyframes`
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
`;

const rotateGradient = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const breathe = keyframes`
  0%, 100% { box-shadow: 0 0 30px rgba(22, 119, 255, 0.2), inset 0 0 30px rgba(22, 119, 255, 0.05); }
  50% { box-shadow: 0 0 60px rgba(22, 119, 255, 0.4), inset 0 0 60px rgba(22, 119, 255, 0.1); }
`;

const orbitAnimation = keyframes`
  0% { transform: rotate(0deg) translateX(160px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(160px) rotate(-360deg); }
`;

const styles = {
  container: css`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0a0a1a;
    position: relative;
    overflow: hidden;
  `,
  bgGradient: css`
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 20% 50%, rgba(22, 119, 255, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, rgba(168, 85, 247, 0.12) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%);
  `,
  gridBg: css`
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(22, 119, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(22, 119, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
  `,
  particle: css`
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(0, 212, 255, 0.6);
    animation: ${particleFloat} linear infinite;
  `,
  loginWrapper: css`
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 440px;
    padding: 0 20px;
    animation: fadeIn 1s ease-out;
  `,
  logoSection: css`
    text-align: center;
    margin-bottom: 40px;
  `,
  logoOrbit: css`
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto 24px;
  `,
  logoCore: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #1677ff 0%, #00d4ff 100%);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: 900;
    color: white;
    letter-spacing: -2px;
    box-shadow: 0 0 40px rgba(22, 119, 255, 0.5);
  `,
  orbitRing: css`
    position: absolute;
    inset: 0;
    border: 1px solid rgba(22, 119, 255, 0.2);
    border-radius: 50%;
    &::after {
      content: '';
      position: absolute;
      top: -3px;
      left: 50%;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #00d4ff;
      box-shadow: 0 0 10px #00d4ff;
      animation: ${orbitAnimation} 3s linear infinite;
    }
  `,
  title: css`
    font-size: 28px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 8px;
    background: linear-gradient(90deg, #ffffff, #00d4ff, #1677ff, #a855f7, #ffffff);
    background-size: 400% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 6s linear infinite;
  `,
  subtitle: css`
    font-size: 14px;
    color: rgba(255, 255, 255, 0.4);
    letter-spacing: 4px;
  `,
  formCard: css`
    background: rgba(20, 20, 40, 0.8);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(22, 119, 255, 0.15);
    border-radius: 20px;
    padding: 40px 36px;
    animation: ${breathe} 4s ease-in-out infinite;
    position: relative;
    overflow: hidden;
    &::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: conic-gradient(from 0deg, transparent, rgba(22, 119, 255, 0.3), transparent, rgba(0, 212, 255, 0.3), transparent);
      border-radius: 21px;
      z-index: -1;
      animation: ${rotateGradient} 8s linear infinite;
    }
  `,
  inputWrapper: css`
    .ant-input-affix-wrapper {
      background: rgba(255, 255, 255, 0.04) !important;
      border: 1px solid rgba(255, 255, 255, 0.08) !important;
      border-radius: 12px !important;
      height: 48px;
      color: #fff !important;
      transition: all 0.3s;
      &:hover, &:focus-within {
        border-color: rgba(22, 119, 255, 0.5) !important;
        box-shadow: 0 0 20px rgba(22, 119, 255, 0.15) !important;
      }
      .ant-input {
        background: transparent !important;
        color: #fff !important;
        font-size: 15px;
        &::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
      }
      .ant-input-prefix {
        color: rgba(22, 119, 255, 0.7);
        margin-right: 12px;
        font-size: 16px;
      }
    }
  `,
  loginBtn: css`
    width: 100%;
    height: 48px !important;
    border-radius: 12px !important;
    font-size: 16px !important;
    font-weight: 600 !important;
    border: none !important;
    background: linear-gradient(135deg, #1677ff 0%, #00d4ff 100%) !important;
    box-shadow: 0 4px 20px rgba(22, 119, 255, 0.4) !important;
    transition: all 0.3s !important;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 30px rgba(22, 119, 255, 0.6) !important;
    }
    &:active {
      transform: translateY(0);
    }
  `,
  footer: css`
    text-align: center;
    margin-top: 24px;
    color: rgba(255, 255, 255, 0.25);
    font-size: 12px;
  `,
  rememberRow: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    .ant-checkbox-wrapper {
      color: rgba(255, 255, 255, 0.5);
    }
    a {
      color: rgba(22, 119, 255, 0.7);
      font-size: 13px;
      &:hover {
        color: #1677ff;
      }
    }
  `,
};

interface Particle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const setToken = useAppStore((s) => s.setToken);
  const setUserInfo = useAppStore((s) => s.setUserInfo);

  useEffect(() => {
    const p: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 12,
      size: 1 + Math.random() * 3,
    }));
    setParticles(p);
  }, []);

  const handleLogin = useCallback(async (values: { username: string; password: string }) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));

    if (values.username && values.password) {
      setToken('mock-token-' + Date.now());
      setUserInfo({
        id: '1',
        username: values.username,
        avatar: '',
        roles: ['admin'],
        permissions: ['*'],
      });
      message.success('登录成功，欢迎回来！');
      router.push('/dashboard');
    } else {
      message.error('请输入用户名和密码');
    }
    setLoading(false);
  }, [router, setToken, setUserInfo]);

  return (
    <div className={styles.container}>
      <div className={styles.bgGradient} />
      <div className={styles.gridBg} />

      {particles.map((p) => (
        <div
          key={p.id}
          className={styles.particle}
          style={{
            left: `${p.left}%`,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      <div className={styles.loginWrapper}>
        <div className={styles.logoSection}>
          <div className={styles.logoOrbit}>
            <div className={styles.orbitRing} />
            <div className={styles.logoCore}>DV</div>
          </div>
          <h1 className={styles.title}>DataVision Pro</h1>
          <p className={styles.subtitle}>INTELLIGENT DATA PLATFORM</p>
        </div>

        <div className={styles.formCard}>
          <Form
            size="large"
            onFinish={handleLogin}
            autoComplete="off"
            initialValues={{ username: 'admin', password: 'admin123' }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
              className={styles.inputWrapper}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="请输入用户名"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
              className={styles.inputWrapper}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入密码"
              />
            </Form.Item>

            <div className={styles.rememberRow}>
              <Checkbox defaultChecked>记住密码</Checkbox>
              <a href="#">忘记密码？</a>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className={styles.loginBtn}
              >
                {loading ? '正在登录...' : '登 录'}
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className={styles.footer}>
          <p>© 2026 DataVision Pro. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
