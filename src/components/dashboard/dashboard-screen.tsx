"use client";

import { css, keyframes } from "@emotion/css";
import { Card, Col, List, Progress, Row, Space, Statistic, Tag, Typography } from "antd";
import dynamic from "next/dynamic";
import type { EChartsOption } from "echarts";
import { useMemo } from "react";
import { useAppContext } from "@/contexts/app-context";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });
const { Title, Text } = Typography;

const glow = keyframes`
  0% { box-shadow: 0 0 0 rgba(32, 196, 255, 0.35); }
  50% { box-shadow: 0 0 24px rgba(32, 196, 255, 0.45); }
  100% { box-shadow: 0 0 0 rgba(32, 196, 255, 0.35); }
`;

const wrapClassName = css`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  padding: 14px;
  min-height: calc(100vh - 96px);
  background:
    radial-gradient(circle at 8% 0%, rgba(47, 136, 255, 0.2), transparent 40%),
    radial-gradient(circle at 92% 0%, rgba(19, 194, 194, 0.16), transparent 40%),
    var(--app-surface);
`;

const titleBarClassName = css`
  margin-bottom: 14px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid rgba(120, 154, 210, 0.25);
  background: linear-gradient(100deg, rgba(47, 136, 255, 0.15), rgba(95, 215, 196, 0.1));
  animation: ${glow} 3s ease-in-out infinite;
`;

const panelClassName = css`
  border: 1px solid rgba(138, 152, 177, 0.22);
  border-radius: 14px;
  backdrop-filter: blur(6px);
`;

const metricCardClassName = css`
  border-radius: 12px;
  border: 1px solid rgba(138, 152, 177, 0.25);
`;

const alertRows = [
  { level: "高", area: "A1 网关", event: "流量抖动", color: "red" },
  { level: "中", area: "B2 集群", event: "负载偏高", color: "orange" },
  { level: "低", area: "C4 服务", event: "响应延迟", color: "blue" },
  { level: "中", area: "D3 网络", event: "丢包上升", color: "gold" },
];

