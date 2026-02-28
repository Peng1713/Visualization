'use client';

import { css } from '@emotion/react';
import {
  UserOutlined,
  RiseOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';

interface StatsCardsProps {
  isDark: boolean;
}

const stats = [
  {
    title: '总用户数',
    value: '128,560',
    change: '+12.5%',
    icon: UserOutlined,
    color: '#00d4ff',
  },
  {
    title: '本月增长',
    value: '¥2.8M',
    change: '+8.2%',
    icon: RiseOutlined,
    color: '#00e676',
  },
  {
    title: '总收入',
    value: '¥156M',
    change: '+15.3%',
    icon: DollarOutlined,
    color: '#ffab00',
  },
  {
    title: '订单量',
    value: '8,432',
    change: '+5.7%',
    icon: ShoppingCartOutlined,
    color: '#ff6b6b',
  },
];

export default function StatsCards({ isDark }: StatsCardsProps) {
  return (
    <div css={gridStyle}>
      {stats.map((item, i) => (
        <div
          key={i}
          css={cardStyle(isDark, item.color)}
          className="animate-float"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div css={iconWrapperStyle(item.color)}>
            <item.icon style={{ fontSize: 24 }} />
          </div>
          <div css={contentStyle}>
            <span css={valueStyle(isDark)}>{item.value}</span>
            <span css={titleStyle(isDark)}>{item.title}</span>
          </div>
          <span css={changeStyle(item.change.startsWith('+'))}>{item.change}</span>
        </div>
      ))}
    </div>
  );
}

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const cardStyle = (isDark: boolean, color: string) => css`
  position: relative;
  padding: 1.25rem;
  background: ${isDark ? 'rgba(13, 30, 60, 0.6)' : 'rgba(255, 255, 255, 0.9)'};
  border: 1px solid ${isDark ? 'rgba(0, 212, 255, 0.2)' : 'rgba(0, 150, 255, 0.15)'};
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, ${color}, transparent);
    border-radius: 2px 0 0 2px;
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 212, 255, 0.15);
  }
`;

const iconWrapperStyle = (color: string) => css`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${color}22;
  border-radius: 12px;
  color: ${color};
`;

const contentStyle = css`
  flex: 1;
  min-width: 0;
`;

const valueStyle = (isDark: boolean) => css`
  display: block;
  font-size: 1.35rem;
  font-weight: 700;
  color: ${isDark ? '#fff' : '#1a1a2e'};
`;

const titleStyle = (isDark: boolean) => css`
  font-size: 0.85rem;
  color: ${isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)'};
`;

const changeStyle = (positive: boolean) => css`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${positive ? '#00e676' : '#ff6b6b'};
`;
