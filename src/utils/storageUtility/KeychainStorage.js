import * as Keychain from 'react-native-keychain';
import {Logger as logger} from '../logUtility/Logger';

export const storeDataToLocal = async (key, value) => {
  try {
    const jsonValue = typeof value === 'string' ? value : JSON.stringify(value);
    await Keychain.setGenericPassword(key, jsonValue, {service: key});
  } catch (e) {
    logger.error(e);
  }
};

export const getDataFromLocal = async key => {
  try {
    const credentials = await Keychain.getGenericPassword({service: key});
    if (credentials) {
      try {
        return JSON.parse(credentials.password);
      } catch (e) {
        return credentials.password;
      }
    } else {
      return null;
    }
  } catch (e) {
    logger.error(e);
    return null;
  }
};

export const removeDataFromLocal = async key => {
  try {
    await Keychain.resetGenericPassword({service: key});
  } catch (e) {
    logger.error(e);
  }
};

export const clearAllDataFromLocal = async () => {
  try {
    const keys = await Keychain.getAllGenericPasswordServices();
    for (const key of keys) {
      await Keychain.resetGenericPassword({service: key});
    }
  } catch (e) {
    logger.error(e);
  }
};

export default {
  storeDataToLocal,
  getDataFromLocal,
  removeDataFromLocal,
  clearAllDataFromLocal,
};
