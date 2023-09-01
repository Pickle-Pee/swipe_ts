import React, { useEffect, useState } from 'react';
import { View, Button, Text, ScrollView } from 'native-base';
import { StyleSheet, TouchableOpacity, PermissionsAndroid, Platform, ViewStyle, TextStyle, Image, Dimensions, Pressable } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faHeartBroken, faKiss, faXmark } from '@fortawesome/free-solid-svg-icons';
import Geolocation from '@react-native-community/geolocation';
import { useUserContext } from '../../utils/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { IUserMatch, UserMatches } from '../http/matches/httpMatches';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavPanel, { ContextPanel } from './components/NavPanel';
import SvgUri from 'react-native-svg-uri';
import { Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

interface CardData {
    card: string;
    cardYears: string;
    userStatus: string;
  }



const MatchScreen = () => {

    const [swipeX,setSwipeX]=useState(0);
    const [matches,setMatches]=useState<Array<IUserMatch>>([]);



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


    const getMatches=async()=>{
       const listMatches :Array<IUserMatch>=await  new UserMatches().findMatches()
       setMatches(listMatches);
    }

    useEffect(()=>{
        getMatches()
    },[])

    const removeUser = async () => {
        await AsyncStorage.clear();
    }

    const getUsersResponse = async () => {
        Response = await axios.get(`http://193.164.150.223:1024/api/users/`);
    }

    const wWidth=Dimensions.get("window").width
    const hHidth=Dimensions.get("window").height

    function handlerSwiped(x: number, y: number): void {
        setSwipeX(x);
        
    }

    return (
       <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
         <NavPanel panel={ContextPanel.none}/>
         
        <View style={{backgroundColor:"rgba(248, 87, 166, 0.2)"}}>
        {/* //@ts-ignor */}
        { matches.length>0&&<Swiper
            
            cards={matches}
            cardYears={[]}
            //@ts-ignore
            renderCard={(cardData: IUserMatch, cardIndex: number) => {
                console.log(cardData);
                
                return (
                    <>
                        <View style={[styles.card,{height:hHidth*0.73}]}>
                            <Image
                            style={{position:"absolute",top:0,borderRadius: 15,}}
                            height={hHidth*0.73}
                            width={wWidth-40}
                                source={{
                                    uri:"https://stihi.ru/pics/2011/02/26/2515.jpg"
                                  }}
                            />
                            <View style={{paddingHorizontal:20,marginBottom:8.96,flexDirection:'row',alignItems:"center"}}>
                                <Text style={{marginLeft:5.21, textShadowRadius:50,textShadowColor:"black",textShadowOffset:{width:0,height:0}, fontFamily:"SF Pro Display",fontSize:32,fontWeight:"500",lineHeight:37.5,color:"white"}}>{cardData.first_name+", "+cardData.year.getFullYear()}</Text>
                            </View>
                             <View style={{paddingHorizontal:20,marginBottom:9.22,flexDirection:'row',alignItems:"center"}}>
                                <View style={{backgroundColor:"rgba(58, 224, 0, 1)",height:5,width:5}}></View>
                                <Text style={{marginLeft:5.21, textShadowRadius:50,textShadowColor:"black",textShadowOffset:{width:0,height:0}, fontFamily:"SF Pro Display",fontSize:14,fontWeight:"400",lineHeight:16.41,color:"white"}}>онлайн</Text>
                            </View>
                            <View style={{paddingHorizontal:20,marginBottom:15.9,flexDirection:'row',alignItems:"center"}}>
                            <Svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={13}
                                height={15}
                                fill="none"
                                viewBox="0 0 50 57"
                             
                            >
                               
                                <Path
                                fill="url(#a)"
                                d="M49.45 28.952a30.66 30.66 0 0 0-1.568-5.808C43.919 12.571 34.903 4.412 30.432.854a3.944 3.944 0 0 0-1.642-.77 3.982 3.982 0 0 0-1.806.04 3.968 3.968 0 0 0-1.608.85c-.468.412-.83.935-1.05 1.512L19.634 14.82l-4.223-3.919a3.899 3.899 0 0 0-1.382-.826 3.885 3.885 0 0 0-1.581-.21 3.89 3.89 0 0 0-2.786 1.457C3.813 18.656.85 26.083.85 33.392a22.407 22.407 0 0 0 .559 4.95 23.389 23.389 0 0 0 6.648 11.725c4.618 4.425 10.754 6.86 17.279 6.86 6.524 0 12.657-2.435 17.279-6.86 4.578-4.385 7.206-10.463 7.206-16.675 0-1.508-.13-2.992-.371-4.439Zm-4.247 10.354c-.676 1.083-1.619 3.178-4.478 4.365-5.792 2.408-11.48.59-14.122-1.64-3.886-3.27-7.999-7.274-13.614-5.888-2.956.728-5.18 2.897-7.123 4.27a18.816 18.816 0 0 1-.956-3.218 19.15 19.15 0 0 1-.381-3.804c0-6.442 2.692-13.087 7.999-19.745a.198.198 0 0 1 .063-.047.264.264 0 0 1 .118-.034h.023a.37.37 0 0 1 .104.017c.04.014.066.034.083.048l8.21 7.619L27.76 3.815s.01-.024.034-.044a.25.25 0 0 1 .103-.05.297.297 0 0 1 .144-.004.224.224 0 0 1 .11.05h.004c4.163 3.316 12.584 10.901 16.232 20.52.702 1.852 1.23 3.781 1.515 5.768.157 1.096.24 2.21.24 3.336 0 2.034-.32 4.023-.939 5.916Z"
                                />
                                <Defs>
                                <LinearGradient
                                    id="a"
                                    x1={0.85}
                                    x2={60.978}
                                    y1={56.926}
                                    y2={16.81}
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <Stop stopColor="#E62885" />
                                    <Stop offset={0.911} stopColor="#009ADA" />
                                </LinearGradient>
                                </Defs>
                            </Svg>
                                <Text style={{marginLeft:5, textShadowRadius:50,textShadowColor:"black",textShadowOffset:{width:0,height:0}, fontFamily:"SF Pro Display",fontSize:10,fontWeight:"500",lineHeight:11.72,color:"white"}}>{cardData.match_percentage}%  совпадений интересов</Text>
                            </View>
                            <View style={{paddingHorizontal:20,marginBottom:16.78,flexDirection:'row',alignItems:"center"}}>
                                <SvgUri
                                    
                                    width={13}
                                    height={13}
                                    source={require("../../assets/svg/geo_icon.svg")}
                                />
                                <Text style={{marginLeft:7.61, textShadowRadius:50,textShadowColor:"black",textShadowOffset:{width:0,height:0}, fontFamily:"SF Pro Display",fontSize:15,fontWeight:"400",lineHeight:17.58,color:"white"}}>г. Оосака</Text>
                            </View>
                            <View style={{paddingHorizontal:20,marginBottom:25.27}}>
                                <Text style={{textShadowRadius:50,textShadowColor:"black",textShadowOffset:{width:0,height:0}, fontFamily:"SF Pro Display",fontSize:14,fontWeight:"400",lineHeight:16.41,color:"white"}}>Обожаю гулять ночью.Мой самоед ест больше, чем я!</Text>
                            </View>
                            <View style={styles.actionsCardItem}>
                            <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => console.log('dislike')}>
                                    <SvgUri
                                        source={require("../../assets/svg/cancel.svg")}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button,{marginHorizontal:13}]}
                                    onPress={() => console.log('dislike')}>
                                    <SvgUri
                                        source={require("../../assets/svg/chat.svg")}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => console.log('dislike')}>
                                    <SvgUri
                                        source={require("../../assets/svg/like.svg")}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                   
                    </>
                )
            }}
           
    
            onSwipedAborted={()=>setSwipeX(0)}
            onSwipedRight={()=>setSwipeX(0)}
            onSwipedLeft={()=>setSwipeX(0)}
            onSwiping={handlerSwiped}
            onSwiped={(cardIndex) => { console.log(cardIndex, 'setIsLoggedIn:') }}
            onSwipedAll={() => { console.log('thats all') }}
            disableTopSwipe={true}
            backgroundColor={'#fff'}
            cardStyle={{
                height: '100%',
                marginTop: -41
            }}
            disableBottomSwipe={true}
            verticalSwipe={false}
            overlayLabels={{
                
                left: {
                    element: 
                <View style={{alignItems:"center",height:hHidth*0.2,top:hHidth/2-80}}>
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
                    <View style={{alignItems:"center",height:hHidth*0.2,top:300}}>
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
            </Swiper>}
            {swipeX>=95&&<View style={{backgroundColor:swipeX>=95?"rgba(248, 87, 166, 0.2)":"rgba(90, 200, 250, 0.0)",height:hHidth-29-86,width:"100%",position:"absolute"}}></View>}
            {swipeX<=-95&&<View style={{backgroundColor:swipeX<=95?"rgba(90, 200, 250, 0.2)":"rgba(90, 200, 250, 0.0)",height:hHidth-29-86,width:"100%",position:"absolute"}}></View>}
        </View>
        
       
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
