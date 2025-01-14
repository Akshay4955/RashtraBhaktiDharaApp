const isDebug = __DEV__;

const Logger = {
  log: (...args) => {
    if (isDebug) {
      console.log(...args);
    }
  },
  warn: (...args) => {
    if (isDebug) {
      console.warn(...args);
    }
  },
  error: (...args) => {
    if (isDebug) {
      console.error(...args);
    } else {
      //To do need to log in firebase
    }
  },
  info: (...args) => {
    if (isDebug) {
      console.info(...args);
    }
  },
};

export default Logger;
