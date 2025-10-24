import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {
  Alert,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PadyaList, Profile, ShlokList} from '../components/screens';
import ChhandList from '../components/screens/ChhandList';
import ContactUs from '../components/screens/ContactUs';
import {
  colorEight,
  colorEleven,
  colorOne,
  colorSeven,
  colorThree,
  textColor,
} from '../utils/constants/color';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utils/constants/Metrics';
import {HeaderTitle, ScreenNames} from '../utils/constants/TextConstants';
import BottomTabNavigationManager from './BottomTabNavigationManager';

const Drawer = createDrawerNavigator();

// Custom drawer content component
const CustomDrawerContent = props => {
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `राष्ट्रभक्तिधारा ॲप येथे डाउनलोड करा: https://play.google.com/store/apps/details?id=com.rashtrabhaktidharaapp`,
        title: 'राष्ट्रभक्तिधारा ॲप शेअर करा',
      });
    } catch (error) {
      Alert.alert('Error', 'शेअर करताना काही समस्या आली.');
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.customButton}>
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <Text style={styles.shareButtonText}>📤ॲप शेअर करा</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  const screenOptions = () => ({
    headerTitle: HeaderTitle,
    headerTitleStyle: {
      fontFamily: 'Mukta-Bold',
      fontSize: moderateScale(28),
    },
    headerStyle: {
      backgroundColor: colorEight,
    },
  });
  return (
    <Drawer.Navigator
      initialRouteName={ScreenNames.MainPage}
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: colorOne,
        },
        drawerLabelStyle: {
          fontFamily: 'Mukta-Bold',
          fontSize: moderateScale(16),
          marginVertical: verticalScale(-4),
        },
        drawerActiveBackgroundColor: colorSeven,
        drawerActiveTintColor: textColor,
        drawerInactiveBackgroundColor: colorThree,
        drawerInactiveTintColor: textColor,
      }}>
      <Drawer.Screen
        name={ScreenNames.MainPage}
        component={BottomTabNavigationManager}
        options={screenOptions}
      />
      <Drawer.Screen
        name={ScreenNames.Padyas}
        component={PadyaList}
        options={screenOptions}
      />
      <Drawer.Screen
        name={ScreenNames.Sloks}
        component={ShlokList}
        options={screenOptions}
      />
      <Drawer.Screen
        name={ScreenNames.BhushanChhand}
        component={ChhandList}
        options={screenOptions}
      />
      <Drawer.Screen
        name={ScreenNames.Profile}
        component={Profile}
        options={screenOptions}
      />
      <Drawer.Screen
        name={ScreenNames.ContactUs}
        component={ContactUs}
        options={screenOptions}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  customButton: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
    marginTop: verticalScale(16),
    borderTopWidth: 1,
    borderTopColor: colorEleven,
  },
  shareButton: {
    backgroundColor: colorSeven,
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(16),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  shareButtonText: {
    color: textColor,
    fontFamily: 'Mukta-Bold',
    fontSize: moderateScale(16),
  },
});

export default DrawerNavigator;
