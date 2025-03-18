import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, SafeAreaView, Text, View} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import LinearGradient from 'react-native-linear-gradient';
import {useFirebaseData} from '../../../navigation/FirebaseProvider';
import {HomeCss as styles} from '../../../styles/screens/HomeCss';
import {formatData} from '../../../utils/commonUtils';
import {colorOne, colorTen, colorThree} from '../../../utils/constants/color';
import {verticalScale} from '../../../utils/constants/Metrics';
import {Headers} from '../../../utils/constants/TextConstants';
import CustomButton from '../../CustomButton';
import Header from '../Header';

const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : 'ca-app-pub-2249316745492384/6186159072';

const PreranaMantra = () => {
  const {firebaseData} = useFirebaseData();
  const data = firebaseData?.PreranaMantra;
  const formattedData = formatData(data);
  const navigation = useNavigation();
  const URL = firebaseData?.PreranaMantraAudio;
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      /> */}
      <LinearGradient
        style={styles.mainView}
        colors={[colorThree, colorTen]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}>
        <Header header={Headers.PreranaMantra} />
        {data ? (
          <View
            style={[
              styles.contentView,
              {
                justifyContent: 'space-between',
                paddingBottom: verticalScale(14),
              },
            ]}>
            <Text style={styles.contentText}>{formattedData}</Text>
            <CustomButton
              onPress={() =>
                navigation.navigate('Audio', {
                  url: URL,
                  title: Headers.PreranaMantra,
                })
              }
              title={'संगीतबद्ध श्लोक ऐका'}
            />
          </View>
        ) : (
          <ActivityIndicator size={'large'} color={colorOne} />
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default PreranaMantra;
