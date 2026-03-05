import { Navigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

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
    // Save the attempted URL for redirecting after login
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role authorization
  if (requiredRole && user) {
    const hasAccess = hasMinimumRole(roles, requiredRole);
    
    if (!hasAccess) {
      // Redirect to home if user doesn't have required role
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
