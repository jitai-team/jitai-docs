import { useEffect, useState } from 'react';

export default function useMarketingTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  useEffect(() => {
    try {
      const saved = localStorage.getItem('jitai-marketing-theme');
      setTheme(saved === 'dark' || saved === 'light' ? saved : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    } catch { /* Keep the default theme when storage is unavailable. */ }
  }, []);
  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    try { localStorage.setItem('jitai-marketing-theme', next); } catch { /* The current visit still gets the selected theme. */ }
  };
  return { theme, toggleTheme };
}
