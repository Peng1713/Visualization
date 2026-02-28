'use client';

import React from 'react';
import { css } from '@emotion/css';
import {
  DollarOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  RiseOutlined,
  ThunderboltOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { useAppStore } from '@/store';
import { useResponsive } from '@/hooks/useResponsive';
import type { ThemeMode } from '@/types';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ScrollTable from '@/components/dashboard/ScrollTable';
import RealTimeData from '@/components/dashboard/RealTimeData';
import LineAreaChart from '@/components/charts/LineAreaChart';
import BarRaceChart from '@/components/charts/BarRaceChart';
import PieRoseChart from '@/components/charts/PieRoseChart';
import RadarChart from '@/components/charts/RadarChart';
import WaterWaveChart from '@/components/charts/WaterWaveChart';
import MapScatterChart from '@/components/charts/MapScatterChart';

const getStyles = (themeMode: ThemeMode, isMobile: boolean) => ({
  page: css`
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    background: ${themeMode === 'dark'
      ? 'linear-gradient(180deg, #0a0a1a 0%, #0f0f23 50%, #0a0a1a 100%)'
      : 'linear-gradient(180deg, #f0f2f5 0%, #e6f0ff 50%, #f0f2f5 100%)'};
    padding-bottom: 24px;
  `,
  grid: css`
    display: grid;
    grid-template-columns: ${isMobile ? '1fr 1fr' : 'repeat(4, 1fr)'};
    gap: ${isMobile ? '12px' : '20px'};
    padding: ${isMobile ? '12px 16px' : '16px 24px'};
    animation: fadeIn 0.6s ease-out;
  `,
  chartGrid: css`
    display: grid;
    grid-template-columns: ${isMobile ? '1fr' : 'repeat(3, 1fr)'};
    gap: ${isMobile ? '12px' : '20px'};
    padding: ${isMobile ? '0 16px' : '0 24px'};
    margin-bottom: 20px;
    animation: fadeIn 0.8s ease-out;
  `,
  twoCol: css`
    display: grid;
    grid-template-columns: ${isMobile ? '1fr' : '2fr 1fr'};
    gap: ${isMobile ? '12px' : '20px'};
    padding: ${isMobile ? '0 16px' : '0 24px'};
    margin-bottom: 20px;
    animation: fadeIn 1s ease-out;
  `,
  threeCol: css`
    display: grid;
    grid-template-columns: ${isMobile ? '1fr' : 'repeat(3, 1fr)'};
    gap: ${isMobile ? '12px' : '20px'};
    padding: ${isMobile ? '0 16px' : '0 24px'};
    margin-bottom: 20px;
    animation: fadeIn 1.2s ease-out;
  `,
  waterWaveGrid: css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    height: 100%;
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  `,
  bottomGrid: css`
    display: grid;
    grid-template-columns: ${isMobile ? '1fr' : '1fr 1fr'};
    gap: ${isMobile ? '12px' : '20px'};
    padding: ${isMobile ? '0 16px' : '0 24px'};
    animation: fadeIn 1.4s ease-out;
  `,
});

const stats = [
  { icon: <DollarOutlined />, label: '总营收', value: 1285630, prefix: '¥', trend: 12.5, color: '#1677ff' },
  { icon: <UserOutlined />, label: '用户总量', value: 386729, trend: 8.2, color: '#a855f7' },
  { icon: <ShoppingCartOutlined />, label: '订单总数', value: 95832, trend: -2.1, color: '#00d4ff' },
  { icon: <RiseOutlined />, label: '转化率', value: 68, suffix: '%', trend: 5.7, color: '#00ff88' },
];

export default function DashboardPage() {
  const themeMode = useAppStore((s) => s.themeMode);
  const { isMobile } = useResponsive();
  const s = getStyles(themeMode, isMobile);

  return (
    <div className={s.page}>
      <DashboardHeader />

      <div className={s.grid}>
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className={s.twoCol}>
        <ChartCard title="营收趋势分析" extra="月度对比" height={360}>
          <LineAreaChart />
        </ChartCard>
        <ChartCard title="区域排行榜" extra="TOP 8" height={360}>
          <BarRaceChart />
        </ChartCard>
      </div>

      <div className={s.threeCol}>
        <ChartCard title="行业分布" extra="玫瑰图" height={340}>
          <PieRoseChart />
        </ChartCard>
        <ChartCard title="综合能力评估" extra="季度对比" height={340}>
          <RadarChart />
        </ChartCard>
        <ChartCard
          title="关键指标完成度"
          extra="实时"
          height={340}
        >
          <div className={s.waterWaveGrid}>
            <WaterWaveChart value={85} title="销售额" color="#1677ff" />
            <WaterWaveChart value={72} title="用户增长" color="#a855f7" />
            <WaterWaveChart value={91} title="满意度" color="#00d4ff" />
            <WaterWaveChart value={68} title="留存率" color="#00ff88" />
          </div>
        </ChartCard>
      </div>

      <div className={s.twoCol}>
        <ChartCard title="访问热力图" extra="7日数据" height={320}>
          <MapScatterChart />
        </ChartCard>
        <ChartCard title="实时监控" extra="动态" height={320}>
          <RealTimeData />
        </ChartCard>
      </div>

      <div className={s.bottomGrid}>
        <ChartCard title="实时交易动态" extra="自动滚动" height={380}>
          <ScrollTable />
        </ChartCard>
        <ChartCard title="多维数据分析" extra="趋势" height={380}>
          <LineAreaChart
            names={['销售额', '利润']}
            colors={['#00d4ff', '#ff6b35']}
            data={[
              [1200, 1400, 1100, 1600, 1800, 2100, 1950, 2300, 2500, 2200, 2700, 3000],
              [400, 520, 380, 600, 720, 850, 780, 920, 1050, 880, 1100, 1250],
            ]}
          />
        </ChartCard>
      </div>
    </div>
  );
}
