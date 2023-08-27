import { Image, View } from "native-base";
import { FC, ReactElement } from "react";
import { Platform, StyleSheet, Text, ViewStyle } from "react-native";
import { Shadow } from 'react-native-neomorph-shadows'; 
import Svg from "react-native-svg";
import SvgUri from 'react-native-svg-uri';
export enum ContextPanel{
    none,profile

}

interface INavPanel{
    panel:ContextPanel;
    children?:ReactElement;
}

const NavPanel:FC<INavPanel>=({panel,children})=>{
    return(
            <View style={styles.container} >
                    <Image
                    source={require("../../../assets/logo.png")}       
                    alt="logo"
                    w={37.49}
                    h={33}
                    />
                    <View style={styles.contextPanel}>
                        
                        <SettingPanel/>
                    </View>
                   
        </View>
       
       
    )
}

const SettingPanel:FC=()=>{
    return(
        <View>
            <SvgUri
            width={27}
            height={29}
            source={require("../../../assets/svg/setting_icon.svg")}
            />
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