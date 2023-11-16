
import GradientBorder from "@good-react-native/gradient-border/src/components/GradientBorder";
import { Center, ScrollView } from "native-base";
import { FC, MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { Button, FlatList, NativeScrollEvent, NativeSyntheticEvent, Pressable, SafeAreaView, Text, View, useWindowDimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { GradientBorderView } from '@good-react-native/gradient-border';
import SvgUri from "react-native-svg-uri";
import Svg, { Defs, Path,LinearGradient as LG, Stop } from "react-native-svg";
import SvgRupor from "./SvgComponent/Rupor";
import SvgSearch from "./SvgComponent/Search";
import FirstCard from "./Cards/First";
import SecondCard from "./Cards/Second";
import FirdCard from "./Cards/Fird";



 type ScrollViewRef = typeof ScrollView & {
    flashScrollIndicators: () => void;
};

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
    let interval : any;


    const scrollController=(event: NativeSyntheticEvent<NativeScrollEvent>)=>{
        const x=event.nativeEvent.contentOffset.x;
        setOffset(x);  
    }
    const scrollTo=()=>{
            interval=  setTimeout(()=>{
                console.log(page);
                //@ts-ignore
                ref.current.scrollTo({x:((page+1)%3) *width,y:0 }) 
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
        clearInterval(interval)
        cancel()
    }
    
    return(
            <SafeAreaView style={{ flex: 1,width:"100%",height:"100%",backgroundColor:"white",justifyContent:"flex-end" }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Pressable onPress={close} style={{height:40,width:40,alignItems:"center",justifyContent:'center',marginLeft:15.97,marginTop:19.46,marginBottom:43}}>
                    <SvgUri
                        source={require("../../../../assets/svg/cancel_vip.svg")}
                    />
                </Pressable>
                
                <Text style={{textAlign:"center", fontFamily:"SF Pro Display",fontSize:24,fontWeight:"700",color:"black"}}>Активируйте VIP</Text>
               <ScrollView
               contentContainerStyle={{height:136}}
               style={{height:136,marginTop:25}}
               height={136}
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
                      
                </ScrollView>
                  
                 <View style={{flexDirection:"row",marginTop:16,justifyContent:"center"}}>
                    {listView.map((el,index)=>
                         <View style={{height:5,width:36.46,backgroundColor:page==index?"#D4D4D4":"#F0F0F0",marginHorizontal:5,borderRadius:10}}></View>
                    )}
                       
                       
                </View> 
                <View style={{paddingHorizontal:20,marginTop:73}}>
                    <Pressable onPress={()=>setPayVariant(0)}>
                    <GradientBorderView
                   
                   style={{backgroundColor:payVariant==0?"white":"#F0F0F0",paddingLeft:21,paddingRight:25, borderWidth:2,flexDirection:"row",justifyContent:"space-between",height:95,borderRadius:10}}
                    gradientProps={{
                        colors: payVariant==0?["#F758A6","#20BDFF"]:["#F0F0F0","#F0F0F0"]
                      }}
                     
                   >
                        {payVariant==0&&<LinearGradient
                                useAngle={true}
                                angle={45}
                                angleCenter={{x:0.5,y:0.5}}
                                colors={["#E62885","#009ADA"]}
                                style={{ position:"absolute",right:12,top:-15.5,zIndex:5, height:31,borderRadius:20,alignItems:"center",justifyContent:"center",paddingLeft:41,paddingRight:43}}
                            >
                                <Text style={{fontFamily:"SF Pro Display",fontSize:15,fontWeight:"700",color:"#FFFFFF"}}>Популярно</Text>
                            </LinearGradient>}
                    <View style={{justifyContent:"center"}}>
                        <Text style={{fontFamily:"SF Pro Display",fontSize:24,fontWeight:"700",color:"#1F2937"}}>30 дней</Text>
                        <Text style={{marginTop:4, fontFamily:"SF Pro Display",fontSize:15,fontWeight:"400",color:"#009ADA"}}>3 дня бесплатно</Text>
                    </View>
                    <View style={{justifyContent:"center"}}>
                        <Text style={{fontFamily:"SF Pro Display",fontSize:24,fontWeight:"700",color:"#000000"}}>529 ₽</Text>
                       
                    </View>
                   </GradientBorderView>
                    </Pressable>
                  
                    <View style={{flexDirection:'row',marginTop:22}}>
                        <Pressable style={{height:82,flex:1}} onPress={()=>setPayVariant(1)}>
                            <GradientBorderView
                             gradientProps={{
                                colors: payVariant==1?["#F758A6","#20BDFF"]:["#F0F0F0","#F0F0F0"]
                              }}
                              style={{height:82,borderWidth:2,borderRadius:10,backgroundColor:payVariant==1?"white":"#F0F0F0"}}
                            >
                                <View style={{height:82,flex:1,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
                                    <Text style={{fontFamily:"SF Pro Display",fontSize:14,fontWeight:"400",color:"#1F2937"}}>7 дней</Text>
                                    <Text style={{marginTop:5, fontFamily:"SF Pro Display",fontSize:24,fontWeight:"700",color:"black"}}>269 ₽</Text>
                                </View>
                            </GradientBorderView>
                        </Pressable>
                        
                        <View style={{width:22}}/>
                        <Pressable style={{height:82,flex:1}} onPress={()=>setPayVariant(2)}>
                        <GradientBorderView
                             gradientProps={{
                                colors: payVariant==2?["#F758A6","#20BDFF"]:["#F0F0F0","#F0F0F0"]
                              }}
                              style={{height:82,borderWidth:2,borderRadius:10,backgroundColor:payVariant==2?"white":"#F0F0F0"}}
                            >
                                 <View style={{height:82,flex:1,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
                                    <Text style={{fontFamily:"SF Pro Display",fontSize:14,fontWeight:"400",color:"#1F2937"}}>90 дней</Text>
                                    <Text style={{fontFamily:"SF Pro Display",fontSize:24,fontWeight:"700",color:"black"}}>1290 ₽</Text>
                                    <Text style={{marginTop:4, fontFamily:"SF Pro Display",fontSize:14,fontWeight:"400",color:"#009ADA"}}>Экономия 60%</Text>
                                </View>
                            </GradientBorderView>
                        </Pressable>
                       
                    </View>                           
                </View>  
                <Pressable style={{marginHorizontal:20,marginTop:20}}>
                    <LinearGradient
                        useAngle={true}
                        angle={45}
                        angleCenter={{x:0.5,y:0.5}}
                        colors={["#E62885","#009ADA"]}
                        style={{height:55,borderRadius:10,alignItems:"center",justifyContent:"center"}}
                    >
                        <Text style={{fontFamily:"SF Pro Display",fontSize:15,fontWeight:"700",color:"#FFFFFF"}}>Активировать</Text>
                    </LinearGradient>
                </Pressable>
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