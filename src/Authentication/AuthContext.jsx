import React, { useContext, useReducer } from 'react';

// const DEFAULT_REDIRECT_CALLBACK = () => window.history.replaceState({}, document.title, window.location.pathname);

export const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

const initialState = {
  isAuthenticated: false,
  user: '',
};

function authReducer(state, action) {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        isAuthenticated: action.auth,
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
  const [{ isAuthenticated, user }, dispatch] = useReducer(authReducer, initialState);

  function login() {
    dispatch({ type: 'SET_AUTH', auth: true });
  }

  function logout() {
    dispatch({ type: 'SET_AUTH', auth: false });
    dispatch({ type: 'SET_USER', user: '' });
  }

  function setUser(newUser) {
    dispatch({ type: 'SET_USER', user: newUser });
  }

  return (
    <AuthContext.Provider value={{ setUser, login, logout, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};
