'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

const navItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Campaigns', href: '/campaigns' },
  { name: 'Analytics', href: '/analytics' },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold">
            Trendy
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === item.href ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link 
            href="/login" 
            className={buttonVariants({ variant: "secondary" })}
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}