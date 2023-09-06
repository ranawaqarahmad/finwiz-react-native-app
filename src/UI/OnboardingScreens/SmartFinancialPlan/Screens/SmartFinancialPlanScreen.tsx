import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import StepsComp from '../Components/StepsComp'
import { useDispatch } from 'react-redux'
import { setstack } from '../../../../redux/AppReducer'

const SmartFinancialPlanScreen = ({ navigation }) => {
    const [steps, setsteps] = useState([
        {
            step: 'Step 1',
            title: 'Sync Your Accounts',
            description: 'Lörem ipsum dek presk, don sek, press. Onisade geoskap. ',
            selected: false,
            color: '#9747FF',
            imgsrc: require('../../../../assets/Images/account.png')
        },
        {
            step: 'Step 2',
            title: 'Setup Your Budget Plan ',
            description: 'Lörem ipsum dek presk, don sek, press. Onisade geoskap. ',
            selected: false,
            color: '#21014E',
            imgsrc: require('../../../../assets/Images/logo.png')
        },
    ])

    const dispatch=useDispatch()
    const navigate = () => {
        navigation.navigate('SmartFinancialPlanScreen')
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar backgroundColor={'#21014E'} barStyle={'light-content'}></StatusBar>
            <View style={{ flex: 0.5, backgroundColor: '#21014E', borderBottomLeftRadius: 24, borderBottomRightRadius: 24, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ paddingVertical: 32, justifyContent: 'space-between', }}>
                    <Image style={{ width: 150, height: 150, }} source={require('../../../../assets/Images/logo.png')} />

                </View>

            </View>
            <View style={{ flex: 0.5, padding: 16, justifyContent: 'space-between' }}>


                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View>
                        <Text style={{ fontSize: 24, fontWeight: '600', color: 'black', textAlign: 'center' }}>Welcome to Finwiz</Text>
                        <Text style={{ fontSize: 14, fontWeight: '400', color: '#4B5563', opacity: 0.7, marginTop: 4, textAlign: 'center' }}>To create a financial plan that truly reflects your goals and aspirations, we'd love to know a bit more about you. Your answers will help us customize a plan that aligns with your unique financial journey. Let's get started!"</Text>
                    </View>
                </View>
                <View style={{ marginBottom: 16, flexDirection: 'row' }}>


                    <TouchableOpacity
                        onPress={() => { 
                            dispatch(setstack('WelcomeNav'))
                         }}

                        style={{ flex: 1, backgroundColor: '#9747FF', alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 4 }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: 'white', }}>Continue</Text>

                    </TouchableOpacity>


                </View>


            </View>





        </View>
    )
}

export default SmartFinancialPlanScreen

