import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, SafeAreaView, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useFirebaseData} from '../../../navigation/FirebaseProvider';
import {HomeCss as styles} from '../../../styles/screens/HomeCss';
import {formatData} from '../../../utils/commonUtils';
import {colorOne, colorTen, colorThree} from '../../../utils/constants/color';
import {verticalScale} from '../../../utils/constants/Metrics';
import {Headers} from '../../../utils/constants/TextConstants';
import CustomBannerAd from '../../common/CustomBannerAd';
import CustomButton from '../../CustomButton';
import Header from '../Header';

const DhyeyaMantra = () => {
  const {firebaseData} = useFirebaseData();
  const data = firebaseData?.DhyeyaMantra;
  const formattedData = formatData(data);
  const navigation = useNavigation();
  const URL = firebaseData?.DhyeyaMantraAudio;
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomBannerAd />
      <LinearGradient
        style={styles.mainView}
        colors={[colorThree, colorTen]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}>
        <Header header={Headers.DhyeyaMantra} />
        {data ? (
          <View
            style={[
              styles.contentView,
              {
                justifyContent: 'space-between',
                paddingBottom: verticalScale(18),
              },
            ]}>
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
          </View>
        ) : (
          <ActivityIndicator size={'large'} color={colorOne} />
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default DhyeyaMantra;
