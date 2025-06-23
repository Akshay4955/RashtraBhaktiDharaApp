import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {DhyeyaMantra, PreranaMantra} from '../components/screens';
import MainPage from '../components/screens/bottomTab/MainPage';
import MoreTab from '../components/screens/bottomTab/MoreTab';
import {BottomTabCss} from '../styles/navigation/BottomTabCss';
import {colorSeven, textColor} from '../utils/constants/color';
import {moderateScale, verticalScale} from '../utils/constants/Metrics';
import {ScreenNames} from '../utils/constants/TextConstants';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigationManager = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Main"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: textColor,
        tabBarInactiveTintColor: textColor,
        tabBarActiveBackgroundColor: colorSeven,
        tabBarLabelStyle: BottomTabCss.tabBarLable,
        tabBarStyle: BottomTabCss.tabBar,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Main') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'MoreTab') {
            iconName = focused ? 'apps' : 'apps-outline';
          } else {
            iconName = focused ? 'book' : 'book-outline';
          }
          return (
            <Icon name={iconName} size={moderateScale(22)} color={color} />
          );
        },
        tabBarIconStyle: {marginTop: verticalScale(4)},
      })}>
      <BottomTab.Screen
        name="Main"
        component={MainPage}
        options={{
          tabBarLabel: ScreenNames.MainPage,
        }}
      />
      <BottomTab.Screen
        name="PreranaMantra"
        component={PreranaMantra}
        options={{
          tabBarLabel: ScreenNames.PreranaMantra,
        }}
      />
      <BottomTab.Screen
        name="DhyeyaMantra"
        component={DhyeyaMantra}
        options={{
          tabBarLabel: ScreenNames.DhyeyaMantra,
        }}
      />
      <BottomTab.Screen
        name="MoreTab"
        component={MoreTab}
        options={{
          tabBarLabel: ScreenNames.MoreTab,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigationManager;
