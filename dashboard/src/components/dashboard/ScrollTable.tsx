'use client';

import React, { useEffect, useState, useRef } from 'react';
import { css, keyframes } from '@emotion/css';
import { useAppStore } from '@/store';
import type { ThemeMode } from '@/types';

const scrollUp = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
`;

const getStyles = (themeMode: ThemeMode) => ({
  wrapper: css`
    height: 100%;
    overflow: hidden;
    position: relative;
  `,
  scrollContent: css`
    animation: ${scrollUp} 20s linear infinite;
    &:hover {
      animation-play-state: paused;
    }
  `,
  row: css`
    display: flex;
    align-items: center;
    padding: 10px 16px;
    border-bottom: 1px solid ${themeMode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'};
    transition: background 0.3s;
    &:hover {
      background: ${themeMode === 'dark' ? 'rgba(22, 119, 255, 0.06)' : 'rgba(22, 119, 255, 0.03)'};
    }
  `,
  rank: css`
    width: 28px;
    height: 28px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    margin-right: 12px;
    flex-shrink: 0;
  `,
  rank1: css`
    background: linear-gradient(135deg, #ff6b35, #ffbe0b);
    color: #fff;
  `,
  rank2: css`
    background: linear-gradient(135deg, #a855f7, #f093fb);
    color: #fff;
  `,
  rank3: css`
    background: linear-gradient(135deg, #1677ff, #00d4ff);
    color: #fff;
  `,
  rankOther: css`
    background: ${themeMode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'};
    color: ${themeMode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'};
  `,
  name: css`
    flex: 1;
    font-size: 13px;
    color: ${themeMode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  value: css`
    font-size: 13px;
    font-weight: 600;
    color: #1677ff;
    min-width: 60px;
    text-align: right;
  `,
  time: css`
    font-size: 11px;
    color: ${themeMode === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'};
    min-width: 50px;
    text-align: right;
    margin-left: 8px;
  `,
});

interface DataItem {
  name: string;
  value: string;
  time: string;
}

const mockData: DataItem[] = [
  { name: '华东区域 - 电商平台交易', value: '¥128.5万', time: '2分钟前' },
  { name: '华南区域 - 金融系统清算', value: '¥96.3万', time: '5分钟前' },
  { name: '华北区域 - 物流订单结算', value: '¥85.7万', time: '8分钟前' },
  { name: '西南区域 - 医疗数据同步', value: '¥72.1万', time: '12分钟前' },
  { name: '华中区域 - 教育平台续费', value: '¥63.8万', time: '15分钟前' },
  { name: '东北区域 - 能源监控系统', value: '¥58.2万', time: '18分钟前' },
  { name: '西北区域 - 农业大数据分析', value: '¥45.9万', time: '22分钟前' },
  { name: '港澳台 - 跨境电商结算', value: '¥42.3万', time: '25分钟前' },
  { name: '海外区域 - SaaS订阅收入', value: '¥38.7万', time: '30分钟前' },
  { name: '全国 - 广告投放收益', value: '¥35.1万', time: '32分钟前' },
];

export default function ScrollTable() {
  const themeMode = useAppStore((s) => s.themeMode);
  const s = getStyles(themeMode);

  const getRankClass = (i: number) => {
    if (i === 0) return s.rank1;
    if (i === 1) return s.rank2;
    if (i === 2) return s.rank3;
    return s.rankOther;
  };

  const doubledData = [...mockData, ...mockData];

  return (
    <div className={s.wrapper}>
      <div className={s.scrollContent}>
        {doubledData.map((item, i) => (
          <div key={i} className={s.row}>
            <div className={`${s.rank} ${getRankClass(i % mockData.length)}`}>
              {(i % mockData.length) + 1}
            </div>
            <div className={s.name}>{item.name}</div>
            <div className={s.value}>{item.value}</div>
            <div className={s.time}>{item.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
