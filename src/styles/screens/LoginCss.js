import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../utils/constants/Metrics';
import {
  backgroundColor,
  colorNine,
  colorSix,
} from '../../utils/constants/color';

export const LoginCss = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: backgroundColor,
  },
  loginText: {
    fontFamily: 'Mukta-Bold',
    fontSize: moderateScale(16),
    padding: moderateScale(8),
    marginTop: verticalScale(12),
    color: colorNine,
  },
  signInButton: {
    marginVertical: moderateScale(12),
    elevation: moderateScale(20),
    backgroundColor: colorSix,
    borderRadius: moderateScale(12),
  },
});
