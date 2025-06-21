/**
 * @format
 */

import database from '@react-native-firebase/database';
import {AppRegistry} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {name as appName} from './app.json';
import App from './src/App';
import trackPlayerService from './src/trackPlayerService';

database().setPersistenceEnabled(true);
AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => trackPlayerService);
