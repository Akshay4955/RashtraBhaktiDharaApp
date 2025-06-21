import React from 'react';
import {StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/constants/Metrics';
import {
  colorEleven,
  colorTen,
  colorThree,
  textColor,
} from '../../utils/constants/color';

const PoemHeader = props => {
  return (
    <LinearGradient
      colors={[colorTen, colorThree]}
      style={styles.mainView}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <Text style={styles.headerText}>{props.header}</Text>
    </LinearGradient>
  );
};

export default PoemHeader;

const styles = StyleSheet.create({
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(18),
    marginVertical: verticalScale(12),
    borderColor: colorEleven,
    borderWidth: moderateScale(1),
    elevation: moderateScale(12),
  },
  headerText: {
    fontFamily: 'Mukta-Bold',
    fontSize: moderateScale(26),
    paddingHorizontal: horizontalScale(24),
    color: textColor,
  },
});
