import { TouchableWithoutFeedback, View, Text, Image, TextInput, TouchableOpacity, StatusBar, ActivityIndicator, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setAccountId, setAuthToken, setBasicinfoCompleted, setOTPScreen, setPhoneVerified, setSetupBudgetPlanDone, setState, setSyncAccountDone, setTokenSaved, setUserId, setstack } from '../../../../redux/AppReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../../../../redux/store';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = ({ navigation }) => {
    const selector = useSelector(state => state.AppReducer);
    const [password, setPassword] = useState('11221122')
    const [email, setEmail] = useState('izhan@gmail.com')
    const [loader, setLoader] = useState(false)
    const basicInfoCompleted = selector.basicInfoCompleted;
    const phoneVerified = selector.phoneVerified;
    const [isErrorVisible, setIsErrorVisible] = useState(false)
    const [errorText, setErrorText] = useState('')



    const handleSignIn = async () => {

        if (!email || !password) {
            setErrorText('Email or Password is empty')
            setIsErrorVisible(true)
            return
        }

        setLoader(true)
        fetch('https://api-finwiz.softsquare.io/api/login', {
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
                console.log('SIGN IN IS ', data.status);
                if (data.status === true) {

                    authUser(data.token, data.data.id)
                    checkUserQuestionAnswers(data.token)









                } else {
                    console.log('MESSAGE', data);
                    setErrorText(data.message)
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



    const checkUserQuestionAnswers = async (authToken) => {

        console.log('AuthToken is ', authToken);

        fetch('https://api-finwiz.softsquare.io/api/user/get-user-question', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },

        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);


                if (data.status == 'true') {
                    console.log('ALL ANSWERS OF QUESTIONS', data);
                    console.log('ALL ANSWERS OF QUESTIONS', data.data.user_question_answer_count);
                    console.log('ALL ANSWERS OF QUESTIONS', data.data.total_questions);

                    if (data.data.user_question_answer_count == data.data.total_questions) {
                        console.log('QUESTIONS ANSWERED TRUE');

                        dispatch(setSetupBudgetPlanDone(true))
                    } else {
                        dispatch(setSetupBudgetPlanDone(false))
                        console.log('QUESTIONS ANSWERED False');


                    }
                }




            })
            .catch((error) => {
                console.log(error);
            });



    };


    const authUser = async (authToken, authId) => {


        console.log('AUTH USER RUNS=======================');



        // console.log('auth token is', authToken);


        fetch(`https://api-finwiz.softsquare.io/api/user/auth-user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },

        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                if (data.status == 'true') {
                    if (data.data[0].name) {
                        dispatch(setBasicinfoCompleted(true))
                        console.log('BASIC INFO IS TRUE', data.data[0].name);

                    }
                    if (data.data[0].verified == 1) {
                        dispatch(setPhoneVerified(true))
                        dispatch(setOTPScreen(true))
                        console.log('Phone Verified IS TRUE', data.data[0].verified);

                    }
                    if (data.data[0].plaid_access_token) {
                        dispatch(setSyncAccountDone(true))
                        console.log('PLAID Verified IS TRUE', data.data[0].plaid_access_token);

                    }
                    console.log('AUTH IS  ', data);


                    if (data.data[0]?.auth[0]?.account_id) {
                        console.log('Account ID is', data.data[0].auth[0].account_id);

                        dispatch(setAccountId(data.data[0].auth[0].account_id))

                    }

                    console.log('TOKEN SAVED', authToken);
                    storeToken(authToken)
                    storeId(authId)
                    dispatch(setAuthToken(authToken))
                    dispatch(setUserId(authId))




                    console.log('selector.authToken', selector.authToken);
                    console.log('selector.basicInfoCompleted', selector.basicInfoCompleted);
                    console.log('selector.phoneVerified', selector.phoneVerified);
                    console.log('selector.syncAccountDone ', selector.syncAccountDone);
                    console.log('selector.accountId ', selector.accountId);
                    console.log('selector.setupBudgetPlanDone ', selector.setupBudgetPlanDone);

                    setTimeout(() => {
                        dispatch(setTokenSaved(true))
                        console.log('TOKEN SAVED TRUE RUN');


                        // console.log('selector.authToken', selector.authToken);
                        // console.log('selector.basicInfoCompleted', selector.basicInfoCompleted);
                        // console.log('selector.phoneVerified', selector.phoneVerified);
                        // console.log('selector.syncAccountDone ', selector.syncAccountDone);
                        // console.log('selector.accountId ', selector.accountId);
                        // console.log('selector.setupBudgetPlanDone ', selector.setupBudgetPlanDone);

                    }, 4000);

                }




            })
            .catch((error) => {
                console.log(error);
                // setLoader(false)
            });



    };


    const storeToken = async (token: string) => {

        try {
            await AsyncStorage.setItem('token', token);
            console.log('INSIDE SIGN IN', 'Token stored successfully.');
        } catch (error) {
            console.error('Error storing data: ', error);
        }
    };

    const storeId = async (id) => {
        try {
            await AsyncStorage.setItem('userId', id.toString());
            console.log('User ID stored successfully.');
        } catch (error) {
            console.error('Error storing data: ', error);
        }

    };

    const dispatch = useDispatch()
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }} style={{ backgroundColor: 'white', flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>

                {loader ? (
                    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} size={'large'} color={'#7C56FE'}></ActivityIndicator>
                    </View>) : (
                    <View style={{ width: '100%', height: '100%', padding: 16, backgroundColor: 'white', justifyContent: 'space-between' }}>

                        <StatusBar backgroundColor='white' barStyle={'dark-content'}></StatusBar>
                        <View>
                            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                <Image style={{ width: 24, height: 24, }} source={require('../../../../assets/Images/backarrow.png')} />

                            </TouchableOpacity>

                            <View style={{ marginTop: 29 }}>
                                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>Welcome Back</Text>
                                <Text style={{ fontSize: 16, fontWeight: 'normal', color: '#4B5563', marginTop: 4 }}>Enter your credentials to continue</Text>
                            </View>

                            <View style={{ marginTop: 35 }}>
                                <TextInput value={email} onChangeText={(text) => {
                                    setErrorText('')
                                    setIsErrorVisible(false)
                                    setEmail(text)
                                }}
                                    placeholder='Email' placeholderTextColor={'grey'} style={{ borderWidth: 1, borderColor: '#E5E7EB', fontSize: 16, fontWeight: 'normal', color: 'black', backgroundColor: '#F9FAFB', borderRadius: 8, marginBottom: 9, padding: 10 }}></TextInput>
                                <TextInput value={password}
                                    onChangeText={(text) => {
                                        setErrorText('')
                                        setIsErrorVisible(false)
                                        setPassword(text)
                                    }}
                                    secureTextEntry={true}
                                    placeholderTextColor={'grey'}
                                    placeholder='Password' style={{ borderWidth: 1, borderColor: '#E5E7EB', fontSize: 16, fontWeight: 'normal', color: 'black', backgroundColor: '#F9FAFB', borderRadius: 8, marginTop: 9, padding: 10 }}></TextInput>
                            </View>


                            {isErrorVisible && (<Text style={{ color: 'red', fontWeight: '400', marginTop: 8 }}>{errorText}</Text>)}



                        </View>







                        <View style={{ marginBottom: 16 }}>


                            <TouchableOpacity
                                onPress={() => { handleSignIn() }}
                                style={{ backgroundColor: '#7C56FE', borderRadius: 4, alignItems: 'center', justifyContent: 'center', padding: 16, marginTop: 25 }}>
                                <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>Continue</Text>
                            </TouchableOpacity>

                            <View>
                                <Text style={{ fontSize: 14, fontWeight: '500', color: 'black', alignSelf: 'center', marginTop: 25 }}>Don't have an account? <Text onPress={() => { navigation.navigate('Welcome') }} style={{ color: '#1C64F2' }}>Sign Up</Text></Text>
                            </View>
                        </View>



                    </View>
                )}


            </SafeAreaView>
        </TouchableWithoutFeedback>

    )
}

export default SignIn