'use client';

import { css } from '@emotion/react';

interface ChartCardProps {
  title: string;
  isDark: boolean;
  children: React.ReactNode;
  span?: 1 | 2;
}

export default function ChartCard({
  title,
  isDark,
  children,
  span = 1,
}: ChartCardProps) {
  return (
    <div css={cardStyle(isDark, span)}>
      <div css={headerStyle(isDark)}>
        <span css={titleStyle(isDark)}>{title}</span>
        <div css={cornerStyle(isDark)} />
      </div>
      <div css={chartWrapperStyle}>{children}</div>
    </div>
  );
}

const cardStyle = (isDark: boolean, span: number) => css`
  grid-column: span ${span};
  background: ${isDark ? 'rgba(13, 30, 60, 0.5)' : 'rgba(255, 255, 255, 0.95)'};
  border: 1px solid ${isDark ? 'rgba(0, 212, 255, 0.2)' : 'rgba(0, 150, 255, 0.15)'};
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const headerStyle = (isDark: boolean) => css`
  position: relative;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${isDark ? 'rgba(0, 212, 255, 0.15)' : 'rgba(0, 150, 255, 0.1)'};
`;

const titleStyle = (isDark: boolean) => css`
  font-size: 1rem;
  font-weight: 600;
  color: ${isDark ? 'rgba(255,255,255,0.9)' : '#1a1a2e'};
`;

const cornerStyle = (isDark: boolean) => css`
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    ${isDark ? 'rgba(0, 212, 255, 0.05)' : 'rgba(0, 150, 255, 0.05)'}
  );
  clip-path: polygon(20px 0, 100% 0, 100% 100%, 0 100%);
`;

const chartWrapperStyle = css`
  flex: 1;
  min-height: 250px;
  padding: 1rem;
`;
