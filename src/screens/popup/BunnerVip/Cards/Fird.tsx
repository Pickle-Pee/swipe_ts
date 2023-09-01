import { Text, View, useWindowDimensions } from "react-native"
import SvgCardio from "../SvgComponent/Cardio";
import SvgStar from "../SvgComponent/Star";
import LinearGradient from "react-native-linear-gradient";
import SvgCardio_m20 from "../SvgComponent/Cardio_m20";
import SvgCardio_m42 from "../SvgComponent/Cardio_m42";
import SvgSearch from "../SvgComponent/Search";

const FirdCard=()=>{
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
                                <View style={{position:"absolute",top:31,left:102}}>
                                    <SvgStar/>
                                </View>
                                <View style={{position:"absolute",top:21,right:22}}>
                                    <SvgStar/>
                                </View>
                                
                                <View style={{position:"absolute",top:41,left:60}}>
                                    <SvgCardio_m42/>
                                </View>
                                <View style={{position:"absolute",top:53,left:38}}>
                                  
                                  <SvgSearch/>
                                </View>

                                <View style={{position:"absolute",left:162,justifyContent:"center",height:136}}>
                                    <Text style={{fontFamily:"SF Pro Display",fontSize:14,fontWeight:"700",color:"white"}}>
                                    {"Знакомьтесь\nбез рекламы"}
                                    </Text>
                                </View>
                            </LinearGradient>
    )
}

export default FirdCard;