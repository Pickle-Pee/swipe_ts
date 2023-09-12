import { NavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FC, useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import SvgChevronLeft from "./svg/chevronLeft";
import { SocketClient } from "../../socket/socketClient";

const ChatScreen:FC<any>=({navigation})=>{
    
    useEffect(()=>{
        new SocketClient();
    },[])
    return(
        <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
            <View style={{height:44}}>
                <View>
                    <SvgChevronLeft/>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ChatScreen;