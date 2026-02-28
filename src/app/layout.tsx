import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "antd/dist/reset.css";
import { RootProvider } from "@/components/providers/root-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "智析可视化平台",
  description:
    "基于 Next.js + React + TypeScript + Ant Design + ECharts 的多端数据可视化系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={geistSans.variable}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
