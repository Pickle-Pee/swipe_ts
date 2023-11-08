
import messaging, { firebase } from '@react-native-firebase/messaging';

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import AppScreens from '../Screens/AppScreens';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import SOSButton from '../Screens/SOSButton/SOSButton';


async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

  }
}



function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [type,setType]=useState<number>(0)

useEffect(()=>{
  PushNotificationIOS.getInitialNotification().then(value=>{
    if(!value){
      setType(1)
      requestUserPermission()
    }else{
      setType(2)
        
}})
  
},[])

  return (
    <Provider store={store}>
      {type==1
      ?<AppScreens />
      :type==2
      ?<SOSButton route={{params:{isCancel:false}}} navigation={undefined}/>
      :<></>
      
    }
       
    </Provider>
   
  );
}


export default App;
