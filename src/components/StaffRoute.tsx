import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface StaffRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * Route wrapper that requires staff-level access (non-client roles)
 */
const StaffRoute = ({ children, redirectTo = "/dashboard" }: StaffRouteProps) => {
  const { user, loading, isStaff } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Check authentication first
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check staff access
  if (!isStaff()) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default StaffRoute;
