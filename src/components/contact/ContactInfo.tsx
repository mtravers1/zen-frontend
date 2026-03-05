import { Mail, Phone, Clock, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@zentavos.com",
      href: "mailto:hello@zentavos.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "(888) 555-0123",
      href: "tel:+18885550123",
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Mon - Fri: 9AM - 5PM EST",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Miami, Florida",
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "X" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <div className="glass-effect rounded-2xl p-8 h-fit">
      <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
      
      <div className="space-y-6">
        {contactDetails.map(({ icon: Icon, label, value, href }) => (
          <div key={label} className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-accent/10">
              <Icon className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{label}</p>
              {href ? (
                <a 
                  href={href} 
                  className="text-foreground hover:text-accent transition-colors"
                >
                  {value}
                </a>
              ) : (
                <p className="text-foreground">{value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Social Links */}
      <div className="mt-8 pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground mb-4">Follow Us</p>
        <div className="flex items-center gap-3">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              className="p-3 rounded-lg bg-secondary hover:bg-accent/20 transition-colors"
              aria-label={label}
            >
              <Icon className="w-5 h-5 text-muted-foreground hover:text-accent" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
