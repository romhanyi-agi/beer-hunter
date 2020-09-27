import React from 'react';
import { useAuth } from '../Authentication/AuthContext.jsx';

// eslint-disable-next-line import/prefer-default-export
export const Login = () => {
  const { setUser, setError, login, isLoading, user, error } = useAuth();

  const handleSubmit = () => {
    if (!user) {
      setError('User name is required!');
    } else if (user.length > 16) {
      setError('User name cannot be longer than 16 characters.'); 
    } else {
      setError(null);
      login();
    }
  };

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  return (
    <div>
      { error
        ? <div>{error}</div>
        : null }
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <input type="text" name="user" value={user} onChange={handleChange} />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login' }
        </button>
      </form>
    </div>
  );
};
