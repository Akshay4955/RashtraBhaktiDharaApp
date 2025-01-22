import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../utils/constants/Metrics';
import {colorEight, colorOne, textColor} from '../../utils/constants/color';

export const HomeCss = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colorOne,
    borderColor: colorEight,
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(12),
    margin: moderateScale(8),
    elevation: moderateScale(7),
  },
  contentView: {flex: 1},
  contentText: {
    fontFamily: 'Mukta-Bold',
    fontSize: moderateScale(17),
    color: textColor,
    marginTop: verticalScale(12),
    textAlign: 'center',
    lineHeight: verticalScale(30),
  },
});
