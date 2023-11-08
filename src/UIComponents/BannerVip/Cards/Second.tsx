import { Text, View, useWindowDimensions } from "react-native"
import LinearGradient from "react-native-linear-gradient";
import SVGBunner_1Search from "../../../SVG/SVGBunner_2Search";


const SecondCard=()=>{

    const {width}=useWindowDimensions()
    return(
             <View
                            
             
                            style={{height:136,borderRadius:20,width:width-40,marginHorizontal:20,backgroundColor:'#E1FFFF'}}
                            >
                                <View style={{position:"absolute",top:0,right:0}}>
                                    <SVGBunner_1Search/>
                                </View>
                                <View style={{position:"absolute",top:31,left:102}}>
                                   
                                </View>
                                <View style={{position:"absolute",top:21,right:22}}>
                                    
                                </View>
                                
                                <View style={{position:"absolute",top:41,left:60}}>
                                  
                                </View>
                                <View style={{position:"absolute",top:53,left:38}}>
                                  
                                  
                                </View>

                                <View style={{justifyContent:"center",height:136,marginLeft:16}}>
                                    <Text style={{fontFamily:"SF Pro Display",fontSize:14,fontWeight:"700",color:"#000000"}}>
                                    {"Используйте\nдополнительные опции\nпоиска: рост, вес и др."}
                                    </Text>
                                </View>
                            </View>
    )
}

export default SecondCard;