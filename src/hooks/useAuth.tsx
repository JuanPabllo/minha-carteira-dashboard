import React, { createContext, useState, useContext } from 'react';

interface IUseAuthContext {
  logged: boolean;
  signIn(email: string, password: string): void;
  signOut(): void;
}

const UseAuthContext = createContext<IUseAuthContext>({} as IUseAuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [logged, setLogged] = useState<boolean>(() => {
    const isLogged = localStorage.getItem('@minha-carteira:logged');

    return !!isLogged; // logical return: check if it has content or not, if it is true, if not false
  });

  const signIn = (email: string, password: string) => {
    if (email === 'juan@email.com' && password === '123') {
      localStorage.setItem('@minha-carteira:logged', 'true');
      setLogged(true);
    } else alert('E-mail ou senha incorreto');
  };

  const signOut = () => {
    localStorage.removeItem('@minha-carteira:logged');
    setLogged(false);
  };

  return (
    <UseAuthContext.Provider value={{ logged, signIn, signOut }}>
      {children}
    </UseAuthContext.Provider>
  );
};

function useAuth(): IUseAuthContext {
  const context = useContext(UseAuthContext);

  return context;
}

export { AuthProvider, useAuth };
