import { View, Text, TouchableOpacity, Image, StatusBar, TextInput } from 'react-native'
import React, { useState } from 'react'
import PlanComp from '../Components/PlanComp'

const SmartFinancialPlan = ({ navigation }) => {
    const [number, setnumber] = useState('')
    const [check, setCheck] = useState(false)
    const [plan, setPlan] = useState([
        {
            title: 'Basic Information',
            desctiption: 'Your name, DOB, Address and bit about your employment',
            selected: true,
            color: '#7C56FE',
            number: '1'

        },
        {
            title: 'Financial Information',
            desctiption: 'YoYour income, debts and assets informationur income, debts and assets information',
            selected: false,
            color: '#00F4F4',
            number: '2'

        },
        {
            title: 'Identity Verification',
            desctiption: 'Verify your identity',
            selected: false,
            color: '#7C56FE',
            number: '3'


        },
    ])

    return (
        <View style={{ width: '100%', height: '100%', padding: 16, backgroundColor: 'white', justifyContent: 'space-between', }}>

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
                    plan.map((item,index) => <PlanComp data={item} index={index} />)
                }
            </View>

            <View>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#00000050' }}>By proceeding you consent to all the information is correct</Text>
                <View style={{ flexDirection: 'row', marginTop: 14, alignItems: 'center' }}>
                    <TouchableOpacity activeOpacity={0.9} onPress={()=>{setCheck(!check)}} style={{ backgroundColor:check?'#7C56FE':'#DBDBDB', width: 20, height: 20, borderRadius: 4, marginEnd: 12, alignItems: 'center', justifyContent: 'center' }}>
                        {check && (<Image style={{ width: 14, height: 14 }} source={require('../../../../assets/Images/check.png')} />)}
                    </TouchableOpacity>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#000000' }}>I consent to above</Text>

                </View>

            </View>



            <View style={{ marginBottom: 16,flexDirection:'row' }}>


                <TouchableOpacity
                    onPress={() => { navigation.navigate('WelcomeFinwiz') }}
                    
                    style={{flex:1, backgroundColor:check?'black':'#00000020', alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', padding: 16,borderRadius:4  }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: 'white', }}>Continue</Text>

                </TouchableOpacity>


            </View>



        </View>
    )
}

export default SmartFinancialPlan