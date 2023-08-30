import React, { FC, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MatchScreen from '../MatchScreen';
import LikesScreen from '../LikesScreen';
import CommunicationScreen from '../CommunicationScreen';
import ProfileScreen from '../ProfileScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faHouse, faUser, faComment } from '@fortawesome/free-solid-svg-icons';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const TabNavigator:FC = () => {
    
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: {height:86,backgroundColor:""},
                headerStatusBarHeight:120,
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'MatchScreen') {
                        iconName = faHouse;
                    } else if (route.name === 'LikesScreen') {
                        iconName = faHeart;
                    } else if (route.name === 'CommunicationScreen') {
                        iconName = faComment;
                    } else if (route.name === 'ProfileScreen') {
                        iconName = faUser;
                    }

                    return <FontAwesomeIcon icon={iconName!} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#f9a8d4",
                tabBarInactiveTintColor: "black",
                tabBarShowLabel: false
            })}>
            <Tab.Screen name='MatchScreen' component={MatchScreen} />
            <Tab.Screen name='LikesScreen' component={LikesScreen} />
            <Tab.Screen name='CommunicationScreen' component={CommunicationScreen} />
            <Tab.Screen name='ProfileScreen' component={ProfileScreen} />
        </Tab.Navigator>
    )
}

export default  TabNavigator;