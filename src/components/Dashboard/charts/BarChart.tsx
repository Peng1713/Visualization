'use client';

import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

interface BarChartProps {
  isDark: boolean;
}

export default function BarChart({ isDark }: BarChartProps) {
  const option = useMemo(
    () => ({
      tooltip: {
        trigger: 'axis',
        backgroundColor: isDark ? 'rgba(13, 30, 60, 0.95)' : 'rgba(255,255,255,0.95)',
        borderColor: 'rgba(0, 212, 255, 0.5)',
        textStyle: { color: isDark ? '#fff' : '#333' },
      },
      grid: { left: '3%', right: '4%', bottom: '3%', top: 20, containLabel: true },
      xAxis: {
        type: 'category',
        data: ['华东', '华南', '华北', '西南', '西北', '东北', '华中'],
        axisLine: { lineStyle: { color: isDark ? 'rgba(255,255,255,0.2)' : '#ddd' } },
        axisLabel: {
          color: isDark ? 'rgba(255,255,255,0.7)' : '#666',
          rotate: 0,
        },
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        splitLine: { lineStyle: { color: isDark ? 'rgba(255,255,255,0.08)' : '#eee' } },
        axisLabel: { color: isDark ? 'rgba(255,255,255,0.7)' : '#666' },
      },
      series: [
        {
          type: 'bar',
          data: [320, 302, 301, 334, 390, 330, 320],
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#00d4ff' },
                { offset: 1, color: 'rgba(0, 212, 255, 0.4)' },
              ],
            },
            borderRadius: [4, 4, 0, 0],
          },
          barWidth: '45%',
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
