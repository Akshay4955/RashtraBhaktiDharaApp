import {
  clearAllDataFromLocal,
  getDataFromLocal,
  storeDataToLocal,
} from './KeychainStorage';

export const setLoggedInStatus = data => {
  storeDataToLocal('LoggedInStatus', data);
};

export const getLoggedInStatus = async () => {
  await getDataFromLocal('LoggedInStatus');
};

export const setUser = data => {
  storeDataToLocal('User', data);
};

export const getUser = async () => {
  await getDataFromLocal('User');
};

export const removeLocalData = () => {
  clearAllDataFromLocal();
};
