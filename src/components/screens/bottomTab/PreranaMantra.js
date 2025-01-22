import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, SafeAreaView, Text, View} from 'react-native';
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

const PreranaMantra = () => {
  const {firebaseData} = useFirebaseData();
  const data = firebaseData?.PreranaMantra;
  const formattedData = formatData(data);
  const navigation = useNavigation();
  const URL =
    'https://firebasestorage.googleapis.com/v0/b/rashtrabhaktidharaapp.appspot.com/o/PreranaMantra.mpeg?alt=media&token=9c184609-e2bb-437c-afcc-5fb693fff50b';
  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        style={styles.mainView}
        colors={[colorThree, colorTen]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}>
        <Header header={Headers.PreranaMantra} />
        {data ? (
          <View style={[styles.contentView, {justifyContent: 'space-between'}]}>
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
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </SafeAreaView>
  );
};

export default PreranaMantra;
