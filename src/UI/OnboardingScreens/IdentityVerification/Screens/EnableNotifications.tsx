import { TouchableWithoutFeedback, SafeAreaView, View, Text, TouchableOpacity, Image, StatusBar, TextInput, Keyboard } from 'react-native'
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setPhoneVerified, setWelcomeNavStatus, setstack } from '../../../../redux/AppReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
let otpCode = '';

const EnableNotifications = ({ navigation }) => {
    const [otp, setOTP] = useState(['', '', '', '']);
    const dispatch = useDispatch();

    const inputRefs = useRef([]);
    const [wordCount, setWordCount] = useState(0);

    const navigate = () => {
        navigation.navigate('Address');
    }
    const goBack = () => {
        navigation.goBack()
    }







    const saveNotificationEnabledVerified = async (isSaved: string) => {
        try {
            await AsyncStorage.setItem('notificationEnabledVerified', isSaved);
            console.log('Notification Enabled Verified Saved locally');
        } catch (error) {
            console.error('Error storing data: ', error);
        }
    };

    const savePhoneVerified = async (isSaved: string) => {
        try {
          await AsyncStorage.setItem('phoneVerified', isSaved);
          console.log('Phone Verified Saved locally');
        } catch (error) {
          console.error('Error storing data: ', error);
        }
      };
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }} style={{ width: '100%', height: '100%', backgroundColor: 'white', }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white', }}>
                <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'space-between', paddingHorizontal: 16 }}>

                    <StatusBar backgroundColor='white' barStyle={'dark-content'}></StatusBar>
                    <View>
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <Image style={{ width: 24, height: 24, }} source={require('../../../../assets/Images/backarrow.png')} />

                        </TouchableOpacity>

                        <View style={{ marginTop: 80 }}>
                            <View>
                                <Image style={{ width: 54, height: 54, resizeMode: 'contain' }} source={require('../../../../assets/Images/bell.png')} />
                            </View>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 32 }}>Enable Notifications</Text>
                            <Text style={{ fontSize: 16, fontWeight: 'normal', color: '#4B5563', marginTop: 4 }}>Be updated with your current financial health, be notified and get updates on payments, purchases and targets</Text>
                        </View>





                    </View>






                    <View style={{}}>



                        <TouchableOpacity
                            onPress={() => {

                                dispatch(setWelcomeNavStatus(2))
                                dispatch(setstack('WelcomeNav'))
                                saveNotificationEnabledVerified('true')
                                savePhoneVerified('true')
                                dispatch(setPhoneVerified(true))
                            }}
                            style={{ backgroundColor: '#7C56FE', borderRadius: 4, alignItems: 'center', justifyContent: 'center', padding: 16, marginTop: 25 }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>Enable</Text>

                        </TouchableOpacity>

                        <View style={{ marginTop: 24, alignItems: 'center' }}>
                            <Text onPress={() => {
                                dispatch(setWelcomeNavStatus(2))
                                dispatch(setstack('WelcomeNav'))
                                savePhoneVerified('true')
                                dispatch(setPhoneVerified(true))
                            }} style={{ color: '#1C64F2' }}>Maybe later</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView></TouchableWithoutFeedback>
    )
}

export default EnableNotifications