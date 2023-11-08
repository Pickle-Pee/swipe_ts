
// import { FC, useEffect, useMemo, useRef, useState } from "react";
// import { Animated, Dimensions, FlatList, Image, Keyboard, KeyboardAvoidingView, PanResponder, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StatusBarStyle, Text, TextInput, View, useWindowDimensions } from "react-native";
// import SvgChevronLeft from "./svg/chevronLeft";
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faShare,faXmark,faMicrophone,faTrashCan} from '@fortawesome/free-solid-svg-icons'
// import Modal from "react-native-modal";
// import FooterArea from "./InteractiveComponents/FooterArea";
// import MessagesContent from "./InteractiveComponents/MessagesContent";
// import ReplayMessage from "./InteractiveComponents/ReplyMessage";
// import ChatInfo from "./InteractiveComponents/ChatInfo";
// import { IActionContextMenu } from "../../../../UIComponents/NavPanel/NavPanel";
// import { useAppSelector } from "../../../../store/typesHooks/typesHooks";
// import { DateInfo, EDateInfoStatus } from "../../../../store/reducers/messageReducer";
// interface IChatScreen{
//     navigation:any;
//     route:any;
// }
// let interval:string | number | NodeJS.Timeout | undefined;

// const ChatScreen:FC<IChatScreen>=({navigation,route})=>{
//     const chatId=route.params.chatId;
//     const {width,height}=useWindowDimensions()
//     const [photoVisibleUri,setPhotoVisibleUri]=useState<string>("")
//     const [visibleNav,setVisibleNav]=useState<boolean>(false);
//     const animVisibleNav=useRef(new Animated.Value(0)).current
//     const isDate:DateInfo|null=useAppSelector(state=>state.message.dateInfo.filter(el=>el.chat_id==chatId)[0])
//     console.log(isDate);
    
//     useEffect(()=>{
//         if(visibleNav){
            
//             StatusBar.setBarStyle("dark-content")
//             Animated.timing(animVisibleNav,{
//                 toValue:-100,
//                 useNativeDriver:false,
//                 duration:50
//             }).start()
         
//         }else{
          
//             StatusBar.setBarStyle("light-content")
//             Animated.timing(animVisibleNav,{
//                 toValue:0,
//                 useNativeDriver:false,
//                 duration:50
//             }).start()
//         }
//     },[visibleNav])


   
//     return(
//         <SafeAreaView style={{flex:1,backgroundColor:"white",zIndex:200}}>
        
//             <Modal avoidKeyboard={false}  isVisible={photoVisibleUri.length>0} animationIn={"fadeIn"} style={{padding:0,backgroundColor:"white",margin:0}}>
//                 <SafeAreaView style={{backgroundColor:"black",flex:1,alignItems:'center',justifyContent:"center"}}>
//                     <Animated.View style={{position:"absolute",top:animVisibleNav,height:100,zIndex:2, width:"100%",backgroundColor:"#000000aa",justifyContent:'flex-end',padding:20}}>
//                         <Pressable onPress={()=>setPhotoVisibleUri("")}>
//                             <FontAwesomeIcon icon={faXmark} size={30} color="white"/>
//                         </Pressable>
//                     </Animated.View>
//                     <Pressable onPress={()=>setVisibleNav(v=>!v)}>
//                         <Image source={{uri:photoVisibleUri}} width={width} height={height}/>
//                     </Pressable>
                       
//                 </SafeAreaView>
//             </Modal>
//             <View style={{position:"absolute",top:0,height:61,width:width,backgroundColor:"white",zIndex:5}}>
//             </View>
//             <ChatInfo navigation={navigation} chatId={chatId} />
//             {isDate&&isDate.status==EDateInfoStatus.pending&&<View style={{height:80,flexDirection:'row',alignItems:'center',borderTopColor:'black',borderTopWidth:1,justifyContent:'space-between',paddingHorizontal:50}}>
//                 <View style={{borderColor:'green',borderWidth:1,width:100,height:30,alignItems:'center',justifyContent:'center'}}>
//                     <Text>Принять</Text>
//                 </View>
//                 <View style={{borderColor:'red',borderWidth:1,width:100,height:30,alignItems:'center',justifyContent:'center'}}>
//                     <Text>Отклонить</Text>
//                 </View>
//             </View>}
//             <KeyboardAvoidingView  behavior="position" shouldRasterizeIOS={true} style={{backgroundColor:"white"}}>
//                 <MessagesContent chatId={chatId} setPhotoVisibleUri={setPhotoVisibleUri}/>
                
//                 <FooterArea chatId={chatId}/>
//             </KeyboardAvoidingView>
//         </SafeAreaView>
//     )
// }

// export default ChatScreen;

import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Animated, Dimensions, FlatList, Image, Keyboard, KeyboardAvoidingView, PanResponder, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StatusBarStyle, Text, TextInput, TouchableHighlight, View, useWindowDimensions } from "react-native";
import SvgChevronLeft from "./svg/chevronLeft";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShare,faXmark,faMicrophone,faTrashCan} from '@fortawesome/free-solid-svg-icons'
import Modal from "react-native-modal";
import FooterArea from "./InteractiveComponents/FooterArea";
import MessagesContent from "./InteractiveComponents/MessagesContent";
import ReplayMessage from "./InteractiveComponents/ReplyMessage";
import ChatInfo from "./InteractiveComponents/ChatInfo";
import { IActionContextMenu } from "../../../../UIComponents/NavPanel/NavPanel";
import { useAppSelector } from "../../../../store/typesHooks/typesHooks";
import { DateInfo, EDateInfoStatus } from "../../../../store/reducers/messageReducer";
import {
    Player,
    Recorder,
    MediaStates
} from '@react-native-community/audio-toolkit';
interface IChatScreen{
    navigation:any;
    route:any;
}
let interval:string | number | NodeJS.Timeout | undefined;

const ChatScreen:FC<IChatScreen>=({navigation,route})=>{
   

    const onPress=()=>{
        let rec = new Recorder("audio.aac",
        {
          // Set bitrate for the recorder, in bits per second
          bitrate : 128000,
        
          // Set number of channels
          channels : 2,
        
          // Set how many samples per second
          sampleRate : 44100,
        
          // Override format. Possible values:
          // Cross-platform:  'mp4', 'aac'
          // Android only:    'ogg', 'webm', 'amr'
          format : 'aac',
        
          // Override encoder. Android only.
          // Possible values:
          // 'aac', 'mp4', 'webm', 'ogg', 'amr'
          encoder : 'aac',
        
          // Quality of the recording, iOS only.
          // Possible values: 'min', 'low', 'medium', 'high', 'max'
          quality : 'medium',
        
          // Optional argument to activate metering events.
          // This will cause a 'meter' event to fire every given milliseconds,
          // e.g. 250 will fire 4 time in a second.
        
        }).prepare().record();
        
        console.log(rec.state);
        setTimeout(() => {
            rec.stop((err) => {
                console.log(err);
            });
          }, 3000);
    }
    const onPlay=()=>{
            const play=  new Player("audio.aac")
            const state= play.play()
            console.log(play.currentTime);
        
            console.log(play.state);
            console.log(state.state);
            
           
            
            
    }
    return(
        <SafeAreaView style={{flex:1,backgroundColor:"white",zIndex:200}}>
            <TouchableHighlight  onPress={() => onPress()}>
                <Text>
                Press me!
                </Text>
            </TouchableHighlight>
            <TouchableHighlight  onPress={() => onPlay()}>
                <Text>
                Press me playy!
                </Text>
            </TouchableHighlight>
        </SafeAreaView>
    )
}

export default ChatScreen;