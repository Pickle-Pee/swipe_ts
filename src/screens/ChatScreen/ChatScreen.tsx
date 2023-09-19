import { NavigationProp } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { FC, useEffect, useState } from "react";
import { FlatList, Image, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StatusBar, Text, TextInput, View, useWindowDimensions } from "react-native";
import SvgChevronLeft from "./svg/chevronLeft";
import SvgScrepka from "./svg/Screpka";
import SvgSendButton from "./svg/SendButton";
import { socketClient } from "../../socket/socketClient";
import { useAppSelector } from "../../store/typesHooks";
import SvgMessageBottomItemRight from "./svg/messageBottomItemRight";
import SvgMessageBottomItemLeft from "./svg/messageBottomItemLeft";
import SvgIconsAllDone from "./svg/Icon_all_done";
import SvgIconDone from "./svg/IconDone";
import SvgIconWait from "./svg/IconWait";


interface IChatScreen{
    navigation:any;
    route:any;
}

const ChatScreen:FC<IChatScreen>=({navigation,route})=>{
    const chatId=route.params.chatId;
    const {width,height}=useWindowDimensions()
    const [msg,setMsg]=useState<string>("")
    const {userId}=useAppSelector(state=>state.user)
    const currentMessages=useAppSelector(state=>state.message.listMessage[chatId])
    console.log(currentMessages);
    
  const sendMessage=()=>{
        
        socketClient.sendMessage(chatId,msg,userId)
    }

    useEffect(()=>{    
    },[])

    const handleBack=()=>{
        navigation.goBack()
    }
    return(
        <SafeAreaView style={{flex:1,backgroundColor:"white",zIndex:200}}>
            <View style={{position:"absolute",top:0,height:61,width:width,backgroundColor:"white",zIndex:5}}>
            </View>
            <View style={{height:61,flexDirection:"row",backgroundColor:"white", justifyContent:"space-between",zIndex:5}}>
                <View style={{height:61, flexDirection:'row',alignItems:'center'}}>
                    <Pressable onPress={handleBack} style={{width:50,height:61,justifyContent:"center",alignItems:"center"}}>
                        <SvgChevronLeft/>
                    </Pressable>
                    <Image style={{borderRadius:23}} width={46} height={46} source={{uri:"https://uznayvse.ru/images/content/2023/7/13/virgo-woman-detailed-characteristics-of-the-zodiac-sign_29.jpg"}}/>
                    <View style={{marginLeft:17,marginTop:2}}>
                        <Text style={{fontFamily:"SF Pro Display",fontSize:20,fontWeight:"500"}}>Некто, 33</Text>
                        <View style={{flexDirection:"row",alignItems:"center",height:12}}>
                            <View style={{width:6.43,height:6.43,backgroundColor:"#3AE000",borderRadius:6}}></View>
                            <Text style={{marginLeft:4.6, fontFamily:"SF Pro Display",fontSize:10,fontWeight:"400",lineHeight:11.72}}>онлайн</Text>
                        </View>
                    </View>
                </View>
                <Pressable style={{flexDirection:"row",alignItems:"center",paddingRight:26,paddingLeft:20,height:61}}>
                    <View style={{width:4.2,height:4.2,backgroundColor:"#C9CACA",borderRadius:4}}></View>
                    <View style={{width:4.2,height:4.2,backgroundColor:"#C9CACA",marginHorizontal:4.2,borderRadius:4}}></View>
                    <View style={{width:4.2,height:4.2,backgroundColor:"#C9CACA",borderRadius:4}}></View>
                </Pressable>
            </View>
            <KeyboardAvoidingView  behavior="position" shouldRasterizeIOS={true} style={{backgroundColor:"white"}}>
                <View  style={{ paddingHorizontal:10, height:height*0.75,backgroundColor:"#DEF4FE"}} >
                   <FlatList
                   showsVerticalScrollIndicator={false}
                   inverted
                   style={{height:height*0.75,paddingBottom:10}}
                   contentContainerStyle={{paddingTop:10}}
                   data={currentMessages??[]}
                   renderItem={({item})=>{
                    const alignSelf=item.userId==userId?"flex-end":"flex-start"
                    const status:number=item.status
                    return (
                        <View style={{alignSelf}}>
                        <View style={{ marginTop:10, backgroundColor:"white",borderRadius:10, minWidth:100,maxWidth:200, paddingLeft:13,paddingRight:13,paddingTop:7,paddingBottom:8}}>
                            <Text style={{fontFamily:"SF Pro Display",fontSize:12,fontWeight:"400",lineHeight:14.06}}>
                               {item.msg}
                            </Text>
                            <View style={{position:"absolute",bottom:0,left:-20}}>
                                 {status==-1&& <SvgIconWait/>}
                            </View>
                        </View>
                        <View style={{paddingHorizontal:32, alignSelf}}>
                            {item.userId==userId&&<SvgMessageBottomItemRight/>}
                            {item.userId!=userId&&<SvgMessageBottomItemLeft/>}
                            
                        </View>
                        
                    </View>
                    
                    )
                   }}
                   />
                </View>
                <View style={{height:75,flexDirection:"row",alignItems:"center"}}>
                    <Pressable style={{width:width*0.133,height:75,justifyContent:'center',alignItems:'flex-end',paddingRight:12}}>
                        <SvgScrepka/>
                    </Pressable>
                    <View style={{width:width*0.70}}>
                        <TextInput onSubmitEditing={sendMessage} blurOnSubmit={false} placeholder="Введите сообщение..." value={msg} onChangeText={setMsg} style={{paddingLeft:19, borderColor:"#DDDDDD",borderWidth:1,height:42,borderRadius:10}}/>
                    </View> 
                    <Pressable onPress={sendMessage} style={{flex:1,paddingLeft:8}}> 
                        <SvgSendButton/>
                    </Pressable>
                </View>
                
            </KeyboardAvoidingView>
            
            
        </SafeAreaView>
    )
}

export default ChatScreen;