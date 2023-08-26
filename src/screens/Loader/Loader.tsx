import { Center, Image, Text } from "native-base";
import { FC, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import tokenStorage from "../../localStorage/tokenStorage";
import httpToken from "../../http/token/httpToken";
import { ReturnedData } from "../../http/user/httpUser";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthNavigationName } from "../../../App";
import { RouteProp } from "@react-navigation/native";

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

    return (
        <SafeAreaView>
            <Center h={"100%"}>
            <Image
            source={require("../../../assets/logo.png")}       
            alt="logo"
            w={101.12}
            h={89}
            />
            <Text fontFamily={"SFProDisplay-Light"} fontSize={32} fontWeight={300} color={"#000000"} lineHeight={57}>
                СВАЙП
            </Text>

            </Center>
        </SafeAreaView>
    )
}
//RubikIso-Regular SF-Pro-Display-Light OpenSans OpenSans-VariableFont_wdth,wght OpenSans-Italic
export default Loader;