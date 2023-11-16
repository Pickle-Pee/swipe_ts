import { FC, useEffect, useState } from "react";
import { Image, PushNotificationEventName, SafeAreaView, Text } from "react-native";
import tokenStorage from "../../localStorage/tokenStorage";
import { ReturnedData } from "../../http/user/httpUser";
import { StackNavigationProp } from "@react-navigation/stack";
import httpToken from "../../http/token/httpToken";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NavigationContext } from '@react-navigation/native';
import PushNotificationIOS, { NotificationRequest } from "@react-native-community/push-notification-ios";
import SVGAppLogo from "../../SVG/SVGAppLogo";
import SVGAppLogoMain from "../../SVG/SVGAppLogoMain";
const TIME_LOADER=2000


const Loader:FC<{navigation : StackNavigationProp<any>}>=({navigation})=>{

    const [timeCompleted,setTimeCompleted]=useState<boolean>(false);
    const [completed,setCompleted]=useState<boolean>(false);
    const [noAuth,setNoAuth]=useState<boolean>(false);



   const autorize =async()=>{
     const status : ReturnedData = await httpToken.refreshToken();
     if(status.code==0){
        setCompleted(true);
        
     }else{
        setNoAuth(true)
;   
     }
   }

    useEffect(()=>{

        // PushNotificationIOS.getInitialNotification().then(value=>{
        //     if(!value){
        //        
        //     }else{

        //         console.log(value);
        //         if(value.getData().type==="sos"){
        //             navigation.navigate("SOS",{isClose:false});
        //         }
             
        //     }
            
        // });
        setTimeout(()=>{
                        setTimeCompleted(true)
                    },TIME_LOADER)
                    autorize()
        
    },[])

    useEffect(()=>{
        if(timeCompleted&&completed){
          navigation.navigate("MainStack");
        }
        
        if(timeCompleted&&noAuth){
            navigation.navigate("AuthStack");
        }
    },[timeCompleted,completed,noAuth])

    useEffect(()=>{

        const request:NotificationRequest={
            id:"0",
            title:"SOS - кнопка",
            userInfo:{ 
                type:"sos" 
            }
        }
        PushNotificationIOS.addNotificationRequest(request)
        const name:PushNotificationEventName="localNotification";
        PushNotificationIOS.addEventListener(name, onRemoteNotification);
        return () => {
          PushNotificationIOS.removeEventListener(name);
        };
    },[])
    const onRemoteNotification = (notification:any) => {
        // navigator.navigate('SOS');
         const isClicked = notification.getData().userInteraction === 1;
         
         if (isClicked) {
            navigation.navigate("SOS",{isCancel:true})
             console.log("click"); 
             
           // Navigate user to another screen
         } else {
           // Do something else with push notification
         }
         // Use the appropriate result based on what you needed to do for this notification
         const result = PushNotificationIOS.FetchResult.NoData;
         notification.finish(result);
       };


    return (
        <SafeAreaView style={{alignItems:'center',justifyContent:'center',flex:1}}>
          
            <SVGAppLogoMain />
            <Text style={{fontFamily:"SF Pro Display",fontSize:32,fontWeight:"300",color:"#000000",lineHeight:57}} >
                СВАЙП
            </Text>

        </SafeAreaView>
    )
}
//RubikIso-Regular SF-Pro-Display-Light OpenSans OpenSans-VariableFont_wdth,wght OpenSans-Italic
export default Loader;