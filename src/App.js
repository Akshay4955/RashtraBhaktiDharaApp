import remoteConfig from '@react-native-firebase/remote-config';
import React, {useEffect} from 'react';
import Index from './navigation/Index';

const App = () => {
  useEffect(() => {
    const fetchRemoteConfig = async () => {
      await remoteConfig()
        .setDefaults({
          version_code: 17,
        })
        .then(() => remoteConfig().fetchAndActivate())
        .then(fetchedRemotely => {
          if (fetchedRemotely) {
            console.log(
              'Configs were retrieved from the backend and activated.',
            );
          } else {
            console.log(
              'No configs were fetched from the backend, and the local configs were already activated',
            );
          }
        });
    };

    fetchRemoteConfig();
  }, []);
  return <Index />;
};

export default App;
