import { View, Text, TouchableOpacity, Image, StatusBar, TextInput, Keyboard, ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { setAuthToken, setPhoneVerified, setTokenSaved, setUserId } from '../../../../redux/AppReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
let otpCode = '';

const OTPVerification = ({ navigation }) => {
  const [otp, setOTP] = useState(['', '', '', '', '']);
  const dispatch = useDispatch()

  const route = useRoute()
  const inputRefs = useRef([]);
  const [wordCount, setWordCount] = useState(0);

  const [loader, setLoader] = useState(false)
  const navigate = () => {
    navigation.navigate('FaceId');
  }
  const { token, id } = route.params;

  const goBack = () => {
    navigation.goBack()
  }

  const handleOTPChange = (index: number, value: string) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
    otpCode = otpCode.concat(value);

    // Move to the next input
    if (index < 4 && value !== '') {
      inputRefs.current[index + 1].focus();
    }
    console.log('======OTP========', otp.length);
    console.log('======OTP========', otpCode.length);
    if (otpCode.length === 5) {



      verifyOTP()

    }


  };

  const verifyOTP = async () => {

    setLoader(true)
    fetch('https://api-finwiz.softsquare.io/api/user/verify-otp', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        otp: otpCode,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.status);
        if (data.status) {
          console.log('PHONE VERIFIED');
          
          savePhoneVerified('true')
          dispatch(setPhoneVerified(true))
         
          
        } else {
          console.log('MESSAGE', data.message);
          setLoader(false)
        }

      })
      .catch((error) => {
        console.log(error);
        setLoader(false)
      });



  };



  const savePhoneVerified = async (isSaved: string) => {
    try {
      await AsyncStorage.setItem('phoneVerified', isSaved);
      console.log('Phone Verified Saved locally');
    } catch (error) {
      console.error('Error storing data: ', error);
    }
  };

  const handleBackspace = (index: number) => {
    if (index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {loader ?
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} size={'large'} color={'#7C56FE'}></ActivityIndicator>
        </View> :

        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }} style={{ width: '100%', height: '100%', padding: 16, backgroundColor: 'white', }}>


          <StatusBar backgroundColor='white' barStyle={'dark-content'}></StatusBar>
          <View>
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
              <Image style={{ width: 24, height: 24, }} source={require('../../../../assets/Images/backarrow.png')} />

            </TouchableOpacity>

            <View style={{ marginTop: 80 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>Verify Your Number</Text>
              <Text style={{ fontSize: 16, fontWeight: 'normal', color: '#4B5563', marginTop: 4 }}>A verification code has been sent to {'\n'} +123456789</Text>
            </View>


            <View
              style={{
                alignSelf: 'center',
                width: '90%',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 32,
                justifyContent: 'space-between',
              }}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  style={{
                    textAlign: 'center',
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5,
                    borderBottomWidth: 2,

                    fontWeight: 'bold',
                    fontSize: 18,
                    backgroundColor: '#F3F4F6',
                    alignItems: 'center',
                    borderColor: otp[index] ? '#00A3FF' : 'green',
                    justifyContent: 'center',
                    padding: 15,
                  }}
                  value={digit}
                  onChangeText={value => handleOTPChange(index, value)}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace') {
                      handleBackspace(index);
                    }
                  }}
                  maxLength={1}
                  keyboardType="numeric"
                  ref={input => (inputRefs.current[index] = input)}
                />
              ))}
            </View>


          </View>



          <Text style={{ fontSize: 14, fontWeight: '500', color: '#1C64F2', alignSelf: 'center', marginTop: 70 }}>Didn’t Recieve a code?</Text>



        </TouchableWithoutFeedback>}
    </View>

  )
}

export default OTPVerification