import remoteConfig from '@react-native-firebase/remote-config';
import React, {useEffect, useState} from 'react';
import {
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Feather';
import {
  backgroundColor,
  colorOne,
  colorSeven,
  colorSix,
  colorTwo,
  darkGray,
  greenColor,
  lighterGray,
  textColor,
} from '../../utils/constants/color';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/constants/Metrics';
import {PlayStoreURL} from '../../utils/constants/TextConstants';
import Logger from '../../utils/logUtility/Logger';

const UpdateModal = ({isVisible, onClose}) => {
  const [versionName, setVersionName] = useState(null);

  useEffect(() => {
    const remoteVersionName = remoteConfig()
      .getValue('version_name')
      .asString();
    if (remoteVersionName) {
      setVersionName(remoteVersionName);
    }
  });
  const handleUpdate = () => {
    try {
      Linking.openURL(PlayStoreURL);
    } catch (error) {
      Logger.error('error in opening play store URL');
    }
  };

  if (!isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Icon
              color={textColor}
              name={'download'}
              size={moderateScale(40)}
            />
          </View>
          <Text style={styles.title}>Update Available</Text>
          <Text style={styles.description}>
            तुमच्यासाठी अ‍ॅपचं नवीन वर्जन आलं आहे, ज्यामध्ये काही नवीन गोष्टी
            आणि सुधारणा आहेत.
          </Text>
        </View>
        <View style={styles.versionContainer}>
          <View style={styles.versionRow}>
            <Text style={styles.versionLabel}>Current Version : </Text>
            <Text style={styles.currentVersionText}>
              {DeviceInfo.getVersion()}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.versionRow}>
            <Text style={styles.versionLabel}>New Version : </Text>
            <View style={styles.newVersionContainer}>
              <Text style={styles.newVersionText}>
                {versionName || DeviceInfo.getVersion()}
              </Text>
              <View style={styles.newVersionDot} />
            </View>
          </View>
        </View>
        <View style={styles.featuresContainer}>
          <View style={styles.featureRow}>
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={styles.featureText}>
              Enhanced performance and stability
            </Text>
          </View>
          <View style={styles.featureRow}>
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={styles.featureText}>
              New features and improvements
            </Text>
          </View>
          <View style={styles.featureRow}>
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={styles.featureText}>
              Bug fixes and security updates
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleUpdate}
            activeOpacity={0.8}>
            <Text style={styles.updateButtonText}>Update Now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.laterButton}
            onPress={onClose}
            activeOpacity={0.7}>
            <Text style={styles.laterButtonText}>Remind Me Later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroundColor,
    borderRadius: moderateScale(20),
    marginHorizontal: horizontalScale(20),
    marginVertical: verticalScale(80),
    elevation: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 34,
    height: 34,
    borderRadius: moderateScale(18),
    backgroundColor: lighterGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: moderateScale(16),
    color: textColor,
    fontFamily: 'Mukta-ExtraBold',
  },
  header: {
    marginVertical: verticalScale(32),
    marginHorizontal: horizontalScale(24),
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: moderateScale(16),
    backgroundColor: colorSix,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(16),
    elevation: 8,
  },
  title: {
    fontSize: moderateScale(24),
    fontFamily: 'Mukta-Bold',
    color: textColor,
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  description: {
    fontSize: moderateScale(16),
    fontFamily: 'Mukta-Medium',
    color: textColor,
    textAlign: 'center',
  },
  versionContainer: {
    backgroundColor: colorOne,
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(24),
  },
  versionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(12),
    marginHorizontal: horizontalScale(20),
  },
  versionLabel: {
    fontSize: moderateScale(18),
    fontFamily: 'Mukta-Medium',
    color: textColor,
    marginRight: horizontalScale(30),
  },
  currentVersionText: {
    fontSize: moderateScale(18),
    fontFamily: 'Mukta-SemiBold',
    color: textColor,
    marginLeft: horizontalScale(30),
    marginRight: horizontalScale(16),
  },
  divider: {
    height: verticalScale(1),
    backgroundColor: lighterGray,
    marginVertical: verticalScale(6),
    marginHorizontal: horizontalScale(16),
  },
  newVersionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newVersionText: {
    fontSize: moderateScale(18),
    fontFamily: 'Mukta-SemiBold',
    color: greenColor,
    marginLeft: horizontalScale(30),
    marginRight: horizontalScale(8),
  },
  newVersionDot: {
    width: 8,
    height: 8,
    borderRadius: moderateScale(4),
    backgroundColor: greenColor,
  },
  featuresContainer: {
    paddingHorizontal: horizontalScale(24),
    marginBottom: verticalScale(24),
  },
  featureRow: {
    flexDirection: 'row',
    marginBottom: verticalScale(8),
  },
  starIcon: {
    fontSize: moderateScale(16),
    marginRight: horizontalScale(12),
  },
  featureText: {
    fontSize: moderateScale(14),
    fontFamily: 'Mukta-SemiBold',
    color: textColor,
  },
  buttonContainer: {
    paddingHorizontal: horizontalScale(24),
    paddingBottom: verticalScale(24),
  },
  updateButton: {
    backgroundColor: colorSeven,
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(10),
    alignItems: 'center',
    marginBottom: verticalScale(18),
    elevation: 8,
  },
  updateButtonText: {
    color: textColor,
    fontSize: moderateScale(18),
    fontFamily: 'Mukta-Bold',
  },
  laterButton: {
    backgroundColor: colorTwo,
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(12),
    alignItems: 'center',
  },
  laterButtonText: {
    color: darkGray,
    fontSize: moderateScale(16),
    fontFamily: 'Mukta-SemiBold',
  },
});

export default UpdateModal;
