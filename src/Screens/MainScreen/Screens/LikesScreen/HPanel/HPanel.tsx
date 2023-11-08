import { FC, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { LinearGradientText } from "react-native-linear-gradient-text";

interface IHPanel{
    punkVariable:number;
    setPunkVariable:(b:number)=>void;
}

const HPanel:FC<IHPanel>=({punkVariable,setPunkVariable})=>{

    const[punkt,setPunkt]=useState<number>(0)

    useEffect(()=>{
        setPunkVariable(punkt);
    },[punkt])

    return(
        <View style={styles.punkWrapper}>
        <Pressable 
            style={[styles.punk,styles.leftRadius ,{backgroundColor: punkt==0?"#F4F4F4":"#D9D9D9"}]} 
            onPress={()=>setPunkt(0)}
        > 
            <LinearGradientText 
                text='Ты нравишься'
                textStyle={styles.punktText}
                colors={punkt==0?["#E62885", "#009ADA"]:["black"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            />
        </Pressable>
        <Pressable 
            style={[styles.punk,{backgroundColor: punkt==1?"#F4F4F4":"#D9D9D9"}]}
            onPress={()=>setPunkt(1)}
        >
              <LinearGradientText 
                text='Твои лайки'
                textStyle={styles.punktText}
                colors={punkt==1?["#E62885", "#009ADA"]:["black"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            />
        </Pressable>
        <Pressable 
            style={[styles.punk,styles.rightRadius,{backgroundColor: punkt==2?"#F4F4F4":"#D9D9D9"}]}
            onPress={()=>setPunkt(2)}
        >
              <LinearGradientText 
                text='Избранное'
                textStyle={styles.punktText}
                colors={punkt==2?["#E62885", "#009ADA"]:["black"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            />
        </Pressable>
    </View>
    )
}

const styles = StyleSheet.create({

    punkWrapper: {
        flexDirection:"row",
        height:33,
        paddingHorizontal:20,
        marginTop:20,
       
        overflow:"hidden"
    },
    punk: {
        flex:1,
        alignItems:"center",
        justifyContent:"center"

    },
    punktText:{
        fontFamily:"SF Pro Display",
        fontWeight:"400",
        fontSize:12,
    },
    rightRadius:{
        borderTopRightRadius:6,
        borderBottomRightRadius:6
    },
    leftRadius:{
        borderTopLeftRadius:6,
        borderBottomLeftRadius:6
    },
    top_row_section: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
    },

    likeCardItem: {
        borderRadius: 10,
        width: '45%',
        height: 220,
        margin: 10,
        backgroundColor: 'green'
    },

    logoImage: {

    }
})
export default HPanel;