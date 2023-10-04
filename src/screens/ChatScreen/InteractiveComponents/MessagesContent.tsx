import { FC, useEffect, useState } from "react";
import { FlatList, Pressable, Text, View, useWindowDimensions } from "react-native";
import MessageItem from "../MessageItem/MessageItem";
import { useAppDispatch, useAppSelector } from "../../../store/typesHooks";
import { socketClient } from "../../../socket/socketClient";
import { markReadAllMessage } from "../../../store/reducers/messageReducer";
import ReactNativeModal from "react-native-modal";
import { Radio } from "native-base";
import ReplayMessage from "./ReplyMessage";
interface IMessagesContent{
    chatId:number;
    setPhotoVisibleUri:(value:string)=>void
}
const MessagesContent:FC<IMessagesContent>=({chatId,setPhotoVisibleUri})=>{

    const currentMessages=useAppSelector(state=>state.message.listMessage[chatId])
    const reply=useAppSelector(state=>state.chatController.reply)
    const dispatch=useAppDispatch()
    const {height}=useWindowDimensions()
  
    useEffect(()=>{ 
        if(!currentMessages || currentMessages?.length==0){
           // console.log("GET");
           socketClient.getMessagesInChat(chatId)
        }
    },[])

    useEffect(()=>{
       socketClient.readingMessageInChat(chatId)
        dispatch(markReadAllMessage(chatId))
    },[currentMessages])

    const [modal,setModal]=useState<boolean>(false)
    const [posY,setPosY]=useState<number>(0)
    const [current,setCurrent]=useState<number>(-1)
    const [allDeleted,setAllDeleted]=useState<boolean>(false) 
    const [modalPage,setModalPage]=useState<number>(0)
    const startModal=(posY:number,currentIndex:number)=>{
        setCurrent(currentIndex);
        setPosY(posY);
        setModal(true);
        
    }
    const closeModal=()=>{
        setCurrent(-1);
        setModal(false);
        setModalPage(0)
       
    }
    
    const deleteMessage=()=>{
        
        socketClient.deleteMessage(currentMessages[current].id,allDeleted,chatId)
        setCurrent(-1);
        setModal(false);
        
    }
   
    
    return(
        <View  style={{ height:height*0.75,backgroundColor:"#DEF4FE"}} >
            <ReactNativeModal isVisible={modal} animationIn={"fadeIn"} animationInTiming={300} backdropOpacity={0.1} onBackdropPress={closeModal}>
                
                    {modalPage==0
                    ?<>
                        <Pressable onPress={()=>setModalPage(1)}  style={{backgroundColor:"grey",padding:10,position:"absolute",top:posY-50}}>
                        <Text>удалить</Text>
                        </Pressable>
                    </> 
                    
                    :modalPage==1
                        ?<View style={{backgroundColor:"grey",paddingTop:10, width:"70%",alignSelf:"center"}}>
                            <Text style={{textAlign:"center",paddingHorizontal:30,}}>Вы действительно хотите удалить сообщение?</Text>
                            <View style={{flexDirection:"row",alignItems:'center',marginTop:30,paddingHorizontal:30,}}>
                                <Pressable onPress={()=>setAllDeleted(d=>!d)} style={{backgroundColor:allDeleted?"blue":"white",marginRight:20, borderColor:"blue",borderWidth:1,width:20,height:20}}/>
                                <Text>Удалить для всех</Text>
                            </View>
                            <View style={{flexDirection:'row',marginTop:30}}>
                                <Pressable style={{flex:1,alignItems:"center",justifyContent:'center',height:40}}>
                                    <Text>Отмена</Text>
                                </Pressable>
                                <Pressable onPress={deleteMessage} style={{flex:1,alignItems:"center",justifyContent:'center',height:40}}>
                                    <Text>Удалить</Text>
                                </Pressable>
                            </View>
                        </View>
                        :null
                    }
                    
               
            </ReactNativeModal>
            <FlatList       
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            inverted
            
            style={{height:height*0.75,paddingBottom:10}}
            contentContainerStyle={{paddingTop:10,paddingHorizontal:10, }}
            data={currentMessages??[]}
            keyExtractor={item=>item.uuid}
            renderItem={({item,index})=>{
                return (
                    <Pressable style={{backgroundColor:index!=current?"transparent":"red"}} onLongPress={(event)=>startModal(event.nativeEvent.pageY,index)}>
                         <MessageItem  message={item} setPhotoVisibleUri={setPhotoVisibleUri}/>
                    </Pressable>
                   
                  
                )
            }}
         
            />
               <ReplayMessage/>
        </View>
    )
}

export default MessagesContent;