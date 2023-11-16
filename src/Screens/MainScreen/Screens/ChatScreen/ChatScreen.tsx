
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Animated, Dimensions, FlatList, Image, Keyboard, KeyboardAvoidingView, PanResponder, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StatusBarStyle, Text, TextInput, View, useWindowDimensions } from "react-native";
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
    const isDate:DateInfo|null=useAppSelector(state=>state.message.dateInfo.filter(el=>el.chat_id==chatId)[0])
    console.log(isDate);
    
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
            {isDate&&isDate.status==EDateInfoStatus.pending&&<View style={{height:80,flexDirection:'row',alignItems:'center',borderTopColor:'black',borderTopWidth:1,justifyContent:'space-between',paddingHorizontal:50}}>
                <View style={{borderColor:'green',borderWidth:1,width:100,height:30,alignItems:'center',justifyContent:'center'}}>
                    <Text>Принять</Text>
                </View>
                <View style={{borderColor:'red',borderWidth:1,width:100,height:30,alignItems:'center',justifyContent:'center'}}>
                    <Text>Отклонить</Text>
                </View>
            </View>}
            <KeyboardAvoidingView  behavior="position" shouldRasterizeIOS={true} style={{backgroundColor:"white"}}>
                <MessagesContent chatId={chatId} setPhotoVisibleUri={setPhotoVisibleUri}/>
                
                <FooterArea chatId={chatId}/>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen;

// import { FC, useEffect, useMemo, useRef, useState } from "react";
// import { Animated, Dimensions, FlatList, Image, Keyboard, KeyboardAvoidingView, PanResponder, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StatusBarStyle, Text, TextInput, TouchableHighlight, View, useWindowDimensions } from "react-native";
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
// import {
//     Player,
//     Recorder,
//     MediaStates
// } from '@react-native-community/audio-toolkit';
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';
// const audioRecorderPlayer = new AudioRecorderPlayer();

// interface IChatScreen{
//     navigation:any;
//     route:any;
// }
// let interval:string | number | NodeJS.Timeout | undefined;

// const ChatScreen:FC<IChatScreen>=({navigation,route})=>{
   

//     const [line,setLine]=useState<number[]>([])

//     const onPress=async()=>{
//         audioRecorderPlayer
//         const uri = await audioRecorderPlayer.startRecorder(
//             undefined,
//             undefined,
//             true,
//           );
//           const lines:number[]=[];
//           audioRecorderPlayer.addRecordBackListener((e) => {
//             console.log(e);
//             lines.push(e.currentMetering!)
//           })
//         setTimeout(() => {
//             audioRecorderPlayer.stopRecorder();
            
//             audioRecorderPlayer.removeRecordBackListener();
//             const min = Math.min(...lines);
//             const max = Math.max(...lines);
//             console.log(lines);
            
//             const scaledNumbers = lines.map(number => {
//                 const scaled = 10 + (number - min) * (30 / (max - min));
//                 const rounded = Math.round(Math.min(40, Math.max(10, scaled)));
//                 return rounded;
//               });
//               console.log(scaledNumbers);
//               setLine(scaledNumbers)
//           }, 6000);
//     }
//     const onPlay=()=>{
//             const play=  new Player("audio.aac")
//             const state= play.play()
//             console.log(play.currentTime);
        
//             console.log(play.state);
//             console.log(state.state);
            
           
            
            
//     }
//     return(
//         <SafeAreaView style={{flex:1,backgroundColor:"white",zIndex:200}}>
//             <TouchableHighlight  onPress={() => onPress()}>
//                 <Text>
//                 Press me!
//                 </Text>
//             </TouchableHighlight>
//             <TouchableHighlight  onPress={() => onPlay()}>
//                 <Text>
//                 Press me playy!
//                 </Text>
//             </TouchableHighlight>
//             <View style={{flexDirection:'row',alignItems:'flex-end',backgroundColor:'red'}}>
//                 {line.map((el)=>{
//                     return <View style={{width:3,height:el,marginHorizontal:2,backgroundColor:'black'}}></View>
//                 })}
//             </View>
            
//         </SafeAreaView>
//     )
// }

// export default ChatScreen;