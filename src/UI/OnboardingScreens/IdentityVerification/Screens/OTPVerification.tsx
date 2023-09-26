import { View, Text, TouchableOpacity, Image, StatusBar, TextInput, Keyboard, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { setAuthToken, setPhoneVerified, setTokenSaved, setUserId } from '../../../../redux/AppReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useRoute } from '@react-navigation/native';
// let otpCode = '';
var newOtpCode ='';

const OTPVerification = ({ navigation }) => {
  const [otp, setOTP] = useState(['', '', '', '', '']);
  const dispatch = useDispatch()

  const route = useRoute()
  const inputRefs = useRef([]);
  const [wordCount, setWordCount] = useState(0);
  const [otpCode, setOtpCode] = useState('');

  const [loader, setLoader] = useState(false)
  const navigate = () => {
    navigation.navigate('FaceId');
  }
  const { token, id, otpCodeCheck } = route.params;
  const [isErrorVisible, setIsErrorVisible] = useState(false)
  const [errorText, setErrorText] = useState('')
  const isFocused = useIsFocused();
  const goBack = () => {
    navigation.goBack()
  }

  const handleOTPChange = (index: number, value: string) => {
    setErrorText('')
    setIsErrorVisible(false)
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
     newOtpCode = newOTP.join('');
    setOtpCode(newOtpCode);
    // Move to the next input
    if (index < 4 && value !== '') {
      inputRefs.current[index + 1].focus();
    }
    // console.log('======OTP========', otp.length);
    console.log('======OTP========', otpCode);
    
    if (otpCode.length >= 4) {



      verifyOTP()

    }


  };

  useEffect(() => {
    if (isFocused) {
      setLoader(false)
      setOtpCode('')
      setOTP(['', '', '', '', ''])

      newOtpCode=''
    }


    return () => {

    };
  }, [isFocused]);

  const verifyOTP = async () => {
    if (otpCode.length < 4) {

      setErrorText('OTP code can not be less then 5 digits')
      setIsErrorVisible(true)
      return

    } 

    console.log(otpCodeCheck);
    console.log(newOtpCode);

    
    if(otpCodeCheck!=newOtpCode){
      setErrorText('INCORRECT OTP Code')
      setIsErrorVisible(true)
      setLoader(false)
      setOtpCode('')
      setOTP(['', '', '', '', ''])
      inputRefs.current[0].focus();
      Keyboard.dismiss()
      return
    }

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

          
          navigation.navigate('FaceId')


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

  const handleBackspace = (index) => {
    if (index > 0 && otp[index] === '') {
      // Clear the text of the previous TextInput
      inputRefs.current[index - 1].setNativeProps({ text: '' });

      // Focus on the previous TextInput
      inputRefs.current[index - 1].focus();

      // Remove the last character from otpCode
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOTP(newOtp);
      setOtpCode(newOtp.join(''));
      console.log(otpCode);
      
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
                    color: '#000000',
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
            {isErrorVisible && (<Text style={{ color: 'red', fontWeight: '400', marginTop: 8 }}>{errorText}</Text>)}


          </View>



          <Text style={{ fontSize: 14, fontWeight: '500', color: '#1C64F2', alignSelf: 'center', marginTop: 70 }}>Didn’t Recieve a code?</Text>



        </TouchableWithoutFeedback>}
    </View>

  )
}

export default OTPVerification