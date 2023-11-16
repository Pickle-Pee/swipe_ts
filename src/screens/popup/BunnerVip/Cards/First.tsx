import { Text, View, useWindowDimensions } from "react-native"
import SvgCardio from "../SvgComponent/Cardio";
import SvgStar from "../SvgComponent/Star";
import LinearGradient from "react-native-linear-gradient";
import SvgCardio_m20 from "../SvgComponent/Cardio_m20";

const FirstCard=()=>{

    const {width}=useWindowDimensions()
    return(
             <LinearGradient
                            useAngle={true}
                            angle={45}
                            angleCenter={{x:0.5,y:0.5}}
                            style={{height:136,borderRadius:20,width:width-40,marginHorizontal:20}}
                                start={{x: 0, y: 0}} 
                                end={{x: 1, y: 0}}
                                colors={["rgba(247, 88, 166, 1)","rgba(32, 189, 255, 1)"]}
                            >
                                <View style={{position:"absolute",top:21,left:31}}>
                                    <SvgStar/>
                                </View>
                                <View style={{position:"absolute",top:88,left:105}}>
                                    <SvgStar/>
                                </View>
                                <View style={{position:"absolute",top:21,right:22}}>
                                    <SvgStar/>
                                </View>
                                
                                <View style={{position:"absolute",top:21,left:55}}>
                                    <SvgCardio_m20/>
                                </View>
                                <View style={{position:"absolute",top:50,left:28}}>
                                  
                                  <SvgCardio/>
                                </View>

                                <View style={{position:"absolute",left:162,justifyContent:"center",height:136}}>
                                    <Text style={{fontFamily:"SF Pro Display",fontSize:14,fontWeight:"700",color:"white"}}>
                                    Узнайте кто добавил{"\n"}вас в избранные
                                    </Text>
                                </View>
                            </LinearGradient>
    )
}

export default FirstCard;