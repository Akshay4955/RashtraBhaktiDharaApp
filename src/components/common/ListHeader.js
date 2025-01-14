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
  colorFour,
  colorTwelve,
  textColor,
} from '../../utils/constants/color';

const ListHeader = props => {
  return (
    <LinearGradient
      colors={[colorEleven, colorFour]}
      style={styles.mainView}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <Text style={styles.headerText}>{props.header}</Text>
    </LinearGradient>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(20),
    marginVertical: verticalScale(20),
    marginHorizontal: horizontalScale(40),
    elevation: moderateScale(12),
    borderColor: colorTwelve,
    borderWidth: moderateScale(2),
  },
  headerText: {
    fontFamily: 'Mukta-Bold',
    fontSize: moderateScale(28),
    paddingHorizontal: horizontalScale(50),
    marginVertical: verticalScale(4),
    color: textColor,
  },
});
