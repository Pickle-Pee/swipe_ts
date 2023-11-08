import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ViewStyle, TextStyle, SafeAreaView, Image, KeyboardAvoidingView, View, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GradientButton from "../../../../UIComponents/GradientButton/GradientButton";
import { AuthNavigationName } from "../../AuthScreen";
import SVGAppLogoMain from "../../../../SVG/SVGAppLogoMain";

const HomeScreen: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

  return (
    <SafeAreaView style={{alignItems:"center",height:"100%",flex:1,justifyContent:'space-between',backgroundColor:"white"}}>

        <View style={{width:88,height:103,marginTop:150}}>
          <SVGAppLogoMain/>
        </View>
            <View style={{marginBottom:290,alignItems:'center'}}>
              <GradientButton
                onPress={()=>{
                  navigation.navigate(AuthNavigationName.loginScreen);
                }}
                
              >
                <Text style={{fontSize:18,fontFamily:"SF Pro Display",fontWeight:"400",paddingHorizontal:114}}>
                  Войти
                </Text>
              </GradientButton>
              <TouchableOpacity
                style={{marginTop:30}}
                  onPress={() => {
                    navigation.navigate(AuthNavigationName.personNameScreen);
                  }}
                >
                  <Text style={{fontSize:14,fontFamily:"SF Pro Display",fontWeight:"600",color:"#009ADA"}}>
                    Зарегистрироваться
                  </Text>
                </TouchableOpacity>
            </View>
           
            
          
              <View style={{position:"absolute",bottom:25}}>
                <View style={{flexDirection:"row",marginBottom:10}}>
                  <Text style={styles.bottomText}>Продолжая, вы принимаете условия</Text>
                  <Text style={styles.bottomTextTap}> Соглашения</Text>
                </View>
                  <Text style={styles.bottomTextTap}>Конфиденциальность</Text>
              </View>
    </SafeAreaView>
  );
};

interface Styles {
  bottomText: TextStyle;
  bottomTextTap : TextStyle;
  inputContainer: ViewStyle;
  input: TextStyle;
  errorText: TextStyle;
}

const styles: Styles = {

  bottomText:{
    fontFamily:"SF Pro Display",
    fontSize:10,
    fontWeight:"700",
    lineHeight:11.72,
    color:"#565656",
    textAlign:"center"
  },
  bottomTextTap:{
    fontFamily:"SFProDisplay-Light",
    fontSize:10,
    fontWeight:"700",
    lineHeight:11.72,
    color:"#009ADA",
    textAlign:"center"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 151,
    
    height:25
  },
  input: {
    width: 280,
    height: 25,
    marginVertical: 20,
    padding: 5,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    position: "absolute"
  },
};

export default HomeScreen;
