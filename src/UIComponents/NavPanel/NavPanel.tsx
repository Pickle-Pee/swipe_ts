import React, { FC, ReactElement, useState } from "react";
import { Animated, Image, Platform, Pressable, SafeAreaView, StyleSheet, Text, View, ViewStyle } from "react-native";
import ReactNativeModal from "react-native-modal";
import { RESET_MESSAGE_REDUCER } from "../../store/reducers/messageReducer";
import { RESET_LIKE_REDUCER } from "../../store/reducers/likesReducer";
import { RESET_TEMP_USER_REDUCER } from "../../store/reducers/tempUserDataReducer";
import { socketClient } from "../../socket/socketClient";
import { RESET_USER_REDUCER } from "../../store/reducers/userReducer";
import tokenStorage from "../../localStorage/tokenStorage";
import { useAppDispatch } from "../../store/typesHooks/typesHooks";
import SVGSetting from "../../SVG/SVGSetting";
import { MainNavigationName } from "../../Screens/MainScreen/MainScreen";
import SVGAppLogo from "../../SVG/SVGAppLogo";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export enum ContextPanel{
    none,
    profile

}

export interface IActionContextMenu{
    text:string;
    action:string;
}

const profileContext:Record<ContextPanel,IActionContextMenu[]>={
    [ContextPanel.none]:[],
    [ContextPanel.profile]:[
        {text:"Редактировать профиль",action:"edit_profile"},
        {text:"Добавить фото",action:"add_photo"},
        {text:"Настройки приложения",action:"options"}
    ]

}

interface INavPanel{
    panel:ContextPanel;
    children?:ReactElement;
    navigation:any
    
}

const NavPanel:FC<INavPanel>=({panel,navigation})=>{

    const [openMenu,setOpenMenu]=useState<boolean>(false)
    const dispatch=useAppDispatch()

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
      const editProfile=()=>{
            setOpenMenu(false)
            navigation.navigate("EditProfile")
      }

    const actionDispatcher=(action:string)=>{
        console.log(action);
        
        switch (action){
            case "exit":
                exit()
                setOpenMenu(false);
                break;
                
            case "edit_profile":
                editProfile()
                setOpenMenu(false);
                break;
            case "options":
                setOpenMenu(false)
                navigation.navigate(MainNavigationName.options)
        }
    }
    return(
            <View style={styles.container} >
                    <ReactNativeModal isVisible={openMenu} onBackdropPress={()=>setOpenMenu(false)} animationIn={"zoomIn"} animationOut={"zoomOutUp"} backdropOpacity={0.4}>
                        <View style={{position:"absolute",top:140,right:15, borderRadius:14,backgroundColor:"rgba(220, 220, 217,0.9)",width:"70%"}}>
                            {profileContext[ContextPanel.profile].map((element,inndex,arr)=>{
                                return(
                                    <Pressable onPress={()=>actionDispatcher(element.action)} key={inndex} style={{ height:40,paddingHorizontal:10, justifyContent:"center",alignItems:'flex-start', borderTopWidth:inndex==0?0:1,borderTopColor:inndex==0?"transparent":"#00000022"}}>
                                        <Text style={{fontFamily:"SF Pro Display",fontSize:16, color: "black"}}>{element.text}</Text>
                                    </Pressable>
                                )
                            })}
                        </View>
                    </ReactNativeModal>
                     <SVGAppLogo/>

                     <View style={{position:'absolute',left:10}}>
                            <View style={{backgroundColor:'#e05e12',width:15,height:15,right:0,zIndex:2,position:"absolute",borderRadius:10,borderWidth:2,borderColor:"white"}}>
                            </View>
                            <FontAwesomeIcon icon={faBell} size={30} color=""/>
                     </View>
                    <View style={styles.contextPanel}>
                        {panel==ContextPanel.profile && <Pressable onPress={()=>setOpenMenu(true)}><SettingPanel/></Pressable> }
                    </View>
                   
        </View>
       
       
    )
}

const SettingPanel:FC=()=>{
    return(
        <View>
            <SVGSetting/>
        </View>
    )
}



interface IStyles{
    container:ViewStyle
    shadow:any;
    antiShadow:any;
    contextPanel:any;
}

const styles=StyleSheet.create<IStyles>({
    contextPanel:{
        position:"absolute",
        right:15
    },
    container:{
        width: "100%",
        alignItems:"center",
        justifyContent:"center",
        height: 61,
        backgroundColor: 'white',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 1 }, // Отключение обычной тени
        shadowOpacity: 1,
        shadowRadius: 0.5,
       
    },
    shadow:{
    
        width:"100%",
        backgroundColor: 'white',
        shadowTop: false,
        
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOpacity: 0.25,
                shadowRadius: 1,
                
                shadowOffset: { width: 0, height: 1 },
            },
            android: {
                elevation: 5,
            }
        }),
        },
        antiShadow:{
            zIndex:10,
            marginTop:2,
            backgroundColor:"white",
            height:10,
            width:"100%"
        }
    }
);

export default NavPanel;

function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
