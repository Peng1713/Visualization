'use client';

import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

interface LineChartProps {
  isDark: boolean;
}

export default function LineChart({ isDark }: LineChartProps) {
  const option = useMemo(
    () => ({
      tooltip: {
        trigger: 'axis',
        backgroundColor: isDark ? 'rgba(13, 30, 60, 0.95)' : 'rgba(255,255,255,0.95)',
        borderColor: 'rgba(0, 212, 255, 0.5)',
        textStyle: { color: isDark ? '#fff' : '#333' },
      },
      legend: {
        data: ['销售额', '订单量'],
        textStyle: { color: isDark ? 'rgba(255,255,255,0.8)' : '#666' },
        top: 0,
      },
      grid: { left: '3%', right: '4%', bottom: '3%', top: 40, containLabel: true },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisLine: { lineStyle: { color: isDark ? 'rgba(255,255,255,0.2)' : '#ddd' } },
        axisLabel: { color: isDark ? 'rgba(255,255,255,0.7)' : '#666' },
      },
      yAxis: [
        {
          type: 'value',
          axisLine: { show: false },
          splitLine: { lineStyle: { color: isDark ? 'rgba(255,255,255,0.08)' : '#eee' } },
          axisLabel: { color: isDark ? 'rgba(255,255,255,0.7)' : '#666' },
        },
        {
          type: 'value',
          axisLine: { show: false },
          splitLine: { show: false },
          axisLabel: { color: isDark ? 'rgba(255,255,255,0.7)' : '#666' },
        },
      ],
      series: [
        {
          name: '销售额',
          type: 'line',
          smooth: true,
          data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330],
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(0, 212, 255, 0.4)' },
                { offset: 1, color: 'rgba(0, 212, 255, 0.02)' },
              ],
            },
          },
          lineStyle: { color: '#00d4ff', width: 2 },
          itemStyle: { color: '#00d4ff' },
        },
        {
          name: '订单量',
          type: 'line',
          yAxisIndex: 1,
          smooth: true,
          data: [220, 182, 191, 234, 290, 330, 310, 201, 154, 190, 330, 410],
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(0, 230, 118, 0.4)' },
                { offset: 1, color: 'rgba(0, 230, 118, 0.02)' },
              ],
            },
          },
          lineStyle: { color: '#00e676', width: 2 },
          itemStyle: { color: '#00e676' },
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
