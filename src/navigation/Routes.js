import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Login} from '../components/screens';
import {useAuth} from './AuthenticationProvider';
import StackNavigator from './StackNavigator';

const Routes = () => {
  const [initializing, setInitializing] = useState(true);
  const {user, setUser} = useAuth();

  useEffect(() => {
    const onAuthStateChanged = user => {
      setUser(user);
      if (initializing) setInitializing(false);
    };

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [initializing]);

  if (initializing) return null;
  return (
    <NavigationContainer>
      {user ? <StackNavigator /> : <Login />}
    </NavigationContainer>
  );
};

export default Routes;
