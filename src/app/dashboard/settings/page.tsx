'use client';

import { css } from '@emotion/react';
import { useLayoutStore } from '@/store/layoutStore';

export default function SettingsPage() {
  const themeMode = useLayoutStore((state) => state.themeMode);
  const isDark = themeMode === 'dark';

  return (
    <div css={containerStyle(isDark)}>
      <h1 css={titleStyle(isDark)}>系统设置</h1>
      <p css={subtitleStyle(isDark)}>设置功能开发中...</p>
    </div>
  );
}

const containerStyle = (isDark: boolean) => css`
  padding: 2rem;
`;

const titleStyle = (isDark: boolean) => css`
  color: ${isDark ? '#fff' : '#1a1a2e'};
  margin-bottom: 0.5rem;
`;

const subtitleStyle = (isDark: boolean) => css`
  color: ${isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)'};
`;
