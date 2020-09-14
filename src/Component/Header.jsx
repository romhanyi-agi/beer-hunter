import React from 'react';
import { useAuth } from '../Authentication/AuthContext.jsx';

// eslint-disable-next-line import/prefer-default-export
export function Header() {
  const { user } = useAuth();
  return (
    <nav>
      <div>Hello {user}</div>
    </nav>
  );
}
