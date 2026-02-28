import { Card, Col, Progress, Row, Statistic, Table } from "antd";
import { PageHero } from "@/components/common/page-hero";

const topRows = [
  { key: "1", name: "转化率", value: "18.2%", trend: "+1.3%" },
  { key: "2", name: "活跃用户", value: "52,901", trend: "+8.1%" },
  { key: "3", name: "留存率", value: "61.7%", trend: "+2.4%" },
];

export default function AnalysisPage() {
  return (
    <>
      <PageHero
        title="业务分析中心"
        description="用于承接未来 BI API、权限控制与看板配置返回，当前为高保真占位页。"
        tags={["钻取分析", "数据订阅", "权限预留"]}
      />

      <Row gutter={[12, 12]}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="本周线索" value={12932} />
            <Progress percent={72} showInfo={false} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="成交金额" value={387.5} suffix="万" precision={1} />
            <Progress percent={66} showInfo={false} strokeColor="#13c2c2" />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="复购率" value={31.4} suffix="%" precision={1} />
            <Progress percent={81} showInfo={false} strokeColor="#95de64" />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 12 }} title="核心指标总览">
        <Table
          pagination={false}
          dataSource={topRows}
          columns={[
            { title: "指标", dataIndex: "name" },
            { title: "当前值", dataIndex: "value" },
            { title: "环比趋势", dataIndex: "trend" },
          ]}
        />
      </Card>
    </>
  );
}
