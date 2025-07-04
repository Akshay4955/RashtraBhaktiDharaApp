import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/constants/Metrics';
import {
  backgroundColor,
  colorEleven,
  colorFifteen,
  colorNine,
  colorOne,
  colorTen,
  colorThirteen,
  colorTwo,
  textColor,
} from '../../utils/constants/color';

export const MainPageCss = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colorOne,
  },
  mainText: {
    fontFamily: 'Mukta-Bold',
    fontSize: moderateScale(24),
    color: colorThirteen,
    alignSelf: 'center',
    elevation: 12,
  },
  headerView: {
    justifyContent: 'space-between',
  },
  imageView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: horizontalScale(10),
  },
  logoImage: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    height: verticalScale(100),
    width: horizontalScale(110),
    marginVertical: moderateScale(6),
    borderColor: colorNine,
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(10),
  },
  image2: {
    height: verticalScale(150),
    width: horizontalScale(100),
    marginVertical: moderateScale(6),
    borderColor: colorNine,
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(10),
  },
  header: {
    fontFamily: 'Mukta-Bold',
    alignSelf: 'center',
    fontSize: moderateScale(22),
    color: colorEleven,
    marginVertical: verticalScale(6),
  },
  subtitle: {
    fontFamily: 'Mukta-Bold',
    fontSize: moderateScale(18),
    color: colorTen,
    marginVertical: verticalScale(6),
  },
  info: {
    fontFamily: 'Mukta-Medium',
    fontSize: moderateScale(14),
    color: textColor,
    marginVertical: verticalScale(6),
  },
  loader: {
    marginTop: verticalScale(140),
  },
  bannerView: {
    alignItems: 'center',
  },
  bannerImage: {
    width: horizontalScale(360),
    height: verticalScale(280),
    borderRadius: moderateScale(10),
    borderColor: colorNine,
    borderWidth: moderateScale(2),
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: verticalScale(30),
    right: horizontalScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoView: {
    alignItems: 'center',
    margin: moderateScale(6),
    borderRadius: moderateScale(12),
    padding: moderateScale(6),
    backgroundColor: colorOne,
  },
  eventContainer: {
    height: verticalScale(180),
    backgroundColor: colorTwo,
    padding: moderateScale(12),
    margin: moderateScale(10),
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(2),
    borderColor: colorFifteen,
    overflow: 'hidden',
  },
});
