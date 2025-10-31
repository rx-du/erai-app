import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NavigationBar from '../Components/NavigationBar/NavigationBar';
import EmergencyScreen from '../Screens/Emergency/EmergencyScreen';
import LocationScreen from '../Screens/Location/LocationScreen';
import AidScreen from '../Screens/Aid/AidScreen';
import AccountScreen from '../Screens/Account/AccountScreen';
import WelcomeScreen from '../Screens/Access/WelcomeScreen';
import RegisterScreen from '../Screens/Access/RegisterScreen';
import SetPasswordScreen from '../Screens/Access/SetPassword';
import LoginScreen from '../Screens/Access/LoginScreen';
import ProtocolScreen from '../Screens/Aid/Protocol/ProtocolScreen';
import { SvgProps } from 'react-native-svg';
import ProtocolStepScreen from '../Screens/Aid/Protocol/ProtocolStepScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export type RootTabParamList = {
  Emergency: undefined;
  Location: undefined;
  Aid: undefined;
  Account: undefined;
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <NavigationBar {...props} />}
    >
      <Tab.Screen name="Emergency" component={EmergencyScreen} />
      <Tab.Screen name="Location" component={LocationScreen} />
      <Tab.Screen name="Aid" component={AidScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  SetPassword: undefined;
  MainTabs: undefined;
  Protocol: {
    protocolData: any;
    title: string;
    icon: FC<SvgProps>;
  };
  ProtocolStep: {
    protocolData: any;
  };
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={RegisterScreen} />
        <Stack.Screen name="SetPassword" component={SetPasswordScreen} />
        <Stack.Screen name="Protocol" component={ProtocolScreen} />
        <Stack.Screen name="ProtocolStep" component={ProtocolStepScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
