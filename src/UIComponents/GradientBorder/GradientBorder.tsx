import { FC, ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface IGradientBorder{
    children:ReactNode,
    style?:StyleProp<ViewStyle>,
    active?:boolean;
    br:number;
    wid:number;
}

const GradientBorder:FC<IGradientBorder>=({children,style,active=true,br=30,wid})=>{

    

    return(
        <LinearGradient
            angleCenter={{x:0.5,y:0.5}}
            useAngle={true}
            angle={45}
            start={{x:1,y:1}}
            end={{x:0,y:0}}
            colors={active?["#F857A6","#20BDFF"]:["#F0F0F0","#F0F0F0"]}
            style={{padding:wid,borderRadius:br}}

        >
            <View style={[style,{backgroundColor:"white",borderRadius:30}]}>
               {children}
            </View>
          
        </LinearGradient>
    )
}

export default GradientBorder