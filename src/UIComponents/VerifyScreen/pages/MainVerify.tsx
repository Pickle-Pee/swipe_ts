import { FC } from "react";
import { Pressable, Text, View, useWindowDimensions } from "react-native";
import SVGProtected from "../../../SVG/SVGProtected";
import LinearGradient from "react-native-linear-gradient";
import GradientButton from "../../GradientButton/GradientButton";

interface IMainVerify{
    toPage:()=>void;
}
const MainVerify:FC<IMainVerify>=({toPage})=>{
    const {width}=useWindowDimensions()
    return(
        <View style={{justifyContent:'space-between',flex:1,alignItems:'center'}}>
            <View>
                <Text style={{marginTop:105, fontFamily:"SF Pro Display",fontWeight:"400",fontSize:24, color:"#1F2937"}}>Подтвердите аккаунт</Text>
                <Text style={{marginTop:30, fontFamily:"SF Pro Display",fontWeight:"400",fontSize:16, color:"#000000",textAlign:'center'}}>
                    Загрузите ваше фото в профиль{"\n"}и сделайте селфи по примеру.{"\n"}
                    Это обязательное условие.{"\n"}
                    Это позволит пользователям{"\n"}убедиться, что вы живой человек,{"\n"}
                    подтвержденный аккаунт{"\n"}вызывает больше доверия!
                </Text>
                <View style={{marginTop:75,alignSelf:'center'}}>
                     <SVGProtected/>
                </View>
               
            </View>
            <View style={{height:40,marginHorizontal:53,marginBottom:10,marginTop:10,width:width-106}}>
                <GradientButton  onPress={toPage} p={false}>
                    <View
                        style={{height:40,borderRadius:10,alignItems:"center",justifyContent:"center"}}
                    >
                        <Text style={{fontFamily:"SF Pro Display",fontSize:18,fontWeight:"400",color:"black"}}>Начать</Text>
                    </View>
                </GradientButton>
            </View>
            
        </View>
    )
}

export default MainVerify