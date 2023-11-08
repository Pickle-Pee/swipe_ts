import { FC, useEffect, useRef, useState } from "react"
import { Animated, Pressable, Text, TextInput, View, useWindowDimensions } from "react-native"
import FileCreator from "./FileCreator"
import dispatcherMessages from "../helpers/dispatcherMessages";
import SvgSendButton from "../svg/SendButton";
import RecordVoice from "./RecordVoice";
import { useAppSelector } from "../../../../../store/typesHooks/typesHooks";

interface IFooterArea{
    chatId:number;
    
}
let interval:string | number | NodeJS.Timeout | undefined;

const FooterArea:FC<IFooterArea>=({chatId})=>{
    
    const {width}=useWindowDimensions()
    const [msg,setMsg]=useState<string>("")
    const textInputRef = useRef<TextInput>(null);
    const {reply}=useAppSelector(state=>state.chatController)
    const {recorded}=useAppSelector(state=>state.chatController)
    const [secondMetr,setSecondMetr]=useState<number>(0)
    const {userId}=useAppSelector(state=>state.user)
    useEffect(()=>{
       
        if(recorded){
            
          interval = setInterval(()=>{
            setSecondMetr(s=>s+100)
          },100)
          startAnimatedVoice("start")
        }else{
            startAnimatedVoice("stop")
            clearInterval(interval)
            setSecondMetr(0)
        }
    },[recorded])
    const animatedVoice=useRef(new Animated.Value(0)).current
    const anima=Animated.loop(
        Animated.sequence([
            Animated.timing(animatedVoice,{
                toValue:1,
                useNativeDriver:false,
                duration:400,
                isInteraction:false
                
            }),
            Animated.timing(animatedVoice,{
                toValue:0,
                useNativeDriver:false,
                duration:400,
                isInteraction:false
            })
        ])
    )
    const startAnimatedVoice=(type:string)=>{
        if(type=="start"){
            anima.start()
        }else{
            anima.stop()
        }
   }  

    const sendMessage=()=>{
        if(msg){
            dispatcherMessages.addTextMessage(chatId,msg,userId);
            setMsg("");
        }
       
   }

   const focusTextInput = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };
useEffect(()=>{
    console.log("repl");
    reply!=null&&focusTextInput();
},[reply])

    return(
        <View style={{height:75,flexDirection:"row",alignItems:"center",backgroundColor:"white"}}>
                    <FileCreator userId={userId} chatId={chatId}/>
                    {/* <Animated.View style={{opacity:xPosition.interpolate({inputRange:[0,140,160],outputRange:[0,0.2,1]})}}>
                            <FontAwesomeIcon icon={faTrashCan} size={25} color="red"/>
                        </Animated.View> */}
                    <View style={{width:width*0.70}}>
                        {recorded
                        ?<View style={{flexDirection:"row",alignItems:"center"}}>
                            <Animated.View style={{opacity:animatedVoice,backgroundColor:"red",width:10,height:10,borderRadius:10,marginRight:30}}></Animated.View>
                            <Text style={{width:50}}>{(secondMetr>=60000?Math.floor(secondMetr/60000)+":":"")+((secondMetr/1000)%60).toString()+(secondMetr%1000==0?".0":"")}</Text>
                            <Text style={{flex:1,}}>{"< - Для отмены"}</Text>
                        </View>
                        : <TextInput ref={textInputRef} onSubmitEditing={sendMessage} blurOnSubmit={msg.length<1} placeholder="Введите сообщение..." value={msg} onChangeText={setMsg} style={{paddingLeft:19, borderColor:"#DDDDDD",borderWidth:1,height:42,borderRadius:10}}/>
                        }
                       
                    </View> 
                    {msg.length>1
                    ?(<Pressable  onPress={sendMessage} style={{flex:1,paddingLeft:8}}>
                        <SvgSendButton/>
                    </Pressable>)
                    :(<RecordVoice chatId={chatId}/>
                   )
                    }
                    
                </View>
    )
}

export default FooterArea;