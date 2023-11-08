import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { Animated, PanResponder, Text, View,Vibration,NativeModules, Image, Pressable } from "react-native";
import SvgMessageBottomItemRight from "../svg/messageBottomItemRight";
import SvgMessageBottomItemLeft from "../svg/messageBottomItemLeft";
import SvgIconDone from "../svg/IconDone";
import SvgIconsAllDone from "../svg/Icon_all_done";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import dispatcherMessages from "../helpers/dispatcherMessages";
import fsvoice from "../../../../../fs/voise/fsvoice";
import { IImageMessage, IMessage, IVoiceMessage } from "../../../../../store/reducers/messageReducer";
import { useAppDispatch, useAppSelector } from "../../../../../store/typesHooks/typesHooks";
import { updateReply } from "../../../../../store/reducers/ChatControllerReducer";
import fsimage from "../../../../../fs/image/fsimage";


const {RTCVibrate}=NativeModules

interface IMessageItem{
    message:IMessage|IVoiceMessage|IImageMessage;
   setPhotoVisibleUri:(value:string)=>void;
}

const MessageItem:FC<IMessageItem>=({message,setPhotoVisibleUri,})=>{
    const {userId}=useAppSelector(state=>state.user)
    const [dx,setDx]=useState<number>(0)
    const [reply,setReplay]=useState<boolean>(false)
    const [replayActive,setReplayActive]=useState<boolean>(false)
    const dispatch=useAppDispatch()

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
              console.log(dx);
              if(message.userId==userId&&dx<-55||message.userId!=userId&&dx>55){
                
                
                setReplay(true)
                dispatch(updateReply(message))
               
              }else{
                setReplay(false)
              
              }
              
              if(message.userId==userId&&dx<-70){
                dx=-70;
              }
              if(message.userId!=userId&&dx>70){
                dx=70;
              }
              xPosition.setValue(message.userId==userId?-dx:dx)
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
        
        reply&&RTCVibrate.vibrateShort()&&dispatch(updateReply(message))
       // setReplay(false)
    },[reply])
    useEffect(()=>{
        // console.log(dx);
        // console.log(replayActive);
        
        
        replayActive&&message.userId==userId&&dx<-50&&dispatch(updateReply(message));
        replayActive&&message.userId!=userId&&dx>-50&&dispatch(updateReply(message));
        
    },[replayActive])

    let currentMessage:ReactNode;

    switch(message.type){
        case "text":
            currentMessage=<ItemText message={message}/>;
        break;
        case "image":
            currentMessage=<ItemImage message={message} setPhotoVisibleUri={setPhotoVisibleUri}/>
        break;
        case "voice":
            currentMessage=<ItemVoice message={message}/>
        break;
        default: <View/>
    }

    return(
        <Animated.View {...panResponder.panHandlers} style={{alignSelf,marginRight:message.userId==userId?xPosition:0,marginLeft:message.userId!=userId?xPosition:0}} >
                        <View style={{ marginTop:10, backgroundColor:"white",borderRadius:10, minWidth:100,maxWidth:300,paddingHorizontal:20,paddingVertical:10}}>
                            {currentMessage}
                            {message.userId==userId&&<View style={{position:"absolute",bottom:0,left:-20}}>
                                 {status==1&& <SvgIconDone/>}
                                 {status==2&& <SvgIconsAllDone/>}
                                 {status==-1&&<FontAwesomeIcon color="#EB539F4D" size={14} icon={ faClock } />}
                                 {status==-2&&<FontAwesomeIcon color="red" size={14} icon={ faExclamationCircle } />}
                            </View>}
                        </View>
                        <View style={{paddingHorizontal:32, alignSelf}}>
                            {message.userId==userId&&<SvgMessageBottomItemRight/>}
                            {message.userId!=userId&&<SvgMessageBottomItemLeft/>}
                            
                        </View>
                        
                    </Animated.View>
    );
}

export default MessageItem;


interface IMessageTyped<T>{
    message:T,
    setPhotoVisibleUri?: T extends IImageMessage? (value:string)=>void:null;
}

const ItemText:FC<IMessageTyped<IMessage>>=({message})=>{
    return(
        <Text style={{fontFamily:"SF Pro Display",fontSize:16,fontWeight:"500",lineHeight:14.06}}>
            {message.msg}
     </Text>
    )
}



const ItemVoice:FC<IMessageTyped<IVoiceMessage>>=({message})=>{

  
    
    const [load,setLoad]=useState<boolean>(true);
    const [path,setPath]=useState<string>("")
    const [play,setPlay]=useState<boolean>(false);
    const [time,setTime]=useState<number>(0)



    const checkFile=async()=>{
        console.log("putFile"+message.path);
      const result=await  fsvoice.checkVoiceInDirectory(message.path);
      if(result==0){
        setPath(message.path);
        fsvoice.checkDurationVoice(message.path,setTime)
        setLoad(false);
      }else{
        const isDownload:number= await fsvoice.downLoadVoice(message.path);
        if(isDownload==0){
            setPath(message.path);
            fsvoice.checkDurationVoice(message.path,setTime)
        }
        setLoad(false);
      }
    }

    useEffect(()=>{
        checkFile()
    },[])

    const playVoice=()=>{
        
        if(!play){
            
            fsvoice.playVoise(path);
            setInterval(()=>{
              setPlay(false)
            },time*1000)
        }
        setPlay(p=>!p);
    }

    return(
        <View style={{flexDirection:"row"}}>
            {load
            ?<View>
                <Text>Load</Text>
            </View>
            :<Pressable onPressIn={playVoice} style={{backgroundColor:"black",width:40,height:40}}>
                <Text style={{color:"white"}}>{play?"||":"|>"}</Text>
            </Pressable>

            }
            
            <Text style={{fontFamily:"SF Pro Display",fontSize:12,fontWeight:"400",lineHeight:14.06}}>
                {path+"//"+time}
            </Text>
        </View>
        
    )
}

interface ILoadImage{
    isLoad:boolean;
    path:string;
}

const ItemImage:FC<IMessageTyped<IImageMessage>>=({message,setPhotoVisibleUri})=>{
    const initialState:ILoadImage[]=message.paths.map(el=>({isLoad:false,path:el.path}))
    const [load,setLoad]=useState<ILoadImage[]>(initialState);


    const checkFile=async()=>{
        load.forEach(async(element)=>{
            const result= await  fsimage.checkImageInDirectory(element.path);
            if(result==0){
                const newSate=load.map(el=>el.path==element.path?{...el,isLoad:true}:el)
                setLoad(newSate)
              } else{
                const isDownload:number= await fsimage.downLoadImage(element.path);
                if(isDownload==0){
                    const newSate=load.map(el=>el.path==element.path?{...el,isLoad:true}:el)
                    setLoad(newSate)
                }
              }
            
        })
    }
        
    
     

    useEffect(()=>{
        checkFile()
    },[])


    return(
        
        <View>
            {load.map((el,i)=>{
                if(el.isLoad){
                    return (
                        <Pressable onPress={()=>setPhotoVisibleUri!(fsimage.cacheDir+"/Image/"+el.path)}>
                             <Image key={i} source={{
                            uri:fsimage.cacheDir+"/Image/"+el.path
                        }} width={100} height={100}/>
                        </Pressable>
                       
                    )
                }else{
                    return(
                        <View style={{width:100,height:100,backgroundColor:"black"}}></View>
                    )
                }
                    
            })}
        </View>
    )
}
