'use client';

import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useAppStore } from '@/store';

interface BarRaceData {
  name: string;
  value: number;
}

interface BarRaceChartProps {
  data?: BarRaceData[];
}

const defaultData: BarRaceData[] = [
  { name: '北京', value: 18203 },
  { name: '上海', value: 15780 },
  { name: '深圳', value: 14200 },
  { name: '广州', value: 12380 },
  { name: '杭州', value: 10950 },
  { name: '成都', value: 9530 },
  { name: '武汉', value: 8620 },
  { name: '南京', value: 7830 },
];

// const barColors = [
//   'linear-gradient(90deg, #1677ff, #00d4ff)',
//   'linear-gradient(90deg, #a855f7, #f093fb)',
//   'linear-gradient(90deg, #00ff88, #00d4ff)',
//   'linear-gradient(90deg, #ff6b35, #ffbe0b)',
//   'linear-gradient(90deg, #1677ff, #a855f7)',
//   'linear-gradient(90deg, #ff2d78, #ff6b35)',
//   'linear-gradient(90deg, #00d4ff, #00ff88)',
//   'linear-gradient(90deg, #ffbe0b, #ff6b35)',
// ];

export default function BarRaceChart({ data = defaultData }: BarRaceChartProps) {
  const themeMode = useAppStore((s) => s.themeMode);
  const textColor = themeMode === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';

  const sorted = useMemo(() => [...data].sort((a, b) => a.value - b.value), [data]);

  const option = useMemo(() => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: themeMode === 'dark' ? 'rgba(20,20,40,0.9)' : 'rgba(255,255,255,0.95)',
      borderColor: themeMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      textStyle: { color: themeMode === 'dark' ? '#fff' : '#333' },
    },
    grid: { top: 10, right: 60, bottom: 10, left: 80 },
    xAxis: {
      type: 'value',
      show: false,
    },
    yAxis: {
      type: 'category',
      data: sorted.map((d) => d.name),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: textColor, fontSize: 12 },
    },
    series: [
      {
        type: 'bar',
        data: sorted.map((d, i) => ({
          value: d.value,
          itemStyle: {
            borderRadius: [0, 12, 12, 0],
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 1, y2: 0,
              colorStops: [
                { offset: 0, color: ['#1677ff', '#a855f7', '#00d4ff', '#ff6b35', '#1677ff', '#ff2d78', '#00d4ff', '#ffbe0b'][i % 8] },
                { offset: 1, color: ['#00d4ff', '#f093fb', '#00ff88', '#ffbe0b', '#a855f7', '#ff6b35', '#00ff88', '#ff6b35'][i % 8] },
              ],
            },
          },
        })),
        barWidth: 14,
        label: {
          show: true,
          position: 'right',
          color: textColor,
          fontSize: 12,
          formatter: '{c}',
        },
        animationDuration: 1500,
        animationEasing: 'cubicOut',
      },
    ],
  }), [sorted, themeMode, textColor]);

  return (
    <ReactECharts
      option={option}
      style={{ height: '100%', width: '100%' }}
      opts={{ renderer: 'canvas' }}
    />
  );
}
