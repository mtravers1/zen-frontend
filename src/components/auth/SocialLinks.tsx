import { Facebook, Instagram, Twitter } from "lucide-react";

const SocialLinks = () => {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground uppercase tracking-wider">check our media</span>
        <div className="flex-1 h-px bg-border" />
      </div>
      <div className="flex justify-center gap-4">
        <a 
          href="#" 
          className="w-14 h-14 rounded-xl bg-card shadow-md flex items-center justify-center hover:shadow-lg transition-shadow border border-border"
          aria-label="Facebook"
        >
          <Facebook className="w-6 h-6" style={{ color: '#1877F2' }} />
        </a>
        <a 
          href="#" 
          className="w-14 h-14 rounded-xl bg-card shadow-md flex items-center justify-center hover:shadow-lg transition-shadow border border-border"
          aria-label="Instagram"
        >
          <Instagram className="w-6 h-6" style={{ color: '#E4405F' }} />
        </a>
        <a 
          href="#" 
          className="w-14 h-14 rounded-xl bg-card shadow-md flex items-center justify-center hover:shadow-lg transition-shadow border border-border"
          aria-label="Twitter"
        >
          <Twitter className="w-6 h-6" style={{ color: '#1DA1F2' }} />
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
