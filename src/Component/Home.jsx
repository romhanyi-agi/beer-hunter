/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useAuth } from '../Authentication/AuthContext.jsx';

// eslint-disable-next-line import/prefer-default-export
export const Home = () => {
  const { logout } = useAuth();
  // console.log('HOME: ', user, isAuthenticated);

  return (
    <div>
      <h1>You are logged in!</h1>
      <button type="button" onClick={logout}>Log out</button>
    </div>
  );
};
