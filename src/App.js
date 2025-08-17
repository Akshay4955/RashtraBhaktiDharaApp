import remoteConfig from '@react-native-firebase/remote-config';
import React, {useEffect} from 'react';
import {AppState} from 'react-native';
import Index from './navigation/Index';
import {
  requestNotificationPermission,
  setupTrackPlayer,
} from './services/audioPlayerService';
import Logger from './utils/logUtility/Logger';

const App = () => {
  const fetchRemoteConfig = async () => {
    try {
      await remoteConfig()
        .setDefaults({
          version_code: 17,
        })
        .then(() => remoteConfig().fetchAndActivate())
        .then(fetchedRemotely => {
          if (fetchedRemotely) {
            Logger.log(
              'Configs were retrieved from the backend and activated.',
            );
          } else {
            Logger.log(
              'No configs were fetched from the backend, and the local configs were already activated',
            );
          }
        });
    } catch (error) {
      Logger.error('Failed to fetch remote config:', error);
    }
  };

  const subscribeToRemoteConfigUpdates = () => {
    const unsubscriber = remoteConfig().onConfigUpdated(
      async (event, error) => {
        if (error) {
          Logger.error('Remote Config listener error:', error);
        } else {
          Logger.log('Remote Config updated keys:', event.updatedKeys);
          await remoteConfig().activate();
          Logger.log('Remote Config activated from real-time update!');
        }
      },
    );

    return unsubscriber;
  };
  useEffect(() => {
    let appStateListener = null;
    let remoteConfigUnsubscriber = null;
    let currentAppState = AppState.currentState;

    // Initialize TrackPlayer and request permissions at app level
    const initializeApp = async () => {
      try {
        await requestNotificationPermission();
        await setupTrackPlayer();
        Logger.log('App and TrackPlayer initialization complete');
      } catch (error) {
        Logger.error('App initialization failed:', error);
      }
    };

    const handleAppStateChange = nextAppState => {
      if (
        currentAppState.match(/active/) &&
        nextAppState.match(/background|inactive/)
      ) {
        if (remoteConfigUnsubscriber) {
          remoteConfigUnsubscriber();
          remoteConfigUnsubscriber = null;
        }
      } else if (
        currentAppState.match(/background|inactive/) &&
        nextAppState === 'active'
      ) {
        fetchRemoteConfig();
        remoteConfigUnsubscriber = subscribeToRemoteConfigUpdates();
      }
      currentAppState = nextAppState;
    };

    initializeApp();
    fetchRemoteConfig();
    remoteConfigUnsubscriber = subscribeToRemoteConfigUpdates();
    appStateListener = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      if (remoteConfigUnsubscriber) {
        remoteConfigUnsubscriber();
      }
      if (appStateListener && appStateListener.remove) {
        appStateListener.remove();
      }
    };
  }, []);
  return <Index />;
};

export default App;
