'use client';

import {createContext, useEffect} from 'react';
import {ThemeProvider, useTheme} from 'next-themes';

function ThemeWatcher() {
  const {resolvedTheme, setTheme} = useTheme();

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    function onMediaChange() {
      const systemTheme = media.matches ? 'dark' : 'light';
      if (resolvedTheme === systemTheme) {
        setTheme('system');
      }
    }

    onMediaChange();
    media.addEventListener('change', onMediaChange);

    return () => {
      media.removeEventListener('change', onMediaChange);
    };
  }, [resolvedTheme, setTheme]);

  return null;
}

export const AppContext = createContext({})

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <ThemeWatcher />
      {children}
    </ThemeProvider>
  );
}
