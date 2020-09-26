import React, { useState } from 'react';
import { useAuth } from '../Authentication/AuthContext.jsx';

// eslint-disable-next-line import/prefer-default-export
export const Login = () => {
  const AUTH_API_URL = 'https://yesno.wtf/api';
  const { setUser, login, user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginWithYesNoAPI = async () => {
    setIsLoading(true);
    await fetch(AUTH_API_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong. Possible problemse: network error, permission issues, or resource not found.');
        }
        return response.json();
      })
      .then((respData) => {
        setIsLoading(false);
        if (respData.answer === 'yes' || respData.answer === 'maybe') {
          // console.log('SUCCESS: ', respData);
          login();
        } else {
          setError('Sorry, you didn\'t pass authentication... Hit login again');
        }
      })
      .catch((err) => {
        // console.error('ERROR: ', err.message);
        setError(err.message);
      });
  };

  const handleSubmit = () => {
    if (!user) {
      setError('User name is required!');
    } else if (user.length > 16) {
      setError('User name cannot be longer than 16 characters.'); 
    } else {
      setError(null);
      loginWithYesNoAPI();
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
