/**
 * @format
 */

// Suppress React 19 ref warnings during ecosystem transition
import {LogBox} from 'react-native';
LogBox.ignoreLogs([
  'Accessing element.ref was removed in React 19',
  'ref will be removed from the JSX Element type in a future release'
]);

import notifee, {AndroidImportance} from '@notifee/react-native';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import {AppRegistry} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {name as appName} from './app.json';
import App from './src/App';
import trackPlayerService from './src/trackPlayerService';
import Logger from './src/utils/logUtility/Logger';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  Logger.log('BG Message received', remoteMessage);

  // Create channel (safe to call repeatedly)
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  // Display a local notification (handle the payload you sent)
  await notifee.displayNotification({
    title: remoteMessage.notification?.title ?? remoteMessage.data?.title,
    body: remoteMessage.notification?.body ?? remoteMessage.data?.body,
    android: {
      channelId: 'default',
      pressAction: {id: 'default'},
      // smallIcon: 'ic_notification' // optional: name of drawable in android/res
    },
  });
});

database().setPersistenceEnabled(true);
AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => trackPlayerService);
