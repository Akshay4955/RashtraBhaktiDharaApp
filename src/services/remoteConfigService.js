import remoteConfig from '@react-native-firebase/remote-config';

export const RemoteConfigKeys = {
  SHOW_PARAYAN: 'show_parayan',
};

export const REMOTE_CONFIG_DEFAULTS = {
  version_code: 17,
  [RemoteConfigKeys.SHOW_PARAYAN]: true,
};

const activationListeners = new Set();

/** Call after every successful activate() so subscribed UI re-reads values. */
export const notifyRemoteConfigActivated = () => {
  activationListeners.forEach(listener => listener());
};

export const subscribeToRemoteConfigActivation = listener => {
  activationListeners.add(listener);
  return () => activationListeners.delete(listener);
};

export const getRemoteConfigBoolean = key => {
  const value = remoteConfig().getValue(key);
  // 'static' means neither a fetched value nor our defaults are active yet
  // (setDefaults runs asynchronously at startup) — use the local default
  // instead of the SDK's `false`.
  if (value.getSource() === 'static') {
    return REMOTE_CONFIG_DEFAULTS[key] ?? false;
  }
  return value.asBoolean();
};
