import { useState } from "react";
import Link from "next/link";
import { Menu, X, Facebook, Instagram, Twitter, Youtube, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import UserMenu from "@/components/UserMenu";
import { Button } from "@/components/ui/button";
import zentavosLogo from "@/assets/zentavos-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "X" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const getNavRoute = (link: string) => {
    switch (link) {
      case "SOLUTIONS":
        return "/solutions";
      case "CONTACT":
        return "/contact";
      default:
        return "/";
    }
  };

  const navLinks = ["HOME", "SOLUTIONS", "CONTACT"];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-md">
      {/* Top Row - Logo on white, diagonal green banner with social */}
      <div className="relative bg-card overflow-hidden">
        {/* Diagonal green banner extending from right */}
        <div className="absolute top-0 right-0 h-full w-2/3 lg:w-1/2 header-diagonal-banner" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Logo - Full color on white background */}
            <Link href="/" className="flex items-center">
              <img 
                src={zentavosLogo} 
                alt="Zentavos" 
                className="h-9 lg:h-12 logo-dark-mode" 
              />
            </Link>

            {/* Desktop - Follow Us + Social in the green area */}
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-sm text-primary-foreground font-normal opacity-90">Follow Us:</span>
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="p-1.5 text-primary-foreground/90 hover:text-accent transition-colors duration-300"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row - White navigation bar */}
      <div className="bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="hidden lg:flex items-center justify-between h-10">
            {/* Nav Links */}
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link}
                  href={getNavRoute(link)}
                  className="text-sm font-semibold text-foreground hover:text-primary transition-colors duration-300"
                >
                  {link}
                </Link>
              ))}
            </nav>

            {/* Right side - App Badges + Auth */}
            <div className="flex items-center gap-4">
              {/* App Store Badges */}
              <div className="flex items-center gap-2">
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    className="h-8"
                  />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="Download on the App Store"
                    className="h-8"
                  />
                </a>
              </div>

              {/* Auth Button / User Menu */}
              {!loading && (
                user ? (
                  <UserMenu />
                ) : (
                  <Link href="/auth">
                    <Button variant="outline" size="sm" className="gap-2">
                      <LogIn className="w-4 h-4" />
                      Login
                    </Button>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-6">
            <nav className="flex flex-col gap-4 mb-6">
              {navLinks.map((link) => (
                <Link
                  key={link}
                  to={getNavRoute(link)}
                  className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4 mb-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="p-2 text-muted-foreground hover:text-accent transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3 mb-6">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-10"
                />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="Download on the App Store"
                  className="h-10"
                />
              </a>
            </div>

            {/* Mobile Auth */}
            {!loading && (
              user ? (
                <div className="pt-4 border-t border-border">
                  <UserMenu />
                </div>
              ) : (
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full gap-2">
                    <LogIn className="w-4 h-4" />
                    Login / Sign Up
                  </Button>
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
