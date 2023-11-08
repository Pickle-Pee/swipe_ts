import { FC } from "react";
import { BackHandler, Linking, Pressable, SafeAreaView, Text, View, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
//@ts-ignore
import {BoxShadow} from 'react-native-shadow';
import SVGCancelVip from "../../SVG/SVGCancelVip";

interface ISOSButton{
    route:any,
    navigation:any
}

const SOSButton:FC<ISOSButton>=({route,navigation})=>{
  
    console.log(route);
    
    const {width,height}=useWindowDimensions()
    const shadowOpt = {
        width:width*0.75-50,
        height:width*0.75-50,
        color:"#A4A4A4",
        border:30,
        radius:(width*0.75-50)/2,
        opacity:0.6,
        x:30,
        y:40,
        
    }
    const shadowOpt2 = {
        width:width*0.75-50,
        height:width*0.75-50,
        color:"#ffffff",
        border:30,
        radius:(width*0.75-50)/2,
        opacity:1,
        x:0,
        y:0,
        
    }
    const shadowOptBack = {
        width:42.5,
        height:42.5,
        color:"#000000",
        border:15,
        radius:21,
        opacity:0.26,
        x:15.5,
        y:18.5,
        
    }
    const cancel=()=>{
        navigation.goBack()
        
       
    }

    const call112=()=>{
        Linking.openURL('tel:112');
    }
    return(
        <View style={{height}}>
            <LinearGradient 
                style={{height,paddingTop:142,paddingBottom:135, width,justifyContent:'space-between',alignItems:'center'}}
                locations={[0.3,0.7,1]}
                colors={["#E8F0FD","#FFFFFF","#DEE9FD"]}
            >
                <View style={{alignItems:'center',paddingRight:50}}>
                    <BoxShadow
                    setting={shadowOpt2}
                    >
                        <BoxShadow
                        style={{}}
                        setting={shadowOpt}
                        >
                            <Pressable onPress={call112} style={{backgroundColor:'rgba(255, 67, 62, 0.8)',width:width*0.75,height:width*0.75,borderRadius:200,borderColor:"#CFDAE9",borderWidth:10,alignItems:'center',justifyContent:'center',}}>
                                <Text style={{fontFamily:"SF Pro Display",fontSize:89,fontWeight:"400",color:"white"}}>SOS</Text>
                            </Pressable>
                        </BoxShadow>
                    </BoxShadow>
                   
                    
                </View >
              {route.params.isCancel&&  <View style={{alignItems:'center'}}>
                    <Pressable onPress={cancel} style={{position:'relative',height:65,width:65}}>
                        <BoxShadow
                        setting={shadowOptBack}
                        >
                            <View style={{backgroundColor:'#CFDAE9',width:65,height:65,borderRadius:65,alignItems:'center',justifyContent:'center',borderWidth:0.1,borderColor:"white"}}>
                                <View style={{backgroundColor:'#E5EEFF',width:59,height:59,borderRadius:59,borderColor:'#CBCBCB',borderWidth:2,alignItems:'center',justifyContent:'center'}}>
                                    <SVGCancelVip color="#A1ADC5"/>
                                </View>
                            </View>
                        </BoxShadow>
                    </Pressable>
                    
                    <Text style={{marginTop:11, fontFamily:"SF Pro Display",fontSize:11,fontWeight:"400",color:"#667491"}}>Отменить</Text>
                </View>}
               
            </LinearGradient>
        </View>
    )
}

export default SOSButton;


