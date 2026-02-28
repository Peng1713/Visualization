'use client';

import React, { useEffect, useState } from 'react';
import { css, keyframes } from '@emotion/css';
import { useAppStore } from '@/store';
import type { ThemeMode } from '@/types';

const flicker = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
`;

const getStyles = (themeMode: ThemeMode) => ({
  header: css`
    text-align: center;
    padding: 20px 24px 12px;
    position: relative;
  `,
  title: css`
    font-size: 26px;
    font-weight: 800;
    letter-spacing: 8px;
    background: ${themeMode === 'dark'
      ? 'linear-gradient(90deg, #00d4ff, #1677ff, #a855f7, #00d4ff)'
      : 'linear-gradient(90deg, #1677ff, #0050b3, #722ed1, #1677ff)'};
    background-size: 300% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    @media (max-width: 768px) {
      font-size: 18px;
      letter-spacing: 4px;
    }
  `,
  meta: css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    margin-top: 8px;
    flex-wrap: wrap;
  `,
  metaItem: css`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: ${themeMode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'};
  `,
  dot: css`
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #52c41a;
    animation: ${flicker} 2s infinite;
  `,
  dividerLine: css`
    height: 1px;
    margin-top: 12px;
    background: ${themeMode === 'dark'
      ? 'linear-gradient(90deg, transparent, rgba(22, 119, 255, 0.3), rgba(0, 212, 255, 0.3), rgba(22, 119, 255, 0.3), transparent)'
      : 'linear-gradient(90deg, transparent, rgba(22, 119, 255, 0.15), rgba(22, 119, 255, 0.15), transparent)'};
  `,
});

export default function DashboardHeader() {
  const themeMode = useAppStore((s) => s.themeMode);
  const s = getStyles(themeMode);
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          weekday: 'short',
        }) +
          ' ' +
          now.toLocaleTimeString('zh-CN')
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={s.header}>
      <h1 className={s.title}>智 能 数 据 可 视 化 平 台</h1>
      <div className={s.meta}>
        <div className={s.metaItem}>
          <span className={s.dot} />
          系统运行正常
        </div>
        <div className={s.metaItem}>{time}</div>
        <div className={s.metaItem}>数据更新频率: 5s</div>
      </div>
      <div className={s.dividerLine} />
    </div>
  );
}
