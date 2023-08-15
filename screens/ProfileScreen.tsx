// ProfileScreen.js

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'native-base';
import axios from 'axios';
import { useUserContext } from '../utils/UserContext';
import GradientButton from '../assets/elements/elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';


const ProfileScreen = ({ route, navigation, handleLogout }) => {

  const [loading, setLoading] = useState(false);
  const { user, userData, setUser } = useUserContext();

  useEffect(() => {
    if (user && userData) {
      setLoading(false);
    }
  }, [user, userData]);


  const handleLogoutPress = async () => {
    try {
      if (user.accessToken) {
        await AsyncStorage.clear();
        setUser(null);
        // navigation.reset({
        //   index: 0,
        //   routes: [{
        //     name: 'AuthStack',
        //     state: {
        //       routes: [{ name: 'AuthNavigator' }],
        //     },
        //   }]
        // });
      }
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  const calculateAge = (dateBirth) => {
    const birthYear = new Date(dateBirth).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  const age = calculateAge(userData.dateBirth);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <GradientButton onPress={handleLogoutPress}>
          <Text fontSize="sm" p={2}>Выйти</Text>
        </GradientButton>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!user ? (
        <>
          <GradientButton onPress={handleLogoutPress}>
            <Text fontSize="sm" p={2}>Выйти</Text>
          </GradientButton>
        </>
      ) : (
        <>
          <Text style={styles.text}>Имя: {userData.firstName}</Text>
          <Text style={styles.text}>Фамилия: {userData.lastName}</Text>
          <Text style={styles.text}>Возраст: {age}</Text>
          <GradientButton onPress={handleLogoutPress}>
            <Text fontSize="sm" p={2}>Выйти</Text>
          </GradientButton>
        </>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ProfileScreen;
