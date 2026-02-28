"use client";

import { Spin } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";
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
  const [redirecting, setRedirecting] = useState(false);

  const currentPath = useMemo(() => {
    const queryString = searchParams.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    if (!user) {
      setRedirecting(true);
      const encodedPath = encodeURIComponent(currentPath);
      router.replace(`/login?redirect=${encodedPath}`);
      return;
    }
    setRedirecting(false);
  }, [currentPath, hydrated, router, user]);

  if (!hydrated || !user || redirecting) {
    return <FullPageLoading />;
  }

  return <>{children}</>;
};
