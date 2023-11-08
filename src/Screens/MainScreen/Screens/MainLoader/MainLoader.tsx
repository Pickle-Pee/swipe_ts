import { FC, useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { IInterest, ReturnedData, UserMatches } from "../../../../http/matches/httpMatches";
import InterestingScreen from "../../../../UIComponents/Interesting/Interesting";
import VerifyScreen from "../../../../UIComponents/VerifyScreen/VerifyScreen";
import { UserHttp } from "../../../../http/user/httpUser";
import { MainNavigationName } from "../../MainScreen";
import { EVerifyStatus, updateUserVerifyStatus } from "../../../../store/reducers/userReducer";
import { socketClient } from "../../../../socket/socketClient";
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { useAppDispatch } from "../../../../store/typesHooks/typesHooks";
const MainLoader:FC<{navigation:any}>=({navigation})=>{
    
    const [permissinPage,setPermissionPage]=useState<number>(-1);

    const [listInteresting,setListInteresting]=useState<Array<IInterest>>([])
    const dispatch=useAppDispatch()
     const setFCMTOken=async()=>{
            const token = await messaging().getAPNSToken()
            const fcmToken=await messaging().getToken()
            
            console.log("TOKEN_FB "+token);
            console.log("TOKEN_FB_FCM "+fcmToken);
            const result:number=await new UserHttp().setFCMToken(fcmToken)
            console.log("fcm send "+fcmToken);
            
        }

    const checkInteresting=async():Promise<number>=>{
        const status: ReturnedData = await  new UserMatches().userInterest();
        if(status.code!=0){
            const listInterest : Array<IInterest> = await new UserMatches().listInterestingBase();
            if(listInterest.length!=0){
           
                setListInteresting(listInterest);
               
               
            }
            setPermissionPage(1);
            return -1
        }else{
            return 0;
        }
    }

    const checkVerify=async():Promise<number>=>{
        const checkVerify=await new UserHttp().checkVerify()
       
        
        if(checkVerify==null||checkVerify==EVerifyStatus.denied||checkVerify==EVerifyStatus.in_progress){
            setPermissionPage(2);
            dispatch(updateUserVerifyStatus({status:checkVerify!}))
            return -1;
    }else{
        return 0;
    }
}

    const getPermission=async()=>{
       const _interesing=await checkInteresting()
       if(_interesing==0){
        const _verify=await checkVerify()
        if(_verify==0){
            navigation.navigate(MainNavigationName.tabNavigator)
        }
       }
    
    
    }

    useEffect(()=>{
        setFCMTOken()
        getPermission();
        socketClient.createSocketConnection();
        
    },[])

    const localNavigation=()=>navigation.navigate("TabNavigator")
    const localInterestingNavigation=async()=>{
        await checkVerify()
       
    }
    return(
        <SafeAreaView style={{flex:1,backgroundColor:"white",justifyContent:'center'}}>
            {permissinPage==-1&&

                <Text>Loading</Text>
            }
            {permissinPage==1&&
                <InterestingScreen navigation={localInterestingNavigation} listInteresting={listInteresting}/>
            }
            {permissinPage==2&&
                <VerifyScreen navigation={localNavigation} />
            }
        </SafeAreaView>
    )
}

export default MainLoader;