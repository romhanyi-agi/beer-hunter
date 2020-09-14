/* eslint-disable import/prefer-default-export */
import React, { Fragment } from 'react';
import { useAuth } from './Authentication/AuthContext.jsx';
import { Header } from './Component/Header.jsx';
import { Login } from './Component/Login.jsx';
import { Home } from './Component/Home.jsx';

export const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Fragment>
      <Header />
      { isAuthenticated
        ? <Home />
        : <Login />
      }
    </Fragment>
  );
};
