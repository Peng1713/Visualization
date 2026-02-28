import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['antd', '@ant-design/icons', '@ant-design/cssinjs', 'echarts', 'echarts-for-react'],
  reactStrictMode: true,
};

export default nextConfig;
