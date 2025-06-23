import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect} from 'react';
import {MobileAds} from 'react-native-google-mobile-ads';
import TrackPlayer from 'react-native-track-player';
import Logger from '../utils/logUtility/Logger';
import {AuthenticationProvider} from './AuthenticationProvider';
import Routes from './Routes';

const Index = () => {
  useEffect(() => {
    GoogleSignin.configure({
      scopes: [],
      webClientId:
        '740037634358-f86km3flq9oc00s6fg9jsncgdd619aem.apps.googleusercontent.com',
      offlineAccess: true,
    });
    MobileAds()
      .initialize()
      .then(adapterStatuses => {
        Logger.log('google ads initialized', adapterStatuses);
      });
  }, []);
  return (
    <AuthenticationProvider>
      <Routes />
    </AuthenticationProvider>
  );
};

export default Index;
