import React, {useRef} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Linking,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useFirebaseData} from '../../navigation/FirebaseProvider';
import {ListCss as styles} from '../../styles/screens/ListCss';
import {colorNine, colorThree, textColor} from '../../utils/constants/color';
import {moderateScale} from '../../utils/constants/Metrics';
import {Headers} from '../../utils/constants/TextConstants';
import CustomBannerAd from '../common/CustomBannerAd';
import ListHeader from '../common/ListHeader';

const BooksList = () => {
  const flatListRef = useRef(null);
  const {firebaseData} = useFirebaseData();
  const BooksData = firebaseData?.Books || [];

  const handleDownload = downloadURL => {
    if (typeof downloadURL === 'string' && downloadURL.trim() !== '') {
      Linking.openURL(`googlechrome://navigate?url=${downloadURL}`);
    }
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => {}}>
        <LinearGradient
          style={styles.bookListView}
          colors={[colorThree, colorNine]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Icon name={'book'} size={moderateScale(36)} color={textColor} />
          <View style={styles.bookListTextView}>
            <Text style={[styles.listText, {fontSize: moderateScale(16)}]}>
              {item?.title}
            </Text>
            <Text style={[styles.listText, {fontSize: moderateScale(14)}]}>
              - {item?.author}
            </Text>
          </View>
          {item?.link ? (
            <Icon
              name={'download'}
              size={moderateScale(36)}
              color={textColor}
              onPress={() => handleDownload(item?.link)}
            />
          ) : null}
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <ListHeader header={Headers.Books} />
      {BooksData?.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={BooksData}
          keyExtractor={item => item?.title}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={12}
          windowSize={10}
          ListFooterComponent={<View style={styles.footer} />}
          ListEmptyComponent={
            <ActivityIndicator size={'large'} color={colorNine} />
          }
        />
      ) : (
        <ActivityIndicator size={'large'} color={colorNine} />
      )}
      <CustomBannerAd />
    </SafeAreaView>
  );
};

export default BooksList;
