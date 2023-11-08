import React, { FC, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faHouse, faUser, faComment } from '@fortawesome/free-solid-svg-icons';
import Modal from "react-native-modal";
import { Alert, Pressable, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { EGender, UserHttp } from '../../../../http/user/httpUser';
import MatchScreen from '../MatchScreen/MatchScreen';
import LikesScreen from '../LikesScreen/LikesScreen';
import CommunicationScreen from '../CommunicationScreen/CommunicationScreen';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import { useAppDispatch, useAppSelector } from '../../../../store/typesHooks/typesHooks';
import { ChatHttp, IChats } from '../../../../http/chat/httpChats';
import { addChats } from '../../../../store/reducers/messageReducer';
import { addAllUserPhotos, updateBunnerView } from '../../../../store/reducers/userReducer';
import { socketClient } from '../../../../socket/socketClient';
import fsvoice from '../../../../fs/voise/fsvoice';
import fsimage from '../../../../fs/image/fsimage';
import BannerVip from '../../../../UIComponents/BannerVip/BannerVip';
import SVGTabSearch from '../../../../SVG/SVGTabSearch';
import { MainNavigationName } from '../../MainScreen';
import SVGTabLike from '../../../../SVG/SVGTabLike';
import SVGTabMessages from '../../../../SVG/SVGTabMessages';
import SVGTabProfile from '../../../../SVG/SVGTabProfile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



const TabNavigator:FC = () => {

    const [bunnerVisible,setBunnerVisible]=useState<boolean>(false);
    const {dateInfo,listMessage,chatInfo}=useAppSelector(state=>state.message)
    const {gender}=useAppSelector(state=>state.user)
    const {bunnerView}=useAppSelector(state=>state.user)
    const unreadMessages=Object.keys(chatInfo).reduce((acc,elem)=>{
        const currentUnred=chatInfo[parseInt(elem)]!.countUnread!;
        console.log(currentUnred);
        
        return acc+currentUnred;
    },0)
    const unreadDate=dateInfo.length
    const dispatch=useAppDispatch()

    const getUserData=async()=>{
        console.log("GET_USER_CHATS");
       const chats:Array<IChats> | null =await new ChatHttp().getChats();
       if(chats!=null&&chats.length>0){
        dispatch(addChats(chats))
       }
      
       const photos=await new UserHttp().getUserPhoto()
       if(photos.length>0){
        dispatch(addAllUserPhotos(photos))
       }

    }
    const getUserInfo=async()=>{
       
        
     await new  UserHttp().whoami()
     getUserData()
    }
   
   


    useEffect(()=>{
      
        fsvoice.createVoiceDir();
        fsimage.createImageDir()
        getUserInfo()
        
    },[])


    useEffect(()=>{
        console.log("EDIT");
            if(bunnerView==true){
                setBunnerVisible(true);
                dispatch(updateBunnerView(false))
            }
           
    },[bunnerView])
    console.log(bunnerView);
    
    return (
        <View style={{flex:1}}>
            <Modal isVisible={bunnerVisible} style={{padding:0,backgroundColor:"white",margin:0}}>
                <BannerVip cancel={()=>setBunnerVisible(false)}/>
            </Modal>
            <Tab.Navigator
            
            screenOptions={({ route,navigation }) =>{
               return  ({
                tabBarStyle: {height:80,backgroundColor:"white"},
                headerStatusBarHeight:120,
                headerShown: false,
                
                tabBarIcon: ({ color, size }) => {
                    
                    if (route.name === MainNavigationName.matchScreen) {
                        return (
                                <SVGTabSearch/>
                        )
                    }
                    if(route.name===MainNavigationName.likesScreen){
                        return(
                               <SVGTabLike color={color}/> 
                            
                        )
                    }
                    if(route.name===MainNavigationName.communicationScreen){
                        return(
                                <View>
                                    <View style={{position:'absolute',zIndex:2,width:15,height:15,top:0,right:-5,backgroundColor:'red',borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                                        <Text style={{color:"white",fontFamily:"SF Pro Display",fontWeight:"600",fontSize:10}}>{unreadMessages}</Text>
                                    </View>
                                    <SVGTabMessages color={color}/>
                                </View>
                        )
                    }
                    if(route.name===MainNavigationName.profileScreen){
                        return(
                                <SVGTabProfile color={color}/> 
                        )
                    }
                   
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor:gender===EGender.male?"#1490D3":gender===EGender.famale?"#E62885":"#565656",
                tabBarInactiveTintColor:"#565656"
                })
            }}>
            <Tab.Screen name='MatchScreen' component={MatchScreen} />
            <Tab.Screen name='LikesScreen' component={LikesScreen} />
            <Tab.Screen name='CommunicationScreen' component={CommunicationScreen} />
            <Tab.Screen name='ProfileScreen' component={ProfileScreen} />
        </Tab.Navigator>
        </View>
       
    )
}

export default  TabNavigator;

