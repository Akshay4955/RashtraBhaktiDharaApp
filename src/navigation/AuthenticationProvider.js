import {createContext, useContext, useEffect, useState} from 'react';
import AuthViewModel from '../viewModels/AuthViewModel';

const AuthContext = createContext();
export const AuthenticationProvider = ({children}) => {
  const auth = AuthViewModel();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (auth.user !== null || auth.user === null) {
      setIsLoading(false);
    }
  }, [auth.user]);

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
