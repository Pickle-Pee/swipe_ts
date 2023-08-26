import React from "react";
import {
  NativeBaseProvider,
  extendTheme,
} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider, useUserContext } from "./utils/UserContext";
import AuthScreen from "./src/screens/AuthScreen";
import MatchScreen from './src/screens/MatchScreen';
import LikesScreen from './src/screens/LikesScreen';
import CommunicationScreen from './src/screens/CommunicationScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ChatScreen from './src/screens/ChatScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import TabNavigator from "./src/screens/components/Navigation";
import PersonPhoneNumberScreen from "./src/screens/PersonPhoneNumberScreen/PersonPhoneNumberScreen";
import PersonNameScreen from "./src/screens/PersonNameScreen";
import PersonBirthDateScreen from "./src/screens/PersonBirthDateScreen";
import PersonGenderSelectScreen from "./src/screens/PersonGenderSelectScreen";
import { Provider } from "react-redux";
import { store } from "./src/store/store";

type RootStackParamList = {
  AuthStack: undefined;
  MainStack: undefined;
};

export type PersonPhoneNumberScreenProps = {
  navigation: any;
  route: any;
};

export type PersonNameScreenProps = {
  navigation: any;
  route: any;
};

export type AuthStackParamList = {
  AuthScreen: undefined;
  RegistrationScreen: undefined;
  PersonPhoneNumberScreen: PersonPhoneNumberScreenProps;
  PersonNameScreen: undefined;
  PersonBirthDateScreen: undefined;
  PersonGenderSelectScreen: undefined;
};

export type MainStackParamList = {
  TabNavigator: undefined;
  Chat: { chatId: number; title: string };
  CommunicationScreen: { chatId: number; title: string };
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
  const { user, userData } = useUserContext();

  const AuthNavigator = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name='AuthScreen' component={AuthScreen} />
      <AuthStack.Screen name='RegistrationScreen' component={RegistrationScreen} />
      <AuthStack.Screen name='PersonPhoneNumberScreen' component={PersonPhoneNumberScreen} />
      <AuthStack.Screen name='PersonNameScreen' component={PersonNameScreen} />
      <AuthStack.Screen name='PersonBirthDateScreen' component={PersonBirthDateScreen} />
      <AuthStack.Screen name='PersonGenderSelectScreen' component={PersonGenderSelectScreen} />
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
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='AuthStack' component={AuthNavigator} />
        <Stack.Screen name='MainStack' component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    
  );
}
