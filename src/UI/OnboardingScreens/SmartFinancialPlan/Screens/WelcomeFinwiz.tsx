import { View, Text, StatusBar, Image } from 'react-native'
import React, { useState } from 'react'
import StepsComp from '../Components/StepsComp'

const WelcomeFinwiz = () => {
    const [steps, setsteps] = useState([
        {
            step:'Step 1',
            title:'Sync Your Accounts',
            description:'Lörem ipsum dek presk, don sek, press. Onisade geoskap. ',
            selected:false,
            color:'#9747FF',
            imgsrc:require('../../../../assets/Images/account.png')
        },
        {
            step:'Step 2',
            title:'Setup Your Budget Plan ',
            description:'Lörem ipsum dek presk, don sek, press. Onisade geoskap. ',
            selected:false,
            color:'#21014E',
            imgsrc:require('../../../../assets/Images/logo.png')
        },
    ])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar backgroundColor={'#21014E'} barStyle={'light-content'}></StatusBar>
            <View style={{ flex: 0.3, backgroundColor: '#21014E', borderBottomLeftRadius: 24, borderBottomRightRadius: 24, }}>
                <View style={{ padding: 16, paddingVertical: 32, flex: 1, justifyContent: 'space-between', width: '70%' }}>
                    <Image style={{ width: 31, height: 31, }} source={require('../../../../assets/Images/logo.png')} />
                    <View>
                        <Text style={{ fontSize: 24, fontWeight: '600', color: '#9747FF' }}>Welcome to Finwiz</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#FFFFFF', opacity: 0.7, marginTop: 4 }}>Lets get you set up, complete your profile and get started.</Text></View>

                </View>
                <View style={{ position: 'absolute', right: -40, top: 32 }}>
                    <Image style={{ width: 130, height: 130, opacity: 0.2 }} source={require('../../../../assets/Images/logo.png')} />
                </View>
            </View>
            <View style={{flex:0.7,borderWidth:1,padding:16}}>
            {steps.map((item,index)=><StepsComp/>)}
            </View>

            



        </View>
    )
}

export default WelcomeFinwiz