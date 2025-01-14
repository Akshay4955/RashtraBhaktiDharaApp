import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/constants/Metrics';
import {textColor} from '../../utils/constants/color';

export const ProfileCss = StyleSheet.create({
  image: {
    height: verticalScale(150),
    width: horizontalScale(150),
    borderRadius: moderateScale(70),
  },
  detailView: {
    flex: 1,
    margin: moderateScale(12),
    alignSelf: 'flex-start',
  },
  detailText: {
    fontFamily: 'Mukta-Bold',
    fontSize: moderateScale(17),
    color: textColor,
    marginTop: verticalScale(12),
  },
});
