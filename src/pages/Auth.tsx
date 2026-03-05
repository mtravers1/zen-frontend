import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Mail, Globe, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import zentavosLogo from "@/assets/zentavos-logo.png";
import heroWoman from "@/assets/hero-woman.jpg";

import SocialLinks from "@/components/auth/SocialLinks";

type ViewMode = "login" | "signup" | "forgotPassword" | "resetSent";

// Validation schemas
const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email")
    .max(255, "Email must be less than 255 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const signupSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Please enter a valid email")
      .max(255, "Email must be less than 255 characters"),
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

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email")
    .max(255, "Email must be less than 255 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;
type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const Auth = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [language, setLanguage] = useState("EN");

  const languages = [
    { code: "EN", label: "English" },
    { code: "ES", label: "Español" },
    { code: "FR", label: "Français" },
    { code: "DE", label: "Deutsch" },
  ];

  const { user, loading, signIn, signUp, resetPassword } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && user) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
  });

  const forgotPasswordForm = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const handleLogin = async (data: LoginFormData) => {
    setIsSubmitting(true);
    const { error } = await signIn(data.email, data.password);

    if (error) {
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: error.message,
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      navigate("/", { replace: true });
    }
    setIsSubmitting(false);
  };

  const handleSignup = async (data: SignupFormData) => {
    setIsSubmitting(true);
    const { error } = await signUp(data.email, data.password, data.fullName);

    if (error) {
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message,
      });
    } else {
      toast({
        title: "Account created!",
        description: "Welcome to Zentavos.",
      });
      navigate("/", { replace: true });
    }
    setIsSubmitting(false);
  };

  const handleForgotPassword = async (data: ForgotPasswordFormData) => {
    setIsSubmitting(true);
    const { error } = await resetPassword(data.email);

    if (error) {
      toast({
        variant: "destructive",
        title: "Request failed",
        description: error.message,
      });
    } else {
      setResetEmail(data.email);
      setViewMode("resetSent");
    }
    setIsSubmitting(false);
  };

  const handleResendReset = async () => {
    setIsSubmitting(true);
    const { error } = await resetPassword(resetEmail);

    if (error) {
      toast({
        variant: "destructive",
        title: "Request failed",
        description: error.message,
      });
    } else {
      toast({
        title: "Email sent!",
        description: "We've sent another password reset link.",
      });
    }
    setIsSubmitting(false);
  };

  const switchToLogin = () => {
    setViewMode("login");
    loginForm.reset();
    signupForm.reset();
    forgotPasswordForm.reset();
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const switchToSignup = () => {
    setViewMode("signup");
    loginForm.reset();
    signupForm.reset();
    forgotPasswordForm.reset();
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const switchToForgotPassword = () => {
    setViewMode("forgotPassword");
    forgotPasswordForm.reset();
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
                Contact Us
              </Link>
              <Link to="/solutions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Help
              </Link>
              <span className="text-sm font-medium text-foreground">Zentavos</span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{language}</span>
                <ChevronDown className="w-3 h-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover border shadow-lg z-50">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`cursor-pointer ${language === lang.code ? "bg-accent font-medium" : ""}`}
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={switchToLogin}
              className={`text-sm font-medium transition-colors ${
                viewMode === "login" 
                  ? "text-primary underline underline-offset-4" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <Button
              variant="outline"
              size="sm"
              onClick={switchToSignup}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Register
            </Button>
          </div>
        </header>

        {/* Split Content Area */}
        <div className="flex-1 flex">
          {/* Left Panel - Form with glass effect */}
          <div className="w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-20 py-12">
            <div className="w-full max-w-md animate-fade-in">
              {/* Reset Sent View */}
              {viewMode === "resetSent" && (
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 backdrop-blur-md flex items-center justify-center">
                      <Mail className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Check Your Email</h1>
                    <p className="text-muted-foreground">
                      We've sent a password reset link to{" "}
                      <span className="font-medium text-foreground">{resetEmail}</span>
                    </p>
                  </div>
                  <div className="space-y-4 pt-4">
                    <Button
                      variant="outline"
                      className="w-full h-12 text-base backdrop-blur-md bg-background/60"
                      onClick={handleResendReset}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Resend email"
                      )}
                    </Button>
                    <button
                      type="button"
                      onClick={switchToLogin}
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      Back to Sign In
                    </button>
                  </div>
                  <SocialLinks />
                </div>
              )}

              {/* Forgot Password View */}
              {viewMode === "forgotPassword" && (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Reset Password</h1>
                    <p className="text-muted-foreground">
                      Enter your email address and we'll send you a link to reset your password.
                    </p>
                  </div>

                  <form
                    onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <Input
                        id="forgot-email"
                        type="email"
                        placeholder="Enter email"
                        {...forgotPasswordForm.register("email")}
                        className="h-12 text-base bg-background/60 backdrop-blur-md border-border/50 rounded-lg px-4"
                        disabled={isSubmitting}
                      />
                      {forgotPasswordForm.formState.errors.email && (
                        <p className="text-sm text-destructive">
                          {forgotPasswordForm.formState.errors.email.message}
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
                          Sending...
                        </>
                      ) : (
                        "Send Reset Link"
                      )}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                      Remember your password?{" "}
                      <button
                        type="button"
                        onClick={switchToLogin}
                        className="text-primary hover:underline font-medium"
                        disabled={isSubmitting}
                      >
                        Sign in
                      </button>
                    </p>
                  </form>
                  <SocialLinks />
                </div>
              )}

              {/* Login View */}
              {viewMode === "login" && (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Welcome back</h1>
                    <p className="text-muted-foreground">
                      Please enter your credentials to access your account
                    </p>
                  </div>

                  <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-5">
                    <div className="space-y-2">
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter email"
                        {...loginForm.register("email")}
                        className="h-12 text-base bg-background/60 backdrop-blur-md border-border/50 rounded-lg px-4"
                        disabled={isSubmitting}
                      />
                      {loginForm.formState.errors.email && (
                        <p className="text-sm text-destructive">
                          {loginForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          {...loginForm.register("password")}
                          className="h-12 text-base bg-background/60 backdrop-blur-md border-border/50 rounded-lg px-4 pr-12"
                          disabled={isSubmitting}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {loginForm.formState.errors.password && (
                        <p className="text-sm text-destructive">
                          {loginForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={switchToForgotPassword}
                        className="text-sm text-muted-foreground hover:text-foreground"
                        disabled={isSubmitting}
                      >
                        Forgot your credentials?
                      </button>
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
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={switchToSignup}
                        className="text-primary hover:underline font-medium"
                        disabled={isSubmitting}
                      >
                        Create one
                      </button>
                    </p>
                  </form>
                  <SocialLinks />
                </div>
              )}

              {/* Signup View */}
              {viewMode === "signup" && (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Create Account</h1>
                    <p className="text-muted-foreground">
                      Join Zentavos and start managing your business today
                    </p>
                  </div>

                  <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-5">
                    <div className="space-y-2">
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Full name"
                        {...signupForm.register("fullName")}
                        className="h-12 text-base bg-background/60 backdrop-blur-md border-border/50 rounded-lg px-4"
                        disabled={isSubmitting}
                      />
                      {signupForm.formState.errors.fullName && (
                        <p className="text-sm text-destructive">
                          {signupForm.formState.errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Email address"
                        {...signupForm.register("email")}
                        className="h-12 text-base bg-background/60 backdrop-blur-md border-border/50 rounded-lg px-4"
                        disabled={isSubmitting}
                      />
                      {signupForm.formState.errors.email && (
                        <p className="text-sm text-destructive">
                          {signupForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          {...signupForm.register("password")}
                          className="h-12 text-base bg-background/60 backdrop-blur-md border-border/50 rounded-lg px-4 pr-12"
                          disabled={isSubmitting}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Min 8 characters, 1 uppercase, 1 number
                      </p>
                      {signupForm.formState.errors.password && (
                        <p className="text-sm text-destructive">
                          {signupForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="relative">
                        <Input
                          id="signup-confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm password"
                          {...signupForm.register("confirmPassword")}
                          className="h-12 text-base bg-background/60 backdrop-blur-md border-border/50 rounded-lg px-4 pr-12"
                          disabled={isSubmitting}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          tabIndex={-1}
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {signupForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-destructive">
                          {signupForm.formState.errors.confirmPassword.message}
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
                          Creating account...
                        </>
                      ) : (
                        "Sign Up"
                      )}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={switchToLogin}
                        className="text-primary hover:underline font-medium"
                        disabled={isSubmitting}
                      >
                        Sign in
                      </button>
                    </p>
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

export default Auth;
