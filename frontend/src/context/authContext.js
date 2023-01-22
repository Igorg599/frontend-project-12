import {
  createContext, useCallback, useMemo, useState,
} from 'react';
import useLocalStorage from 'hooks/useLokalStorage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [storageUserValue] = useLocalStorage('token');
  const [userName] = useLocalStorage('userName');
  const [loggedIn, setLoggedIn] = useState(!!storageUserValue);
  const [currentUser, setCurrentUser] = useState(userName);
  const [token, setToken] = useState(storageUserValue);

  const logIn = useCallback((tokenNew) => {
    setToken(tokenNew);
    setLoggedIn(true);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setLoggedIn(false);
  }, []);

  const valueProvider = useMemo(
    () => ({
      loggedIn, logIn, logOut, currentUser, setCurrentUser, token,
    }),
    [logIn, logOut, loggedIn, currentUser, setCurrentUser, token],
  );

  return (
    <AuthContext.Provider value={valueProvider}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
