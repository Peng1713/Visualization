"use client";

import { Spin } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, type ReactNode } from "react";
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
  const searchParams = useSearchParams();

  const currentPath = useMemo(() => {
    const queryString = searchParams.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  }, [pathname, searchParams]);

  useEffect(() => {
    if (hydrated && !user) {
      const encodedPath = encodeURIComponent(currentPath);
      router.replace(`/login?redirect=${encodedPath}`);
    }
  }, [currentPath, hydrated, router, user]);

  if (!hydrated || !user) {
    return <FullPageLoading />;
  }

  return <>{children}</>;
};
