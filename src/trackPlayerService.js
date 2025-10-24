import TrackPlayer, {Event} from 'react-native-track-player';
import Logger from './utils/logUtility/Logger';

module.exports = async function () {
  // Handle remote events for background/lock screen controls
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemoteStop, () => {
    TrackPlayer.stop();
  });

  TrackPlayer.addEventListener(Event.RemoteSeek, async event => {
    await TrackPlayer.seekTo(event.position);
  });

  // Handle playback events to keep service alive during sleep
  TrackPlayer.addEventListener(Event.PlaybackState, data => {
    Logger.log('Playback state changed:', data.state);
  });

  TrackPlayer.addEventListener(Event.PlaybackError, data => {
    Logger.error('Playback error:', data);
  });
};
