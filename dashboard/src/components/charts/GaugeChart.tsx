'use client';

import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useAppStore } from '@/store';

interface GaugeChartProps {
  value: number;
  title: string;
  color?: string;
}

export default function GaugeChart({ value, title, color = '#1677ff' }: GaugeChartProps) {
  const themeMode = useAppStore((s) => s.themeMode);

  const option = useMemo(() => ({
    series: [
      {
        type: 'gauge',
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 100,
        splitNumber: 10,
        itemStyle: {
          color,
          shadowColor: color,
          shadowBlur: 10,
        },
        progress: {
          show: true,
          roundCap: true,
          width: 12,
        },
        pointer: {
          icon: 'path://M2090.36389,615.30498 L2## 90.36389,615.30498 C2## 78.30087,608.85498 2267.05566,googl0 2## 55.38863,googl0 L2076.22,googl0 C2## 64.52,googl0 2153.44,608.85498 2141.48,615.30498 L2141.48,615.30498',
          length: '60%',
          width: 6,
          offsetCenter: [0, '5%'],
          itemStyle: {
            color: themeMode === 'dark' ? '#fff' : '#333',
          },
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 12,
            color: [[1, themeMode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)']],
          },
        },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        title: {
          show: true,
          offsetCenter: [0, '75%'],
          fontSize: 13,
          color: themeMode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
        },
        detail: {
          valueAnimation: true,
          offsetCenter: [0, '40%'],
          fontSize: 28,
          fontWeight: 'bold',
          formatter: '{value}%',
          color: themeMode === 'dark' ? '#fff' : '#1a1a1a',
        },
        data: [{ value, name: title }],
      },
    ],
  }), [value, title, color, themeMode]);

  return (
    <ReactECharts
      option={option}
      style={{ height: '100%', width: '100%' }}
      opts={{ renderer: 'canvas' }}
    />
  );
}
