'use client';

import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useAppStore } from '@/store';

export default function RadarChart() {
  const themeMode = useAppStore((s) => s.themeMode);
  const textColor = themeMode === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';

  const option = useMemo(() => ({
    tooltip: {
      backgroundColor: themeMode === 'dark' ? 'rgba(20,20,40,0.9)' : 'rgba(255,255,255,0.95)',
      borderColor: themeMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      textStyle: { color: themeMode === 'dark' ? '#fff' : '#333' },
    },
    radar: {
      indicator: [
        { name: '销售额', max: 100 },
        { name: '用户量', max: 100 },
        { name: '转化率', max: 100 },
        { name: '满意度', max: 100 },
        { name: '活跃度', max: 100 },
        { name: '留存率', max: 100 },
      ],
      shape: 'polygon',
      axisName: { color: textColor, fontSize: 11 },
      splitArea: {
        areaStyle: {
          color: themeMode === 'dark'
            ? ['rgba(22, 119, 255, 0.02)', 'rgba(22, 119, 255, 0.05)']
            : ['rgba(22, 119, 255, 0.01)', 'rgba(22, 119, 255, 0.03)'],
        },
      },
      axisLine: { lineStyle: { color: themeMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' } },
      splitLine: { lineStyle: { color: themeMode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' } },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [85, 90, 78, 95, 88, 82],
            name: '本季度',
            lineStyle: { color: '#1677ff', width: 2 },
            areaStyle: { color: 'rgba(22, 119, 255, 0.2)' },
            itemStyle: { color: '#1677ff' },
          },
          {
            value: [70, 75, 68, 82, 78, 72],
            name: '上季度',
            lineStyle: { color: '#a855f7', width: 2 },
            areaStyle: { color: 'rgba(168, 85, 247, 0.15)' },
            itemStyle: { color: '#a855f7' },
          },
        ],
      },
    ],
    legend: {
      bottom: 0,
      textStyle: { color: textColor, fontSize: 11 },
    },
  }), [themeMode, textColor]);

  return (
    <ReactECharts
      option={option}
      style={{ height: '100%', width: '100%' }}
      opts={{ renderer: 'canvas' }}
    />
  );
}
