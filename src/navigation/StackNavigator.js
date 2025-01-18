import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AudioPlayer from '../components/screens/AudioPlayer';
import EventDetail from '../components/screens/EventDetail';
import Poem from '../components/screens/Poem';
import Shlok from '../components/screens/Shlok';
import DrawerNavigator from './DrawerNavigator';
import {FirebaseProvider} from './FirebaseProvider';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <FirebaseProvider>
      <Stack.Navigator
        initialRouteName="DrawerNavigation"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigator} />
        <Stack.Screen name="Shlok" component={Shlok} />
        <Stack.Screen name="Poem" component={Poem} />
        <Stack.Screen name="Audio" component={AudioPlayer} />
        <Stack.Screen name="Event" component={EventDetail} />
      </Stack.Navigator>
    </FirebaseProvider>
  );
};

export default StackNavigator;
