import React, { useState, useContext, createContext } from 'react';

import { dark } from '../styles/theme/dark';
import { light } from '../styles/theme/light';

interface IUseThemeContext {
  toggleTheme(): void;
  theme: ITheme;
}

interface ITheme {
  title: string;

  colors: {
    primary: string;
    secondary: string;
    tertiary: string;

    white: string;
    black: string;
    gray: string;

    success: string;
    info: string;
    warning: string;
  };
}

const ThemeContext = createContext<IUseThemeContext>({} as IUseThemeContext);

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<ITheme>(() => {
    const themeSaved = localStorage.getItem('@minha-carteira:theme');

    if (themeSaved) return JSON.parse(themeSaved);
    else return dark;
  });

  const toggleTheme = () => {
    if (theme.title === 'dark') {
      setTheme(light);
      localStorage.setItem('@minha-carteira:theme', JSON.stringify(light));
    } else {
      setTheme(dark);
      localStorage.setItem('@minha-carteira:theme', JSON.stringify(dark));
    }
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

function useTheme(): IUseThemeContext {
  const context = useContext(ThemeContext);
  return context;
}

export { ThemeProvider, useTheme };
