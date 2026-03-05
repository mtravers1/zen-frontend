import { Link } from "react-router-dom";
import zentavosLogo from "@/assets/zentavos-logo.png";

const Footer = () => {
  const links = [
    { label: "Home", href: "/", isRoute: true },
    { label: "Privacy Policy", href: "#", isRoute: false },
    { label: "Terms of Service", href: "#", isRoute: false },
    { label: "Contact", href: "/contact", isRoute: true },
  ];

  return (
    <footer className="py-10 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Left Side - Branding */}
          <div className="flex flex-col gap-3">
            <p className="text-sm text-primary-foreground/80">
              © 2025 Zentavos All rights reserved.
            </p>
            <div className="flex flex-col gap-1">
              <img 
                src={zentavosLogo} 
                alt="Zentavos" 
                className="h-8 brightness-0 invert" 
              />
              <span className="text-sm font-medium text-primary-foreground/90">
                &COMPANY
              </span>
            </div>
          </div>

          {/* Right Side - Navigation Links */}
          <nav className="flex flex-col items-start md:items-end gap-2">
            {links.map(({ label, href, isRoute }) => (
              isRoute ? (
                <Link
                  key={label}
                  to={href}
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  {label}
                </Link>
              ) : (
                <a
                  key={label}
                  href={href}
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  {label}
                </a>
              )
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
