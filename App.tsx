import React, { useEffect } from "react";
import {
  NativeBaseProvider,
  StatusBar,
  extendTheme,
} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider, useUserContext } from "./utils/UserContext";
import AuthScreen from "./src/screens/AuthScreen";
import MatchScreen from './src/screens/MatchScreen/MatchScreen';
import LikesScreen from './src/screens/LikesScreen/LikesScreen';
import CommunicationScreen from './src/screens/CommunicationScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import TabNavigator from "./src/screens/components/TabNavigation";
import PersonPhoneNumberScreen from "./src/screens/PersonPhoneNumberScreen/PersonPhoneNumberScreen";
import PersonNameScreen from "./src/screens/PersonNameScreen";
import PersonBirthDateScreen from "./src/screens/PersonBirthDateScreen";
import PersonGenderSelectScreen from "./src/screens/PersonGenderSelectScreen";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import Loader from "./src/screens/Loader/Loader";
import MainLoader from "./src/screens/MainLoader/MainLoader";
import ChatScreenT from "./src/screens/ChatScreenT";
import ChatScreen from "./src/screens/ChatScreen/ChatScreen";
//import { getStatusBarHeight } from 'react-native-status-bar-height';
import firebase from '@react-native-firebase/app';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { Alert } from "react-native";
import {Notification, NotificationAction, NotificationBackgroundFetchResult, NotificationCategory, Notifications, RegisteredPushKit} from 'react-native-notifications';



type RootStackParamList = {
  AuthStack: undefined;
  MainStack: undefined;
  Loader:undefined;
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
  LoginScreen:undefined;
};

export type MainStackParamList = {
  TabNavigator: undefined;
  Chat: { chatId: number; title: string };
  CommunicationScreen: { chatId: number; title: string };
  LikesScreen: undefined;
  MatchScreen: undefined;
  ProfileScreen: undefined;
  MainLoader:undefined;
  ChatScreen:undefined;
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

export enum AuthNavigationName{
  authScreen="AuthScreen",
  registrationScreen="RegistrationScreen",
  personPhoneNumberScreen="PersonPhoneNumberScreen",
  personNameScreen="PersonNameScreen",
  personBirthDateScreen="PersonBirthDateScreen",
  personGenderSelectScreen="PersonGenderSelectScreen",
  loginScreen="LoginScreen",
}

function AppContent() {
  const { user, userData } = useUserContext();

  const AuthNavigator = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }} >
      <AuthStack.Screen name={AuthNavigationName.authScreen} component={AuthScreen} />
      <AuthStack.Screen name={AuthNavigationName.registrationScreen} component={RegistrationScreen} />
      <AuthStack.Screen name={AuthNavigationName.personPhoneNumberScreen} component={PersonPhoneNumberScreen} />
      <AuthStack.Screen name={AuthNavigationName.personNameScreen} component={PersonNameScreen} />
      <AuthStack.Screen name={AuthNavigationName.personBirthDateScreen} component={PersonBirthDateScreen} />
      <AuthStack.Screen name={AuthNavigationName.personGenderSelectScreen} component={PersonGenderSelectScreen} />
      <AuthStack.Screen name={AuthNavigationName.loginScreen} component={LoginScreen} />
    </AuthStack.Navigator>
  );

  const MainNavigator = () => (
    <MainStack.Navigator screenOptions={{ headerShown: false}} >
      <MainStack.Screen name='MainLoader' component={MainLoader} />
      <MainStack.Screen name='TabNavigator' component={TabNavigator} />
      <MainStack.Screen name='Chat' component={ChatScreenT} />
      <MainStack.Screen name='CommunicationScreen' component={CommunicationScreen} />
      <MainStack.Screen name='LikesScreen' component={LikesScreen} />
      <MainStack.Screen name='MatchScreen' component={MatchScreen} />
      <MainStack.Screen name='ProfileScreen' component={ProfileScreen} />
      <MainStack.Screen name='ChatScreen' component={ChatScreen} />
    </MainStack.Navigator>
  );

  async function requestUserPermission() {

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
      
   
   
    }
  }

    const register=async()=>{
      let upvoteAction = new NotificationAction(
        "UPVOTE_ACTION",
        "background",
        "dsdsd",
        true,
        {
          buttonTitle: 'title',
          placeholder: 'placeholder text'
        }
      );
      
    
      const category=new NotificationCategory(
        "EXAMPLE_CATEGORY",
        [upvoteAction]
      )
      Notifications.setCategories([category])
    
   await requestUserPermission()
    Notifications.registerRemoteNotifications();

   Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
     console.log(`Notification received in foreground: ${notification.title} : ${notification.body}`);
     completion({alert: notification.payload.showAlert, sound: true, badge: true});
   });

   Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
     console.log(`Notification opened: ${notification.payload}`);
     completion();
   });
   Notifications.events().registerNotificationReceivedBackground((notification, completion) => {
    
    completion(NotificationBackgroundFetchResult.NEW_DATA);
  });
  Notifications.ios.events().appNotificationSettingsLinked(() => {
    console.warn('App Notification Settings Linked')
  });
  
   let localNotification = Notifications.postLocalNotification ({
    
     body: "Local notification!",
     title: "Local Notification Title",
     sound: "chime.aiff",
     identifier: "0",
     payload: {
      
      category:"EXAMPLE_CATEGORY",
     },
     
     badge: 0,
     type: "EMERGENCY_CATEGORY",
     thread: ""
   });
   const fff= await  messaging().isSupported()
   console.log("IS_SUP "+fff);
     messaging().onTokenRefresh(t=>{
      console.log(t);
      
     })
    const token = await messaging().getAPNSToken()
    const fcmToken=await messaging().getToken()
    console.log("TOKEN_FB "+token);
    console.log("TOKEN_FB_FCM "+fcmToken);
    }
      
    


    messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log(remoteMessage);
      
      
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

  useEffect(()=>{
    register()
  
  },[])
  return (
    <Provider store={store}>
     
      <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Loader">
      <Stack.Screen name='Loader' component={Loader} />
        <Stack.Screen name='AuthStack' component={AuthNavigator} />
        <Stack.Screen name='MainStack' component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    
  );
}
