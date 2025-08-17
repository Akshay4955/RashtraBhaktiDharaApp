import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/constants/Metrics';
import {
  colorEight,
  colorOne,
  textColor,
  white,
} from '../../utils/constants/color';

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
  buttonContainer: {
    width: '90%',
    marginVertical: verticalScale(20),
    marginBottom: verticalScale(60),
  },
  contactButton: {
    backgroundColor: colorEight,
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(80),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    elevation: moderateScale(3),
    shadowColor: textColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  contactButtonText: {
    color: white,
    fontSize: moderateScale(20),
    fontFamily: 'Mukta-Bold',
  },
  whatsappIcon: {
    width: horizontalScale(50),
    height: verticalScale(50),
  },
});
