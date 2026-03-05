"use client";

import { useSession, signOut as nextAuthSignOut } from "next-auth/react";
import {
  sessionRoleToAppRoles,
  isStaff as checkIsStaff,
  isManagerOrAbove as checkIsManagerOrAbove,
  isDirectorOrAbove as checkIsDirectorOrAbove,
  type AppRole,
} from "@/lib/permissions";

/**
 * Compatibility hook that provides a useAuth()-like interface over NextAuth session.
 * Mirrors the API from the source Supabase-based AuthContext.
 */
export function useDashboardAuth() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const user = session?.user
    ? {
        id: session.user.id,
        email: session.user.email ?? "",
      }
    : null;

  // Build a minimal profile from session data
  const profile = session?.user
    ? {
        full_name: session.user.name ?? "",
        avatar_url: session.user.image ?? null,
        phone: null as string | null,
        company_name: null as string | null,
        created_at: null as string | null,
      }
    : null;

  const roles: AppRole[] = session?.user?.role
    ? sessionRoleToAppRoles(session.user.role)
    : [];

  const isStaff = () => checkIsStaff(roles);
  const isManagerOrAbove = () => checkIsManagerOrAbove(roles);
  const isDirectorOrAbove = () => checkIsDirectorOrAbove(roles);

  const signOut = async () => {
    await nextAuthSignOut({ callbackUrl: "/" });
  };

  return {
    user,
    profile,
    roles,
    loading,
    isStaff,
    isManagerOrAbove,
    isDirectorOrAbove,
    signOut,
  };
}
