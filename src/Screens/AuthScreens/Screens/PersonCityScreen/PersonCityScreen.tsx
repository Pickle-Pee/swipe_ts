import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { FC, useEffect, useState } from "react";
import { FlatList, Keyboard, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, useWindowDimensions } from "react-native";
import { AuthNavigationName } from "../../AuthScreen";
import { UserHttp } from "../../../../http/user/httpUser";
import GradientButton from "../../../../UIComponents/GradientButton/GradientButton";
import { useAppDispatch } from "../../../../store/typesHooks/typesHooks";
import { updateUserCity } from "../../../../store/reducers/tempUserDataReducer";

const PersonCityScreen:FC<{navigation:any}>=({navigation})=>{

    const [cityBorderColor,setCityBorderColor]=useState<string>("#E5E5E5")
    const [city,setCity]=useState<string>("")
    const [isCity,setIsCity]=useState<boolean>(false)
    const {width}=useWindowDimensions()
    const [listCity,setListCity]=useState<Array<string>>([])
    const [block,setBlock]=useState<boolean>(false)
    const dispatch=useAppDispatch()

    const getCities=async()=>{
        if(city.length>0){
            const cities:Array<string>=await new UserHttp().getCity(city)
            setListCity(cities);
        }
       
    }

    useEffect(()=>{
        
        if(block){
            setBlock(false)
        }else{
            getCities()
            setIsCity(false)
        }
         
        


    },[city])

    const onChangeCity=()=>{

    }

    const variableCity=(value:string)=>{
        setIsCity(true)
        Keyboard.dismiss()
        setBlock(true)
        setListCity([])
        setCity(value)
    }

    const handleContinue=()=>{
        if(isCity){
            dispatch(updateUserCity({city}))
            navigation.navigate(AuthNavigationName.personBirthDateScreen)
        }
       
    }
   
    
    return(
        <Pressable onPress={Keyboard.dismiss} style={{flex:1}}>
            <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
             <View style={{display:"flex",justifyContent:"space-between",flexDirection:"row"}}>
                <TouchableOpacity
                onPress={() => navigation.navigate(AuthNavigationName.personNameScreen)}>
                    <FontAwesomeIcon icon={faArrowLeft} size={30} color="black" style={{ marginLeft: 10, marginTop: 10 }} />
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => navigation.navigate(AuthNavigationName.homeScreen)}>
                    <FontAwesomeIcon icon={faXmark} size={30} color="black" style={{ marginRight: 10, marginTop: 10 }} />
                </TouchableOpacity>
             </View>
             <View style={{alignItems:'center',marginTop:40}}>
                <Text style={{fontSize:23,fontFamily:"SF Pro Display",fontWeight:"400"}}>
                    Укажите город
                </Text>
             </View>
             <View style={{marginTop:120,alignSelf:'center',position:'relative',width:width-106}}>
                <TextInput
                    style={styles.input}
                    placeholder={'Ваш город'}
                    placeholderTextColor={"#78716C"}
                    value={city}
                    onChangeText={setCity}
                    keyboardType='default'
                    onFocus={()=>{
                        setCityBorderColor("#20BDFF")
                    }}
                    onBlur={()=>{
                        setCityBorderColor("#E5E5E5")
                    }}
                />
                <View style={{backgroundColor:cityBorderColor,height:1,}}/> 
              {!isCity&&  <View style={{position:"absolute",top:43,zIndex:20,backgroundColor:"white"}}>
                    <FlatList
                        keyboardShouldPersistTaps="always"
                        data={listCity}
                        renderItem={({item,index})=>{
                            return(
                                <Pressable onPress={(e)=>{
                                    e.stopPropagation()
                                    variableCity(item)
                                }}  key={index} style={{height:40,justifyContent:'center',width:width-106}}>
                                    <Text style={{fontSize:16,fontFamily:"SF Pro Display",fontWeight:"400",color:"#757677"}}>{item}</Text>
                                </Pressable>
                            )
                        }}
                    />
                </View>}
                <View style={{marginTop:40,alignItems:'center'}}>
                <GradientButton
                    onPress={handleContinue}
                    
                >
                    <Text style={{fontSize:18,fontFamily:"SF Pro Display",fontWeight:"400"}}>Продолжить</Text>
                </GradientButton>
                </View>
            </View>
            
        </SafeAreaView>
        </Pressable>
        
    )
}
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
export default PersonCityScreen;