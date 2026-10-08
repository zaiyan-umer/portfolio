'use client'

import { useEffect } from "react";
import { themeStore } from '@/store/theme.store';
import { getSavedTheme, isTheme, THEME_STORAGE_KEY } from '@/lib/theme';

const ThemeInitializer = () => {
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const saved = getSavedTheme();
    const systemTheme = () => media.matches ? 'dark' as const : 'light' as const;
    themeStore.getState().initializeTheme(saved ?? systemTheme(), saved);

    const followSystem = () => {
      if (themeStore.getState().preference === null) {
        themeStore.getState().initializeTheme(systemTheme(), null);
      }
    };
    const followStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY && event.key !== null) return;
      const preference = isTheme(event.newValue) ? event.newValue : null;
      themeStore.getState().initializeTheme(preference ?? systemTheme(), preference);
    };

    media.addEventListener('change', followSystem);
    window.addEventListener('storage', followStorage);
    return () => {
      media.removeEventListener('change', followSystem);
      window.removeEventListener('storage', followStorage);
    };
  }, []);

  return null;
};

export default ThemeInitializer;
