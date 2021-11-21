import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';

const ThemeToggle = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  //init
  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChnager = () => {
    // following logic will only run when component mounted
    if (!mounted) return null;

    //FIXME: get current system theme
    const currentTheme = theme === 'system' ? systemTheme : theme;

    // toggle light/dark
    if (theme === 'dark') {
      return (
        <MoonIcon
          className="w-7 h-7"
          role="button"
          onClick={() => setTheme('light')}
        />
      );
    } else {
      return (
        <SunIcon
          className="w-7 h-7"
          role="button"
          onClick={() => setTheme('dark')}
        />
      );
    }
  };

  return <div className="absolute top-10 right-10">{renderThemeChnager()}</div>;
};

export default ThemeToggle;
