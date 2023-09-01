import { View, Text, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import TextInputCom from '../Components/TextInputCom'
import RoundButtonComp from '../Components/RoundButtonComp'

const Dob = ({ navigation }) => {

    const [firstName, setFirstName] = useState('')
    const [secondName, setSecondName] = useState('')


    const navigate = () => {
        navigation.navigate('Address');
    }

    return (
        <View style={{ width: '100%', height: '100%', padding: 16, backgroundColor: 'white', justifyContent: 'space-between' }}>

            <View>
                <TouchableOpacity>
                    <Image style={{ width: 24, height: 24, }} source={require('../../../assets/Images/crossblack.png')} />

                </TouchableOpacity>

                <View style={{ marginTop: 29 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'normal', color: '#4B5563', }}>Basic Information</Text>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 22 }}>What's Your Date of Birth</Text>

                </View>

                <View style={{ marginTop: 20 }}>
                    <TextInputCom startImageSrc={require('../../../assets/Images/calendar.png')} placeholder={'Date of Birth'} text={firstName} setText={setFirstName} />
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

export default Dob