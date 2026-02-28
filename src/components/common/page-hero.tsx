import { Card, Space, Tag, Typography } from "antd";

const { Title, Text } = Typography;

interface PageHeroProps {
  title: string;
  description: string;
  tags?: string[];
}

export const PageHero = ({ title, description, tags = [] }: PageHeroProps) => (
  <Card
    style={{
      marginBottom: 12,
      borderRadius: 12,
      background:
        "linear-gradient(90deg, rgba(47,136,255,0.14), rgba(95,215,196,0.08))",
      border: "1px solid rgba(138, 152, 177, 0.25)",
    }}
  >
    <Title level={4} style={{ marginBottom: 6 }}>
      {title}
    </Title>
    <Text type="secondary">{description}</Text>
    {tags.length > 0 && (
      <Space style={{ marginTop: 10 }} wrap>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Space>
    )}
  </Card>
);
