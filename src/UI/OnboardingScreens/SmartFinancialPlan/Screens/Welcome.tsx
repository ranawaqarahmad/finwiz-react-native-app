import { View, Text, Image, TextInput, TouchableOpacity, StatusBar, ActivityIndicator, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { setAuthToken, setUserId } from '../../../../redux/AppReducer';
import { useDispatch } from 'react-redux';
import { registerApi } from '../../../../Services/ApiList';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const Welcome = ({ navigation }) => {


    const [email, setEmail] = useState('tamoormalik088@gmail.com')
    const [password, setPassword] = useState('Profe$$ional789')
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false)
    const isFocused = useIsFocused();
    const [isErrorVisible, setIsErrorVisible] = useState(false)
    const [errorText, setErrorText] = useState('')

    useEffect(() => {
        if (isFocused) {
            setLoader(false)

        }


        return () => {

        };
    }, [isFocused]);

    const [pass, setpass] = useState('default')
    const getPasswordStrength = (password: string) => {
        // Define your criteria for password strength
        const lengthRegex = /^.{6,}$/;
        const uppercaseRegex = /^(?=.*[A-Z])/;
        const lowercaseRegex = /^(?=.*[a-z])/;
        const numberRegex = /^(?=.*\d)/;
        const specialCharRegex = /^(?=.*[!@#$%^&*])/;

        if (lengthRegex.test(password)) {
            if (uppercaseRegex.test(password) && lowercaseRegex.test(password) && numberRegex.test(password) && specialCharRegex.test(password)) {
                setpass('strong');
                return;
            }
            if ((uppercaseRegex.test(password) || lowercaseRegex.test(password)) && numberRegex.test(password)) {
                setpass('medium');
                return;


            }
        }

        setpass('weak');
    };







    const handleRegistration = async () => {
        if (password.length < 7) {
            setErrorText('Password must be more then 6 digits')
            setIsErrorVisible(true)
            return;
        }

        setLoader(true)
        fetch('https://api-finwiz.softsquare.io/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status === true) {
                    dispatch(setAuthToken(data.token))

                    console.log('TOKEN SAVED', data.token);
                    storeToken(data.token)
                    storeId(data.data.id)
                    dispatch(setUserId(data.data.id))

                } else {
                    console.log('MESSAGE', data);
                    setErrorText(data.data.email)
                    setIsErrorVisible(true)
                    setLoader(false)
                }

            })
            .catch((error) => {
                console.log(error);
                setErrorText(error)
                setIsErrorVisible(true)
                setLoader(false)
            });



    };

    const storeToken = async (token: string) => {

        try {
            await AsyncStorage.setItem('token', token);
            console.log('Token stored successfully.');
        } catch (error) {
            console.error('Error storing data: ', error);
        }
    };

    const storeId = async (id: { toString: () => string; }) => {
        try {
            await AsyncStorage.setItem('userId', id.toString());
            console.log('User ID stored successfully.');
        } catch (error) {
            console.error('Error storing data: ', error);
        }

    };
    return (
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}} style={{ backgroundColor: 'white', flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>

                {loader ? (

                    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} size={'large'} color={'#7C56FE'}></ActivityIndicator>
                    </View>
                ) : (
                    <View style={{ width: '100%', height: '100%', padding: 16, backgroundColor: 'white', justifyContent: 'space-between' }}>

                        <StatusBar backgroundColor='white' barStyle={'dark-content'}></StatusBar>
                        <View>
                            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                <Image style={{ width: 24, height: 24, }} source={require('../../../../assets/Images/backarrow.png')} />

                            </TouchableOpacity>

                            <View style={{ marginTop: 29 }}>
                                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>Welcome to Finwiz</Text>
                                <Text style={{ fontSize: 16, fontWeight: 'normal', color: '#4B5563', marginTop: 4 }}>Let’s create your profile and get started</Text>
                            </View>

                            <View style={{ marginTop: 35 }}>
                                <TextInput onChangeText={(text) => {
                                    setErrorText('')
                                    setIsErrorVisible(false)
                                    setEmail(text)
                                }} value={email} 
                                placeholderTextColor={'grey'} placeholder='Email' style={{ borderWidth: 1, borderColor: '#E5E7EB', fontSize: 16, fontWeight: 'normal', color: 'black', backgroundColor: '#F9FAFB', borderRadius: 8, marginBottom: 9, padding: 10 }}></TextInput>
                                <TextInput
                                    value={password}
                                    onChangeText={(text) => {
                                        setErrorText('')
                                        setIsErrorVisible(false)
                                        setPassword(text)
                                        getPasswordStrength(text)
                                    }}
                                    secureTextEntry={true}
                                    placeholderTextColor={'grey'}
                                    placeholder='Password' style={{ borderWidth: 1, borderColor: '#E5E7EB', fontSize: 16, fontWeight: 'normal', color: 'black', backgroundColor: '#F9FAFB', borderRadius: 8, marginTop: 9, padding: 10 }}></TextInput>
                            </View>

                            {isErrorVisible && (<Text style={{ color: 'red', fontWeight: '400', marginTop: 8 }}>{errorText}</Text>)}


                            <View style={{ marginTop: 25 }}>
                                <Text style={{ fontSize: 14, fontWeight: '400', color: '#6B7280' }}>Password Strength</Text>
                                {pass === 'strong' && (
                                    <View style={{ flexDirection: 'row', marginTop: 12 }}>

                                        <View style={{ height: 3, flex: 1, backgroundColor: '#31EE66' }}></View>
                                        <View style={{ height: 3, flex: 1, backgroundColor: '#31EE66', marginHorizontal: 4 }}></View>
                                        <View style={{ height: 3, flex: 1, backgroundColor: '#31EE66' }}></View>
                                    </View>
                                )}
                                {pass === 'weak' && (
                                    <View style={{ flexDirection: 'row', marginTop: 12 }}>

                                        <View style={{ height: 3, flex: 1, backgroundColor: '#E60E0E' }}></View>
                                        <View style={{ height: 3, flex: 1, backgroundColor: '#F9FAFB', marginHorizontal: 4 }}></View>
                                        <View style={{ height: 3, flex: 1, backgroundColor: '#F9FAFB' }}></View>
                                    </View>
                                )}
                                {pass === 'medium' && (
                                    <View style={{ flexDirection: 'row', marginTop: 12 }}>

                                        <View style={{ height: 3, flex: 1, backgroundColor: '#31EE66' }}></View>
                                        <View style={{ height: 3, flex: 1, backgroundColor: '#E60E0E', marginHorizontal: 4 }}></View>
                                        <View style={{ height: 3, flex: 1, backgroundColor: '#F9FAFB' }}></View>
                                    </View>
                                )}
                                {pass === 'default' && (
                                    <View style={{ flexDirection: 'row', marginTop: 12 }}>

                                        <View style={{ height: 3, flex: 1, backgroundColor: '#F9FAFB' }}></View>
                                        <View style={{ height: 3, flex: 1, backgroundColor: '#F9FAFB', marginHorizontal: 4 }}></View>
                                        <View style={{ height: 3, flex: 1, backgroundColor: '#F9FAFB' }}></View>
                                    </View>
                                )}

                                <Text style={{ fontSize: 14, fontWeight: '400', color: '#6B7280', marginTop: 18 }}>Password must be a minimum of 8 characters, include one letter one number and one symbol</Text>

                            </View>
                        </View>







                        <View style={{ marginBottom: 16 }}>

                            <View>
                                <Text style={{ fontSize: 14, fontWeight: '400', color: '#6B7280' }}>By Continuing you agree to Finwiz platform <Text style={{ color: '#1C64F2' }}> terms and conditions, Rewards Policy</Text> and <Text style={{ color: '#1C64F2' }}> Privacy Policy</Text></Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => {
                                    // dispatch(setWelcomeNavStatus(1))
                                    // dispatch(setstack('WelcomeNav'))
                                    // navigation.navigate('SmartFinancialPlan')

                                    handleRegistration()
                                }}
                                style={{ backgroundColor: '#7C56FE', borderRadius: 4, alignItems: 'center', justifyContent: 'center', padding: 16, marginTop: 25 }}>
                                <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>Continue</Text>

                            </TouchableOpacity>

                            <View>
                                <Text style={{ fontSize: 14, fontWeight: '500', color: 'black', alignSelf: 'center', marginTop: 25 }}>Already have an account? <Text onPress={() => { navigation.navigate('SignIn') }} style={{ color: '#1C64F2' }}>Signin</Text></Text>
                            </View>
                        </View>



                    </View>
                )}
            </SafeAreaView>
        </TouchableWithoutFeedback>


    )
}

export default Welcome