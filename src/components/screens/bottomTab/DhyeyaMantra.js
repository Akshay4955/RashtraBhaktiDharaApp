import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, Text} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import LinearGradient from 'react-native-linear-gradient';
import {useFirebaseData} from '../../../navigation/FirebaseProvider';
import {HomeCss as styles} from '../../../styles/screens/HomeCss';
import {formatData} from '../../../utils/commonUtils';
import {colorOne, colorTen, colorThree} from '../../../utils/constants/color';
import {Headers} from '../../../utils/constants/TextConstants';
import CustomButton from '../../CustomButton';
import Header from '../Header';

const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : 'ca-app-pub-2249316745492384~3871687625';
const DhyeyaMantra = () => {
  const {firebaseData} = useFirebaseData();
  const data = firebaseData?.DhyeyaMantra;
  const formattedData = formatData(data);
  const navigation = useNavigation();
  const URL =
    'https://firebasestorage.googleapis.com/v0/b/rashtrabhaktidharaapp.appspot.com/o/DhyeyaMantra.mpeg?alt=media&token=38540484-8399-4c3d-8608-4d55d83c49a0';
  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        style={styles.mainView}
        colors={[colorThree, colorTen]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}>
        <Header header={Headers.DhyeyaMantra} />
        {data ? (
          <ScrollView
            style={styles.contentView}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.contentText}>{formattedData}</Text>
            <CustomButton
              onPress={() =>
                navigation.navigate('Audio', {
                  url: URL,
                  title: Headers.DhyeyaMantra,
                })
              }
              title={'संगीतबद्ध श्लोक ऐका'}
            />
          </ScrollView>
        ) : (
          <ActivityIndicator size={'large'} color={colorOne} />
        )}
      </LinearGradient>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </SafeAreaView>
  );
};

export default DhyeyaMantra;
