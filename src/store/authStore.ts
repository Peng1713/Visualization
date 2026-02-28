import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserInfo {
  id: string;
  username: string;
  name: string;
  avatar?: string;
  roles?: string[];
  permissions?: string[];
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserInfo | null;
  token: string | null;
  login: (user: UserInfo, token: string) => void;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: (user, token) =>
        set({ isAuthenticated: true, user, token }),
      logout: () =>
        set({ isAuthenticated: false, user: null, token: null }),
      hasPermission: (permission) => {
        const { user } = get();
        if (!user?.permissions) return true;
        return user.permissions.includes(permission) || user.permissions.includes('*');
      },
      hasRole: (role) => {
        const { user } = get();
        if (!user?.roles) return true;
        return user.roles.includes(role) || user.roles.includes('admin');
      },
    }),
    { name: 'auth-storage' }
  )
);
