import { SafeAreaView,View, Text, StatusBar, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import StepsComp from '../Components/StepsComp'
import { useDispatch, useSelector } from 'react-redux'
import { setAnswers, setQuestions, setstack } from '../../../../redux/AppReducer'

const SmartFinancialPlanScreen = ({ navigation }) => {

    const [loader,setLoader]=useState(false)
    const selector = useSelector(state => state.AppReducer);
    const authToken = selector.authToken;
    const dispatch=useDispatch()

    const handleApiCall = async () => {

        setLoader(true)
        fetch('https://api-finwiz.softsquare.io/api/user/questions', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },

        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status) {
                    console.log(data);
                    dispatch(setQuestions(data.data))
                    navigation.navigate('FinancialParentScreen')

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

    const getUserAnsers = async () => {

        setLoader(true)
        fetch('https://api-finwiz.softsquare.io/api/user/get-user-question', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },

        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status) {
                    console.log('Answers are this',data.data.user_question_answer);
                    dispatch(setAnswers(data.data.user_question_answer))

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
        <View style={{ flex: 1, backgroundColor: 'white' }}>
             {loader ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'white' }}>
                <ActivityIndicator size={'large'} color={'#7C56FE'}></ActivityIndicator>
            </View> :
            <SafeAreaView style={{flex:1}}>
            <StatusBar backgroundColor={'#21014E'} barStyle={'light-content'}></StatusBar>
            <View style={{ flex: 0.5, backgroundColor: '#21014E', borderBottomLeftRadius: 24, borderBottomRightRadius: 24, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ paddingVertical: 32, justifyContent: 'space-between', }}>
                    <Image style={{ width: 150, height: 150, }} source={require('../../../../assets/Images/logo.png')} />

                </View>

            </View>
            <View style={{ flex: 0.5, paddingHorizontal: 16, justifyContent: 'space-between' }}>


                <View style={{ alignItems: 'center', justifyContent: 'center',marginTop:16}}>
                    <View>
                        <Text style={{ fontSize: 24, fontWeight: '600', color: 'black', textAlign: 'center' }}>Smart Financial Plan</Text>
                        <Text style={{ fontSize: 14, fontWeight: '400', color: '#4B5563', opacity: 0.7, marginTop: 4, textAlign: 'center' }}>To create a financial plan that truly reflects your goals and aspirations, we'd love to know a bit more about you. Your answers will help us customize a plan that aligns with your unique financial journey. Let's get started!"</Text>
                    </View>
                </View>
                <View style={{ marginBottom: 16, flexDirection: 'row' }}>


                    <TouchableOpacity
                        onPress={() => { 
                            getUserAnsers()
                            handleApiCall()
                         }}

                        style={{ flex: 1, backgroundColor: '#9747FF', alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 4 }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: 'white', }}>Get Started</Text>

                    </TouchableOpacity>


                </View>


            </View>




            </SafeAreaView>}
        </View>
    )
}

export default SmartFinancialPlanScreen

