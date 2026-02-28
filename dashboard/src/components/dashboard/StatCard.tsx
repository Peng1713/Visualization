'use client';

import React, { useEffect, useRef, useState } from 'react';
import { css, keyframes } from '@emotion/css';
import { useAppStore } from '@/store';
import type { ThemeMode } from '@/types';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const borderAnim = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const getStyles = (themeMode: ThemeMode, accentColor: string) => ({
  card: css`
    position: relative;
    padding: 24px;
    border-radius: 16px;
    background: ${themeMode === 'dark'
      ? 'linear-gradient(145deg, rgba(26, 26, 46, 0.9), rgba(15, 15, 35, 0.9))'
      : 'linear-gradient(145deg, #ffffff, #f8f9ff)'};
    border: 1px solid ${themeMode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'};
    overflow: hidden;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${themeMode === 'dark'
        ? `0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px ${accentColor}30`
        : `0 12px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px ${accentColor}30`};
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, ${accentColor}, ${accentColor}66, ${accentColor});
      background-size: 200% 200%;
      animation: ${borderAnim} 3s ease infinite;
    }
  `,
  iconWrap: css`
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: ${accentColor}15;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    color: ${accentColor};
    margin-bottom: 16px;
  `,
  label: css`
    font-size: 13px;
    color: ${themeMode === 'dark' ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)'};
    margin-bottom: 8px;
  `,
  value: css`
    font-size: 30px;
    font-weight: 700;
    color: ${themeMode === 'dark' ? '#ffffff' : '#1a1a1a'};
    font-variant-numeric: tabular-nums;
    line-height: 1.2;
  `,
  trend: css`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    margin-top: 8px;
    padding: 2px 8px;
    border-radius: 20px;
  `,
  trendUp: css`
    color: #52c41a;
    background: rgba(82, 196, 26, 0.1);
  `,
  trendDown: css`
    color: #ff4d4f;
    background: rgba(255, 77, 79, 0.1);
  `,
  bgDecor: css`
    position: absolute;
    right: -20px;
    bottom: -20px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: ${accentColor}08;
    pointer-events: none;
  `,
});

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend?: number;
  color: string;
}

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return count;
}

export default function StatCard({ icon, label, value, prefix = '', suffix = '', trend, color }: StatCardProps) {
  const themeMode = useAppStore((s) => s.themeMode);
  const s = getStyles(themeMode, color);
  const displayValue = useCountUp(value);

  const formatNumber = (n: number) => {
    if (n >= 10000) return (n / 10000).toFixed(1) + '万';
    return n.toLocaleString();
  };

  return (
    <div className={s.card}>
      <div className={s.iconWrap}>{icon}</div>
      <div className={s.label}>{label}</div>
      <div className={s.value}>
        {prefix}{formatNumber(displayValue)}{suffix}
      </div>
      {trend !== undefined && (
        <div className={`${s.trend} ${trend >= 0 ? s.trendUp : s.trendDown}`}>
          {trend >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          {Math.abs(trend)}%
        </div>
      )}
      <div className={s.bgDecor} />
    </div>
  );
}
