import { create } from "zustand";
import { applyTheme, THEME_STORAGE_KEY, type Theme } from '@/lib/theme';

interface ThemeStore {
  theme: Theme;
  preference: Theme | null;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  initializeTheme: (theme: Theme, preference: Theme | null) => void;
}

const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: "light",
  preference: null,

  toggleTheme: () => {
    get().setTheme(get().theme === 'light' ? 'dark' : 'light');
  },

  setTheme: (theme: Theme) => {
    applyTheme(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // A manual choice still works for this visit when storage is unavailable.
    }
    set({ theme, preference: theme });
  },

  initializeTheme: (theme, preference) => {
    applyTheme(theme);
    set({ theme, preference });
  },
}));

export const useTheme = () => useThemeStore((state) => state.theme);

export const useToggleTheme = () => useThemeStore((state) => state.toggleTheme);

export const useSetTheme = () => useThemeStore((state) => state.setTheme);

export const themeStore = useThemeStore;
