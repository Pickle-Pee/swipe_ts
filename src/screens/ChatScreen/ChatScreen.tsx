import { NavigationProp } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { FC, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, FlatList, Image, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StatusBar, StatusBarStyle, Text, TextInput, View, useWindowDimensions } from "react-native";
import SvgChevronLeft from "./svg/chevronLeft";
import SvgScrepka from "./svg/Screpka";
import SvgSendButton from "./svg/SendButton";
import { socketClient } from "../../socket/socketClient";
import { useAppDispatch, useAppSelector } from "../../store/typesHooks";
import SvgMessageBottomItemRight from "./svg/messageBottomItemRight";
import SvgMessageBottomItemLeft from "./svg/messageBottomItemLeft";
import SvgIconsAllDone from "./svg/Icon_all_done";
import SvgIconDone from "./svg/IconDone";
import SvgIconWait from "./svg/IconWait";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShare,faXmark} from '@fortawesome/free-solid-svg-icons'
import { markReadAllMessage } from "../../store/reducers/messageReducer";
import { PanResponder } from "react-native";
import MessageItem from "./MessageItem";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob'
import Modal from "react-native-modal";
interface IChatScreen{
    navigation:any;
    route:any;
}

const ChatScreen:FC<IChatScreen>=({navigation,route})=>{
    const chatId=route.params.chatId;
    const {width,height}=useWindowDimensions()
    const [msg,setMsg]=useState<string>("")
    const {userId,accessToken}=useAppSelector(state=>state.user)
    const currentMessages=useAppSelector(state=>state.message.listMessage[chatId])
    const textInputRef = useRef<TextInput>(null);
    const dispatch=useAppDispatch()
    const [file,setFile]=useState<Array<string>>([])
    const replyViewHeight=useRef(new Animated.Value(0)).current
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
    const [isReplay,editReplay]=useState<string>("")
    const focusTextInput = () => {
        if (textInputRef.current) {
          textInputRef.current.focus();
        }
      };
    useEffect(()=>{
        console.log("repl");
        
        isReplay&&focusTextInput();
        isReplay&&replyViewOpen()
        !isReplay&&replyViewClose()
    },[isReplay])
  

  const onRelease = () => {
    console.log("RELEASE");
    
  };
  const sendMessage=()=>{
        if(msg.length>0){
           // console.log(userId);
            
            socketClient.sendMessage(chatId,msg,userId)
        }
        setMsg("")
        
    }

    const getMessage=()=>{
        socketClient.getMessagesInChat(chatId)
    }

    useEffect(()=>{ 

        if(!currentMessages || currentMessages?.length==0){
            console.log("GET");
            
            getMessage()
        }
        
       
    },[])

    useEffect(()=>{
       socketClient.readingMessageInChat(chatId)
        dispatch(markReadAllMessage(chatId))
    },[currentMessages])

    const handleBack=()=>{
        navigation.goBack()
    }
   
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
            <Modal isVisible={photoVisibleUri.length>0} animationIn={"fadeIn"} style={{padding:0,backgroundColor:"white",margin:0}}>
                <SafeAreaView style={{backgroundColor:"black",flex:1,alignItems:'center',justifyContent:"center"}}>
                    <Animated.View style={{position:"absolute",top:animVisibleNav,height:100,zIndex:2, width:"100%",backgroundColor:"#000000aa",justifyContent:'flex-end',padding:20}}>
                        <Pressable onPress={()=>setPhotoVisibleUri("")}>
                            <FontAwesomeIcon icon={faXmark} size={30} color="white"/>
                        </Pressable>
                    </Animated.View>
                    <Pressable onPress={()=>setVisibleNav(v=>!v)}>
                        <Image source={{uri:photoVisibleUri}} style={{width:Dimensions.get("window").width,aspectRatio: 1 / 2}}  resizeMode="contain" />
                    </Pressable>
                       
                </SafeAreaView>
            </Modal>
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
                <View  style={{ paddingHorizontal:10, height:height*0.75-(file.length>0?90:0),backgroundColor:"#DEF4FE"}} >
                   <FlatList
                   keyboardShouldPersistTaps={true}
                   showsVerticalScrollIndicator={false}
                   inverted
                   style={{height:height*0.75,paddingBottom:10}}
                   contentContainerStyle={{paddingTop:10}}
                   data={currentMessages??[]}
                   renderItem={({item})=>{
                    
                    return (
                        <MessageItem message={item} editReplay={editReplay} />
                    
                    )
                   }}
                   />
                   
                </View>
                {file.length>0&&
                <View style={{backgroundColor:"#DEF4FE",borderBottomColor:"#00000030",borderBottomWidth:1}}>
                    <View style={{flexDirection:"row",height:90, backgroundColor:"#ffffff",width:"100%",alignItems:'center',paddingHorizontal:10}}>
                    {file.map((el,i)=><Pressable onPress={()=>setPhotoVisibleUri(el)}><Image style={{marginHorizontal:5}} key={i} source={{uri:el}} width={Dimensions.get("window").width/5-20} height={70}/></Pressable>)}
                  
                </View>
                </View>
                }
                <Animated.View style={{position:"absolute",bottom:replyViewHeight,backgroundColor:"white",width:"100%",flexDirection:"row",alignItems:"center",borderBottomColor:"#00000030",borderBottomWidth:1,paddingVertical:10}}>
                   <View style={{width:60,alignItems:"center"}}>
                        <FontAwesomeIcon icon={faShare} color="#EB539F"/>
                   </View>
                   <View style={{flex:1,overflow:"hidden"}}>
                        <Text style={{color:"#EB539F"}}>Ответить на</Text>
                        <Text style={{overflow:"hidden",width:"100%"}}>{isReplay.length>25?isReplay.substring(0,25)+"...":isReplay}</Text>
                   </View>
                   <Pressable onPress={()=>editReplay("")} style={{width:80,height:"100%" ,alignItems:"center",justifyContent:"center"}}>
                        <FontAwesomeIcon icon={faXmark} size={23} color="#EB539F"/>
                   </Pressable>
                </Animated.View>
                <View style={{height:75,flexDirection:"row",alignItems:"center",backgroundColor:"white"}}>
                    <Pressable onPress={async()=>{
                       
                       const result = await launchImageLibrary({
                        mediaType:"photo",
                        selectionLimit:5
                       });
                       console.log(result.assets);
                       console.log(result.assets![0].uri!);
                       const path="var/mobile/Containers/Data/Application/8B0CA0E4-554A-460F-BFF4-0B94DA655781/tmp/8AF9CA2E-DC2E-470E-95E7-20F627EED4EF.png"
                     const file :Blob=await  RNFetchBlob.fs.readFile(path, 'base64')
                    // const formData=new FormData()
                    //  formData.append('image',{
                    //     uri:result.assets![0].uri!,
                    //     type: 'image/png',
                    // })
                    //  axios.post(
                    //     "http://193.164.150.223:1024/service/upload",
                    //     {file:formData},
                    //     {
                    //         headers: {
                    //             'Authorization':accessToken,
                    //             'Content-Type': 'multipart/form-data', // Указываем тип содержимого как многопартовую форму
                    //         },
                    //     }
                    //  ).catch((e)=>console.log(e)
                    //  )
                    const listUri:Array<string>=[]
                       if(result.assets){
                        result.assets.map(el=>{
                            listUri.push(el.uri!)
                        })
                       }
                       setFile(listUri)
                         
                         
                    }} style={{width:width*0.133,height:75,justifyContent:'center',alignItems:'flex-end',paddingRight:12}}>
                        <SvgScrepka/>
                    </Pressable>
                    <View style={{width:width*0.70}}>
                        <TextInput ref={textInputRef} onSubmitEditing={sendMessage} blurOnSubmit={msg.length<1} placeholder="Введите сообщение..." value={msg} onChangeText={setMsg} style={{paddingLeft:19, borderColor:"#DDDDDD",borderWidth:1,height:42,borderRadius:10}}/>
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