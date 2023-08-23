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
import GradientButton from '../assets/elements/elements';

const PersonGenderSelectScreen: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
  const { firstName, lastName, birthDate } = route.params;
  const [selectedGender, setSelectedGender] = useState<string>('');

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
    console.log(birthDate)
  }

  const handleContinue = async () => {
    navigation.navigate("PersonPhoneNumberScreen", {
      firstName,
      lastName,
      birthDate,
      gender: selectedGender
    })
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
                selectedGender === 'male' ? { borderColor: '#009ADA' } : {},
              ]}
              onPress={() => handleGenderSelect('male')}>
              <Text>
                Мужчина
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderButton,
                selectedGender === 'female' ? { borderColor: '#E62885' } : {},
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

