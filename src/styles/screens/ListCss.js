import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/constants/Metrics';
import {
  colorEleven,
  colorOne,
  colorTwo,
  textColor,
} from '../../utils/constants/color';

export const ListCss = StyleSheet.create({
  mainView: {flex: 1, backgroundColor: colorOne},
  listView: {
    padding: moderateScale(16),
    paddingLeft: horizontalScale(25),
    borderWidth: verticalScale(1),
    borderColor: colorEleven,
    borderRadius: moderateScale(28),
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: verticalScale(6),
  },
  listViewAudio: {
    padding: moderateScale(8),
    paddingLeft: horizontalScale(20),
    borderWidth: verticalScale(2),
    borderColor: colorEleven,
    borderRadius: moderateScale(28),
    flexDirection: 'row',
    margin: verticalScale(6),
    justifyContent: 'space-between',
    backgroundColor: colorTwo,
  },
  listText: {
    fontFamily: 'Mukta-Bold',
    fontSize: moderateScale(17),
    color: textColor,
    marginHorizontal: horizontalScale(6),
  },
  footer: {
    marginVertical: verticalScale(6),
  },
  searchInput: {
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: textColor,
    padding: moderateScale(8),
    marginHorizontal: moderateScale(12),
    marginBottom: verticalScale(10),
    color: textColor,
    fontSize: moderateScale(16),
  },
});
