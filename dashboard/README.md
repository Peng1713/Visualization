# DataVision Pro - 智能数据可视化平台

一个基于 Next.js 的现代化数据可视化大屏系统，具有炫酷的 UI 设计和丰富的交互功能。

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **UI 组件**: Ant Design 5
- **图表库**: ECharts 5 + echarts-for-react
- **样式方案**: Emotion CSS-in-JS
- **状态管理**: Zustand
- **响应式**: 自适应手机 / 平板 / PC

## 功能特性

- 炫酷粒子动画登录页面
- 可视化数据大屏首页 (多种图表)
- 侧边栏 / 顶部导航栏切换
- 暗色 / 亮色主题切换
- 全屏模式
- 响应式布局 (移动端 Drawer 抽屉菜单)
- 路由权限控制预留
- 数字滚动动画
- 实时数据监控面板

## 快速开始

```bash
cd dashboard
npm install
npm run dev
```

打开 http://localhost:3000 查看效果。

默认账号: admin / admin123

## 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── login/             # 登录页
│   ├── dashboard/         # 仪表盘 (含子路由)
│   └── layout.tsx         # 根布局
├── components/
│   ├── layout/            # 布局组件 (Sidebar, Header, AppLayout)
│   ├── charts/            # ECharts 图表组件
│   ├── dashboard/         # 大屏专用组件
│   └── ThemeProvider.tsx  # 主题提供者
├── store/                 # Zustand 状态管理
├── hooks/                 # 自定义 Hooks
├── types/                 # TypeScript 类型
├── utils/                 # 工具函数 (路由配置, 主题)
└── styles/                # 全局样式
```
