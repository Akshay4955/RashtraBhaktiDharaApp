import React from 'react';
import {Button, Image, Text, View} from 'react-native';
import {useAuth} from '../../../navigation/AuthenticationProvider';
import {HomeCss as styles} from '../../../styles/screens/HomeCss';
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
    <View style={styles.mainView}>
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
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Profile;
