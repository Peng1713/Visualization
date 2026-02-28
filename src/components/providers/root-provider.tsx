"use client";

import { App as AntdApp, ConfigProvider, theme, type ThemeConfig } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import zhCN from "antd/locale/zh_CN";
import { useEffect, useMemo, type ReactNode } from "react";
import { AppContextProvider, useAppContext } from "@/contexts/app-context";

const InnerProviders = ({ children }: { children: ReactNode }) => {
  const { themeMode } = useAppContext();

  const themeConfig = useMemo<ThemeConfig>(
    () => ({
      algorithm:
        themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        colorPrimary: "#2f88ff",
        borderRadius: 10,
      },
    }),
    [themeMode],
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  return (
    <AntdRegistry>
      <ConfigProvider locale={zhCN} theme={themeConfig}>
        <AntdApp>{children}</AntdApp>
      </ConfigProvider>
    </AntdRegistry>
  );
};

export const RootProvider = ({ children }: { children: ReactNode }) => (
  <AppContextProvider>
    <InnerProviders>{children}</InnerProviders>
  </AppContextProvider>
);
