import React, { FC, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MatchScreen from '../MatchScreen/MatchScreen';
import LikesScreen from '../LikesScreen/LikesScreen';
import CommunicationScreen from '../CommunicationScreen';
import ProfileScreen from '../ProfileScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faHouse, faUser, faComment } from '@fortawesome/free-solid-svg-icons';
import { UserHttp } from '../../http/user/httpUser';
import Modal from "react-native-modal";
import { Alert, View } from 'react-native';
import BannerVip from '../popup/BunnerVip/BunnerVip';
import {  socketClient } from '../../socket/socketClient';
import { ChatHttp, IChats } from '../../http/chat/httpChats';
import { useAppDispatch } from '../../store/typesHooks';
import { addChats } from '../../store/reducers/messageReducer';
import fsvoice from '../../fs/voise/fsvoice';
import fsimage from '../../fs/image/fsimage';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



const TabNavigator:FC = () => {

    const [bunnerVisible,setBunnerVisible]=useState<boolean>(false);
    const dispatch=useAppDispatch()

    const getChats=async()=>{
       const chats:Array<IChats> | null =await new ChatHttp().getChats();
       if(chats==null||chats.length==0){
        return;
       }
       dispatch(addChats(chats))

    }
    const getUserInfo=async()=>{
     await new  UserHttp().whoami()
      getChats()
    }
   



    useEffect(()=>{
        socketClient.createSocketConnection();
        fsvoice.createVoiceDir();
        fsimage.createImageDir()
        getUserInfo()
        setTimeout(()=>{
            setBunnerVisible(true);
        },5000)
    },[])
    return (
        <View style={{flex:1}}>
            <Modal isVisible={bunnerVisible} style={{padding:0,backgroundColor:"white",margin:0}}>
                <BannerVip cancel={()=>setBunnerVisible(false)}/>
            </Modal>
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
        </View>
       
    )
}

export default  TabNavigator;