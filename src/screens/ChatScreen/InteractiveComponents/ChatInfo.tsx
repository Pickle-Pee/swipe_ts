import { FC } from "react";
import { Image, Pressable, Text, View } from "react-native";
import SvgChevronLeft from "../svg/chevronLeft";
import { useAppSelector } from "../../../store/typesHooks";
import { stringToColor } from "../../CommunicationScreen";

const ChatInfo:FC<{navigation:any,chatId:number}>=({navigation,chatId})=>{

    const chat=useAppSelector(state=>state.message.chatInfo[chatId])
    

    const handleBack=()=>{
        navigation.goBack()
    }
    return(
        <View style={{height:61,flexDirection:"row",backgroundColor:"white", justifyContent:"space-between",zIndex:5}}>
                <View style={{height:61, flexDirection:'row',alignItems:'center'}}>
                    <Pressable onPress={handleBack} style={{width:50,height:61,justifyContent:"center",alignItems:"center"}}>
                        <SvgChevronLeft/>
                    </Pressable>
                    {chat?.avatar_url
                    ?  <Image style={{borderRadius:23}} width={46} height={46} source={{uri:chat.avatar_url}} />
                    :<View style={{width:46,height:46,backgroundColor:stringToColor(chat?.first_name??""),borderRadius:23,justifyContent:"center",alignItems:"center"}}>
                        <Text style={{fontFamily:"SF Pro Display",fontSize:25,fontWeight:"500"}}>{chat?.first_name![0]??""}</Text>
                    </View>
                    }
                  
                    <View style={{marginLeft:17,marginTop:2}}>
                        <Text style={{fontFamily:"SF Pro Display",fontSize:20,fontWeight:"500"}}>{chat?.first_name??""}, {chat?.age??0}</Text>
                        <View style={{flexDirection:"row",alignItems:"center",height:12}}>
                            <View style={{width:6.43,height:6.43,backgroundColor:"#3AE000",borderRadius:6}}></View>
                            <Text style={{marginLeft:4.6, fontFamily:"SF Pro Display",fontSize:10,fontWeight:"400",lineHeight:11.72}}>{chat?.status}</Text>
                        </View>
                    </View>
                </View>
                <Pressable style={{flexDirection:"row",alignItems:"center",paddingRight:26,paddingLeft:20,height:61}}>
                    <View style={{width:4.2,height:4.2,backgroundColor:"#C9CACA",borderRadius:4}}></View>
                    <View style={{width:4.2,height:4.2,backgroundColor:"#C9CACA",marginHorizontal:4.2,borderRadius:4}}></View>
                    <View style={{width:4.2,height:4.2,backgroundColor:"#C9CACA",borderRadius:4}}></View>
                </Pressable>
            </View>
    )
}

export default ChatInfo;