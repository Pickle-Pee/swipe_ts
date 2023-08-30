
import { GradientBorderView } from "@good-react-native/gradient-border";
import { FlatList, KeyboardAvoidingView, StatusBar, Wrap } from "native-base";
import { FC, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Keyboard, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { IInterest, ReturnedData, UserMatches } from "../http/matches/httpMatches";
import {ScrollViewIndicator} from '@fanchenbao/react-native-scroll-indicator';
import SvgUri from "react-native-svg-uri";
import LinearGradient from "react-native-linear-gradient";
interface IInterestingScreen{
    listInteresting:Array<IInterest>;
    navigation:any
}

const InterestingScreen:FC<IInterestingScreen>=({listInteresting,navigation})=>{

    console.log(listInteresting);
    const [variableInteresting,setVariableInteresting]=useState<Array<number>>([]);
    const [block,setBlock]=useState<boolean>(false);
    const noCurrentInteresting=listInteresting.filter((el)=>variableInteresting.indexOf(el.id)>=0);
    const currentInteresting=listInteresting.filter((el)=>variableInteresting.indexOf(el.id)<0);

    
    const [focused,setFocused]=useState<boolean>(false);

    const handleInterestingPress=(index:number)=>{
        const findIndex=variableInteresting.indexOf(index);
        if(findIndex>=0){
            setVariableInteresting(variableInteresting.filter((el)=>el!=index));
        }else{
            setVariableInteresting([...variableInteresting,index]);
        }
    }

    useEffect(()=>{
        if(variableInteresting.length==5){
            setBlock(true)
        }else{
            setBlock(false)
        }
    
    },[variableInteresting])

    const handleInteresting=async()=>{
        if(variableInteresting.length>0){
           const status : ReturnedData=await new UserMatches().addInteresting(variableInteresting);
           if(status.code==0){
            navigation.navigate("TabNavigator")
           }
        }
    }

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal:38}}>
            <View style={{marginTop:30}}>
                <Text style={{fontFamily:"SF Pro Display",fontWeight:"400",fontSize:24,lineHeight:28.13,color:"#1F2937",textAlign:"center"}}>
                    Остался последний шаг! 
                </Text>
                <Text style={{fontFamily:"SF Pro Display",fontWeight:"400",fontSize:14,lineHeight:16.41,color:"#1F2937",textAlign:"center",marginTop:25}}>
                    Завершите настройку профиля{"\n"}
                    и расскажите подробнее о своих{"\n"}
                    интересах и предпочтениях{"\n"}
                    (выберите до 5 интересов)
                    </Text>
            </View>
            <View style={{marginTop:35,flexDirection:"row"}}>
                <Wrap flexDirection={"row"}>
                    {noCurrentInteresting.map((element,i)=><InterestingElement key={i}  block={false} update={handleInterestingPress} interest={element} variable={true}/> )} 
                </Wrap>
            </View>
            <View style={{height:1,width:'100%',backgroundColor:"#E5E5E5",marginTop:10,marginBottom:10}}>
            </View>
            <View style={{marginTop:10,flexDirection:"row"}}>
                <Wrap flexDirection={"row"}>
                    {currentInteresting.map((element,i)=><InterestingElement key={i}  block={block} update={handleInterestingPress} interest={element} variable={false}/>)} 
                </Wrap>
            </View>
            </ScrollView>
           <View style={{height:65,marginHorizontal:20}}>
            <Pressable onPress={handleInteresting}>
                <LinearGradient
                    angleCenter={{x:0.5,y:0.5}}
                    useAngle={true}
                    angle={45}
                    style={{height:55,borderRadius:10,alignItems:"center",justifyContent:"center",marginBottom:10,marginTop:10}}
                    colors={variableInteresting.length>0?["rgba(230, 40, 133, 1)","rgba(0, 154, 218, 1)"]:["gray","gray"]}
                    start={{x:1,y:1}}
                    end={{x:0,y:0}}
                >
                    <Text style={{fontFamily:"SF Pro Display",fontSize:15,fontWeight:"700",color:"white"}}>Готово</Text>
                </LinearGradient>
            </Pressable>
            
           </View>
           </>
         
            
       
    )
}

interface IInterestingElement{
    interest:IInterest;
    update:(index:number)=>void;
    variable:boolean;
    block:boolean;
}
const InterestingElement:FC<IInterestingElement>=({interest,update,variable,block})=>{
    const gradientColors = variable? ['#F857A6', '#20BDFF']:["#F0F6FA","#F0F6FA"];

    const opacity = useRef(new Animated.Value(0.6)).current;

    return(
        <Pressable onPress={block?()=>{}:()=>update(interest.id)}>
            <Animated.View style={{opacity:block?opacity:1}}>
                <GradientBorderView
                gradientProps={{
                colors: gradientColors
                }}
                style={[
                    styleInteresting.buttonContainer,
                {
                    backgroundColor:variable?"white":"#F0F6FA"
                }
                ]}
            >
                <Text style={{ fontFamily:"SF Pro Display",fontWeight:"400",fontSize:15.04,lineHeight:17.62, color:"rgba(0, 0, 0, 1)"}}>{interest.interestText}</Text>
                <View  style={{paddingRight:12.37,paddingLeft:8.59,}}>
                    <SvgUri
                    width={10}
                    height={10}
                        source={variable?require("../../assets/svg/krest.svg"):require("../../assets/svg/plus.svg")}
                    />
                </View>
                
            </GradientBorderView>
            </Animated.View>
            
        </Pressable>
       
    )
}


const styles=StyleSheet.create({
    input:{
        padding:8,
        height:30,
        width:"100%",
        borderBottomColor:"#E5E5E5",
        borderBottomWidth:1,
        fontFamily:"SF Pro Display",
        fontSize:16,
        lineHeight:24,
        color:"#000000",
        fontWeight:"400"
    }
})

const styleInteresting=StyleSheet.create({
    buttonContainer:{
        
        flexDirection:'row',
        borderWidth: 1,
        height:40,
        borderRadius: 10,
        paddingLeft:13.76,
        marginBottom:8.42,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:9.97
    }
})

export default InterestingScreen;