'use client';

import React, { createContext, useContext, useEffect } from 'react';

// The app is light-mode only. The theme switcher was removed from the login
// screen, the mobile header and the sidebar, so there is no longer any way to
// select dark mode.
//
// This still runs as a provider (rather than being deleted outright) for two
// reasons:
//   1. It actively strips the `dark` class and the stored preference, so
//      anyone who had dark mode selected before is returned to light instead
//      of being stuck in a theme they can no longer turn off.
//   2. `useTheme()` keeps its shape, so any remaining consumer reads a stable
//      'light' rather than crashing on a missing context.
//
// The `dark:` variants scattered through the components are harmless dead
// styles now — the `dark` class is never applied — and are left in place so
// this stays a one-file change.

type Theme = 'light';

interface ThemeContextType {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'light' });

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Clear any dark preference left over from before the switcher was removed.
    document.documentElement.classList.remove('dark');
    try {
      localStorage.removeItem('theme');
    } catch {
      /* private mode / storage disabled — the class removal above is what matters */
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'light' }}>
      {children}
    </ThemeContext.Provider>
  );
}
