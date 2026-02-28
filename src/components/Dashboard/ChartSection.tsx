'use client';

import { css } from '@emotion/react';
import ChartCard from './ChartCard';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import PieChart from './charts/PieChart';
import RadarChart from './charts/RadarChart';

interface ChartSectionProps {
  isDark: boolean;
}

export default function ChartSection({ isDark }: ChartSectionProps) {
  return (
    <div css={gridStyle}>
      <ChartCard title="销售趋势" isDark={isDark} span={2}>
        <LineChart isDark={isDark} />
      </ChartCard>
      <ChartCard title="品类分布" isDark={isDark}>
        <PieChart isDark={isDark} />
      </ChartCard>
      <ChartCard title="区域对比" isDark={isDark} span={2}>
        <BarChart isDark={isDark} />
      </ChartCard>
      <ChartCard title="能力雷达" isDark={isDark}>
        <RadarChart isDark={isDark} />
      </ChartCard>
    </div>
  );
}

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
