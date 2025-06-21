import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/constants/Metrics';
import {colorEight, colorOne, textColor} from '../../utils/constants/color';

export const ProfileCss = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colorOne,
    borderColor: colorEight,
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(12),
    margin: moderateScale(8),
    paddingTop: verticalScale(30),
    elevation: moderateScale(7),
  },
  image: {
    height: verticalScale(150),
    width: horizontalScale(150),
    borderRadius: moderateScale(70),
    marginVertical: verticalScale(16),
  },
  detailView: {
    marginVertical: moderateScale(40),
    alignSelf: 'flex-start',
    marginLeft: horizontalScale(12),
  },
  detailText: {
    fontFamily: 'Mukta-Bold',
    fontSize: moderateScale(17),
    color: textColor,
    marginTop: verticalScale(12),
  },
});
