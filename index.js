import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import {AppRegistry} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {name as appName} from './app.json';
import App from './src/App';
import {navigationRef} from './src/navigation/Routes';
import trackPlayerService from './src/trackPlayerService';
import Logger from './src/utils/logUtility/Logger';
import {handleNotificationNavigation} from './src/utils/notificationNavigationService';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  Logger.log('BG Message received', remoteMessage);

  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: remoteMessage.notification?.title ?? remoteMessage.data?.title,
    body: remoteMessage.notification?.body ?? remoteMessage.data?.body,
    data: remoteMessage.data,
    android: {
      channelId: 'default',
      pressAction: {id: 'default'},
    },
  });
});

// Top-level, registered once — NOT inside setBackgroundMessageHandler
notifee.onBackgroundEvent(async ({type, detail}) => {
  if (type === EventType.PRESS) {
    Logger.log('Notifee background press', detail);
    const remoteMessage = {data: detail.notification?.data || {}};

    let attempts = 0;
    const tryNavigate = () => {
      if (navigationRef.isReady && navigationRef.isReady()) {
        handleNotificationNavigation(remoteMessage, navigationRef);
      } else if (attempts < 10) {
        attempts++;
        setTimeout(tryNavigate, 300);
      } else {
        Logger.log('navigationRef never became ready for background press');
      }
    };
    tryNavigate();
  }
});

database().setPersistenceEnabled(true);
AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => trackPlayerService);
