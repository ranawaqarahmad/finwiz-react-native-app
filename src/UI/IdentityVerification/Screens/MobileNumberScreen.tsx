import { View, Text, Image, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import React, { useState } from 'react'

const MobileNumberScreen = ({navigation}) => {

    const [number, setnumber] = useState('')
  
    return (
        <View style={{ width: '100%', height: '100%', padding: 16, backgroundColor: 'white', justifyContent: 'space-between' }}>

            <StatusBar backgroundColor='white'></StatusBar>
            <View>
            <TouchableOpacity onPress={()=>{navigation.goBack()}}>
          <Image style={{ width: 24, height: 24, }} source={require('../../../assets/Images/backarrow.png')} />

        </TouchableOpacity>

                <View style={{ marginTop: 80 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>Your Mobile Number</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'normal', color: '#4B5563', marginTop: 4 }}>A verification code will be sent to your Phone number</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', marginTop: 35, backgroundColor: '#F9FAFB', borderRadius: 8, marginBottom: 9, paddingHorizontal: 10 }}>
                    <Image style={{ width: 30, height: 20, }} source={require('../../../assets/Images/usa.png')} />
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#6B7280', marginHorizontal: 5 }}>+1</Text>
                    <TextInput value={number} onChangeText={(text)=>{setnumber(text)}} maxLength={9} keyboardType='numeric' placeholder='' style={{ fontSize: 16, fontWeight: 'normal', color: '#6B7280', marginTop: 2, flex:1 }}></TextInput>
                    <TouchableOpacity onPress={()=>{setnumber('')}}><Image style={{ width: 25, height: 25, }} source={require('../../../assets/Images/cross.png')} />
                    </TouchableOpacity>

                </View>


            </View>



            <View style={{ marginBottom: 16 }}>


                <TouchableOpacity
                 onPress={()=>{navigation.navigate('OTPVerification')}}
                 style={{ width: 60, height: 60, backgroundColor: 'black', alignSelf: 'flex-end', borderRadius: 400, alignItems: 'center', justifyContent: 'center', padding: 16, marginTop: 25, }}>
                    <Image style={{ width: 24, height: 24 }} source={require('../../../assets/Images/whitearrow.png')} />

                </TouchableOpacity>


            </View>



        </View>
    )
}

export default MobileNumberScreen