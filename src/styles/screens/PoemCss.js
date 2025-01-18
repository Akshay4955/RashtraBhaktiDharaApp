import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
  windowWidth,
} from '../../utils/constants/Metrics';
import {
  colorFourteen,
  colorOne,
  colorTwelve,
  textColor,
} from '../../utils/constants/color';

export const PoemCss = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    padding: moderateScale(10),
  },
  searchInput: {
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: textColor,
    padding: moderateScale(8),
    marginVertical: moderateScale(10),
    color: textColor,
    fontSize: moderateScale(16),
  },
  sectionHeader: {
    fontSize: moderateScale(18),
    fontFamily: 'Mukta-Bold',
    color: textColor,
    marginVertical: moderateScale(10),
    textAlign: 'center',
  },
  contentText: {
    fontFamily: 'Mukta-Bold',
    fontSize: moderateScale(19),
    color: textColor,
    textAlign: 'center',
  },
  highlight: {
    backgroundColor: 'yellow',
    fontFamily: 'Mukta-Bold',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
    marginTop: moderateScale(6),
  },
  arrow: {
    padding: moderateScale(1),
  },
  stanzaSpacing: {
    marginVertical: verticalScale(12),
  },
  backButton: {alignSelf: 'flex-start'},
  searchView: {
    position: 'absolute',
    left: windowWidth - horizontalScale(50),
    backgroundColor: textColor,
    padding: moderateScale(8),
    borderRadius: moderateScale(4),
    opacity: 0.8,
    alignItems: 'center',
  },
  searchText: {color: colorOne, fontFamily: 'Mukta-Regular'},
  eventTitle: {
    fontFamily: 'Mukta-Bold',
    fontSize: moderateScale(22),
    color: colorFourteen,
    textAlign: 'center',
  },
  eventSubTitle: {
    fontFamily: 'Mukta-Bold',
    fontSize: moderateScale(20),
    color: colorTwelve,
    textAlign: 'center',
  },
  eventData: {
    fontFamily: 'Mukta-Bold',
    fontSize: moderateScale(16),
    color: textColor,
    textAlign: 'center',
  },
});
