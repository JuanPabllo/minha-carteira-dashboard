import React, { useState, useMemo } from 'react';

import { useTheme } from '../../hooks/useTheme';

import Toggle from '../Toggle';
import { emojis } from '../../utils/emojis';

import { Container, Profile, Welcome, UserName } from './styles';

const MainHeader: React.FC = () => {
  const { toggleTheme, theme } = useTheme();

  const [darkTheme, setDarkTheme] = useState(() =>
    theme.title === 'dark' ? true : false
  );

  const emoji = useMemo(() => {
    const indice = Math.floor(Math.random() * emojis.length);
    return emojis[indice];
  }, []);

  const HandleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  };

  return (
    <Container>
      <Profile>
        <Welcome>Olá, {emoji}</Welcome>
        <UserName>Juan Pablo</UserName>
      </Profile>
      <Toggle
        labelLeft="Light"
        labelRight="Dark"
        checked={darkTheme}
        onChange={HandleChangeTheme}
      />
    </Container>
  );
};

export default MainHeader;
