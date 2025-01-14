import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useAuth} from '../../../navigation/AuthenticationProvider';
import {LoginCss as styles} from '../../../styles/screens/LoginCss';
import {ClickToLogin} from '../../../utils/constants/TextConstants';
import MainView from '../MainView';

const Login = () => {
  const {signIn} = useAuth();

  return (
    <SafeAreaView style={styles.mainView}>
      <MainView />
      <Text style={styles.loginText}>{ClickToLogin}</Text>
      <GoogleSigninButton onPress={signIn} style={styles.signInButton} />
    </SafeAreaView>
  );
};

export default Login;
