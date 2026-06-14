import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {useFirebaseData} from '../../navigation/FirebaseProvider';
import {ListCss as styles} from '../../styles/screens/ListCss';
import {Headers} from '../../utils/constants/TextConstants';
import ListHeader from '../common/ListHeader';

const BooksList = () => {
  const navigation = useNavigation();
  const {firebaseData} = useFirebaseData();

  return (
    <SafeAreaView style={styles.mainView}>
      <ListHeader header={Headers.Books} />
    </SafeAreaView>
  );
};

export default BooksList;
