'use client'

import { useDashboardAuth } from "@/hooks/useDashboardAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRouteWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useDashboardAuth();
  const router = useRouter();
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    // Allow dashboard access if user is authenticated OR if in development mode
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (!loading) {
      if (user || isDevelopment) {
        setShowDashboard(true);
      } else {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!showDashboard) {
    return null;
  }

  return <>{children}</>;
}
