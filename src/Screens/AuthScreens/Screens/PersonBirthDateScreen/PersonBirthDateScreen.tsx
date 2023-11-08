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
    Pressable,
    useWindowDimensions
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRemove, faXmark, faXmarkCircle,faBackspace,faChevronLeft,faArrowLeft, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { State } from 'react-native-gesture-handler';
import GradientButton from '../../../../UIComponents/GradientButton/GradientButton';
import { useAppDispatch } from '../../../../store/typesHooks/typesHooks';
import { updateUserBirth } from '../../../../store/reducers/tempUserDataReducer';
import { AuthNavigationName } from '../../AuthScreen';
import ReactNativeModal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
const PersonBirthDateScreen: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [birth,setBirth]=useState<Date>(new Date())
    const [avaibletDate,setAvaibleDate]=useState<Date>(birth)
    const [visibleCalendare,setVisibleCalendare]=useState<boolean>(false)
    const dispatch=useAppDispatch();
    const {width}=useWindowDimensions()

    const handleBirthdaySelected = (formattedBirthday: string) => {
        dispatch(updateUserBirth({dateOfBirth:formattedBirthday}))
      };

    const handleContinue = async () => {
        console.log("click");
        
        handleBirthdaySelected(birth.getFullYear()+"-"+((birth.getMonth()+1)>=10?(birth.getMonth()+1):"0"+(birth.getMonth()+1))+"-"+(birth.getDate()>=10?birth.getDate():"0"+birth.getDate()))
        navigation.navigate(AuthNavigationName.personGenderSelectScreen)
    };

    var maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() -18);
    var minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() -90);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={{ flex:1,backgroundColor:'white' }}>
            <ReactNativeModal style={{padding:0,margin:0,justifyContent:'flex-end'}} isVisible={visibleCalendare} onBackdropPress={()=>setVisibleCalendare(false)}>
                <View style={{backgroundColor:"white",paddingBottom:50}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15,paddingTop:10,marginBottom:20}}>
                        <Pressable onPress={()=>setVisibleCalendare(false)}>
                            <Text style={{fontFamily:"SF Pro Display",fontSize:20,fontWeight:"400",color:"#009ADA"}}>ОТМЕНА</Text>
                        </Pressable>
                        <Pressable onPress={()=>{
                            setBirth(avaibletDate)
                            setVisibleCalendare(false)
                        }}>
                            <Text style={{fontFamily:"SF Pro Display",fontSize:20,fontWeight:"600",color:"#009ADA"}}>ВЫБРАТЬ</Text>
                        </Pressable>
                    </View>
                    
                    <DateTimePicker
                        
                        maximumDate={maxDate}
                        minimumDate={minDate}
                        display="inline"
                        value={avaibletDate}
                        onChange={(event,date)=>{
                            setAvaibleDate(date??birth)
                        }}
                        mode="date"
                    />
                </View>
            </ReactNativeModal>
                <View style={{display:"flex",justifyContent:"space-between",flexDirection:"row"}}>
                    <TouchableOpacity
                    onPress={() => navigation.navigate(AuthNavigationName.cityScreen)}>
                        <FontAwesomeIcon icon={faArrowLeft} size={30} color="black" style={{ marginLeft: 10, marginTop: 10 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => navigation.navigate(AuthNavigationName.homeScreen)}>
                        <FontAwesomeIcon icon={faXmark} size={30} color="black" style={{ marginRight: 10, marginTop: 10 }} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.topBigText}>
                    Когда у тебя День рождения?
                    </Text>
                </View>
                <View style={{width:width-106,alignSelf:'center',marginTop:40}}>
                <Pressable onPress={()=>setVisibleCalendare(true)} style={{ flexDirection:'row',alignItems:'center', height:43,paddingHorizontal:13, borderRadius:12.89,borderWidth:1,borderColor:"#B998FF",justifyContent:'space-between'}}>
                                    <Text  style={{ fontWeight:"400"}}>{birth.toLocaleDateString("ru",{year: 'numeric', month: 'long', day: 'numeric' })}</Text> 
                                    <FontAwesomeIcon icon={faCalendarDays} size={19}/>
                                </Pressable>
                        {/* <BirthdayPicker onBirthdaySelected={handleBirthdaySelected}/> */}
                        <View style={{ alignItems: 'center',marginTop:40}}>
                    <GradientButton
                        onPress={handleContinue} active={true}>
                        <Text style={{fontSize:18,fontFamily:"SF Pro Display",fontWeight:"400"}}>Продолжить</Text>
                    </GradientButton>
                </View>
                </View>
                
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
        fontSize: 16,
        fontWeight: '500'
    },
    genderView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default PersonBirthDateScreen;

