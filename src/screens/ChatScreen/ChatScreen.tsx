
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Animated, Dimensions, FlatList, Image, Keyboard, KeyboardAvoidingView, PanResponder, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StatusBarStyle, Text, TextInput, View, useWindowDimensions } from "react-native";
import SvgChevronLeft from "./svg/chevronLeft";
import { useAppDispatch, useAppSelector } from "../../store/typesHooks";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShare,faXmark,faMicrophone,faTrashCan} from '@fortawesome/free-solid-svg-icons'
import Modal from "react-native-modal";
import FooterArea from "./InteractiveComponents/FooterArea";
import MessagesContent from "./InteractiveComponents/MessagesContent";
import ReplayMessage from "./InteractiveComponents/ReplyMessage";
import ChatInfo from "./InteractiveComponents/ChatInfo";
interface IChatScreen{
    navigation:any;
    route:any;
}
let interval:string | number | NodeJS.Timeout | undefined;

const ChatScreen:FC<IChatScreen>=({navigation,route})=>{
    const chatId=route.params.chatId;
    const {width,height}=useWindowDimensions()
    const [photoVisibleUri,setPhotoVisibleUri]=useState<string>("")
    const [visibleNav,setVisibleNav]=useState<boolean>(false);
    const animVisibleNav=useRef(new Animated.Value(0)).current

    useEffect(()=>{
        if(visibleNav){
            
            StatusBar.setBarStyle("dark-content")
            Animated.timing(animVisibleNav,{
                toValue:-100,
                useNativeDriver:false,
                duration:50
            }).start()
         
        }else{
          
            StatusBar.setBarStyle("light-content")
            Animated.timing(animVisibleNav,{
                toValue:0,
                useNativeDriver:false,
                duration:50
            }).start()
        }
    },[visibleNav])


    return(
        <SafeAreaView style={{flex:1,backgroundColor:"white",zIndex:200}}>
            <Modal avoidKeyboard={false}  isVisible={photoVisibleUri.length>0} animationIn={"fadeIn"} style={{padding:0,backgroundColor:"white",margin:0}}>
                <SafeAreaView style={{backgroundColor:"black",flex:1,alignItems:'center',justifyContent:"center"}}>
                    <Animated.View style={{position:"absolute",top:animVisibleNav,height:100,zIndex:2, width:"100%",backgroundColor:"#000000aa",justifyContent:'flex-end',padding:20}}>
                        <Pressable onPress={()=>setPhotoVisibleUri("")}>
                            <FontAwesomeIcon icon={faXmark} size={30} color="white"/>
                        </Pressable>
                    </Animated.View>
                    <Pressable onPress={()=>setVisibleNav(v=>!v)}>
                        <Image source={{uri:photoVisibleUri}} width={width} height={height}/>
                    </Pressable>
                       
                </SafeAreaView>
            </Modal>
            <View style={{position:"absolute",top:0,height:61,width:width,backgroundColor:"white",zIndex:5}}>
            </View>
            <ChatInfo navigation={navigation} chatId={chatId} />
            <KeyboardAvoidingView  behavior="position" shouldRasterizeIOS={true} style={{backgroundColor:"white"}}>
                <MessagesContent chatId={chatId} setPhotoVisibleUri={setPhotoVisibleUri}/>
                
                <FooterArea chatId={chatId}/>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen;