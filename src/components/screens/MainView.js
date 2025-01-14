import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import images from '../../assets/images';
import {
  colorFive,
  colorFourteen,
  colorTwelve,
} from '../../utils/constants/color';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/constants/Metrics';
import {
  JayatuHinduRashtram,
  ShriShivPratishthan,
  Slogan,
  WelComeToAPP,
} from '../../utils/constants/TextConstants';

const MainView = () => {
  return (
    <View style={styles.mainView}>
      <View style={styles.imageView}>
        <Image
          style={styles.image}
          source={images.maharaj}
          resizeMode="stretch"
        />
        <Image
          style={styles.image}
          source={images.maharaj2}
          resizeMode="stretch"
        />
      </View>
      <Image
        style={styles.image2}
        source={images.pratishthan}
        resizeMode="stretch"
      />
      <Text style={styles.header}>{JayatuHinduRashtram}</Text>
      <Text style={styles.mainText}>{ShriShivPratishthan}</Text>
      <Text style={styles.mainText}>{Slogan}</Text>
      <Text style={styles.header}>{WelComeToAPP}</Text>
    </View>
  );
};

export default MainView;

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
  },
  imageView: {
    flexDirection: 'row',
    paddingTop: verticalScale(16),
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  image: {
    height: verticalScale(140),
    width: horizontalScale(100),
    margin: moderateScale(12),
    borderColor: colorFive,
    borderWidth: moderateScale(4),
    borderRadius: moderateScale(10),
  },
  image2: {
    height: verticalScale(180),
    width: horizontalScale(180),
    borderColor: colorFive,
    borderWidth: moderateScale(4),
    borderRadius: moderateScale(10),
  },
  header: {
    fontFamily: 'Mukta-SemiBold',
    fontSize: moderateScale(20),
    color: colorTwelve,
    marginTop: verticalScale(10),
  },
  mainText: {
    fontFamily: 'Mukta-Bold',
    fontSize: moderateScale(28),
    color: colorFourteen,
    marginTop: verticalScale(6),
    elevation: moderateScale(12),
  },
});
