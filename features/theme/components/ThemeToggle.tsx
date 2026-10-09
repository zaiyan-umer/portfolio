'use client';

import { Moon, Sun } from 'lucide-react';
import { useToggleTheme } from '@/features/theme/store';

export default function ThemeToggle() {
  const toggleTheme = useToggleTheme();

  return (
    <button type="button" onClick={toggleTheme} className="portfolio-icon-button" aria-label="Toggle color theme">
      <Moon size={19} className="dark:hidden" aria-hidden="true" />
      <Sun size={19} className="hidden dark:block" aria-hidden="true" />
    </button>
  );
}
