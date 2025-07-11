// components/SocialLinks.tsx
import { Mail, Facebook, Phone } from "lucide-react";
import Link from "next/link";

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={`flex gap-4 justify-center ${className}`}>
      <Link
        href="https://www.facebook.com/profile.php?id=61577918754727&notif_id=1751562159217728&notif_t=page_user_activity&ref=notif"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors"
      >
        <Facebook className="h-6 w-6" />
      </Link>
      <Link
        href="mailto:grupomcsolar@gmail.com"
        className="hover:text-primary transition-colors"
      >
        <Mail className="h-6 w-6" />
      </Link>
      <Link
        href="https://wa.me/50376398878"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors"
      >
        <Phone className="h-6 w-6" />
      </Link>
    </div>
  );
}