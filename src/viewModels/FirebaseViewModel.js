import database from '@react-native-firebase/database';
import {useEffect, useState} from 'react';
import Logger from '../utils/logUtility/Logger';

const FirebaseViewModel = () => {
  const [firebaseData, setFirebaseData] = useState(null);
  useEffect(() => {
    const reference = database().ref('/GlobalData');

    const onValueChange = snapshot => {
      setFirebaseData(snapshot.val());
    };

    const handleError = err => {
      Logger.log('Error:', err);
      setFirebaseData([]);
    };

    reference.on('value', onValueChange, handleError);

    setTimeout(() => {
      reference.off('value', onValueChange);
    }, 5000);
  }, []);
  return {
    firebaseData,
  };
};

export default FirebaseViewModel;
