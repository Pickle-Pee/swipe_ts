import React, { FC, useEffect, useState } from 'react';
import { View, Text, NativeBaseProvider, ScrollView, Center, HStack, Image, FlatList } from 'native-base';
import { TouchableOpacity, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import NavPanel, { ContextPanel } from '../components/NavPanel';
import { LinearGradientText } from 'react-native-linear-gradient-text';
import SvgUri from 'react-native-svg-uri';
import Logo from '../../Logo';
import { useFocusEffect } from '@react-navigation/native';
import { useLikes } from './hooks/useLikes';
import { useAppDispatch, useAppSelector } from '../../store/typesHooks';
import { updateLikes } from '../../store/reducers/likesReducer';
import { IUser } from '../../http/user/httpUser';
import HPanel from './HPanel/HPanel';
import { ChatHttp } from '../../http/chat/httpUser';
//import { LinearTextGradient } from "react-native-text-gradient";
const LikesScreen:FC<any> = ({navigation}) => {

  
    const {likes,update}=useLikes()
        const [punkVariable,setPunkVariable]=useState<number>(0);
       

    return (
        <SafeAreaView style={{backgroundColor:"white",flex:1}}> 
            <NavPanel panel={ContextPanel.none}/>
            <HPanel punkVariable={punkVariable} setPunkVariable={setPunkVariable}/>
            <FlatList
                style={{marginTop:15,paddingHorizontal:15}}
                data={punkVariable==1?likes:[]}
                renderItem={({item,index})=><LikeElement navigation={navigation} key={index} user={item}/>}
            />
            {/* <ScrollView style={{marginTop:15,paddingHorizontal:15}}>
                
                {currentListUsers.map((el,index)=>
                    <LikeElement key={index} user={el}/>
                )}
                
            </ScrollView> */}
        </SafeAreaView>
    )
}

interface ILikeElement{
    user:IUser
    navigation:any;
}

const LikeElement:FC<ILikeElement>=({user,navigation})=>{
    
    const createChat=async()=>{
          const chatId : number=await  new ChatHttp().createChat(user.id);
            console.log(chatId);
            navigation.navigate("ChatScreen")
    }
    return(
        <View style={elementStyles.container}>
            <Image
                    source={{
                        uri:user.avatar_url
                      }}
                      borderRadius={10}       
                    alt="logo"
                    w={165}
                    h={165}
                    />
                    <View style={elementStyles.information}>
                        <Text style={elementStyles.informationName}>{user.first_name+`, ${new Date().getFullYear()-user.birth.getFullYear()}`}</Text>
                        <View style={elementStyles.status}>
                            <View style={elementStyles.online}></View>
                            <Text style={elementStyles.textStatus}>онлайн</Text>
                            <SvgUri
                            width={6}
                            height={8}
                            source={require("../../../assets/svg/geo_icon.svg")}
                            />
                            <Text style={elementStyles.city}>г. Оосака</Text>
                        </View>
                        <View style={elementStyles.sovpadenia}>
                            <Logo/>
                            <Text style={elementStyles.sovpadenia_text}><Text style={elementStyles.sovpadenia_textPost}>90% </Text>совпадений интересов</Text>
                        </View>
                        <View style={{marginTop:11.21,backgroundColor:"#B9B9B9",height:1}}></View>
                        <View style={{marginTop:12,height:41}}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={elementStyles.about}>Я такой то такой то цыган</Text>
                            </ScrollView>
                            
                        </View>
                        <Pressable onPress={createChat} style={{borderRadius:10, alignItems:"center",paddingHorizontal:12, flexDirection:"row",justifyContent:"space-between", position:"absolute",bottom:0,height:30,backgroundColor:"#7760AF",width:"100%"}}>
                                <Text style={elementStyles.chat}>Перейти в чат</Text>
                                <SvgUri
                                    source={require("../../../assets/svg/chat_icon.svg")}
                                />
                        </Pressable>
                        
                    </View>                
        </View>
    )
}

const elementStyles=StyleSheet.create({
    chat:{
        fontFamily:"SF Pro Display",
        fontSize:12,
        fontWeight:"700",
        lineHeight:14.06,
        color:"white"
    },
    about:{
        fontFamily:"SF Pro Display",
        fontSize:8,
        fontWeight:"400",
        lineHeight:9.38,
        color:"black"
    },
    sovpadenia:{
        marginTop:9.39,
        flexDirection:"row",
        alignItems:"center"
    },
    sovpadenia_text:{
        marginLeft:4,
        fontFamily:"SF Pro Display",
        fontSize:10,
        fontWeight:"400",
        lineHeight:11.72,
        color:"black"
    },
    sovpadenia_textPost:{
        fontWeight:"500",
    },
    container:{
        height:175,
        marginTop:10,
        padding:5,
        flexDirection:"row",
    },
    information:{
        marginLeft:8,
        flex:1,
    },
    informationName:{
        fontFamily:"SF Pro Display",
        fontSize:20,
        fontWeight:"500",
        lineHeight:23.44,
        color:"black"
    },
    status:{
        flexDirection:'row',
        marginTop:2,
        alignItems:"center"
    },
    online:{
        width:6.43,
        height:6.43,
        borderRadius:4,
        backgroundColor:"#3AE000"

    },
    textStatus:{
        fontFamily:"SF Pro Display",
        fontSize:10,
        fontWeight:"400",
        lineHeight:11.72,
        color:"black",
        marginLeft:4.6,
        marginRight:4.97
    },
    city:{
        fontFamily:"SF Pro Display",
        fontSize:10,
        fontWeight:"400",
        lineHeight:11.72,
        color:"black",
        marginLeft:3,
    }
})

const styles = StyleSheet.create({

    punkWrapper: {
        flexDirection:"row",
        height:33,
        paddingHorizontal:20,
        marginTop:20,
       
        overflow:"hidden"
    },
    punk: {
        flex:1,
        alignItems:"center",
        justifyContent:"center"

    },
    punktText:{
        fontFamily:"SF Pro Display",
        fontWeight:"400",
        fontSize:12,
    },
    rightRadius:{
        borderTopRightRadius:6,
        borderBottomRightRadius:6
    },
    leftRadius:{
        borderTopLeftRadius:6,
        borderBottomLeftRadius:6
    },
    top_row_section: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
    },

    likeCardItem: {
        borderRadius: 10,
        width: '45%',
        height: 220,
        margin: 10,
        backgroundColor: 'green'
    },

    logoImage: {

    }
})

export default LikesScreen;
