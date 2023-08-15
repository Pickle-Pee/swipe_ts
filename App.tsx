import React from "react";
import {
  NativeBaseProvider,
  extendTheme,
} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider, useUserContext } from "./utils/UserContext";
import MatchScreen from './screens/MatchScreen';
import LikesScreen from './screens/LikesScreen';
import CommunicationScreen from './screens/CommunicationScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChatScreen from './screens/ChatScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import TabNavigator from "./components/Navigation";
import PersonPhoneNumberScreen from "./screens/PersonPhoneNumberScreen";
import PersonDataScreen from "./screens/PersonDataScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  AuthStack: undefined;
  MainStack: undefined;
};

type AuthStackParamList = {
  AuthScreen: undefined;
  RegistrationScreen: undefined;
  PersonPhoneNumberScreen: undefined;
  PersonDataScreen: undefined;
};

type MainStackParamList = {
  TabNavigator: undefined;
  Chat: undefined;
  CommunicationScreen: undefined;
  LikesScreen: undefined;
  MatchScreen: undefined;
  ProfileScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {

  return (
    <UserProvider>
      <NativeBaseProvider>
        <AppContent />
      </NativeBaseProvider>
    </UserProvider>
  );
}

function AppContent() {
  const { user } = useUserContext();

  const AuthNavigator = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name='AuthScreen' component={AuthScreen} />
      <AuthStack.Screen name='RegistrationScreen' component={RegistrationScreen} />
      <AuthStack.Screen name='PersonPhoneNumberScreen' component={PersonPhoneNumberScreen} />
      <AuthStack.Screen name='PersonDataScreen' component={PersonDataScreen} />
    </AuthStack.Navigator>
  );

  const MainNavigator = () => (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name='TabNavigator' component={TabNavigator} />
      <MainStack.Screen name='Chat' component={ChatScreen} />
      <MainStack.Screen name='CommunicationScreen' component={CommunicationScreen} />
      <MainStack.Screen name='LikesScreen' component={LikesScreen} />
      <MainStack.Screen name='MatchScreen' component={MatchScreen} />
      <MainStack.Screen name='ProfileScreen' component={ProfileScreen} />
    </MainStack.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name='AuthStack' component={AuthNavigator} />
        ) : (
          <Stack.Screen name='MainStack' component={MainNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
