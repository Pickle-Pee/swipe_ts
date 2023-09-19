import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HPanel from './LikesScreen/HPanel/HPanel';
import NavPanel, { ContextPanel } from './components/NavPanel';
import { useAppSelector } from '../store/typesHooks';
import { IChatInfo } from '../store/reducers/messageReducer';

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
  
  
  const chats : Array<ChatList>=[];

  Object.keys(chatInfo).forEach((element,index)=>{
      chats.push({chatId:parseInt(element), chatInfo: chatInfo[parseInt(element)],id:index})
  })

    const toChat=(chatId:number)=>{
      navigation.navigate("ChatScreen",{chatId})
    }
  
  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:"white" }}>
      <NavPanel panel={ContextPanel.none}/>
      <View style={{}}>
          <FlatList
            bounces={false}
            data={chats}
            renderItem={({item})=>{
              //console.log(item);
              
                if(item.chatInfo==null){
                  return <View></View>
                }
              return (
                <View key={item.id} style={{height:84,flexDirection:"row"}}>
                 
                  <Pressable style={{width:82,height:84,justifyContent:'center',paddingLeft:20}}>
                    {item.chatInfo.avatar_url
                    ?<Image source={{uri:item.chatInfo.avatar_url}} borderRadius={23}  width={46} height={46}/>
                    :<View style={{width:46,height:46,backgroundColor:stringToColor(item.chatInfo.first_name),borderRadius:23,justifyContent:"center",alignItems:"center"}}>
                       <Text style={{fontFamily:"SF Pro Display",fontSize:25,fontWeight:"500"}}>{item.chatInfo.first_name[0]}</Text>
                    </View>
                    }
                  </Pressable>

                  <Pressable onPress={()=>toChat(item.chatId)} style={{flex:1,borderBottomColor:"#B9B9B9",borderBottomWidth:1,justifyContent:"center"}}>
                      <Text style={{fontFamily:"SF Pro Display",fontSize:16,fontWeight:"500"}}>{item.chatInfo.first_name}, {item.chatInfo.age}</Text>
                      <View style={{flexDirection:"row",alignItems:"center",height:12}}>
                            <View style={{width:6.43,height:6.43,backgroundColor:"#3AE000",borderRadius:6}}></View>
                            <Text style={{marginLeft:4.6, fontFamily:"SF Pro Display",fontSize:10,fontWeight:"400",lineHeight:11.72}}>онлайн</Text>
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
