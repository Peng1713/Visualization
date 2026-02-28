'use client';

import React from 'react';
import { css } from '@emotion/css';
import { useAppStore } from '@/store';
import type { ThemeMode } from '@/types';

const getStyles = (themeMode: ThemeMode) => ({
  card: css`
    border-radius: 16px;
    background: ${themeMode === 'dark'
      ? 'linear-gradient(145deg, rgba(26, 26, 46, 0.9), rgba(15, 15, 35, 0.9))'
      : 'linear-gradient(145deg, #ffffff, #f8f9ff)'};
    border: 1px solid ${themeMode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: all 0.3s;
    &:hover {
      border-color: ${themeMode === 'dark' ? 'rgba(22, 119, 255, 0.3)' : 'rgba(22, 119, 255, 0.2)'};
      box-shadow: ${themeMode === 'dark'
        ? '0 8px 32px rgba(0, 0, 0, 0.3)'
        : '0 8px 32px rgba(0, 0, 0, 0.08)'};
    }
  `,
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px 0;
  `,
  title: css`
    font-size: 16px;
    font-weight: 600;
    color: ${themeMode === 'dark' ? '#e5e5e5' : '#1a1a1a'};
  `,
  extra: css`
    font-size: 12px;
    color: ${themeMode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'};
  `,
  body: css`
    flex: 1;
    padding: 16px;
    min-height: 0;
  `,
});

interface ChartCardProps {
  title: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
  height?: number | string;
}

export default function ChartCard({ title, extra, children, height = 300 }: ChartCardProps) {
  const themeMode = useAppStore((s) => s.themeMode);
  const s = getStyles(themeMode);

  return (
    <div className={s.card} style={{ height }}>
      <div className={s.header}>
        <span className={s.title}>{title}</span>
        {extra && <span className={s.extra}>{extra}</span>}
      </div>
      <div className={s.body}>{children}</div>
    </div>
  );
}
