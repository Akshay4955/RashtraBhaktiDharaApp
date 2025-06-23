import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {PadyaList, Profile, ShlokList} from '../components/screens';
import ChhandList from '../components/screens/ChhandList';
import {
  colorEight,
  colorOne,
  colorSeven,
  colorThree,
  textColor,
} from '../utils/constants/color';
import {moderateScale, verticalScale} from '../utils/constants/Metrics';
import {HeaderTitle, ScreenNames} from '../utils/constants/TextConstants';
import BottomTabNavigationManager from './BottomTabNavigationManager';

const Drawer = createDrawerNavigator();
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
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
