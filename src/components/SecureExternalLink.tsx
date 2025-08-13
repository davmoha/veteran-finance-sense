import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface SecureExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export const SecureExternalLink: React.FC<SecureExternalLinkProps> = ({ 
  href, 
  children, 
  className,
  variant = "outline",
  size = "sm"
}) => {
  const handleClick = () => {
    // Validate URL before opening
    try {
      const url = new URL(href);
      // Only allow https URLs for security
      if (url.protocol === 'https:') {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else {
        console.warn('Blocked non-HTTPS external link:', href);
      }
    } catch (error) {
      console.warn('Invalid URL blocked:', href, error);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
      type="button"
    >
      {children}
    </Button>
  );
};