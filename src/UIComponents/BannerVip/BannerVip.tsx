import React, { FC, MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { Button, FlatList, NativeScrollEvent, NativeSyntheticEvent, Pressable, SafeAreaView, Text, View, useWindowDimensions, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Svg, { Defs, Path,LinearGradient as LG, Stop } from "react-native-svg";
import SVGCancelVip from "../../SVG/SVGCancelVip";
import FirdCard from "./Cards/Fird";
import FirstCard from "./Cards/First";
import SecondCard from "./Cards/Second";
import FourCard from "./Cards/Four";
import FiveCard from "./Cards/Five";
import GradientButton from "../GradientButton/GradientButton";




 type ScrollViewRef = typeof ScrollView & {
    flashScrollIndicators: () => void;
};
let interval : any;
const BannerVip:FC<{cancel:()=>void}>=({cancel})=>{
    const {width}=useWindowDimensions()
    const [page,setPage]=useState<number>(0);
    const [reload,setReload]=useState<boolean>(false);
    const [offset,setOffset]=useState<number>(0)
    const [payVariant,setPayVariant]=useState<number>(0)
    const ref=useRef(null)
    const listView=useMemo(()=>
    [
        "Узнайте кто добавил\nвас в избранные",
        "Используйт\nдополнительные опции\nпоиска: рост, вес и др.",
        "Знакомьтесь\nбез рекламы",
        "Используйте\nстикеры в чате",
        "Переходите в чат,\nне дожидаясь взаимной\nсимпатии"
    ],
    [])
  


    const scrollController=(event: NativeSyntheticEvent<NativeScrollEvent>)=>{
        const x=event.nativeEvent.contentOffset.x;
        setOffset(x);  
    }
    const scrollTo=()=>{
            interval=  setTimeout(()=>{
                console.log(page);
                //@ts-ignore
                ref.current.scrollTo({x:((page+1)%5) *width,y:0 }) 
            },3000)
    }

    const scrollBeginDrugController=()=>{
        clearTimeout(interval);
    }

    useEffect(()=>{
        scrollTo()
    },[reload])

    const onMomentumScrollEnd=()=>{
        console.log("dd");
        setReload(r=>!r)
        setPage(offset/width);
        
    }
   
    const close=()=>{
        clearTimeout(interval)
        cancel()
    }
    //"white":"#F0F0F0"
    return(
            <SafeAreaView style={{ flex: 1,width:"100%",height:"100%",backgroundColor:"white",justifyContent:"flex-end" }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Pressable onPress={close} style={{height:40,width:40,alignItems:"center",justifyContent:'center',marginLeft:15.97,marginTop:19.46,marginBottom:20}}>
                    <SVGCancelVip/>
                </Pressable> 
                <Text style={{textAlign:"center", fontFamily:"SF Pro Display",fontSize:24,fontWeight:"700",color:"black"}}>Активируйте VIP</Text>
               <ScrollView
               contentContainerStyle={{height:136}}
               style={{height:136,marginTop:25}}
               showsHorizontalScrollIndicator={false}
               scrollEventThrottle={16}
                    onScroll={scrollController}
                    onScrollBeginDrag={scrollBeginDrugController}
                    onMomentumScrollEnd={onMomentumScrollEnd}
                    ref={ref} 
                    horizontal
                    bounces={false}
                    pagingEnabled={true}
                >
                    <FirstCard/>
                    <SecondCard/>
                    <FirdCard/>
                    <FourCard/>
                    <FiveCard/>
                      
                </ScrollView>
                  
                 <View style={{flexDirection:"row",marginTop:16,justifyContent:"center"}}>
                    {listView.map((el,index)=>
                         <View style={{height:5,width:36.46,backgroundColor:page==index?"#D4D4D4":"#F0F0F0",marginHorizontal:5,borderRadius:10}}></View>
                    )}
                       
                       
                </View> 
                <View style={{paddingHorizontal:20,marginTop:73}}>
                    <Pressable onPress={()=>setPayVariant(0)}>
                        <GradientButton onPress={()=>{}} p={false} br={10} wid={2} active={payVariant===0} >
                            <View style={{flexDirection:'row',justifyContent:'space-between',height:95,backgroundColor:payVariant==0?"white":"#F0F0F0",width:"100%",borderRadius:8,paddingLeft:21,paddingRight:25}}  
                        >
                        
                            <View style={{justifyContent:"center"}}>
                                <Text style={{fontFamily:"SF Pro Display",fontSize:24,fontWeight:"700",color:"#1F2937"}}>30 дней</Text>
                                <Text style={{marginTop:4, fontFamily:"SF Pro Display",fontSize:15,fontWeight:"400",color:"#009ADA"}}>3 дня бесплатно</Text>
                            </View>
                            <View style={{justifyContent:"center"}}>
                                <Text style={{fontFamily:"SF Pro Display",fontSize:24,fontWeight:"700",color:"#000000"}}>529 ₽</Text>
                            
                            </View>
                        </View>
                        </GradientButton>
                            {payVariant==0&&<LinearGradient
                                    useAngle={true}
                                    angle={45}
                                    angleCenter={{x:0.5,y:0.5}}
                                    colors={["#E62885","#009ADA"]}
                                    style={{ position:"absolute",right:12,top:-15.5,zIndex:5, height:31,borderRadius:20,alignItems:"center",justifyContent:"center",paddingLeft:41,paddingRight:43}}
                                >
                                    <Text style={{fontFamily:"SF Pro Display",fontSize:15,fontWeight:"700",color:"#FFFFFF"}}>Популярно</Text>
                                </LinearGradient>}
                      
                   
                    </Pressable>
                  
                    <View style={{flexDirection:'row',marginTop:22}}>
                        <Pressable style={{height:82,flex:1}} onPress={()=>setPayVariant(1)}>
                        <GradientButton onPress={()=>{}} p={false} br={10} wid={2} active={payVariant===1} >
                            <View style={{flexDirection:'row',justifyContent:'space-between',height:82,backgroundColor:payVariant==1?"white":"#F0F0F0",width:"100%",borderRadius:8,paddingLeft:21,paddingRight:25}}  
                        >
                                <View style={{height:82,flex:1,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
                                    <Text style={{fontFamily:"SF Pro Display",fontSize:14,fontWeight:"400",color:"#1F2937"}}>7 дней</Text>
                                    <Text style={{marginTop:5, fontFamily:"SF Pro Display",fontSize:24,fontWeight:"700",color:"black"}}>269 ₽</Text>
                                </View>
                            </View>
                        </GradientButton>
                        </Pressable>
                        
                        <View style={{width:22}}/>
                        <Pressable style={{height:82,flex:1}} onPress={()=>setPayVariant(2)}>
                        <GradientButton onPress={()=>{}} p={false} br={10} wid={2} active={payVariant===2} >
                            <View style={{flexDirection:'row',justifyContent:'space-between',height:82,backgroundColor:payVariant==2?"white":"#F0F0F0",width:"100%",borderRadius:8,paddingLeft:21,paddingRight:25}}  
                        >
                                <View style={{height:82,flex:1,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
                                    <Text style={{fontFamily:"SF Pro Display",fontSize:14,fontWeight:"400",color:"#1F2937"}}>90 дней</Text>
                                    <Text style={{fontFamily:"SF Pro Display",fontSize:24,fontWeight:"700",color:"black"}}>1290 ₽</Text>
                                    <Text style={{marginTop:4, fontFamily:"SF Pro Display",fontSize:14,fontWeight:"400",color:"#009ADA"}}>Экономия 60%</Text>
                                </View>
                            </View>
                        </GradientButton>
                        </Pressable>
                       
                    </View>                           
                </View>  
                <View style={{height:40,marginHorizontal:20,marginBottom:10,marginTop:20}}>
                    <GradientButton  onPress={()=>{}} p={false}>
                        <View
                            style={{height:40,borderRadius:10,alignItems:"center",justifyContent:"center"}}
                        >
                            <Text style={{fontFamily:"SF Pro Display",fontSize:18,fontWeight:"400",color:"black"}}>Активировать</Text>
                        </View>
                    </GradientButton>
                </View>
                    <View style={{paddingHorizontal:58,marginTop:10}}>
                        <Text style={{fontFamily:"SF Pro Display",fontSize:9,fontWeight:"400",color:"#565656",textAlign:'center'}}>
                        В момент подписки платёж будет совершён с вашего iTunes аккаунта. Автопродление произойдёт за 24 часа до окончания подписки. Услуга будет автоматически продлеваться до тех пор, пока она не будет отменена в Настройках iTunes-аккаунта.
                        </Text>
                        <View style={{flexDirection:"row",marginTop:10,justifyContent:'center'}}>
                            <Text style={{fontFamily:"SF Pro Display",fontSize:10,fontWeight:"400",color:"#565656"}}>
                                Больше информации доступно в
                            </Text>
                            <Pressable >
                                    <Text style={{fontFamily:"SF Pro Display",fontSize:10,fontWeight:"700",color:"#009ADA"}}> Пользовательском</Text>
                            </Pressable>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:'center'}}>
                            
                            <Pressable >
                                    <Text style={{fontFamily:"SF Pro Display",fontSize:10,fontWeight:"700",color:"#009ADA"}}>соглашении </Text>
                            </Pressable>
                            <Text style={{fontFamily:"SF Pro Display",fontSize:10,fontWeight:"400",color:"#565656"}}>
                                 и 
                            </Text>
                            <Pressable >
                                    <Text style={{fontFamily:"SF Pro Display",fontSize:10,fontWeight:"700",color:"#009ADA"}}> Правилах оказания услуг.</Text>
                            </Pressable>
                        </View>
                    </View>
              </ScrollView>
               
             
        
              
          
        </SafeAreaView>
       
    )
}

export default BannerVip;