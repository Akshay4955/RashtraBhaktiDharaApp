import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Linking, SafeAreaView, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import {moderateScale, verticalScale} from '../../utils/constants/Metrics';
import {
  colorFive,
  colorThree,
  redColor,
  textColor,
} from '../../utils/constants/color';
import CustomButton from '../common/CustomButton';

const NoInternet = () => {
  const navigation = useNavigation();

  const handleGoToSettings = () => {
    Linking.sendIntent('android.settings.SETTINGS');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        style={styles.gradientView}
        colors={[colorThree, colorFive]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}>
        <Icon
          color={redColor}
          name={'alert-triangle'}
          size={moderateScale(80)}
        />

        <Text style={styles.title}>इंटरनेट कनेक्शन नाही</Text>
        <Text style={styles.subtitle}>
          कृपया तुमचे इंटरनेट कनेक्शन तपासा आणि पुन्हा प्रयत्न करा.
        </Text>
        <CustomButton title={'सेटिंग्जमध्ये जा'} onPress={handleGoToSettings} />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default NoInternet;

const styles = StyleSheet.create({
  gradientView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: moderateScale(7),
  },
  title: {
    fontSize: moderateScale(22),
    fontFamily: 'Mukta-Bold',
    color: redColor,
    marginVertical: verticalScale(14),
  },
  subtitle: {
    fontSize: moderateScale(15),
    color: textColor,
    textAlign: 'center',
    marginBottom: verticalScale(50),
  },
});
