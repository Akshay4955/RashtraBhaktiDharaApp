import {useEffect, useState} from 'react';
import AuthModel from '../models/AuthModel';

const AuthViewModel = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const currentUser = await AuthModel.getCurrentUser();
      setUser(currentUser);
    };

    checkLoginStatus();
  }, []);

  const signIn = async () => {
    try {
      const user = await AuthModel.googleSignIn();
      setUser(user);
    } catch (error) {
      setError(error.message);
    }
  };

  const signOut = async () => {
    try {
      await AuthModel.signOut();
      setUser(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    user,
    setUser,
    error,
    signIn,
    signOut,
  };
};

export default AuthViewModel;
