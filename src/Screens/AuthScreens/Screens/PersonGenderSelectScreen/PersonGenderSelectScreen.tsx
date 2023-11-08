import React, { ReactNode, useState } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  useWindowDimensions,
  Pressable
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../../../store/typesHooks/typesHooks';
import { updateUserGender } from '../../../../store/reducers/tempUserDataReducer';
import { AuthNavigationName } from '../../AuthScreen';
import GradientButton from '../../../../UIComponents/GradientButton/GradientButton';

const PersonGenderSelectScreen: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

  const dispatch=useAppDispatch();
  const {gender}=useAppSelector(state=>state.tempUser)
  const {width}=useWindowDimensions()
  const [tap,setTap]=useState<boolean>(false);
  const handleGenderSelect = (gender: string) => {
    setTap(true)
    dispatch(updateUserGender({gender}))
  }

  const handleContinue = async () => {
    navigation.navigate("PersonPhoneNumberScreen");
  };

 

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ height: '100%',backgroundColor:'white' }}>
      <View style={{display:"flex",justifyContent:"space-between",flexDirection:"row"}}>
                    <Pressable
                    onPress={() => navigation.navigate(AuthNavigationName.personBirthDateScreen)}>
                        <FontAwesomeIcon icon={faArrowLeft} size={30} color="black" style={{ marginLeft: 10, marginTop: 10 }} />
                    </Pressable>
                    <Pressable
                    onPress={() => navigation.navigate(AuthNavigationName.homeScreen)}>
                        <FontAwesomeIcon icon={faXmark} size={30} color="black" style={{ marginRight: 10, marginTop: 10 }} />
                    </Pressable>
                </View>
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={40}>
          <Text style={styles.topBigText}>
            Укажи свой пол
          </Text>
          <View style={styles.genderSelectRow}>
            <Pressable
              style={[
                styles.genderButton,
                tap&&gender === 'male' ? { borderColor: '#009ADA' } : {},
              ]}
              onPress={() => handleGenderSelect('male')}>
              <Text>
                Мужчина
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.genderButton,
                tap&&gender === 'female' ? { borderColor: '#E62885' } : {},
              ]}
              onPress={() => handleGenderSelect('female')}>
              <Text>
                Женщина
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
        <View style={{ alignItems: 'center',width:width-106,alignSelf:'center' }}>
          <GradientButton
            onPress={handleContinue} active={tap}>
            <Text >Продолжить</Text>
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

