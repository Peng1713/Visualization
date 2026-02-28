'use client';

import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

interface RadarChartProps {
  isDark: boolean;
}

export default function RadarChart({ isDark }: RadarChartProps) {
  const option = useMemo(
    () => ({
      tooltip: {
        backgroundColor: isDark ? 'rgba(13, 30, 60, 0.95)' : 'rgba(255,255,255,0.95)',
        borderColor: 'rgba(0, 212, 255, 0.5)',
        textStyle: { color: isDark ? '#fff' : '#333' },
      },
      radar: {
        indicator: [
          { name: '销售', max: 100 },
          { name: '管理', max: 100 },
          { name: '技术', max: 100 },
          { name: '客服', max: 100 },
          { name: '研发', max: 100 },
          { name: '市场', max: 100 },
        ],
        splitArea: {
          areaStyle: {
            color: isDark ? ['rgba(0, 212, 255, 0.05)', 'rgba(0, 212, 255, 0.02)'] : ['rgba(0, 150, 255, 0.05)', 'rgba(0, 150, 255, 0.02)'],
          },
        },
        axisLine: { lineStyle: { color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' } },
        splitLine: { lineStyle: { color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' } },
        axisName: { color: isDark ? 'rgba(255,255,255,0.8)' : '#666' },
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [85, 90, 75, 88, 92, 78],
              name: '综合指标',
              areaStyle: { color: 'rgba(0, 212, 255, 0.3)' },
              lineStyle: { color: '#00d4ff', width: 2 },
              itemStyle: { color: '#00d4ff' },
            },
          ],
        },
      ],
    }),
    [isDark]
  );

  return (
    <ReactECharts
      option={option}
      style={{ height: '100%', minHeight: 220 }}
      opts={{ renderer: 'canvas' }}
      notMerge
    />
  );
}
