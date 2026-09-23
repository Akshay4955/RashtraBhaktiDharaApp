import {useEffect, useState} from 'react';
import {
  getRemoteConfigBoolean,
  subscribeToRemoteConfigActivation,
} from '../services/remoteConfigService';

/**
 * Reads a boolean Remote Config value and re-renders when a new config is
 * activated (app start, returning to foreground, or real-time update).
 */
const useRemoteConfigBoolean = key => {
  const [value, setValue] = useState(() => getRemoteConfigBoolean(key));

  useEffect(() => {
    setValue(getRemoteConfigBoolean(key));
    return subscribeToRemoteConfigActivation(() =>
      setValue(getRemoteConfigBoolean(key)),
    );
  }, [key]);

  return value;
};

export default useRemoteConfigBoolean;
