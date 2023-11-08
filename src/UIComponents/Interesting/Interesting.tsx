
import React, { FC, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Keyboard, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { IInterest, ReturnedData, UserMatches } from "../../http/matches/httpMatches";
import { UserHttp } from "../../http/user/httpUser";
import { updateUserProfile } from "../../store/reducers/userReducer";
import { useAppDispatch } from "../../store/typesHooks/typesHooks";
import SVGKrest from "../../SVG/SVGKrest";
import SVGPlus from "../../SVG/SVGPlus";
import GradientButton from "../GradientButton/GradientButton";
interface IInterestingScreen{
    listInteresting:Array<IInterest>;
    initialList?:Array<IInterest>;
    navigation:any
}

const InterestingScreen:FC<IInterestingScreen>=({listInteresting,navigation,initialList})=>{

   // console.log(listInteresting);

    const [variableInteresting,setVariableInteresting]=useState<Array<number>>([]);
    const dispatch=useAppDispatch()
    //console.log(initialList);
    
    const [block,setBlock]=useState<boolean>(false);
    const noCurrentInteresting=listInteresting.filter((el)=>variableInteresting.indexOf(el.interest_id)>=0);
    const currentInteresting=listInteresting.filter((el)=>variableInteresting.indexOf(el.interest_id)<0);

    
    const [focused,setFocused]=useState<boolean>(false);

    const handleInterestingPress=(index:number)=>{
        console.log("click");
        
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
            const newInfo=await  new UserHttp().meInfo();
            if(newInfo==null){
                console.log("Не обновилась инфа");
                
                return;
            }
            dispatch(updateUserProfile(newInfo))
            navigation()
           }
        }
    }

    useEffect(()=>{
        if(initialList){
          const meList =  initialList.map(el=>el.interest_id)
          setVariableInteresting(meList)
        }
    },[])

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
            <View style={{marginTop:35,flexDirection:"row",flexWrap:'wrap'}}>
                    {noCurrentInteresting.map((element,i)=><InterestingElement key={i}  block={false} update={handleInterestingPress} interest={element} variable={true}/> )} 
            </View>
            <View style={{height:1,width:'100%',backgroundColor:"#E5E5E5",marginTop:10,marginBottom:10}}>
            </View>
            <View style={{marginTop:10,flexDirection:"row",flexWrap:'wrap'}}>
                    {currentInteresting.map((element,i)=><InterestingElement key={i}  block={block} update={handleInterestingPress} interest={element} variable={false}/>)} 
            </View>
            </ScrollView>
           <View style={{height:40,marginHorizontal:53,marginBottom:10,marginTop:10}}>
                <GradientButton active={noCurrentInteresting.length>0} onPress={handleInteresting} p={false}>
                    <View
                        style={{height:40,borderRadius:10,alignItems:"center",justifyContent:"center"}}
                    >
                        <Text style={{fontFamily:"SF Pro Display",fontSize:18,fontWeight:"400",color:"black"}}>Готово</Text>
                    </View>
                </GradientButton>
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
        <Pressable onPress={block?()=>{}:()=>update(interest.interest_id)} style={{margin:1}}>
            <Animated.View style={{opacity:block?opacity:1}}>
                <GradientButton onPress={block?()=>{}:()=>update(interest.interest_id)} p={false} active={variable}>
                    <View style={[styleInteresting.buttonContainer,{backgroundColor:variable?"white":"#F0F6FA"}]}>
                        <Text style={{ fontFamily:"SF Pro Display",fontWeight:"400",fontSize:15.04,lineHeight:17.62, color:"rgba(0, 0, 0, 1)"}}>{interest.interestText}</Text>
                        <View  style={{paddingRight:12.37,paddingLeft:8.59,}}>
                        {variable
                        ?<SVGKrest/>
                        :<SVGPlus/>
                        }
                        </View>
                    </View>
               
                </GradientButton>
               
            </Animated.View>
            
        </Pressable>
       
    )
}


const styles=StyleSheet.create({
    input:{
        padding:8,
        height:80,
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
        borderRadius: 20,
        paddingLeft:13.76,
        height:40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight:9.97
    }
})

export default InterestingScreen;