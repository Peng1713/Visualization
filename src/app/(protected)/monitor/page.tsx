"use client";

import { Badge, Card, Col, List, Row, Space, Tag, Typography } from "antd";
import { PageHero } from "@/components/common/page-hero";

const { Text } = Typography;

const serviceRows = [
  { name: "Gateway API", latency: "42ms", status: "success" as const },
  { name: "Order Engine", latency: "58ms", status: "success" as const },
  { name: "Search Service", latency: "95ms", status: "warning" as const },
  { name: "Message Queue", latency: "132ms", status: "warning" as const },
];

export default function MonitorPage() {
  return (
    <>
      <PageHero
        title="实时监控中心"
        description="用于承接未来链路监控接口、告警策略接口及分级权限配置。"
        tags={["链路健康", "告警收敛", "接口预留"]}
      />

      <Row gutter={[12, 12]}>
        <Col xs={24} lg={14}>
          <Card title="服务健康状态">
            <List
              dataSource={serviceRows}
              renderItem={(item) => (
                <List.Item>
                  <Space style={{ width: "100%", justifyContent: "space-between" }}>
                    <Space>
                      <Badge status={item.status} />
                      <Text>{item.name}</Text>
                    </Space>
                    <Tag color={item.status === "success" ? "green" : "orange"}>
                      {item.latency}
                    </Tag>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="告警摘要">
            <List
              dataSource={[
                "10:10 A1 区域网关延迟波动",
                "09:42 B2 集群 CPU 峰值预警",
                "09:15 D3 链路丢包轻微上升",
              ]}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
