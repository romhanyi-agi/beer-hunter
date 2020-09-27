import React from 'react';
import { useAuth } from '../Authentication/AuthContext.jsx';

// eslint-disable-next-line import/prefer-default-export
export function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav style={{ background: 'lightgrey' }}> 
      <ul style={{ listStyleType: 'none', display: 'flex', flexFlow: 'row wrap', alignItems: 'center', justifyContent: 'flex-start' }}>
        <li style={{ padding: '10px' }}> Hello {user}</li>
        { isAuthenticated ? <li style={{ padding: '10px' }}><button type="button" onClick={logout}>Log out</button></li> : '' }
      </ul>
    </nav>
  );
}
