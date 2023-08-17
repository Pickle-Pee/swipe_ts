import React, { useEffect } from 'react';
import { View, Button, Text, ScrollView } from 'native-base';
import { StyleSheet, TouchableOpacity, PermissionsAndroid, Platform, ViewStyle, TextStyle } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faHeartBroken, faXmark } from '@fortawesome/free-solid-svg-icons';
import Geolocation from '@react-native-community/geolocation';
import { useUserContext } from '../utils/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface CardData {
    card: string;
    cardYears: string;
    userStatus: string;
  }


const MatchScreen = () => {

    const { user } = useUserContext();

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

    const removeUser = async () => {
        await AsyncStorage.clear();
    }

    const getUsersResponse = async () => {
        Response = await axios.get(`http://193.164.150.223:1024/api/users/${user.phoneNumber}`);
    }

    return (
        <Swiper
            cards={['Кирилл', 'Дмитрий', 'Сергей', 'Владислав', 'Райан']}
            cardYears={['12', '15', '25']}
            renderCard={(card: any, cardYears: any, userStatus: any) => {
                const getStatusColor = () => {
                    return userStatus === 'online' ? 'green' : 'red';
                };
                userStatus = 'online'
                return (
                    <>
                        <View style={styles.card}>
                            <TouchableOpacity>
                                <Text style={styles.text}>{card}, {cardYears}</Text>
                            </TouchableOpacity>
                            <View style={styles.statusRow}>
                                <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
                                <Text style={{
                                    color: '#fff'
                                }}>{userStatus === 'online' ? 'Онлайн' : 'Оффлайн'}</Text>
                            </View>
                            <View style={styles.actionsCardItem}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => console.log('like')}>
                                    <Text>
                                        <FontAwesomeIcon icon={faHeart} size={40} color={"#EB539F"} />
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => console.log('dislike')}>
                                    <Text>
                                        <FontAwesomeIcon icon={faXmark} size={50} color={"#20BDFF"} />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.contentContainer}>
                            <Text> TEST </Text>
                            <Text> TEST </Text>
                            <Text> TEST </Text>
                            <Text> TEST </Text>
                            <Text> TEST </Text>
                            <Text> TEST </Text>
                            <Text> TEST </Text>
                        </View>
                    </>
                )
            }}
            onSwiped={(cardIndex) => { console.log(cardIndex, 'setIsLoggedIn:', user) }}
            onSwipedAll={() => { console.log('thats all') }}
            cardIndex={0}
            backgroundColor={'#fff'}
            cardStyle={{
                height: '80%',
                marginTop: 60
            }}
            disableBottomSwipe={true}
            overlayLabels={{
                left: {
                    element: <FontAwesomeIcon style={styles.cardSwiperLikeText} icon={faXmark} size={80} color={"#20BDFF"} />,
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
                    element: <FontAwesomeIcon style={styles.cardSwiperLikeText} icon={faHeart} size={80} color={"#EB539F"} />,
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
    )
}


const styles = StyleSheet.create({
    card: {
        flex: 1,
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
        paddingVertical: 30
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
        fontWeight: "600"
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
