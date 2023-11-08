import { Text, View, useWindowDimensions } from "react-native"

import LinearGradient from "react-native-linear-gradient";
import SVGBunner_1Hearh from "../../../SVG/SVGBunner_1Hearh";


const FirstCard=()=>{

    const {width}=useWindowDimensions()
    return(
             <View
                style={{height:136,borderRadius:20,width:width-40,marginHorizontal:20,backgroundColor:'#FFF7E4'}}
                >
                    <View style={{position:"absolute",top:0,right:0}}>
                        <SVGBunner_1Hearh/>
                    </View>
                    <View style={{justifyContent:"center",height:136,marginLeft:16}}>
                        <Text style={{fontFamily:"SF Pro Display",fontSize:14,fontWeight:"700",color:"#000000"}}>
                            Узнайте кто добавил{"\n"}вас в избранные
                        </Text>
                    </View>
                </View>
    )
}

export default FirstCard;