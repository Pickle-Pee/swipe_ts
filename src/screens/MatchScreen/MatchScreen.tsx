import React, { FC, LegacyRef, useEffect, useRef, useState } from 'react';
import { View, Button, Text, ScrollView, Center, Wrap } from 'native-base';
import { StyleSheet, TouchableOpacity, PermissionsAndroid, Platform, ViewStyle, TextStyle, Image, Dimensions, Pressable, Animated, PanResponder } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faHeartBroken, faKiss, faXmark } from '@fortawesome/free-solid-svg-icons';
import Geolocation from '@react-native-community/geolocation';
import { useUserContext } from '../../../utils/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { IUserMatch, UserMatches } from '../../http/matches/httpMatches';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavPanel, { ContextPanel } from '../components/NavPanel';
import SvgUri from 'react-native-svg-uri';
import  Svg,{ Defs, LinearGradient as LG, Mask, Path, Rect, Stop,} from 'react-native-svg';
import SwipeCards from './Swipe/Swipe';
import Modal from "react-native-modal";
import SvgGeoBlack from './svg/geoBlack';
import { IUser, UserHttp } from '../../http/user/httpUser';
import { GradientBorderView } from '@good-react-native/gradient-border';
interface CardData {
    card: string;
    cardYears: string;
    userStatus: string;
  }


