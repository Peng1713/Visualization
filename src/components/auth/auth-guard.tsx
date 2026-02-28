"use client";

import { Spin } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAppContext } from "@/contexts/app-context";

const FullPageLoading = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      background: "var(--app-bg)",
    }}
  >
    <Spin size="large" tip="正在校验登录状态..." />
  </div>
);

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { hydrated, user } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (hydrated && !user) {
      const encodedPath = encodeURIComponent(pathname);
      router.replace(`/login?redirect=${encodedPath}`);
    }
  }, [hydrated, pathname, router, user]);

  if (!hydrated || !user) {
    return <FullPageLoading />;
  }

  return <>{children}</>;
};
