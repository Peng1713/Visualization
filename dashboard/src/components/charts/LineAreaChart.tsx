'use client';

import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useAppStore } from '@/store';

interface LineAreaChartProps {
  data?: number[][];
  categories?: string[];
  names?: string[];
  colors?: string[];
}

const defaultCategories = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
const defaultData = [
  [820, 932, 901, 1234, 1290, 1330, 1320, 1520, 1610, 1780, 1920, 2100],
  [620, 732, 701, 934, 1090, 1130, 1120, 1320, 1410, 1580, 1720, 1900],
];

export default function LineAreaChart({
  data = defaultData,
  categories = defaultCategories,
  names = ['本年', '去年'],
  colors = ['#1677ff', '#a855f7'],
}: LineAreaChartProps) {
  const themeMode = useAppStore((s) => s.themeMode);
  const textColor = themeMode === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  const gridColor = themeMode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  const option = useMemo(() => ({
    tooltip: {
      trigger: 'axis',
      backgroundColor: themeMode === 'dark' ? 'rgba(20,20,40,0.9)' : 'rgba(255,255,255,0.95)',
      borderColor: themeMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      textStyle: { color: themeMode === 'dark' ? '#fff' : '#333' },
    },
    legend: {
      top: 0,
      right: 10,
      textStyle: { color: textColor, fontSize: 12 },
      data: names,
    },
    grid: { top: 40, right: 20, bottom: 30, left: 50 },
    xAxis: {
      type: 'category',
      data: categories,
      axisLine: { lineStyle: { color: gridColor } },
      axisLabel: { color: textColor, fontSize: 11 },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: gridColor, type: 'dashed' } },
      axisLabel: { color: textColor, fontSize: 11 },
    },
    series: data.map((d, i) => ({
      name: names[i],
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      showSymbol: false,
      lineStyle: { width: 2.5, color: colors[i] },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: colors[i] + '40' },
            { offset: 1, color: colors[i] + '05' },
          ],
        },
      },
      itemStyle: { color: colors[i] },
      data: d,
    })),
  }), [data, categories, names, colors, themeMode, textColor, gridColor]);

  return (
    <ReactECharts
      option={option}
      style={{ height: '100%', width: '100%' }}
      opts={{ renderer: 'canvas' }}
    />
  );
}
