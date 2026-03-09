"use client";

/**
 * useBackendFetch
 *
 * A client-side hook that calls the Zentavos backend API via the
 * Next.js rewrite proxy (/api/backend/*).  It automatically attaches
 * the staff member's backendToken from the NextAuth session so every
 * request is authenticated.
 *
 * Usage:
 *   const fetchBackend = useBackendFetch();
 *   const data = await fetchBackend<MyType>("/clients");
 *   const created = await fetchBackend<MyType>("/clients", {
 *     method: "POST",
 *     body: JSON.stringify({ name: "Acme Corp" }),
 *   });
 */

import { useSession } from "next-auth/react";
import { useCallback } from "react";

export function useBackendFetch() {
  const { data: session } = useSession();

  const fetchBackend = useCallback(
    async <T = unknown>(path: string, options: RequestInit = {}): Promise<T> => {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
      };

      // Attach the backend JWT when available
      const token = (session?.user as { backendToken?: string })?.backendToken;
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`/api/backend${path}`, {
        ...options,
        headers,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Backend error ${res.status}: ${text}`);
      }

      return res.json() as Promise<T>;
    },
    [session?.user]
  );

  return fetchBackend;
}

export default useBackendFetch;
