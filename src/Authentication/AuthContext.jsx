import React, { useContext, useReducer } from 'react';

// const DEFAULT_REDIRECT_CALLBACK = () => window.history.replaceState({}, document.title, window.location.pathname);
const AUTH_API_URL = 'https://yesno.wtf/api';

export const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  isError: false,
  error: null,
  user: '',
};

function authReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.loading,
      };
    case 'SET_AUTH':
      return {
        ...state,
        isAuthenticated: action.auth,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [{ isLoading, isAuthenticated, isError, error, user }, dispatch] = useReducer(authReducer, initialState);

  const login = async () => {
    dispatch({ type: 'SET_LOADING', loading: true });
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
        dispatch({ type: 'SET_LOADING', loading: false });
        if (respData.answer === 'yes' || respData.answer === 'maybe') {
          // console.log('SUCCESS: ', respData);
          dispatch({ type: 'SET_AUTH', auth: true });
        } else {
          dispatch({ type: 'SET_ERROR', error: 'Sorry, you didn\'t pass authentication... Hit login again' });
        }
      })
      .catch((err) => {
        // console.error('ERROR: ', err.message);
        dispatch({ type: 'SET_ERROR', error: err.message });
      });
  };

  function logout() {
    dispatch({ type: 'SET_AUTH', auth: false });
    dispatch({ type: 'SET_USER', user: '' });
  }

  function setUser(newUser) {
    dispatch({ type: 'SET_USER', user: newUser });
  }
  function setError(errorMsg) {
    dispatch({ type: 'SET_ERROR', error: errorMsg });
  }
  return (
    <AuthContext.Provider value={{ setUser, setError, login, logout, isLoading, isAuthenticated, isError, error, user }}>
      {children}
    </AuthContext.Provider>
  );
};
