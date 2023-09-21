import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HPanel from './LikesScreen/HPanel/HPanel';
import NavPanel, { ContextPanel } from './components/NavPanel';
import { useAppDispatch, useAppSelector } from '../store/typesHooks';
import { IChatInfo } from '../store/reducers/messageReducer';
import SvgIconDone from './ChatScreen/svg/IconDone';
import SvgIconsAllDone from './ChatScreen/svg/Icon_all_done';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

interface ChatList{
  chatInfo:IChatInfo|null;
  chatId:number;
  id:number;
}
function stringToColor(str:string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hexColor = (hash & 0x00ffffff).toString(16).toUpperCase();

  const paddedHexColor = '00000'.substring(0, 6 - hexColor.length) + hexColor;

  return `#${paddedHexColor}`;
}






const CommunicationScreen: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

  const {chatInfo}=useAppSelector(state=>state.message)
  const {userId}=useAppSelector(state=>state.user)
  const dispatch=useAppDispatch()
  //console.log(userId);
  
  const chats : Array<ChatList>=[];
  
  
  Object.keys(chatInfo).forEach((element,index)=>{
    
    
      chats.push({chatId:parseInt(element), chatInfo: chatInfo[parseInt(element)],id:index})
  })

    const toChat=(chatId:number)=>{
      navigation.navigate("ChatScreen",{chatId})
    }
    console.log(chatInfo);
    
  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:"white" }}>
      <NavPanel panel={ContextPanel.none}/>
      <View style={{}}>
          <FlatList
          showsVerticalScrollIndicator={false}
            bounces={false}
            data={chats}
            style={{}}
            contentContainerStyle={{paddingBottom:50}}
            renderItem={({item})=>{
            // console.log(item);
                
                if(!item.chatInfo){
                  return <View></View>
                }
              return (
                <View key={item.id} style={{height:84,flexDirection:"row"}}>
                 
                  <Pressable style={{width:82,height:84,justifyContent:'center',paddingLeft:20}}>
                    {item.chatInfo.avatar_url
                    ?<Image source={{uri:item.chatInfo.avatar_url}} borderRadius={23}  width={46} height={46}/>
                    :<View style={{width:46,height:46,backgroundColor:stringToColor(item.chatInfo.first_name??""),borderRadius:23,justifyContent:"center",alignItems:"center"}}>
                       <Text style={{fontFamily:"SF Pro Display",fontSize:25,fontWeight:"500"}}>{item.chatInfo.first_name?.[0]??""}</Text>
                    </View>
                    }
                  </Pressable>

                  <Pressable onPress={()=>toChat(item.chatId)} style={{flex:1,borderBottomColor:"#B9B9B9",borderBottomWidth:1,justifyContent:"space-between"}}>
                      <View style={{marginTop:19}}>
                        <Text style={{fontFamily:"SF Pro Display",fontSize:16,fontWeight:"500"}}>{item.chatInfo.first_name}, {item.chatInfo.age}</Text>
                        <View style={{flexDirection:"row",alignItems:"center",height:12}}>
                              <View style={{width:6.43,height:6.43,backgroundColor:"#3AE000",borderRadius:6}}></View>
                              <Text style={{marginLeft:4.6, fontFamily:"SF Pro Display",fontSize:10,fontWeight:"400",lineHeight:11.72}}>онлайн</Text>
                          </View>
                      </View>
                      <View style={{marginBottom:15}}>
                         <Text style={{fontFamily:"SF Pro Display",fontSize:10,fontWeight:"400",lineHeight:11.72,color:'#5C5C5C'}}>{item.chatInfo.lastMessage?.length>15?item.chatInfo.lastMessage?.substring(0,15)+"...":item.chatInfo.lastMessage??""}</Text>
                         
                      </View>
                     
                      
                      <View style={{position:"absolute",bottom:20,right:20}}>
                      {item.chatInfo.countUnread??-1>0
                    ?<View style={{width:19,height:19,borderRadius:19,backgroundColor:"#5AC8FA",justifyContent:"center",alignItems:"center"}}> 
                      <Text style={{fontFamily:"SF Pro Display",fontSize:10,fontWeight:"400",lineHeight:11.72,color:"#FFFFFF"}}>{item.chatInfo.countUnread}</Text>
                    </View>
                    :userId!=item.chatInfo.userId?<View></View>
                    :item.chatInfo.statusMessage==1?<SvgIconDone/>
                    :item.chatInfo.statusMessage==2?<SvgIconsAllDone/>
                    :item.chatInfo.statusMessage==-1?<FontAwesomeIcon color="#EB539F4D" size={14} icon={ faClock } />
                    :<View style={{width:10,height:10,backgroundColor:'red'}}></View>
                    
                    }
                      
                      </View>
                  </Pressable>
                
                </View>
                
              )
            }}
          />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  chatItem: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  chatTitle: {
    fontSize: 16,
  },
  chatsContainer: {
    flex: 1,
  },
});

export default CommunicationScreen;
