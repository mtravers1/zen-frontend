// import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import type { AppRole } from "@/lib/permissions";
import { hasMinimumRole } from "@/lib/permissions";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: AppRole;
  requireAuth?: boolean;
  redirectTo?: string;
}

const ProtectedRoute = ({
  children,
  requiredRole,
  requireAuth = true,
  redirectTo = "/auth",
}: ProtectedRouteProps) => {
  const { user, roles, loading } = useAuth();
  // const router = useRouter();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Check authentication
  if (requireAuth && !user) {
    if (typeof window !== "undefined") window.location.href = redirectTo;
    return null;
  }

  // Check role authorization
  if (requiredRole && user) {
    const hasAccess = hasMinimumRole(roles, requiredRole);
    if (!hasAccess) {
      if (typeof window !== "undefined") window.location.href = "/";
      return null;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
