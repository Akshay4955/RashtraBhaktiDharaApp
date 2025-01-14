import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  colorOne,
  colorSix,
  colorTwelve,
  textColor,
} from '../utils/constants/color';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utils/constants/Metrics';

const CustomButton = props => {
  const {onPress, title} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        style={styles.mainView}
        colors={[colorSix, colorTwelve]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}>
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(1),
    borderColor: colorOne,
    marginHorizontal: horizontalScale(60),
  },
  text: {
    fontFamily: 'Mukta-Bold',
    fontSize: moderateScale(16),
    paddingVertical: verticalScale(10),
    color: textColor,
  },
});
