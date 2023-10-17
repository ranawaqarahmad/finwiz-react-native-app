import { View, TouchableWithoutFeedback, SafeAreaView, Text, TouchableOpacity, Image, StatusBar, TextInput, Keyboard } from 'react-native'
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setFaceIdVerified } from '../../../../redux/AppReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
let otpCode = '';

const FaceId = ({ navigation }) => {
    const [otp, setOTP] = useState(['', '', '', '']);



    const navigate = () => {
        navigation.navigate('Address');
    }
    const goBack = () => {
        navigation.goBack()
    }

    const dispatch = useDispatch()
    const saveFaceIdVerified = async (isSaved: string) => {
        try {
            await AsyncStorage.setItem('faceIdVerified', isSaved);
            console.log('Face ID Verified Saved locally');
        } catch (error) {
            console.error('Error storing data: ', error);
        }
    };



    return (

        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }} style={{ width: '100%', height: '100%', backgroundColor: 'white', }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white',paddingVertical:16 }}>

                <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'space-between', paddingHorizontal: 16 }}>
                    <StatusBar backgroundColor='white' barStyle={'dark-content'}></StatusBar>
                    <View>
                        <TouchableOpacity onPress={goBack}>
                            <Image style={{ width: 24, height: 24, }} source={require('../../../../assets/Images/backarrow.png')} />

                        </TouchableOpacity>

                        <View style={{ marginTop: 80 }}>
                            <View>
                                <Image style={{ width: 54, height: 54, resizeMode: 'contain' }} source={require('../../../../assets/Images/faceid.png')} />
                            </View>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 32 }}>Enable Face Id</Text>
                            <Text style={{ fontSize: 16, fontWeight: 'normal', color: '#4B5563', marginTop: 4 }}>Face ID is convenient and secure way of signing in</Text>
                        </View>





                    </View>






                    <View style={{}}>



                        <TouchableOpacity
                            onPress={() => {
                                saveFaceIdVerified('true')
                                dispatch(setFaceIdVerified(true))
                                navigation.navigate('EnableNotifications')
                            }}
                            style={{ backgroundColor: '#7C56FE', borderRadius: 4, alignItems: 'center', justifyContent: 'center', padding: 16, marginTop: 25 }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>Enable</Text>

                        </TouchableOpacity>

                        <View style={{ marginTop: 24, alignItems: 'center' }}>
                            <Text onPress={() => { navigation.navigate('EnableNotifications') }} style={{ color: '#1C64F2' }}>Maybe later</Text>
                        </View>
                    </View></View>
            </SafeAreaView>

        </TouchableWithoutFeedback>
    )
}

export default FaceId