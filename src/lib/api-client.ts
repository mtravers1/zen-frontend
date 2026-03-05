/**
 * Server-side API client for calling the zentavos-backend.
 * Pass the NextAuth session to automatically attach the backend JWT.
 *
 * Usage (in a Next.js Server Component or API route):
 *   import { auth } from "@/auth";
 *   import { apiClient } from "@/lib/api-client";
 *
 *   const session = await auth();
 *   const data = await apiClient(session, "/api/account");
 */

import type { Session } from "next-auth";

const API_URL = process.env.API_URL;

export async function apiClient<T = unknown>(
  session: Session | null,
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (session?.user?.backendToken) {
    headers["Authorization"] = `Bearer ${session.user.backendToken}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Backend error ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>;
}

/**
 * Client-side fetch helper that calls Next.js rewrite routes (/api/backend/*).
 * The token is handled server-side by the rewrite — do NOT pass it here.
 *
 * Usage (in a Client Component):
 *   import { backendFetch } from "@/lib/api-client";
 *   const data = await backendFetch("/account");
 */
export async function backendFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`/api/backend${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Backend error ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>;
}
