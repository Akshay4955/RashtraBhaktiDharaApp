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
  colorNine,
  colorTwo,
  textColor,
} from '../../utils/constants/color';

const Header = props => {
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

export default Header;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colorNine,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(20),
    marginVertical: verticalScale(8),
    borderWidth: moderateScale(1),
    borderColor: colorTwo,
    elevation: 5
  },
  headerText: {
    fontFamily: 'Mukta-Bold',
    fontSize: moderateScale(28),
    paddingHorizontal: horizontalScale(50),
    paddingVertical: verticalScale(6),
    color: textColor,
  },
});
