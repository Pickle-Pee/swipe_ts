
import { GradientBorderView } from "@good-react-native/gradient-border";
import { FlatList, KeyboardAvoidingView, StatusBar, Wrap } from "native-base";
import { FC, useEffect, useState } from "react";
import { Dimensions, Keyboard, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { IInterest } from "../http/matches/httpMatches";
import {ScrollViewIndicator} from '@fanchenbao/react-native-scroll-indicator';
import SvgUri from "react-native-svg-uri";
interface IInterestingScreen{
    listInteresting:Array<IInterest>;
}

const InterestingScreen:FC<IInterestingScreen>=({listInteresting})=>{

    const [text, onChangeText] = useState<string>("");
    console.log(listInteresting);
    const [variableInteresting,setVariableInteresting]=useState<Array<number>>([]);
    const currentInteresting=listInteresting.filter((el)=>el.interestText.indexOf(text.toLowerCase())>=0);

    console.log(currentInteresting);
    
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

        Keyboard.addListener("keyboardDidHide",()=>{
            setFocused(false);
        })
        Keyboard.addListener("keyboardWillShow",()=>{
            setFocused(true);
        })
    },[])

    return (
      <View style={{backgroundColor:"white",height:Dimensions.get("window").height}}>
         <SafeAreaView style={{paddingHorizontal:38,backgroundColor:"white",}}> 
          <KeyboardAvoidingView behavior="position" style={{}} keyboardVerticalOffset={0}>
            <View style={{marginTop:105}}>
                <Text style={{fontFamily:"SF Pro Display",fontWeight:"400",fontSize:24,lineHeight:28.13,color:"#1F2937",textAlign:"center"}}>
                    Остался последний шаг! 
                </Text>
                <Text style={{fontFamily:"SF Pro Display",fontWeight:"400",fontSize:14,lineHeight:16.41,color:"#1F2937",textAlign:"center",marginTop:25}}>
                    Завершите настройку профиля{"\n"}
                    и расскажите подробнее о своих{"\n"}
                    интересах и предпочтениях</Text>
            </View>
            <View style={{marginTop:35,flexDirection:"row"}}>
                <Wrap flexDirection={"row"}>
                    {variableInteresting.map(element=><InterestingElement deleted={handleInterestingPress} interest={listInteresting.filter(el=>el.id==element)[0]}/>)} 
                </Wrap>
            </View>
            <View style={{paddingHorizontal:15,marginTop:70}}>
                <TextInput
                    
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Например: Кино"
                   
                />
            </View>
            <View style={{marginHorizontal:23,height:300,paddingBottom:100}}>
                {focused&&
                       
                            <FlatList    
                        scrollIndicatorInsets={{ right: 0 }}
                        
                        indicatorStyle="black"
                        disableScrollViewPanResponder={true}
                        height={200}

                            data={currentInteresting}
                            renderItem={(item)=>{
                              const isVariable:boolean =  variableInteresting.indexOf(item.item.id)>=0;
                                return(
                                <Pressable onPress={()=>handleInterestingPress(item.item.id)}  style={{paddingRight:10, height:34,paddingTop:10,flexDirection:'row',justifyContent:"space-between"}}>
                                    <Text>{item.item.interestText[0].toUpperCase()+item.item.interestText.substring(1)}</Text>
                                    <View style={{borderWidth:1,borderColor:"#E6E6E6",borderRadius:4, height:20,width:20,backgroundColor:isVariable?"#1490D3":"white",alignItems:"center",justifyContent:'center'}}>
                                        {isVariable&&
                                            <SvgUri
                                                source={require("../../assets/svg/ok_icon.svg")}
                                            />
                                        }
                                    </View>
                                </Pressable>
                                 )}
                                
                            }
                        />
                       
                        
                    
                }
            </View>
            
            </KeyboardAvoidingView>
        </SafeAreaView>
        </View>
    )
}


const InterestingElement:FC<{interest:IInterest,deleted:(index:number)=>void}>=({interest,deleted})=>{
    const gradientColors =  ['#F857A6', '#20BDFF'];
    return(
        <GradientBorderView
             gradientProps={{
              colors: gradientColors
            }}
            style={[
                styleInteresting.buttonContainer,
              {
                opacity:  1
              }
            ]}
          >
            <Text style={{ fontFamily:"SF Pro Display",fontWeight:"400",fontSize:15.04,lineHeight:17.62, color:"rgba(0, 0, 0, 1)"}}>{interest.interestText}</Text>
            <Pressable onPress={()=>deleted(interest.id)} style={{paddingRight:12.37,paddingLeft:8.59,}}>
                <SvgUri
                    source={require("../../assets/svg/krest.svg")}
                />
            </Pressable>
            
          </GradientBorderView>
    )
}


const styles=StyleSheet.create({
    input:{
        padding:8,
        height:40,
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
        height:42.96,
        borderRadius: 9,
        paddingLeft:12.89,
        marginBottom:5.04,
        
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:5.3
    }
})

export default InterestingScreen;