import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import zentavosLogo from "@/assets/zentavos-logo.png";
import heroWoman from "@/assets/hero-woman.jpg";

import SocialLinks from "@/components/auth/SocialLinks";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { user, loading, updatePassword } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (!loading && !user) {
      toast({
        variant: "destructive",
        title: "Invalid or expired link",
        description: "Please request a new password reset link.",
      });
      navigate("/auth", { replace: true });
    }
  }, [user, loading, navigate, toast]);

  const handleSubmit = async (data: ResetPasswordFormData) => {
    setIsSubmitting(true);
    const { error } = await updatePassword(data.password);

    if (error) {
      toast({
        variant: "destructive",
        title: "Password update failed",
        description: error.message,
      });
    } else {
      setIsSuccess(true);
      toast({
        title: "Password updated!",
        description: "Your password has been successfully changed.",
      });
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 2000);
    }
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Full-screen background image */}
      <img
        src={heroWoman}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      
      {/* Gradient overlay - fades from solid left to transparent right */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />

      {/* Content on top */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Full-width Header - Transparent with backdrop blur */}
        <header className="w-full flex items-center justify-between px-6 lg:px-12 py-4 bg-transparent backdrop-blur-sm border-b border-border/30">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <img src={zentavosLogo} alt="Zentavos" className="h-8 logo-dark-mode" />
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
              <Link to="/solutions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Solutions
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Sign In
            </Link>
            <Button
              size="sm"
              asChild
              className="bg-primary hover:bg-primary/90"
            >
              <Link to="/auth">Register</Link>
            </Button>
          </div>
        </header>

        {/* Split Content Area */}
        <div className="flex-1 flex">
          {/* Left Panel - Form with glass effect */}
          <div className="w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-16 py-12">
            <div className="w-full max-w-md animate-fade-in">
              {isSuccess ? (
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 backdrop-blur-md flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                      Password Updated!
                    </h1>
                    <p className="text-muted-foreground">
                      Your password has been successfully changed. Redirecting you to
                      the dashboard...
                    </p>
                  </div>
                  <SocialLinks />
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                      Set New Password
                    </h1>
                    <p className="text-muted-foreground">
                      Enter your new password below to complete the reset process.
                    </p>
                  </div>

                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                    <div className="space-y-2">
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="New password"
                          {...form.register("password")}
                          className="h-12 text-base bg-background/60 backdrop-blur-md border-border/50 rounded-lg px-4 pr-12"
                          disabled={isSubmitting}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {form.formState.errors.password && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.password.message}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Min 8 characters, 1 uppercase, 1 number
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          {...form.register("confirmPassword")}
                          className="h-12 text-base bg-background/60 backdrop-blur-md border-border/50 rounded-lg px-4 pr-12"
                          disabled={isSubmitting}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          tabIndex={-1}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {form.formState.errors.confirmPassword && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 text-base rounded-lg"
                      style={{ backgroundColor: '#0B4D26' }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Updating password...
                        </>
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </form>
                  <SocialLinks />
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Empty for layout balance */}
          <div className="hidden lg:block lg:w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
