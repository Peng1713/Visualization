'use client';

import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useAppStore } from '@/store';

const HOURS = Array.from({ length: 24 }, (_, i) => `${i}:00`);
const DAYS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

export default function MapScatterChart() {
  const themeMode = useAppStore((s) => s.themeMode);
  const textColor = themeMode === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';

  const heatData = useMemo(() => {
    const data: [number, number, number][] = [];
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 24; j++) {
        data.push([j, i, ((i * 24 + j) * 17 + 13) % 101]);
      }
    }
    return data;
  }, []);

  const option = useMemo(() => ({
    tooltip: {
      position: 'top',
      backgroundColor: themeMode === 'dark' ? 'rgba(20,20,40,0.9)' : 'rgba(255,255,255,0.95)',
      borderColor: themeMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      textStyle: { color: themeMode === 'dark' ? '#fff' : '#333' },
      formatter: (p: { value: number[] }) => `${DAYS[p.value[1]]} ${HOURS[p.value[0]]}<br/>访问量: ${p.value[2]}`,
    },
    grid: { top: 10, right: 10, bottom: 40, left: 50 },
    xAxis: {
      type: 'category',
      data: HOURS,
      axisLabel: { color: textColor, fontSize: 10 },
      axisLine: { show: false },
      axisTick: { show: false },
      splitArea: { show: false },
    },
    yAxis: {
      type: 'category',
      data: DAYS,
      axisLabel: { color: textColor, fontSize: 11 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: false,
      orient: 'horizontal',
      left: 'center',
      bottom: 0,
      itemWidth: 10,
      itemHeight: 80,
      textStyle: { color: textColor, fontSize: 10 },
      inRange: {
        color: themeMode === 'dark'
          ? ['#0a0a1a', '#1a1a35', '#1677ff', '#00d4ff', '#00ff88']
          : ['#f0f2f5', '#e6f4ff', '#1677ff', '#00d4ff', '#00ff88'],
      },
    },
    series: [
      {
        type: 'heatmap',
        data: heatData,
        label: { show: false },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        itemStyle: {
          borderRadius: 3,
          borderColor: themeMode === 'dark' ? '#0a0a1a' : '#f0f2f5',
          borderWidth: 2,
        },
      },
    ],
  }), [themeMode, textColor, heatData]);

  return (
    <ReactECharts
      option={option}
      style={{ height: '100%', width: '100%' }}
      opts={{ renderer: 'canvas' }}
    />
  );
}
