// src/components/shared/SocialLink.tsx
import Link from "next/link";
import type { ElementType } from "react";

type SocialLinkProps = {
  href?: string;
  ariaLabel: string;
  icon: ElementType;
};

export default function SocialLink({
  href,
  ariaLabel,
  icon: Icon,
}: SocialLinkProps) {
  if (!href) {
    return null;
  }

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground hover:text-primary transition-colors"
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
}
