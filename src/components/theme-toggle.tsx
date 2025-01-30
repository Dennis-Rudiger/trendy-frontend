// components/theme-toggle.tsx
'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Toggle theme" disabled>
        <Monitor className="h-5 w-5" />
      </Button>
    );
  }

  const toggleTheme = () => {
    const themes = ['system', 'light', 'dark'];
    const currentIndex = themes.indexOf(theme || 'system');
    setTheme(themes[(currentIndex + 1) % themes.length]);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="hover:bg-accent/50"
    >
      {theme === 'light' ? (
        <Sun className="h-5 w-5 transition-all hover:scale-110" />
      ) : theme === 'dark' ? (
        <Moon className="h-5 w-5 transition-all hover:scale-110" />
      ) : (
        <Monitor className="h-5 w-5 transition-all hover:scale-110" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}