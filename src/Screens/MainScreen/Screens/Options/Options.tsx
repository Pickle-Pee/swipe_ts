import { FC, useRef, useState } from "react";
import { Animated, Image, Pressable, SafeAreaView, Text, View, useWindowDimensions } from "react-native";
import SVGAppLogo from "../../../../SVG/SVGAppLogo";
import { Shadow } from "react-native-shadow-2";
//@ts-ignore
import {BoxShadow} from 'react-native-shadow';
import SVGDeleted from "../../../../SVG/SVGDeleted";
import SVGLogOut from "../../../../SVG/SVGLogOut";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import SvgChevronLeft from "../ChatScreen/svg/chevronLeft";
import { socketClient } from "../../../../socket/socketClient";
import { RESET_MESSAGE_REDUCER } from "../../../../store/reducers/messageReducer";
import { useAppDispatch } from "../../../../store/typesHooks/typesHooks";
import { RESET_LIKE_REDUCER } from "../../../../store/reducers/likesReducer";
import { RESET_TEMP_USER_REDUCER } from "../../../../store/reducers/tempUserDataReducer";
import { RESET_USER_REDUCER } from "../../../../store/reducers/userReducer";
import tokenStorage from "../../../../localStorage/tokenStorage";

const Options:FC<{navigation:any}>=({navigation})=>{
    const {width}=useWindowDimensions()

    const themeTumbler=useRef(new Animated.Value(-85)).current
    const themeColor=useRef(new Animated.Value(5)).current
    const [theme,setTheme]=useState<boolean>(true);
    const dispatch=useAppDispatch()
    const colorInterpolation = themeTumbler.interpolate({
        inputRange: [-85, -5],
        outputRange: ["rgba(242,242,242,1)", "rgba(36,36,36,1)"],
      });
      const textColorInterpolation = themeTumbler.interpolate({
        inputRange: [-85, -5],
        outputRange: ["black","white"],
      });
      const borderColorInterpolation = themeTumbler.interpolate({
        inputRange: [-85, -5],
        outputRange: ["rgba(223,223,223,1)","rgba(12,12,12,1)"],
      });
    const toNightTheme=()=>{
        Animated.timing(themeTumbler,{
            toValue:-5,
            useNativeDriver:false,
            duration:200
        }).start()

    }
    const toSunTheme=()=>{
        Animated.timing(themeTumbler,{
            toValue:-85,
            useNativeDriver:false,
            duration:200
        }).start()
    }

    const thumbler=()=>{
        if(theme){
            toNightTheme()
            setTheme(false)
        }else{
            toSunTheme()
            setTheme(true)
        }
    }
    const handleBack=()=>{
        console.log("back");
        
        navigation.goBack()
    }

    const exit = async () => {
        socketClient.closeSession();
        dispatch(RESET_MESSAGE_REDUCER())
        dispatch(RESET_LIKE_REDUCER())
        dispatch(RESET_TEMP_USER_REDUCER())
        dispatch(RESET_USER_REDUCER())
       await tokenStorage.deleteRefreshToken()
       navigation.reset({
        index:0,
        routes:[{name:"Loader"}]
       }) 
      };
    return(
        <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
            <Shadow 
                sides={{
                    bottom:true,
                    top:false,
                    start:false,
                    end:false
                }}
            >
                <Pressable onPress={handleBack} style={{width:50,height:61,justifyContent:"center",alignItems:"center",position:'absolute',zIndex:2}}>
                        <SvgChevronLeft/>
                    </Pressable>
                <View style={{height:61,width:width,alignItems:'center'}}>
                    <SVGAppLogo/>
                </View>
                
            </Shadow>
            <View style={{paddingTop:5,paddingHorizontal:20}}>
                <Pressable style={{height:54,borderBottomColor:"#E5E5E5",borderBottomWidth:1,flexDirection:'row', alignItems:'center'}}>
                    <Text style={{fontFamily:"SF Pro Display",fontSize:16,fontWeight:"400",color:"#757677"}}>Подтверждение профиля</Text>
                </Pressable>
                <Pressable style={{height:54,borderBottomColor:"#E5E5E5",borderBottomWidth:1,flexDirection:'row', alignItems:'center'}}>
                    <Text style={{fontFamily:"SF Pro Display",fontSize:16,fontWeight:"400",color:"#757677"}}>Оповещения</Text>
                </Pressable>
                <Pressable style={{height:54,borderBottomColor:"#E5E5E5",borderBottomWidth:1,flexDirection:'row', alignItems:'center'}}>
                    <Text style={{fontFamily:"SF Pro Display",fontSize:16,fontWeight:"400",color:"#757677"}}>Установить иконку приложения</Text>
                </Pressable>
                <Pressable style={{height:54,borderBottomColor:"#E5E5E5",borderBottomWidth:1,flexDirection:'row', alignItems:'center',justifyContent:'space-between'}}>
                    <Text style={{fontFamily:"SF Pro Display",fontSize:16,fontWeight:"400",color:"#757677"}}>Тема</Text>
                    <Pressable onPress={thumbler}>
                        <Animated.View   style={{borderColor:borderColorInterpolation,borderWidth:3,height:40,width:120,alignItems:'center',flexDirection:'row',borderRadius:40,overflow:'hidden'}}>
                                <Animated.View style={{position:"absolute",zIndex:2,left:themeTumbler,backgroundColor:colorInterpolation,height:40,width:204,flexDirection:"row",alignItems:'center',}}>
                                    <Animated.Text style={{flex:1,fontFamily:"SF Pro Display",fontSize:16,textAlign:'center',width:80,color:textColorInterpolation}}>Темная</Animated.Text>
                                    <Animated.View style={{backgroundColor:"white",borderRadius:30,height:30,width:30,alignItems:'center',justifyContent:'center'}}>
                                        <FontAwesomeIcon icon={faSun} />
                                    </Animated.View> 
                                    <Animated.Text style={{flex:1,fontFamily:"SF Pro Display",fontSize:16,textAlign:'center',width:80,color:textColorInterpolation}}>Светлая</Animated.Text>
                                </Animated.View>
                            </Animated.View >
                    </Pressable>
                </Pressable>
                <Pressable style={{height:54,borderBottomColor:"#E5E5E5",borderBottomWidth:1,flexDirection:'row', alignItems:'center'}}>
                    <Text style={{fontFamily:"SF Pro Display",fontSize:16,fontWeight:"400",color:"#757677"}}>Изменить пароль</Text>
                </Pressable>
                <Pressable style={{height:54,borderBottomColor:"#E5E5E5",borderBottomWidth:1,flexDirection:'row', alignItems:'center'}}>
                    <Text style={{fontFamily:"SF Pro Display",fontSize:16,fontWeight:"400",color:"#757677"}}>Приобрести VIP</Text>
                </Pressable>
                <Pressable style={{height:54,borderBottomColor:"#E5E5E5",borderBottomWidth:1,flexDirection:'row', alignItems:'center',justifyContent:'space-between'}}>
                    <Text style={{fontFamily:"SF Pro Display",fontSize:16,fontWeight:"400",color:"#757677"}}>Удалить анкету</Text>
                    <SVGDeleted/>
                </Pressable>
                <Pressable onPress={exit} style={{height:54,borderBottomColor:"#E5E5E5",borderBottomWidth:1,flexDirection:'row', alignItems:'center',justifyContent:'space-between'}}>
                    <Text style={{fontFamily:"SF Pro Display",fontSize:16,fontWeight:"400",color:"#FF3B30"}}>Выход</Text>
                    <SVGLogOut/>
                </Pressable>
            </View>
            
        </SafeAreaView>
    )
}

export default Options;