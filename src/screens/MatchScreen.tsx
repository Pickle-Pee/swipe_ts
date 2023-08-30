import React, { useEffect, useState } from 'react';
import { View, Button, Text, ScrollView } from 'native-base';
import { StyleSheet, TouchableOpacity, PermissionsAndroid, Platform, ViewStyle, TextStyle, Image, Dimensions, Pressable } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faHeartBroken, faXmark } from '@fortawesome/free-solid-svg-icons';
import Geolocation from '@react-native-community/geolocation';
import { useUserContext } from '../../utils/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { UserMatches } from '../http/matches/httpMatches';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavPanel, { ContextPanel } from './components/NavPanel';
import SvgUri from 'react-native-svg-uri';

interface CardData {
    card: string;
    cardYears: string;
    userStatus: string;
  }




const MatchScreen = () => {

    const [swipeX,setSwipeX]=useState(0);
    const [matches,setMatches]=useState();
    console.log("swipeX: ", swipeX);



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
        new UserMatches().findMatches()
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
        <Swiper
            
            cards={['Кирилл', 'Дмитрий', 'Сергей', 'Владислав', 'Райан']}
            cardYears={['12', '15', '25']}
            //@ts-ignore
            renderCard={(card: any, cardYears: any, userStatus: any) => {
                const getStatusColor = () => {
                    return userStatus === 'online' ? 'green' : 'red';
                };
                userStatus = 'online'
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
                            <View>
                                <Text style={styles.text}>{card}, {cardYears}</Text>
                            </View>
                            <View style={styles.statusRow}>
                                <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
                                <Text style={{
                                    color: '#fff'
                                }}>{userStatus === 'online' ? 'Онлайн' : 'Оффлайн'}</Text>
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
            cardIndex={0}
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
            </Swiper>
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
