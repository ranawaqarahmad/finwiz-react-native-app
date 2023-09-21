import { TouchableWithoutFeedback,View, Text, Image, TextInput, TouchableOpacity, StatusBar, ActivityIndicator, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused, useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const MobileNumberScreen = ({ navigation }) => {

    const route = useRoute()
    const [number, setnumber] = useState('')
    const [loader, setLoader] = useState(false)
    const selector = useSelector(state => state.AppReducer);
    const token = selector.authToken;
    const id = selector.userId;

    const [isErrorVisible, setIsErrorVisible] = useState(false)
    const [errorText, setErrorText] = useState('')
    const isFocused = useIsFocused();


    useEffect(() => {
        if(isFocused){
            setLoader(false)
        }
    

        return () => {
          
        };
      }, [isFocused]);





    const handleApiCall = async () => {
        if (!number) {
            setErrorText('Mobile number cannot be empty')
            setIsErrorVisible(true)
            return
        }
        setLoader(true)
        fetch('https://api-finwiz.softsquare.io/api/user/update-user', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone_number: number,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status) {
                    console.log('Data is',data.data.otp);
                    
                    sendOTP(data.data.otp)
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


    const sendOTP = async (otp) => {

        setLoader(true)
        fetch('https://api-finwiz.softsquare.io/api/user/send-otp', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },

        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status) {
                    console.log('DATA IS THIS FUCKIGN',data);
                    navigation.navigate('OTPVerification', { token: token, id: id,otpCodeCheck:otp });

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
    return (
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}} style={{ flex: 1, backgroundColor: 'white' }}>
            {loader ?
                <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} size={'large'} color={'#7C56FE'}></ActivityIndicator>
                </View> :
                <View style={{ width: '100%', height: '100%', padding: 16, backgroundColor: 'white', justifyContent: 'space-between' }}>

                    <StatusBar backgroundColor='white'></StatusBar>
                    <View>
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <Image style={{ width: 24, height: 24, }} source={require('../../../../assets/Images/backarrow.png')} />

                        </TouchableOpacity>

                        <View style={{ marginTop: 80 }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>Your Mobile Number</Text>
                            <Text style={{ fontSize: 16, fontWeight: 'normal', color: '#4B5563', marginTop: 4 }}>A verification code will be sent to your Phone number</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', marginTop: 35, backgroundColor: '#F9FAFB', borderRadius: 8, marginBottom: 9, paddingHorizontal: 10 }}>
                            <Image style={{ width: 30, height: 20, }} source={require('../../../../assets/Images/usa.png')} />
                            <Text style={{ fontSize: 16, fontWeight: '500', color: '#6B7280', marginHorizontal: 5 }}>+1</Text>
                            <TextInput value={number} onChangeText={(text) => {
                                setErrorText('')
                                setIsErrorVisible(false)


                                setnumber(text)
                            }} maxLength={12} keyboardType='numeric' placeholder='' style={{ fontSize: 16, fontWeight: 'normal', color: '#6B7280', marginTop: 2, flex: 1 }}></TextInput>
                            <TouchableOpacity onPress={() => { setnumber('') }}><Image style={{ width: 25, height: 25, }} source={require('../../../../assets/Images/cross.png')} />
                            </TouchableOpacity>

                        </View>
                        {isErrorVisible && (<Text style={{ color: 'red', fontWeight: '400', marginTop: 8 }}>{errorText}</Text>)}



                    </View>



                    <View style={{ marginBottom: 16 }}>


                        <TouchableOpacity
                            onPress={() => { handleApiCall() }}
                            style={{ width: 60, height: 60, backgroundColor: 'black', alignSelf: 'flex-end', borderRadius: 400, alignItems: 'center', justifyContent: 'center', padding: 16, marginTop: 25, }}>
                            <Image style={{ width: 24, height: 24 }} source={require('../../../../assets/Images/whitearrow.png')} />

                        </TouchableOpacity>


                    </View>



                </View>}</TouchableWithoutFeedback>
    )
}

export default MobileNumberScreen