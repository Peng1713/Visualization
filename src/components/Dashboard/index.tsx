'use client';

import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useLayoutStore } from '@/store/layoutStore';
import StatsCards from './StatsCards';
import ChartSection from './ChartSection';

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState('');
  const themeMode = useLayoutStore((state) => state.themeMode);
  const isDark = themeMode === 'dark';

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div css={containerStyle(isDark)}>
      <header css={headerStyle(isDark)}>
        <div css={titleSectionStyle}>
          <h1 css={titleStyle}>智慧数据可视化大屏</h1>
          <p css={[subtitleStyle, subtitleThemeStyle(isDark)]}>实时数据监控 · 智能分析决策</p>
        </div>
        <div css={timeStyle(isDark)}>
          <span>{currentTime}</span>
        </div>
      </header>

      <StatsCards isDark={isDark} />

      <ChartSection isDark={isDark} />
    </div>
  );
}

const containerStyle = (isDark: boolean) => css`
  min-height: 100%;
  padding: 0;
`;

const headerStyle = (isDark: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${isDark ? 'rgba(0, 212, 255, 0.2)' : 'rgba(0, 150, 255, 0.2)'};
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const titleSectionStyle = css`
  flex: 1;
`;

const titleStyle = css`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #00d4ff, #0099ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.05em;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const subtitleStyle = css`
  font-size: 0.9rem;
  margin: 0.25rem 0 0;
`;

const subtitleThemeStyle = (isDark: boolean) => css`
  color: ${isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)'};
`;

const timeStyle = (isDark: boolean) => css`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)'};
  padding: 0.5rem 1rem;
  background: ${isDark ? 'rgba(0, 212, 255, 0.1)' : 'rgba(0, 150, 255, 0.08)'};
  border-radius: 8px;
  border: 1px solid ${isDark ? 'rgba(0, 212, 255, 0.3)' : 'rgba(0, 150, 255, 0.2)'};
`;
