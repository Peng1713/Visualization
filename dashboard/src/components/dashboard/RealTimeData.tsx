'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { css, keyframes } from '@emotion/css';
import { useAppStore } from '@/store';
import type { ThemeMode } from '@/types';

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.9); }
`;

const getStyles = (themeMode: ThemeMode) => ({
  wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%;
    justify-content: center;
  `,
  item: css`
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    border-radius: 12px;
    background: ${themeMode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'};
    transition: all 0.3s;
    &:hover {
      background: ${themeMode === 'dark' ? 'rgba(22, 119, 255, 0.08)' : 'rgba(22, 119, 255, 0.04)'};
    }
  `,
  dot: css`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    animation: ${pulse} 2s infinite;
    flex-shrink: 0;
  `,
  info: css`
    flex: 1;
    min-width: 0;
  `,
  label: css`
    font-size: 12px;
    color: ${themeMode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'};
    margin-bottom: 4px;
  `,
  value: css`
    font-size: 20px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: ${themeMode === 'dark' ? '#fff' : '#1a1a1a'};
  `,
  bar: css`
    height: 4px;
    border-radius: 2px;
    background: ${themeMode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'};
    overflow: hidden;
    margin-top: 6px;
  `,
  barFill: css`
    height: 100%;
    border-radius: 2px;
    transition: width 1s ease;
  `,
});

interface MetricItem {
  label: string;
  value: number;
  max: number;
  color: string;
  suffix: string;
}

const baseMetrics: MetricItem[] = [
  { label: '当前在线用户', value: 12483, max: 20000, color: '#1677ff', suffix: '' },
  { label: '今日请求量', value: 2847562, max: 5000000, color: '#00d4ff', suffix: '' },
  { label: '系统CPU占用', value: 67, max: 100, color: '#a855f7', suffix: '%' },
  { label: '内存使用率', value: 78, max: 100, color: '#00ff88', suffix: '%' },
  { label: '网络流量', value: 3842, max: 10000, color: '#ff6b35', suffix: 'MB/s' },
];

export default function RealTimeData() {
  const themeMode = useAppStore((s) => s.themeMode);
  const s = getStyles(themeMode);
  const [metrics, setMetrics] = useState(baseMetrics);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((m) => ({
          ...m,
          value: Math.max(
            0,
            Math.min(m.max, m.value + Math.round((Math.random() - 0.45) * m.max * 0.02))
          ),
        }))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const formatVal = (v: number) => {
    if (v >= 1000000) return (v / 1000000).toFixed(1) + 'M';
    if (v >= 1000) return (v / 1000).toFixed(1) + 'K';
    return v.toString();
  };

  return (
    <div className={s.wrapper}>
      {metrics.map((m) => (
        <div key={m.label} className={s.item}>
          <div className={s.dot} style={{ background: m.color, boxShadow: `0 0 8px ${m.color}60` }} />
          <div className={s.info}>
            <div className={s.label}>{m.label}</div>
            <div className={s.value}>
              {formatVal(m.value)}{m.suffix}
            </div>
            <div className={s.bar}>
              <div
                className={s.barFill}
                style={{
                  width: `${(m.value / m.max) * 100}%`,
                  background: `linear-gradient(90deg, ${m.color}, ${m.color}88)`,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
