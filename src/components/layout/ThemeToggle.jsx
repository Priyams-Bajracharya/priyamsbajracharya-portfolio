import { useEffect, useState } from 'react';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem('theme');
  return stored === 'light' || stored === 'dark' ? stored : 'dark'; // dark is the showcase default, regardless of OS preference
}

export function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="rounded-md border border-border px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-text-secondary transition-colors hover:text-accent"
    >
      {theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  );
}
