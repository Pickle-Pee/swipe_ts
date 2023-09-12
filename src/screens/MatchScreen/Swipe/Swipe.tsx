import React, { FC, useEffect, useRef, useState } from "react";
import Swiper from "react-native-deck-swiper";
import { IUserMatch, UserMatches } from "../../../http/matches/httpMatches";
import { Animated, Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import SvgUri from "react-native-svg-uri";
import { useAppDispatch } from "../../../store/typesHooks";
import { updateDepricated } from "../../../store/reducers/likesReducer";
import SvgCardio from "./svg/Cardio";
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
import SvgDislike from "./svg/Dislike";
import SvgMessage from "./svg/Message";
import SvgLike from "./svg/Like";
import ImagePreloader from "./ImagePreloader/ImagePreloader";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
interface ISwipeCards{
    cards:Array<IUserMatch>,
    getMatches:()=>void;
    last:()=>void;
    setUserModal:(userId:number)=>void
}
const SwipeCards:FC<ISwipeCards>=({cards,getMatches,last,setUserModal})=>{
    const wWidth=Dimensions.get("window").width
    const hHidth=Dimensions.get("window").height
    const [swipeX,setSwipeX]=useState(0);
    const swipeRef=useRef(null)
    const opacity=useRef(new Animated.Value(0.4)).current
    function handlerSwiped(x: number, y: number): void {
        console.log("ssswww");
        
        setSwipeX(x);
    }

    const dispatch=useAppDispatch();

    const onSwipeRequiredOptions=(index : number)=>{
        setSwipeX(0)
        if(index%10==5){
            getMatches()
        }
        dispatch(updateDepricated(true));
    }
    const onSwipeRight=(userId : number,index : number)=>{
        onSwipeRequiredOptions(index);
        new UserMatches().like(userId);
    }
    const onSwipeLeft=(userId : number,index : number)=>{
        onSwipeRequiredOptions(index);
        new UserMatches().dislike(userId);
    }

    const addFavorite=(userId : number,index : number)=>{
        onSwipeRequiredOptions(index);
       // swipeRef.current.
    }

    const clickToSwipeLeft=()=>{
        swipeRef.current.swipeLeft()
        setSwipeX(-100);
    }
    const clickToSwipeRight=()=>{
        swipeRef.current.swipeRight()
        setSwipeX(100);
    }

    return (
        <View>
        <Swiper
            ref={swipeRef}
            cards={cards}
            cardYears={[]}
            cardHorizontalMargin={20}
            
            //@ts-ignore
            renderCard={(cardData: IUserMatch, cardIndex: number) => {
                
                
                return (
                    <>
                        <View style={[styles.card,{height:hHidth*0.73,width:wWidth-40,overflow:'hidden'}]}>
                            <ImagePreloader source={{uri:cardData.avatar_url,}}/>   
                            <Pressable onPress={()=>setUserModal(cardData.user_id)}>
                                <Animated.View style={{backgroundColor:"rgba(0,0,0,0.5)",marginHorizontal:10,borderRadius:13,marginBottom:15,paddingTop:4.5}}>
                                    <View style={{paddingHorizontal:10.03,marginBottom:8.96,flexDirection:'row',alignItems:"center"}}>
                                        <Text style={{fontFamily:"SF Pro Display",fontSize:32,fontWeight:"500",lineHeight:37.5,color:"white"}}>{cardData.first_name+", "+(new Date().getFullYear()-cardData.year.getFullYear())}</Text>
                                    </View>
                                    <View style={{paddingHorizontal:10.03,marginBottom:9.22,height:20, flexDirection:'row',alignItems:"center"}}>
                                        <View style={{backgroundColor:"rgba(58, 224, 0, 1)",height:5,width:5,borderRadius:5}}></View>
                                        <Text style={{marginLeft:5.21,fontFamily:"SF Pro Display",fontSize:14,fontWeight:"400",color:"white"}}>онлайн</Text>
                                    </View>
                                    {/* <View style={{paddingHorizontal:20,marginBottom:15.9,flexDirection:'row',alignItems:"center"}}>
                                    
                                        <Text style={{marginLeft:5, textShadowRadius:50,textShadowColor:"black",textShadowOffset:{width:0,height:0}, fontFamily:"SF Pro Display",fontSize:10,fontWeight:"500",lineHeight:11.72,color:"white"}}>{cardData.match_percentage}%  совпадений интересов</Text>
                                    </View>
                                    <View style={{paddingHorizontal:20,marginBottom:16.78,flexDirection:'row',alignItems:"center"}}>
                                        <SvgUri
                                            
                                            width={13}
                                            height={13}
                                            source={require("../../../../assets/svg/geo_icon.svg")}
                                        />
                                        <Text style={{marginLeft:7.61, textShadowRadius:50,textShadowColor:"black",textShadowOffset:{width:0,height:0}, fontFamily:"SF Pro Display",fontSize:15,fontWeight:"400",lineHeight:17.58,color:"white"}}>г. Оосака</Text>
                                    </View>
                                    <View style={{paddingHorizontal:20,marginBottom:25.27}}>
                                        <Text style={{textShadowRadius:50,textShadowColor:"black",textShadowOffset:{width:0,height:0}, fontFamily:"SF Pro Display",fontSize:14,fontWeight:"400",lineHeight:16.41,color:"white"}}>Обожаю гулять ночью.Мой самоед ест больше, чем я!</Text>
                                    </View> */}
                                    
                                </Animated.View>
                            </Pressable>
                            <View style={styles.actionsCardItem}>
                                <TouchableOpacity
                                        style={styles.button}
                                        onPress={clickToSwipeLeft}>
                                        <SvgDislike/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button,{marginHorizontal:13}]}
                                        onPress={() => console.log('dislike')}>
                                        <SvgMessage/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={clickToSwipeRight}>
                                       <SvgLike/>
                                    </TouchableOpacity>
                                </View>
                        </View>
                   
                    </>
                )
            }}
           
            
            onSwipedAborted={()=>setSwipeX(0)}
            onSwipedRight={(index)=>onSwipeRight(cards[index].user_id,index)}
            onSwipedLeft={(index)=>onSwipeLeft(cards[index].user_id,index)}
            onSwiping={handlerSwiped}
            onSwiped={()=>setSwipeX(0)}
            onSwipedAll={last}
            onSwipedTop={()=>console.log("top")}
            disableTopSwipe={true}
            backgroundColor={'#fff'}
            cardStyle={{
                
              
                marginTop: -41,
                
            }}
            disableBottomSwipe={true}
            verticalSwipe={false}
            overlayLabels={{
                
                left: {
                    element: 
                <View style={{alignItems:"center",height:hHidth,top:hHidth/2-80}}>
                    <FontAwesomeIcon style={styles.cardSwiperLikeText} icon={faXmark} size={80} color={"#20BDFF"} /> 
                </View>,
                    title: 'NOPE',
                    style: {
                        label: {
                            backgroundColor: 'black',
                            borderColor: 'black',
                            color: 'white',
                            borderWidth: 1
                        },
                        wrapper: {
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }
                    }
                },
                right: {
                    element: 
                    <View style={{alignItems:"center",height:hHidth,top:hHidth/2-80}}>
                        <FontAwesomeIcon style={styles.cardSwiperLikeText} icon={faHeart} size={80} color={"#EB539F"} />
                    </View>,
                    title: 'LIKE',
                    style: {
                        label: {
                            backgroundColor: 'black',
                            borderColor: 'black',
                            color: 'white',
                            borderWidth: 1
                        },
                        wrapper: {
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }
                    }
                },
                top: {
                    element: <FontAwesomeIcon style={styles.cardSwiperLikeText} icon={faHeart} size={60} color={"blue"} />,
                    title: 'SUPER LIKE',
                    style: {
                        label: {
                            backgroundColor: 'black',
                            borderColor: 'black',
                            color: 'white',
                            borderWidth: 1
                        },
                        wrapper: {
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }
                    }
                }
            }}
            overlayLabelStyle={{
                backgroundColor: '#',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
            }}
            stackSize={2}>
 
            </Swiper>
            {swipeX>=95&&<View style={{backgroundColor:swipeX>=95?"rgba(248, 87, 166, 0.2)":"rgba(90, 200, 250, 0.0)",height:hHidth-29-86,width:"100%",position:"absolute",zIndex:20}}></View>}
            {swipeX<=-95&&<View style={{backgroundColor:swipeX<=95?"rgba(90, 200, 250, 0.2)":"rgba(90, 200, 250, 0.0)",height:hHidth-29-86,width:"100%",position:"absolute"}}></View>}
            </View>
    )
}

const styles = StyleSheet.create({
    card: {
        height:613,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        justifyContent: "flex-end",
        backgroundColor: "#D4D4D8",
    },
    text: {
        backgroundColor: "transparent",
        paddingLeft: 10,
        color: '#fff',
        fontSize: 22,
        fontWeight: '600'
    },
    cardButton: {

    },
    actionsCardItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        marginBottom:23
    },
    button: {
        backgroundColor: "transparent",
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    cardSwiperLikeText: {
        color: '#34D399',
        fontSize: 20,
        fontWeight: "600",
        alignSelf:'center'
    },
    cardSwiperDislikeText: {
        color: '#F43F5E',
        fontSize: 20,
        fontWeight: "600"
    },
    cardSwiperSuperlikeText: {
        color: '#0EA5E9',
        fontSize: 20,
        fontWeight: "600"
    },
    statusIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10
    },
    contentContainer: {
        position: 'absolute'
    }
});
export default SwipeCards;


