import { FC, useEffect } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import messaging, { firebase } from '@react-native-firebase/messaging';
const InProgress:FC<{toHome:()=>void}>=({toHome})=>{

   useEffect(()=>{
    messaging().onMessage((mess)=>{
        console.log(mess);
        
            if(mess.data?.status==="approved"){
                Alert.alert("Вы успешно верифицированны!")
               toHome()
            }
            if(mess.data?.status==="denied"){
                Alert.alert("Ошибка верификации")
                
            }
      })
   },[])

    return(
        <View >
            <Text>in progress</Text>
            <Pressable onPress={toHome}>
                <Text>главная</Text>
            </Pressable>
        </View>
    )
}

export default InProgress;