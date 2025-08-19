import React, {useState} from 'react';
import {
  Alert,
  Image,
  Linking,
  ScrollView,
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
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [area, setArea] = useState('');
  const [message, setMessage] = useState('');

  const handleContactUs = () => {
    const phoneNumber = '+919270437251';

    // Validation: Check if all required fields are filled
    if (!name.trim()) {
      Alert.alert('नाव आवश्यक आहे', 'कृपया तुमचे नाव टाका', [
        {text: 'ठीक आहे', style: 'default'},
      ]);
      return;
    }

    if (!mobileNumber.trim()) {
      Alert.alert('मोबाईल नंबर आवश्यक आहे', 'कृपया तुमचा मोबाईल नंबर टाका', [
        {text: 'ठीक आहे', style: 'default'},
      ]);
      return;
    }

    // Basic mobile number validation (10 digits)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobileNumber.trim())) {
      Alert.alert('चुकीचा मोबाईल नंबर', 'कृपया योग्य मोबाईल नंबर टाका', [
        {text: 'ठीक आहे', style: 'default'},
      ]);
      return;
    }

    if (!area.trim()) {
      Alert.alert('विभाग आवश्यक आहे', 'कृपया तुमचा विभाग टाका', [
        {text: 'ठीक आहे', style: 'default'},
      ]);
      return;
    }

    // Create detailed message with user information
    const userMessage = message.trim() || '🙏 नमस्कार';
    const detailedMessage = `
      नाव: ${name.trim()}
      मोबाईल: ${mobileNumber.trim()}
      विभाग: ${area.trim()}
      संदेश: ${userMessage}`;

    // Create WhatsApp URL with the detailed message
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      detailedMessage,
    )}`;

    Linking.canOpenURL(whatsappUrl)
      .then(supported => {
        if (supported) {
          return Linking.openURL(whatsappUrl);
        } else {
          Alert.alert(
            'WhatsApp इंस्टॉल नाही',
            'तुमच्या फोनमध्ये WhatsApp इंस्टॉल नाही. कृपया आमच्याशी संपर्क साधण्यासाठी WhatsApp इंस्टॉल करा.',
            [
              {
                text: 'ठीक आहे',
                style: 'default',
              },
            ],
          );
        }
      })
      .catch(err => {
        Logger.error('Error opening WhatsApp:', err);
        Alert.alert(
          'Error',
          'WhatsApp उघडण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.',
        );
      });
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.buttonContainer}>
        <TextInput
          placeholder="नाव *"
          style={styles.singleLineInput}
          value={name}
          onChangeText={setName}
          maxLength={50}
        />
        <TextInput
          placeholder="मोबाईल नंबर *"
          style={styles.singleLineInput}
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="phone-pad"
          maxLength={10}
        />
        <TextInput
          placeholder="विभाग *"
          style={styles.singleLineInput}
          value={area}
          onChangeText={setArea}
          maxLength={100}
        />
        <TextInput
          placeholder="तुमचा संदेश येथे लिहा ..."
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
    </ScrollView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: verticalScale(30),
    paddingBottom: verticalScale(30),
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
    height: verticalScale(120), // Fixed height for message box
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
  singleLineInput: {
    width: '90%',
    height: verticalScale(50), // Fixed height for single line inputs
    padding: moderateScale(12),
    borderWidth: moderateScale(1),
    borderColor: colorEight,
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(12),
    fontSize: moderateScale(16),
    fontFamily: 'Mukta-Regular',
    color: textColor,
    backgroundColor: white,
  },
});
