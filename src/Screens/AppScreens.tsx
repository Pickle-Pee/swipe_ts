import { FC, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from "./AuthScreens/AuthScreen";
import MainNavigator from "./MainScreen/MainScreen";
import Loader from "./Loader/Loader";
import { createStackNavigator } from "@react-navigation/stack";
import SOSButton from "./SOSButton/SOSButton";
import PushNotificationIOS, { NotificationRequest, PushNotificationEventName } from '@react-native-community/push-notification-ios';
import { useNavigation } from "@react-navigation/native";
import { NavigationContext } from '@react-navigation/native';
import React from "react";
const Stack = createStackNavigator();



const AppScreens:FC=()=>{
    
    return(
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Loader">
                <Stack.Screen name='Loader' component={Loader} />
                <Stack.Screen name='AuthStack' component={AuthNavigator} />
                <Stack.Screen name='MainStack' component={MainNavigator} />
                <Stack.Screen name='SOS' component={SOSButton} />
            </Stack.Navigator>
    )
}


const AppScreensContainer:FC=({})=>{
    return(
        <NavigationContainer>
            <AppScreens/>
        </NavigationContainer>
    )
}

export default AppScreensContainer