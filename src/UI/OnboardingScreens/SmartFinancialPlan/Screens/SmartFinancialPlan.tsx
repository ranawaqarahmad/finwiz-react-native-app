import { View, Text, TouchableOpacity, Image, StatusBar, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import PlanComp from '../Components/PlanComp'
import { useDispatch, useSelector } from 'react-redux'
import { setQuestions, setWelcomeNavStatus, setstack } from '../../../../redux/AppReducer'
import { useRoute } from '@react-navigation/native'
import FinancialPlanStack from '../../../../navigation/OnboardingStacks/FinancialPlanStack'
import SmartFinancialPlanScreen from './SmartFinancialPlanScreen'
import { SafeAreaView } from 'react-native-safe-area-context'

const SmartFinancialPlan = ({ navigation }) => {


    const selector = useSelector(state => state.AppReducer);
    const financialPlanScreen = selector.financialPlanScreen;
    console.log('Financial Plan Screen number:', financialPlanScreen);
    const [loader, setLoader] = useState(false)


    const [number, setnumber] = useState('')
    const [check, setCheck] = useState(false)
    const authToken = selector.authToken;
    const [plan, setPlan] = useState([
        {
            title: 'Basic Information',
            desctiption: 'Your name, DOB, Address and bit about your employment',
            selected: financialPlanScreen === 0 ? true : false,
            color: '#7C56FE',
            number: '1'

        },
        {
            title: 'Financial Information',
            desctiption: 'YoYour income, debts and assets informationur income, debts and assets information',
            selected: financialPlanScreen === 1 ? true : false,
            color: '#00F4F4',
            number: '2'

        },
        {
            title: 'Identity Verification',
            desctiption: 'Verify your identity',
            selected: financialPlanScreen === 2 ? true : false,
            color: '#7C56FE',
            number: '3'


        },
    ])

    const dispatch = useDispatch()


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
                    dispatch(setstack('FinancialPlanStack'))

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
            <SafeAreaView style={{flex:1}}>
            {loader ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={'large'} color={'#7C56FE'}></ActivityIndicator>
                </View> :
                <View style={{ width: '100%', height: '100%', paddingHorizontal: 16, backgroundColor: 'white', justifyContent: 'space-between', }}>

                    <StatusBar backgroundColor='white' barStyle={'dark-content'}></StatusBar>

                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Image style={{ width: 24, height: 24, }} source={require('../../../../assets/Images/crossblack.png')} />
                    </TouchableOpacity>

                    <View>

                        <View style={{ borderRadius: 9, backgroundColor: '#F9FAFB', padding: 10, width: 90, height: 90, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                            <Image style={{ width: 50, height: 50 }} source={require('../../../../assets/Images/logo.png')} />
                        </View>

                        <View style={{ marginTop: 24, alignItems: 'center' }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>Smart Financial Plan</Text>
                            <Text style={{ fontSize: 16, fontWeight: 'normal', color: '#4B5563', marginTop: 4 }}>we will need some information to get started</Text>
                        </View>
                    </View>

                    <View>
                        {
                            plan.map((item, index) => <PlanComp data={item} index={index} />)
                        }
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000050' }}>By proceeding you consent to all the information is correct</Text>
                        <View style={{ flexDirection: 'row', marginTop: 14, alignItems: 'center' }}>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => { setCheck(!check) }} style={{ backgroundColor: check ? '#7C56FE' : '#DBDBDB', width: 20, height: 20, borderRadius: 4, marginEnd: 12, alignItems: 'center', justifyContent: 'center' }}>
                                {check && (<Image style={{ width: 14, height: 14 }} source={require('../../../../assets/Images/check.png')} />)}
                            </TouchableOpacity>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#000000' }}>I consent to above</Text>

                        </View>

                    </View>



                    <View style={{  flexDirection: 'row' }}>


                        <TouchableOpacity
                        disabled={!check}
                        
                            onPress={() => {
                                
                                financialPlanScreen === 0 && (dispatch(setstack('BasicInfoStack')))
                                financialPlanScreen === 1 && (
                                    handleApiCall()

                                )

                                financialPlanScreen === 2 && (dispatch(setstack('AuthNav')))



                            }}

                            style={{ flex: 1, backgroundColor: check ? 'black' : '#00000020', alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 4 }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: 'white', }}>Continue</Text>

                        </TouchableOpacity>


                    </View>



                </View >}
                </SafeAreaView>
        </View>

    )
}

export default SmartFinancialPlan