export const DashboardScreen = () => {
  const { themeMode } = useAppContext();
  const isDark = themeMode === "dark";
  const textColor = isDark ? "#dfe7ff" : "#24324f";
  const splitLineColor = isDark ? "rgba(187, 204, 255, 0.12)" : "rgba(36, 50, 79, 0.1)";

  const trendOption = useMemo<EChartsOption>(
    () => ({
      tooltip: { trigger: "axis" },
      grid: { left: 34, right: 22, top: 32, bottom: 24 },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"],
        axisLabel: { color: textColor },
        axisLine: { lineStyle: { color: splitLineColor } },
      },
      yAxis: {
        type: "value",
        axisLabel: { color: textColor },
        splitLine: { lineStyle: { color: splitLineColor } },
      },
      series: [
        {
          name: "实时吞吐",
          type: "line",
          smooth: true,
          symbol: "none",
          data: [1220, 1380, 1710, 1630, 1890, 2240, 2100],
          lineStyle: { width: 3, color: "#3f92ff" },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "rgba(63,146,255,0.5)" },
                { offset: 1, color: "rgba(63,146,255,0.05)" },
              ],
            },
          },
        },
      ],
    }),
    [splitLineColor, textColor],
  );

  const regionOption = useMemo<EChartsOption>(
    () => ({
      tooltip: { trigger: "axis" },
      grid: { left: 28, right: 18, top: 24, bottom: 20, containLabel: true },
      xAxis: {
        type: "value",
        axisLabel: { color: textColor },
        splitLine: { lineStyle: { color: splitLineColor } },
      },
      yAxis: {
        type: "category",
        axisLabel: { color: textColor },
        data: ["华东", "华南", "华北", "西南", "海外"],
      },
      series: [
        {
          type: "bar",
          data: [92, 84, 73, 68, 55],
          barWidth: 14,
          itemStyle: {
            borderRadius: [0, 8, 8, 0],
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: "#13c2c2" },
                { offset: 1, color: "#69b1ff" },
              ],
            },
          },
        },
      ],
    }),
    [splitLineColor, textColor],
  );

  const sourceOption = useMemo<EChartsOption>(
    () => ({
      tooltip: { trigger: "item" },
      legend: {
        bottom: 0,
        textStyle: { color: textColor },
      },
      series: [
        {
          name: "来源占比",
          type: "pie",
          radius: ["45%", "70%"],
          center: ["50%", "44%"],
          avoidLabelOverlap: false,
          label: { show: false },
          itemStyle: { borderRadius: 6, borderColor: "transparent", borderWidth: 2 },
          data: [
            { value: 40, name: "API" },
            { value: 24, name: "IoT" },
            { value: 18, name: "日志" },
            { value: 12, name: "文件流" },
            { value: 6, name: "其他" },
          ],
        },
      ],
    }),
    [textColor],
  );

  const qualityOption = useMemo<EChartsOption>(
    () => ({
      series: [
        {
          type: "gauge",
          center: ["50%", "54%"],
          radius: "90%",
          progress: { show: true, width: 18 },
          axisLine: { lineStyle: { width: 18 } },
          pointer: { itemStyle: { color: "#36cfc9" } },
          axisTick: { show: false },
          splitLine: { length: 10, lineStyle: { color: splitLineColor, width: 2 } },
          axisLabel: { color: textColor, distance: 24 },
          detail: {
            valueAnimation: true,
            formatter: "{value}%",
            color: textColor,
            fontSize: 22,
            offsetCenter: [0, "58%"],
          },
          data: [{ value: 93, name: "健康度" }],
          title: { offsetCenter: [0, "82%"], color: textColor },
        },
      ],
    }),
    [splitLineColor, textColor],
  );

  return (
    <div className={wrapClassName}>
      <div className={titleBarClassName}>
        <Space align="center" style={{ justifyContent: "space-between", width: "100%" }} wrap>
          <div>
            <Title level={3} style={{ margin: 0 }}>
              未来城市运行态势大屏
            </Title>
            <Text type="secondary">实时融合业务、设备与链路指标，支撑多端统一决策</Text>
          </div>
          <Space>
            <Tag color="processing">实时刷新</Tag>
            <Tag color="purple">多维分析</Tag>
            <Tag color="cyan">多端适配</Tag>
          </Space>
        </Space>
      </div>

      <Row gutter={[12, 12]} style={{ marginBottom: 4 }}>
        <Col xs={12} md={6}>
          <Card className={metricCardClassName}>
            <Statistic title="在线节点" value={2345} suffix="个" />
            <Progress percent={86} size="small" showInfo={false} strokeColor="#2f88ff" />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card className={metricCardClassName}>
            <Statistic title="今日事件" value={89123} suffix="条" />
            <Progress percent={72} size="small" showInfo={false} strokeColor="#13c2c2" />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card className={metricCardClassName}>
            <Statistic title="平均延迟" value={47} suffix="ms" />
            <Progress percent={65} size="small" showInfo={false} strokeColor="#95de64" />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card className={metricCardClassName}>
            <Statistic title="告警收敛率" value={96.4} suffix="%" precision={1} />
            <Progress percent={96.4} size="small" showInfo={false} strokeColor="#36cfc9" />
          </Card>
        </Col>
      </Row>

      <Row gutter={[12, 12]}>
        <Col xs={24} xl={14}>
          <Card className={panelClassName} title="流量趋势（小时）">
            <ReactECharts option={trendOption} style={{ height: 290 }} />
          </Card>
        </Col>
        <Col xs={24} xl={10}>
          <Card className={panelClassName} title="数据来源占比">
            <ReactECharts option={sourceOption} style={{ height: 290 }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[12, 12]} style={{ marginTop: 2 }}>
        <Col xs={24} xl={10}>
          <Card className={panelClassName} title="区域活跃度">
            <ReactECharts option={regionOption} style={{ height: 250 }} />
          </Card>
        </Col>
        <Col xs={24} xl={7}>
          <Card className={panelClassName} title="平台健康指数">
            <ReactECharts option={qualityOption} style={{ height: 250 }} />
          </Card>
        </Col>
        <Col xs={24} xl={7}>
          <Card className={panelClassName} title="最新告警">
            <List
              dataSource={alertRows}
              renderItem={(item) => (
                <List.Item>
                  <Space direction="vertical" size={1}>
                    <Space>
                      <Tag color={item.color}>{item.level}</Tag>
                      <Text strong>{item.area}</Text>
                    </Space>
                    <Text type="secondary">{item.event}</Text>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
