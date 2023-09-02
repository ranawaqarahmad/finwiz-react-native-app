import { View, Text, TouchableOpacity, Image, StatusBar, TextInput, Keyboard } from 'react-native'
import React, { useRef, useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
let otpCode = '';

const EnableNotifications = ({ navigation }) => {
    const [otp, setOTP] = useState(['', '', '', '']);

    const inputRefs = useRef([]);
    const [wordCount, setWordCount] = useState(0);

    const navigate = () => {
        navigation.navigate('Address');
    }
    const goBack = () => {
        navigation.goBack()
    }

    const handleOTPChange = (index: number, value: string) => {
        const newOTP = [...otp];
        newOTP[index] = value;
        setOTP(newOTP);
        otpCode = otpCode.concat(value);

        // Move to the next input
        if (index < 3 && value !== '') {
            inputRefs.current[index + 1].focus();
        }
        console.log('======OTP========', otp.length);
        console.log('======OTP========', otpCode.length);
        if (otpCode.length == 4) {
            navigate()
        }


    };

    const handleBackspace = (index: number) => {
        if (index > 0 && otp[index] === '') {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }} style={{ width: '100%', height: '100%', padding: 16, backgroundColor: 'white', justifyContent: 'space-between' }}>

            <StatusBar backgroundColor='white' barStyle={'dark-content'}></StatusBar>
            <View>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image style={{ width: 24, height: 24, }} source={require('../../../../assets/Images/backarrow.png')} />

                </TouchableOpacity>

                <View style={{ marginTop: 80 }}>
                <View>
                    <Image style={{width:54,height:54,resizeMode:'contain'}} source={require('../../../../assets/Images/bell.png')}/>
                </View>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black',marginTop:32 }}>Enable Notifications</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'normal', color: '#4B5563', marginTop: 4 }}>Be updated with your current financial health, be notified and get updates on payments, purchases and targets</Text>
                </View>


                


            </View>






            <View style={{ marginBottom: 16 }}>



                <TouchableOpacity
                    onPress={() => { navigation.navigate('') }}
                    style={{ backgroundColor: '#7C56FE', borderRadius: 4, alignItems: 'center', justifyContent: 'center', padding: 16, marginTop: 25 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>Enable</Text>

                </TouchableOpacity>

                <View style={{ marginTop: 24,alignItems:'center' }}>
                    <Text style={{ color: '#1C64F2' }}>Maybe later</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default EnableNotifications