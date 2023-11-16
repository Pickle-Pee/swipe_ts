import { faShare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { FC, useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../store/typesHooks";
import { ETypeMessage } from "../../../store/reducers/messageReducer";
import { updateReply } from "../../../store/reducers/ChatControllerReducer";


const ReplayMessage:FC=()=>{

    const replyViewHeight=useRef(new Animated.Value(0)).current
    const {reply}=useAppSelector(state=>state.chatController)
    const dispatch=useAppDispatch()
    useEffect(()=>{
        console.log(reply);
        
        if(reply!=null){
            replyViewOpen()
        }
    },[reply])


      const replyViewClose=()=>{
        Animated.timing(replyViewHeight,{
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start()
    }
    const replyViewOpen=()=>{
        Animated.timing(replyViewHeight,{
            toValue: 75,
            duration: 200,
            useNativeDriver: false,
        }).start()
    }
    let replyMessage="";
    switch(reply?.type){
        case ETypeMessage.text:
            replyMessage=reply?.msg?.length>25?reply?.msg.substring(0,25)+"...":reply?.msg
            break;
        case ETypeMessage.voice:
            replyMessage="Голосовое сообщение"
            break;
        case ETypeMessage.image:
            replyMessage="Картинка"
            break;

    }
    const closeReplay=()=>{
        replyViewClose()
        dispatch(updateReply(null))
    }
    return(
        <Animated.View style={{ height:replyViewHeight,backgroundColor:"white",width:"100%",flexDirection:"row",alignItems:"center",borderBottomColor:"#00000030",borderBottomWidth:1,paddingVertical:0}}>
            <View style={{width:60,alignItems:"center",height:"100%",overflow:"hidden",justifyContent:"center"}}>
                <FontAwesomeIcon icon={faShare} color="#EB539F"/>
            </View>
            <View style={{flex:1,overflow:"hidden"}}>
                <Text style={{color:"#EB539F"}}>Ответить на</Text>
                <Text style={{overflow:"hidden",width:"100%"}}>{replyMessage}</Text>
            </View>
            <Pressable onPress={closeReplay}  style={{width:75,height:"100%",overflow:"hidden" ,alignItems:"center",justifyContent:"center"}}>
                <FontAwesomeIcon icon={faXmark} size={23} color="#EB539F"/>
            </Pressable>
        </Animated.View>
    )
}

export default ReplayMessage;