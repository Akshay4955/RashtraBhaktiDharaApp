import TrackPlayer, {Capability} from 'react-native-track-player';
import Logger from '../utils/logUtility/Logger';

let isInitialized = false;

export const setupTrackPlayer = async () => {
  if (isInitialized) return;

  try {
    // Setup the player with proper configuration for background play
    await TrackPlayer.setupPlayer({
      // Minimum buffer time before playback starts or resumes
      minBuffer: 15,
      // Maximum buffer time
      maxBuffer: 50,
      // Playback will continue after interruptions
      playback: {
        automaticallyWaitsToMinimizeStalling: true,
      },
    });

    // Configure capabilities and notification for sleep mode/background
    await TrackPlayer.updateOptions({
      // Which buttons to show in the media controls
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
        Capability.SeekTo,
      ],
      // Capabilities for the compact media notification (lock screen)
      compactCapabilities: [Capability.Play, Capability.Pause],
      // Notification config for background/lock screen
      notificationCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
      ],
      // Show progress bar in notification
      progressUpdateEventInterval: 1,
      // Keep service alive in background
      stopWithApp: false,
    });

    isInitialized = true;
    Logger.log('TrackPlayer initialized with background support');
  } catch (err) {
    Logger.error('Error initializing TrackPlayer:', err);
    throw err;
  }
};
