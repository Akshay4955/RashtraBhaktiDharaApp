import {PermissionsAndroid, Platform} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Logger from '../utils/logUtility/Logger';

let isInitialized = false;

export const setupTrackPlayer = async () => {
  if (isInitialized) return;

  try {
    await TrackPlayer.setupPlayer();
    isInitialized = true;
    Logger.log('TrackPlayer initialized');
  } catch (err) {
    Logger.error('Error initializing TrackPlayer:', err);
  }
};

export const requestNotificationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};
