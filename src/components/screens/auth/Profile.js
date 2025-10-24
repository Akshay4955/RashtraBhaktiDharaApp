import React from 'react';
import {Button, Image, Text, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {useAuth} from '../../../navigation/AuthenticationProvider';
import {ProfileCss} from '../../../styles/screens/ProfileCss';
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
  return (
    <View style={ProfileCss.mainView}>
      <View style={ProfileCss.contentContainer}>
        <Header header={'प्रोफाइल'} />
        <Image
          style={ProfileCss.image}
          source={{
            uri: user?.photoURL,
          }}
        />
        <View style={ProfileCss.detailView}>
          <View style={ProfileCss.detailRow}>
            <Text style={ProfileCss.titleText}>Name: </Text>
            <Text style={ProfileCss.valueText}>{user?.displayName}</Text>
          </View>
          <View style={ProfileCss.detailRow}>
            <Text style={ProfileCss.titleText}>Email: </Text>
            <Text style={ProfileCss.valueText}>{user?.email}</Text>
          </View>
          <View style={ProfileCss.detailRow}>
            <Text style={ProfileCss.titleText}>Phone Number: </Text>
            <Text style={ProfileCss.valueText}>{user?.phoneNumber}</Text>
          </View>
          <View style={ProfileCss.detailRow}>
            <Text style={ProfileCss.titleText}>App Version: </Text>
            <Text style={ProfileCss.valueText}>{DeviceInfo.getVersion()}</Text>
          </View>
        </View>
      </View>
      <View style={ProfileCss.logoutContainer}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default Profile;
