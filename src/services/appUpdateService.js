import remoteConfig from '@react-native-firebase/remote-config';
import DeviceInfo from 'react-native-device-info';

export const checkUpdateAvailability = () => {
  const remoteVersionCode = remoteConfig().getValue('version_code').asNumber();
  const infoVersionCode = DeviceInfo.getBuildNumber();
  if (infoVersionCode < remoteVersionCode) {
    return true;
  } else {
    return false;
  }
};
