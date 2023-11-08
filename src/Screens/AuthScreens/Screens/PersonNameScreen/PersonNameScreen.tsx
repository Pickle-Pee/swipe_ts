import React, { useState } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Text,
  useWindowDimensions
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../../../store/typesHooks/typesHooks';
import { updateUserFirstName, updateUserLastName } from '../../../../store/reducers/tempUserDataReducer';
import { TextInput } from 'react-native-gesture-handler';
import GradientButton from '../../../../UIComponents/GradientButton/GradientButton';
import { AuthNavigationName } from '../../AuthScreen';

const PersonNameScreen: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
  
  const [nameError, setNameError] = useState(false);
  const [secondNameError, setSecondNameError] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const {width}=useWindowDimensions()
  const dispatch=useAppDispatch();
  const {firstName,lastName}=useAppSelector(state=>state.tempUser);
  


  const handleNameChange = (text: string) => {
    const filteredText = text.replace(/[^A-Za-zА-Яа-яЁё]/g, '');
    if (filteredText !== text) {
      Alert.alert(
        'Ошибка ввода',
        'Введите только буквы кириллицы (без символов, цифр и латиницы)',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
    dispatch(updateUserFirstName({firstName:filteredText}))
  };

  const handleSecondNameChange = (text: string) => {
    const filteredText = text.replace(/[^A-Za-zА-Яа-яЁё]/g, '');
    if (filteredText !== text) {
      Alert.alert(
        'Ошибка ввода',
        'Введите только буквы кириллицы (без символов, цифр и латиницы)',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
    dispatch(updateUserLastName({lastName:filteredText}))
  };

  const [nameBorderColor,setNameBorderColor]=useState<string>("#E5E5E5")
  const [surnameBorderColor,setSurnameBorderColor]=useState<string>("#E5E5E5")
  const handleContinue = async () => {

    let errorCount=0;
    if (firstName.trim() === '') {
      setNameError(true);
      setNameBorderColor("red")
      errorCount++
    }

    if (lastName.trim() === '') {
      setSecondNameError(true);
      setSurnameBorderColor("red")
      errorCount++
    }
    if(errorCount==0){
      navigation.navigate(AuthNavigationName.cityScreen);
    }
    
  };



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ height: '100%',backgroundColor:"white" }}>
        <View style={{display:"flex",justifyContent:"space-between",backgroundColor:"white",zIndex:5}}>
            <Pressable
              style={{ alignItems: "flex-end" }}
              onPress={() => navigation.navigate(AuthNavigationName.homeScreen)}>
              <FontAwesomeIcon icon={faXmark} size={30} color="black"  style={{ marginRight: 10, marginTop: 10 }} />
            </Pressable>
        </View>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={40}>
          <Text style={styles.topBigText}>
            Привет! Давай создадим твой профиль
          </Text>
          <Text style={{ paddingTop: 20, textAlign: 'center' }}>
            Введите свои данные для создания аккаунта
          </Text>
          <View style={{justifyContent:'center',alignItems:'center',marginTop:122}} >
            <View style={{marginTop:20}}>
              <TextInput
                style={styles.input}
                placeholder={nameError ? 'Это обязательное поле' : 'Имя'}
                placeholderTextColor={nameError ? 'red' : "#78716C"}
                value={firstName}
                onChangeText={handleNameChange}
                keyboardType='default'
                onFocus={()=>{
                  setNameBorderColor("#20BDFF")
                }}
                onBlur={()=>{
                  setNameBorderColor("#E5E5E5")
                }}
              />
              <View style={{backgroundColor:nameBorderColor,height:1,width:width-106}}/> 
            </View>
            <View style={{marginTop:20}}>
              <TextInput
                style={styles.input}
                placeholder={secondNameError ? 'Это обязательное поле' : 'Фамилия'}
                placeholderTextColor={nameError ? 'red' : "#78716C"}
                value={lastName}
                onChangeText={handleSecondNameChange}
                keyboardType='default'
                onFocus={()=>{
                  setSurnameBorderColor("#20BDFF")
                }}
                onBlur={()=>{
                  setSurnameBorderColor("#E5E5E5")
                }}
              />
              <View style={{backgroundColor:surnameBorderColor,height:1,width:width-106}}/> 
            </View>
           
            

          </View>
          <View style={{ alignItems: 'center',marginTop:40,marginHorizontal:53 }}>
          <GradientButton
            onPress={handleContinue}
            disabled={isButtonDisabled}
            
          >
            <Text style={{fontSize:18,fontFamily:"SF Pro Display",fontWeight:"400"}}>Продолжить</Text>
          </GradientButton>
        </View>
        </KeyboardAvoidingView>
        
      </SafeAreaView>
    </TouchableWithoutFeedback >
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'flex-start',
  },
  topBigText: {
    
    fontSize: 22,
    textAlign: 'center',
    paddingTop: 50
  },
  input: {
    height:40,
    paddingLeft:3,
    marginBottom:2,
    fontSize: 16,
    fontWeight: '500'
  },
  genderView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default PersonNameScreen;

