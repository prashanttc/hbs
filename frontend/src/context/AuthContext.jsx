import React, { createContext, useEffect, useReducer } from 'react';


const setItemWithExpiry = (key, value, ttl) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

const getItemWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
};


const INITIAL_STATE = {
  user: (() => {
    try {
      // Get user from localStorage with expiry handling
      return getItemWithExpiry('user');
    } catch (error) {
      return null;
    }
  })() || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        loading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    if (state.user) {
      // Set user data in localStorage with an expiry of 1 hour (3600000 milliseconds)
      setItemWithExpiry('user', state.user, 3600000);
    } else {
      // Clear user data from localStorage on logout
      localStorage.removeItem('user');
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
