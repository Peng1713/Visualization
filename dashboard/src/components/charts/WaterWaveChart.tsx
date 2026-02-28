'use client';

import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useAppStore } from '@/store';

interface WaterWaveProps {
  value: number;
  title: string;
  color?: string;
}

export default function WaterWaveChart({ value, title, color = '#1677ff' }: WaterWaveProps) {
  const themeMode = useAppStore((s) => s.themeMode);

  const option = useMemo(() => ({
    series: [
      {
        type: 'pie',
        radius: ['75%', '80%'],
        center: ['50%', '50%'],
        startAngle: 90,
        data: [
          {
            value,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 1, y2: 0,
                colorStops: [
                  { offset: 0, color },
                  { offset: 1, color: color + 'cc' },
                ],
              },
              borderRadius: 20,
            },
          },
          {
            value: 100 - value,
            itemStyle: {
              color: themeMode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
            },
          },
        ],
        label: { show: false },
        emphasis: { scale: false },
        animation: true,
        animationDuration: 2000,
      },
    ],
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: '40%',
        style: {
          text: `${value}%`,
          fill: themeMode === 'dark' ? '#fff' : '#1a1a1a',
          fontSize: 26,
          fontWeight: 'bold',
          textAlign: 'center',
        },
      },
      {
        type: 'text',
        left: 'center',
        top: '58%',
        style: {
          text: title,
          fill: themeMode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
          fontSize: 12,
          textAlign: 'center',
        },
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
