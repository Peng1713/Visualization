# 智析可视化平台（Visualization Control Center）

基于 **Next.js + React + TypeScript + Ant Design + ECharts + Emotion CSS** 的数据可视化系统模板。

## 特性

- 炫酷登录页（动态渐变背景 + 毛玻璃卡片）
- 登录后管理台布局（可切换 **侧边导航 / 顶部导航**）
- 全局主题切换（**浅色 / 深色**）
- 首页可视化大屏（趋势、占比、区域、告警、健康指数）
- 兼容手机 / 平板 / PC（响应式布局）
- 路由预留权限控制（角色权限码映射，可替换为后端接口返回）

## 快速开始

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)

## 登录说明（演示）

- 账号：任意
- 密码：至少 6 位
- 可选角色：
  - `admin`：全部权限
  - `analyst`：无系统设置权限
  - `viewer`：仅大屏与监控

## 目录结构

```text
src/
  app/
    login/                      # 登录页
    (protected)/                # 受保护路由
      dashboard/                # 可视化大屏首页
      analysis/                 # 业务分析占位
      monitor/                  # 实时监控占位
      settings/                 # 设置与权限预留
  components/
    auth/                       # 鉴权守卫
    layout/                     # 主布局壳
    dashboard/                  # 大屏组件
  contexts/
    app-context.tsx             # 登录态/主题/布局全局状态
  config/
    routes.tsx                  # 路由+权限配置
```
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
