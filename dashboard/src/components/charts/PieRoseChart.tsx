'use client';

import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useAppStore } from '@/store';

interface PieData {
  name: string;
  value: number;
}

interface PieRoseChartProps {
  data?: PieData[];
}

const defaultData: PieData[] = [
  { name: '电子商务', value: 40 },
  { name: '金融科技', value: 28 },
  { name: '教育培训', value: 20 },
  { name: '医疗健康', value: 18 },
  { name: '物流运输', value: 15 },
  { name: '其他行业', value: 12 },
];

const pieColors = ['#1677ff', '#a855f7', '#00d4ff', '#00ff88', '#ff6b35', '#ffbe0b'];

export default function PieRoseChart({ data = defaultData }: PieRoseChartProps) {
  const themeMode = useAppStore((s) => s.themeMode);

  const option = useMemo(() => ({
    tooltip: {
      trigger: 'item',
      backgroundColor: themeMode === 'dark' ? 'rgba(20,20,40,0.9)' : 'rgba(255,255,255,0.95)',
      borderColor: themeMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      textStyle: { color: themeMode === 'dark' ? '#fff' : '#333' },
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      bottom: 0,
      textStyle: {
        color: themeMode === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
        fontSize: 11,
      },
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 12,
    },
    series: [
      {
        type: 'pie',
        radius: ['25%', '65%'],
        center: ['50%', '45%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 6,
          borderColor: themeMode === 'dark' ? '#1a1a2e' : '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          color: themeMode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
          fontSize: 11,
        },
        emphasis: {
          label: { show: true, fontSize: 14, fontWeight: 'bold' },
          itemStyle: {
            shadowBlur: 20,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
          },
        },
        data: data.map((d, i) => ({
          ...d,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: pieColors[i % pieColors.length] },
                { offset: 1, color: pieColors[i % pieColors.length] + '80' },
              ],
            },
          },
        })),
      },
    ],
  }), [data, themeMode]);

  return (
    <ReactECharts
      option={option}
      style={{ height: '100%', width: '100%' }}
      opts={{ renderer: 'canvas' }}
    />
  );
}
