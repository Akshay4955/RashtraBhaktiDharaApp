import React from 'react';
import {
  Alert,
  Button,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../../assets/images';
import {useAuth} from '../../../navigation/AuthenticationProvider';
import {ProfileCss} from '../../../styles/screens/ProfileCss';
import {colorEleven, colorFour} from '../../../utils/constants/color';
import Logger from '../../../utils/logUtility/Logger';
import Header from '../Header';

const Profile = () => {
  const {signOut, user} = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      Logger.error(error);
    }
  };

  const handleContactUs = () => {
    const phoneNumber = '+919270437251';
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}`;

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
    <View style={ProfileCss.mainView}>
      <Header header={'प्रोफाइल'} />
      <Image
        style={ProfileCss.image}
        source={{
          uri: user?.photoURL,
        }}
      />
      <View style={ProfileCss.detailView}>
        <Text style={ProfileCss.detailText}>Name: {user?.displayName}</Text>
        <Text style={ProfileCss.detailText}>Email: {user?.email}</Text>
        <Text style={ProfileCss.detailText}>
          Phone Number: {user?.phoneNumber}
        </Text>
      </View>
      <TouchableOpacity
        style={ProfileCss.buttonContainer}
        onPress={handleContactUs}
        activeOpacity={0.9}>
        <LinearGradient
          colors={[colorEleven, colorFour]}
          style={ProfileCss.contactButton}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Image source={images.whatsapp} style={ProfileCss.whatsappIcon} />
          <Text style={ProfileCss.contactButtonText}>संपर्क करा</Text>
        </LinearGradient>
      </TouchableOpacity>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Profile;
