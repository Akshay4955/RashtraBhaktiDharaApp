import database from '@react-native-firebase/database';
import { useEffect, useState } from 'react';
import Logger from '../utils/logUtility/Logger';

const FirebaseViewModel = () => {
  const [firebaseData, setFirebaseData] = useState(null);

  useEffect(() => {
    const reference = database().ref('/GlobalData');

    const onValueChange = snapshot => {
      setFirebaseData(snapshot.val());
    };

    const handleError = err => {
      Logger.log('Firebase Error:', err);
      setFirebaseData(null);
    };

    reference.on('value', onValueChange, handleError);

    setTimeout(() => {
      reference.off('value', onValueChange);
    }, 12000);
  }, []);

  return {
    firebaseData,
  };
};

export default FirebaseViewModel;
