'use client';

import React from 'react';
import { css } from '@emotion/css';
import { useAppStore } from '@/store';
import { Empty, Button } from 'antd';
import { useRouter } from 'next/navigation';
import type { ThemeMode } from '@/types';

const getStyles = (themeMode: ThemeMode) => ({
  container: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 400px;
    padding: 40px;
  `,
  title: css`
    font-size: 24px;
    font-weight: 700;
    color: ${themeMode === 'dark' ? '#e5e5e5' : '#1a1a1a'};
    margin-bottom: 12px;
  `,
  desc: css`
    font-size: 14px;
    color: ${themeMode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'};
    margin-bottom: 32px;
  `,
});

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({ title, description = '该模块正在开发中，敬请期待...' }: PlaceholderPageProps) {
  const themeMode = useAppStore((s) => s.themeMode);
  const router = useRouter();
  const s = getStyles(themeMode);

  return (
    <div className={s.container}>
      <h2 className={s.title}>{title}</h2>
      <p className={s.desc}>{description}</p>
      <Empty description={false} />
      <Button type="primary" style={{ marginTop: 24 }} onClick={() => router.push('/dashboard')}>
        返回首页
      </Button>
    </div>
  );
}
