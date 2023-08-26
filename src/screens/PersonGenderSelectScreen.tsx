import React, { ReactNode, useState } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Text } from 'native-base';
import GradientButton from '../../assets/elements/elements';
import { useAppDispatch, useAppSelector } from '../store/typesHooks';
import { updateUserGender } from '../store/reducers/tempUserDataReducer';

const PersonGenderSelectScreen: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

  const dispatch=useAppDispatch();
  const {gender}=useAppSelector(state=>state.tempUser)

  const handleGenderSelect = (gender: string) => {
    dispatch(updateUserGender({gender}))
  }

  const handleContinue = async () => {
    navigation.navigate("PersonPhoneNumberScreen");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ height: '100%' }}>
        <TouchableOpacity
          style={{ alignItems: "flex-end" }}
          onPress={() => navigation.navigate('AuthScreen')}>
          <FontAwesomeIcon icon={faXmark} size={30} color="black" style={{ marginRight: 10, marginTop: 10 }} />
        </TouchableOpacity>
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={40}>
          <Text style={styles.topBigText}>
            Укажи свой пол
          </Text>
          <View style={styles.genderSelectRow}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === 'male' ? { borderColor: '#009ADA' } : {},
              ]}
              onPress={() => handleGenderSelect('male')}>
              <Text>
                Мужчина
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === 'female' ? { borderColor: '#E62885' } : {},
              ]}
              onPress={() => handleGenderSelect('female')}>
              <Text>
                Женщина
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <View style={{ alignItems: 'center' }}>
          <GradientButton
            onPress={handleContinue}>
            <Text fontSize="sm" p={2}>Продолжить</Text>
          </GradientButton>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback >
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'flex-start',
  },
  topBigText: {
    fontSize: 22,
    textAlign: 'center',
    paddingTop: 50
  },
  input: {
    fontSize: 16,
    fontWeight: '500'
  },
  genderSelectRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 70
  },
  genderButton: {
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: '#1F2937',
    paddingHorizontal: 20,
    paddingVertical: 10
  }
})

export default PersonGenderSelectScreen;

