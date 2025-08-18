import React, { useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import images from '../../assets/images';
import {
  colorEight,
  colorEleven,
  colorFour,
  textColor,
  white,
} from '../../utils/constants/color';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/constants/Metrics';
import Logger from '../../utils/logUtility/Logger';

const ContactUs = () => {
  const [message, setMessage] = useState('');

  const handleContactUs = () => {
    const phoneNumber = '+919270437251';

    // Use default greeting if no message is entered, otherwise use the entered message
    const messageToSend = message.trim() || '🙏 नमस्कार';

    // Create WhatsApp URL with the message
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      messageToSend,
    )}`;

    Linking.canOpenURL(whatsappUrl)
      .then(supported => {
        if (supported) {
          return Linking.openURL(whatsappUrl);
        } else {
          Alert.alert(
            'WhatsApp Not Installed',
            'WhatsApp is not installed on your device. Please install WhatsApp to contact us.',
            [
              {
                text: 'OK',
                style: 'default',
              },
            ],
          );
        }
      })
      .catch(err => {
        Logger.error('Error opening WhatsApp:', err);
        Alert.alert('Error', 'Failed to open WhatsApp. Please try again.');
      });
  };
  return (
    <View style={styles.buttonContainer}>
      <TextInput
        placeholder="आपला संदेश येथे लिहा ....!!!!"
        style={styles.input}
        multiline
        value={message}
        onChangeText={setMessage}
        textAlignVertical="top"
      />
      <TouchableOpacity onPress={handleContactUs} activeOpacity={0.9}>
        <LinearGradient
          colors={[colorEleven, colorFour]}
          style={styles.contactButton}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Image source={images.whatsapp} style={styles.whatsappIcon} />
          <Text style={styles.contactButtonText}>संदेश पाठवा</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: verticalScale(30),
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
  whatsappIcon: {
    width: horizontalScale(50),
    height: verticalScale(50),
  },
  contactButtonText: {
    color: white,
    fontSize: moderateScale(20),
    fontFamily: 'Mukta-Bold',
  },
  input: {
    width: '90%',
    height: verticalScale(150), // Fixed height
    padding: moderateScale(12),
    borderWidth: moderateScale(1),
    borderColor: colorEight,
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(16),
    fontSize: moderateScale(16),
    fontFamily: 'Mukta-Regular',
    color: textColor,
    backgroundColor: white,
  },
});
