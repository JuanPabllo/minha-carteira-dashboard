import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import App from './app.routes';
import Auth from './auth.routes';

const Route: React.FC = () => {
  const { logged } = useAuth();

  return <BrowserRouter>{logged ? <App /> : <Auth />}</BrowserRouter>;
};

export default Route;
