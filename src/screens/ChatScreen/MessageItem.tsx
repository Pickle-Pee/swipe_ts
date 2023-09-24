import { FC, useEffect, useRef, useState } from "react";
import { Animated, PanResponder, Text, View,Vibration,NativeModules } from "react-native";
import SvgMessageBottomItemRight from "./svg/messageBottomItemRight";
import SvgMessageBottomItemLeft from "./svg/messageBottomItemLeft";
import SvgIconDone from "./svg/IconDone";
import SvgIconsAllDone from "./svg/Icon_all_done";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { IMessage } from "../../store/reducers/messageReducer";
import { useAppSelector } from "../../store/typesHooks";

const {RTCVibrate}=NativeModules

interface IMessageItem{
    message:IMessage;
    editReplay:(val:string)=>void;
}

const MessageItem:FC<IMessageItem>=({message,editReplay})=>{
    const {userId}=useAppSelector(state=>state.user)
    const [dx,setDx]=useState<number>(0)
    const [reply,setReplay]=useState<boolean>(false)
    const [replayActive,setReplayActive]=useState<boolean>(false)
    const alignSelf=message.userId==userId?"flex-end":"flex-start"
    const status:number=message.status

    const xPosition=useRef(new Animated.Value(0)).current

    let removePan=()=>{
      
       
        
        
    }

    const [panResponder, setPanResponder] = useState(
        PanResponder.create({
            onStartShouldSetPanResponder: ()=> {
                setReplayActive(true)
                return true;
            },
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gestureState) => {
              // Вызывается при движении
              let dx = gestureState.dx;
              //console.log(dx);
              if(dx<-55){
                
                
                setReplay(true)
               
              }else{
                setReplay(false)
              
              }
              
              if(dx<-70){
                dx=-70;
              }
              xPosition.setValue(-dx)
              setDx(dx)
              
            },
            onPanResponderRelease: () => {
                setReplayActive(false)
                Animated.timing(xPosition,{
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false,
                }).start()
               // console.log(reply);
                
               
            },
          })
    );
    useEffect(()=>{
        //console.log(reply);
        
        reply&&RTCVibrate.vibrateShort()
        &&editReplay(message.msg)
       // setReplay(false)
    },[reply])
    useEffect(()=>{
        console.log(dx);
        console.log(replayActive);
        
        
        !replayActive&&dx<-50&&editReplay(message.msg);
        
    },[replayActive])

    return(
        <Animated.View {...panResponder.panHandlers} style={{alignSelf,marginRight:xPosition}} >
                        <View style={{ marginTop:10, backgroundColor:"white",borderRadius:10, minWidth:100,maxWidth:200, paddingLeft:13,paddingRight:13,paddingTop:7,paddingBottom:8}}>
                            <Text style={{fontFamily:"SF Pro Display",fontSize:12,fontWeight:"400",lineHeight:14.06}}>
                               {message.msg}
                            </Text>
                            <View style={{position:"absolute",bottom:0,left:-20}}>
                                 {status==1&& <SvgIconDone/>}
                                 {status==2&& <SvgIconsAllDone/>}
                                 {status==-1&&<FontAwesomeIcon color="#EB539F4D" size={14} icon={ faClock } />}
                                 {status==-2&&<FontAwesomeIcon color="red" size={14} icon={ faExclamationCircle } />}
                            </View>
                        </View>
                        <View style={{paddingHorizontal:32, alignSelf}}>
                            {message.userId==userId&&<SvgMessageBottomItemRight/>}
                            {message.userId!=userId&&<SvgMessageBottomItemLeft/>}
                            
                        </View>
                        
                    </Animated.View>
    );
}

export default MessageItem;