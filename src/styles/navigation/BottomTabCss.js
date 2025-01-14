import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../utils/constants/Metrics';
import {colorNine} from '../../utils/constants/color';

export const BottomTabCss = StyleSheet.create({
  tabBarLable: {
    fontFamily: 'Mukta-Bold',
    fontSize: moderateScale(17),
    marginBottom: verticalScale(2),
  },
  tabBar: {
    backgroundColor: colorNine,
    height: verticalScale(60),
  },
});
