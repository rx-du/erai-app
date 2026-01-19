import React, { FC, useContext, useEffect, useState } from 'react';
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
import EmergencyContactScreen from '../Screens/Emergency/EmergencyContactScreen';
import SubscriptionScreen from '../Screens/Subscription/SubscriptionScreen';
import EducationalPurposesScreen from '../Screens/Access/EducationalPurposesScreen';
import PrivacyPolicyScreen from '../Screens/Access/PrivacyPolicyScreen';
import TermsOfServiceScreen from '../Screens/Access/TermsOfServiceScreen';
import { OnboardingScreen } from '../Screens/Onboarding/OnboardingScreen';
import SearchAidScreen from '../Screens/Aid/SearchAidScreen';

import { useAuth } from '../Context/AuthContext';
import { useLoading } from '../Context/LoadingContext';

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
  MainTabs: { screen: keyof RootTabParamList } | undefined;
  Protocol: {
    protocolData: any;
    title: string;
    icon: FC<SvgProps>;
    categoryIndex?: number;
    onBack?: () => void;
  };
  ProtocolStep: {
    protocolData: any;
    icon: any;
  };
  EmergencyContact: undefined;
  Subscription: undefined;
  EducatiionalPurposes: undefined;
  PrivacyPolicy: undefined;
  TermsOfService: undefined;
  Onboarding: { goToAccount?: boolean };
  SearchAid: undefined;
  AidScreen: undefined;
};

export default function Navigation() {
  const { isAuthenticated } = useAuth();
  const { showLoading, hideLoading } = useLoading();

  console.log('isAuthenticated', isAuthenticated);

  useEffect(() => {
    if (isAuthenticated === null) {
      showLoading('Loading...');
    } else {
      hideLoading();
    }
  }, [isAuthenticated]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="Protocol" component={ProtocolScreen} />
            <Stack.Screen name="ProtocolStep" component={ProtocolStepScreen} />
            <Stack.Screen name="EmergencyContact" component={EmergencyContactScreen} />
            <Stack.Screen name="Subscription" component={SubscriptionScreen} />
            <Stack.Screen name="EducationalPurposes" component={EducationalPurposesScreen} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
            <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
            <Stack.Screen name="SearchAid" component={SearchAidScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={RegisterScreen} />
            <Stack.Screen name="SetPassword" component={SetPasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