const MatchScreen = () => {


    const [matches,setMatches]=useState<Array<IUserMatch>>([]);
    const [userModal,setUserModal]=useState<boolean>(false)
    const [block,setBlock]=useState<boolean>(false);

    const [visibleShimmer,setVisibleShimmer]=useState<boolean>(false);
    const [errorUserInfo,setErrorUserInfo]=useState<boolean>(false);
    const [userInfo,setUserInfo]=useState<IUser>();
    
    const popup = useRef(new Animated.Value(0)).current;


   
    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        setBlock(true);
        Animated.timing(popup, {
          toValue: 0,
          duration: 400,
          useNativeDriver: false,
        }).start();
      };
    
      const fadeOut = () => {
        
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(popup, {
          toValue: -500,
          duration: 400,
          useNativeDriver: false,
        }).start(()=>setBlock(false));
      };

      useEffect(()=>{
       
        if(userModal){
            fadeIn()
        }else{
            fadeOut();
        }

      },[userModal])
  
     const  openUserInfoScroller=(userId:number)=>{
        setUserModal(true);
        getFullUserInfo(userId);
     }

      const [panResponder] = useState(
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponder: () => true,
          onPanResponderMove: (_, gestureState) => {
            // Проверяем, если пользователь свайпает вниз более чем на 50 пикселей, то закрываем модальное окно.
            if (gestureState.dy > 50) {
                setUserModal(false)
            }
          },
          onPanResponderRelease: () => {},
        })
      )

    const getCurrentLocation = () => {
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            ).then((granted) => {
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    Geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords;
                            console.log('Текущая геопозиция:', latitude, longitude);
                        },
                        (error) => {
                            console.error('Ошибка при получении геопозиции:', error);
                        },
                        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
                    );
                } else {
                    console.warn('Разрешения на доступ к геолокации не получены.');
                }
            });
        } else if (Platform.OS === 'ios') {
            Geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log('Текущая геопозиция:', latitude, longitude);
                },
                (error) => {
                    console.error('Ошибка при получении геопозиции:', error);
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
            );
        }
    };

    useEffect(() => {
        getCurrentLocation();
        
    }, []);


    const getFullUserInfo=async(userId:number)=>{
        setVisibleShimmer(true);
        const user : IUser|null=await new UserHttp().userInfo(userId);
        if(user){
            setUserInfo(user);
        }else{
            
            setErrorUserInfo(true)
        }
        setVisibleShimmer(false);
     
    }

    const getMatches=async()=>{

       const listMatches :Array<IUserMatch>=await  new UserMatches().findMatches()
       console.log(listMatches);
       const newMatches=matches.concat(listMatches)
       setMatches(newMatches);
    }

    const last=()=>{
        setMatches([])
        getMatches()
    }

    useEffect(()=>{
        getMatches()
    },[])


    const wWidth=Dimensions.get("window").width
    const hHidth=Dimensions.get("window").height

    
    return (
       <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
         <NavPanel panel={ContextPanel.none}/>
        <View style={{backgroundColor:"rgba(248, 87, 166, 0.2)"}}>
        {/* //@ts-ignor */}
        { matches.length>0?
        <SwipeCards cards={matches} getMatches={getMatches} last={last} setUserModal={openUserInfoScroller} />
            : <Center>
                <Text>loading..</Text>
            </Center>
            }
            
        </View>
        {block&&
            <View style={{position:"absolute",height:hHidth,width:wWidth,backgroundColor:"transparent"}}></View>
        }
        <Animated.View  {...panResponder.panHandlers} style={{paddingHorizontal:19, height:400,width:wWidth-38,marginLeft:20,marginRight:20, position:"absolute",bottom:popup,backgroundColor:'white',borderTopLeftRadius:40,borderTopRightRadius:40}}>
                <View style={{alignSelf:'center', marginTop:10, width:60,height:5,borderRadius:11,backgroundColor:"#D9D9D9"}}></View>
                
                {userInfo&&!visibleShimmer&&
                    <View>
                        <Text style={{marginTop:25, fontFamily:"SF Pro Display",fontSize:32,fontWeight:"500",lineHeight:37.5}}>{userInfo.first_name}, {new Date().getFullYear()-userInfo.birth.getFullYear()}</Text>
                        <View style={{marginTop:11,flexDirection:"row",alignItems:'center',borderBottomColor:'#B9B9B9',borderBottomWidth:1,paddingBottom:18}}>
                            <View style={{width:6.43,height:6.43,backgroundColor:"#3AE000",borderRadius:6.43}}></View>
                            <Text style={{marginLeft:4.6,marginRight:10, fontFamily:"SF Pro Display",fontSize:14,fontWeight:"400",lineHeight:16.41}}>{userInfo.status}</Text>
                            <SvgGeoBlack/>
                            <Text style={{marginLeft:2, fontFamily:"SF Pro Display",fontSize:15,fontWeight:"400",lineHeight:17.58}}>г. {userInfo.city_name??"не указано"}</Text>
                        </View>
                        <View style={{marginTop:19}}>
                          <Text style={{fontFamily:"SF Pro Display",fontSize:10,fontWeight:"500",lineHeight:11.72}}>{userInfo.score+"%  совпадений интересов"}</Text>
                        </View>
                        <View style={{marginTop:23.39}}>
                           <Wrap>
                                <InterestingElement interestText={"Спорт"}/>
                           </Wrap>
                        </View>
                        <View style={{marginTop:20.82,borderTopColor:'#B9B9B9',borderTopWidth:1,paddingTop:25.51}}>
                            <Text style={{fontFamily:"SF Pro Display",fontSize:15,fontWeight:"500",lineHeight:17.58}}>
                                Обо мне
                            </Text>
                            <Text style={{marginTop:21.26, fontFamily:"SF Pro Display",fontSize:12,fontWeight:"400",lineHeight:14.06}}>
                               {userInfo.about_me}
                            </Text>
                        </View>
                    </View>
                }
                {visibleShimmer&&

                <ShimmerUserInfo/>
                }                
        </Animated.View>
       
       </SafeAreaView>
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
        marginBottom:17
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

export default MatchScreen;

const InterestingElement:FC<{interestText:string;}>=({interestText})=>{
    const gradientColors =['#F857A6', '#20BDFF'];

    const opacity = useRef(new Animated.Value(0.6)).current;

    return(
        <Pressable >
            <Animated.View >
                <GradientBorderView
                gradientProps={{
                colors: gradientColors
                }}
                style={[
                    styleInteresting.buttonContainer,
                {
                    backgroundColor:"#ffffff"
                }
                ]}
            >
                <Text style={{ fontFamily:"SF Pro Display",fontWeight:"400",fontSize:12,lineHeight:14.06, color:"rgba(0, 0, 0, 1)"}}>{interestText}</Text>
                
            </GradientBorderView>
            </Animated.View>
            
        </Pressable>
       
    )
}
const styleInteresting=StyleSheet.create({
    buttonContainer:{
        
        flexDirection:'row',
        borderWidth: 1,
        height:20,
        paddingRight:14.31,
        borderRadius: 10,
        paddingLeft:13.76,
        marginBottom:8.42,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:9.97
    }
})

import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
const ShimmerUserInfo=()=>{


    const avatarRef = React.createRef<ShimmerPlaceholder>()
    const firstLineRef = React.createRef<ShimmerPlaceholder>()
    const secondLineRef = React.createRef<ShimmerPlaceholder>()
    const thirdLineRef = React.createRef<ShimmerPlaceholder>()
    React.useEffect(() => {
        const facebookAnimated = Animated.stagger(
          400,
          [
            avatarRef.current.getAnimated(),
            Animated.parallel([
              firstLineRef.current.getAnimated(),
            ])
          ]
        );
        Animated.loop(facebookAnimated).start();
      }, [])
    return(
        <View style={{flexDirection:"row"}}>
            <ShimmerPlaceholder
            ref={avatarRef}
            stopAutoRun
            />
            <ShimmerPlaceholder
            ref={firstLineRef}
            stopAutoRun
            />
        </View>
    );
}


