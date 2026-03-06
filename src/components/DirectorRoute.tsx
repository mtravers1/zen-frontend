// import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface DirectorRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * Route wrapper that requires director-level access or above
 */
const DirectorRoute = ({ children, redirectTo = "/dashboard" }: DirectorRouteProps) => {
  const { user, loading, isDirectorOrAbove } = useAuth();
  // const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Check authentication first
  if (!user) {
    if (typeof window !== "undefined") window.location.href = "/auth";
    return null;
  }

  // Check director access
  if (!isDirectorOrAbove()) {
    if (typeof window !== "undefined") window.location.href = redirectTo;
    return null;
  }

  return <>{children}</>;
};

export default DirectorRoute;
