import { Text, View, useWindowDimensions } from "react-native"
import SVGBunner_4Smile from "../../../SVG/SVGBunner_4Smile";
import SVGBunner_5Comment from "../../../SVG/SVGBunner_5Comment";


const FiveCard=()=>{
    const {width}=useWindowDimensions()
    return(
             <View
                            style={{height:136,borderRadius:20,width:width-40,marginHorizontal:20,backgroundColor:'#E0FFE9'}}
                            >
                                <View style={{position:"absolute",top:0,right:0}}>
                                    <SVGBunner_5Comment/>
                                </View>
                                <View style={{justifyContent:"center",height:136,marginLeft:16}}>
                                    <Text style={{fontFamily:"SF Pro Display",fontSize:14,fontWeight:"700",color:"#000000"}}>
                                    {"Переходите в чат, не\nдожидаясь взаимной\nсимпатии"}
                                    </Text>
                                </View>
                            </View>
    )
}

export default FiveCard;