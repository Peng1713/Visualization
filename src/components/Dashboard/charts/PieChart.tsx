'use client';

import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

interface PieChartProps {
  isDark: boolean;
}

export default function PieChart({ isDark }: PieChartProps) {
  const option = useMemo(
    () => ({
      tooltip: {
        trigger: 'item',
        backgroundColor: isDark ? 'rgba(13, 30, 60, 0.95)' : 'rgba(255,255,255,0.95)',
        borderColor: 'rgba(0, 212, 255, 0.5)',
        textStyle: { color: isDark ? '#fff' : '#333' },
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        textStyle: { color: isDark ? 'rgba(255,255,255,0.8)' : '#666', fontSize: 12 },
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['35%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 8,
            borderColor: isDark ? 'rgba(13, 30, 60, 0.8)' : '#fff',
            borderWidth: 2,
          },
          label: { show: false },
          emphasis: {
            label: { show: false },
            itemStyle: { scale: 1.05 },
          },
          data: [
            { value: 1048, name: '电子产品', itemStyle: { color: '#00d4ff' } },
            { value: 735, name: '服装鞋帽', itemStyle: { color: '#00e676' } },
            { value: 580, name: '家居生活', itemStyle: { color: '#ffab00' } },
            { value: 484, name: '食品饮料', itemStyle: { color: '#ff6b6b' } },
            { value: 300, name: '其他', itemStyle: { color: '#9c27b0' } },
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
