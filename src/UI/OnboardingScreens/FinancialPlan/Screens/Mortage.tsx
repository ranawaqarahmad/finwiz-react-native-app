import { View, Text, StatusBar, TouchableOpacity, Image, TextInput, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import RoundButtonComp from '../../BasicInfoScreens/Components/RoundButtonComp'
import SelectionComponent from '../Components/SelectionComponent'
import TextInputCom from '../../BasicInfoScreens/Components/TextInputCom'
import { useDispatch, useSelector } from 'react-redux'
import { setBasicinfoCompleted, setFinancialInfoCompleted, setFinancialPlanScreen, setWelcomeNavStatus, setstack } from '../../../../redux/AppReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'

const Mortage = ({ navigation }) => {

    const isFocused = useIsFocused();

    useEffect(() => {
         if(isFocused){
             setLoader(false)
 
         }
     
 
         return () => {
           
         };
       }, [isFocused]);
    const dispatch = useDispatch()
    const selector = useSelector(state => state.AppReducer);
    const questions = selector.questions;
    const userId = selector.userId;
    const [loader, setLoader] = useState(false)
    const [answer, setanswer] = useState('No')

    const authToken = selector.authToken;
    const [amount, setAmount] = useState('')
 

    const navigate = () => {
        handleApiCall()
    }
    const goBack = () => {
        navigation.goBack()
    }


    const handleApiCall = async () => {

        console.log('Answer Is this', amount);
        console.log('User Id', userId);


        setLoader(true)
        fetch('https://api-finwiz.softsquare.io/api/user/add-user-question', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id": userId,
                "question_id": 6,
                "answer": amount
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status) {
                    console.log('Question Answered');
                  


                    dispatch(setFinancialInfoCompleted(true))
                    storeFinancialPlan('true')
                    dispatch(setFinancialPlanScreen(2))
                    dispatch(setstack('WelcomeNav'))
                    dispatch(setWelcomeNavStatus(1))


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

    const storeFinancialPlan = async (token: string) => {
        try {
            await AsyncStorage.setItem('financialPlanCompleted', token);
            console.log('Financial Info status Stored successfully.');
        } catch (error) {
            console.error('Error storing data: ', error);
        }
    };


    return (
        <View style={{ width: '100%', height: '100%', paddingHorizontal: 16, backgroundColor: 'white', justifyContent: 'space-between' }}>

            <StatusBar backgroundColor={'#F9FAFB'} barStyle={'dark-content'}></StatusBar>
            <View>
                <TouchableOpacity
                    onPress={goBack}>
                    <Image style={{ width: 24, height: 24, }} source={require('../../../../assets/Images/backarrow.png')} />

                </TouchableOpacity>

                <View style={{ marginTop: 29 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'normal', color: 'black', }}>Financial Information</Text>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 22 }}>What’s the mortgage amount on property you own?</Text>


                </View>

                <View style={{ marginTop: 29 }}>
                    <TextInputCom keyboardType={'numeric'} startImageSrc={require('../../../../assets/Images/dollar.png')} placeholder={'enter amount'} text={amount} setText={setAmount} />
                </View>


            </View>







            <View style={{ marginBottom: 16 }}>



                <View style={{ marginBottom: 16 }}>

                    <RoundButtonComp onpress={navigate} />


                </View>


            </View>


        </View>
    )
}




export default Mortage