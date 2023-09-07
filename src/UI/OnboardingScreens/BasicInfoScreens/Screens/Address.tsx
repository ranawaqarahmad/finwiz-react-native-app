import { View, Text, TouchableOpacity, Image, TextInput, StatusBar, TouchableWithoutFeedback, ActivityIndicator, Keyboard } from 'react-native'
import React, { useState } from 'react'
import TextInputCom from '../Components/TextInputCom'
import RoundButtonComp from '../Components/RoundButtonComp'
import { useSelector } from 'react-redux'

const Address = ({ navigation }) => {

    const [address, setAddress] = useState('')
    const [loader, setLoader] = useState(false)
    const selector = useSelector(state => state.AppReducer);
    const authToken = selector.authToken;

    const navigate = () => {
        handleApiCall()
    }
    const goBack = () => {
        navigation.goBack()
    }



    const handleApiCall = async () => {

        setLoader(true)
        fetch('https://api-finwiz.softsquare.io/api/user/update-user', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                address: address,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status) {
                    console.log('Address Updated');
                    navigation.navigate('EmployementStatus');
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






        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }} style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>

            {loader ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'white' }}>
                <ActivityIndicator size={'large'} color={'#7C56FE'}></ActivityIndicator>
            </View> :
                <View style={{ width: '100%', height: '100%', padding: 16, backgroundColor: 'white', justifyContent: 'space-between' }}>
                    <StatusBar backgroundColor='white' barStyle={'dark-content'}></StatusBar>

                    <View>
                        <TouchableOpacity
                            onPress={goBack}>
                            <Image style={{ width: 24, height: 24, }} source={require('../../../../assets/Images/crossblack.png')} />

                        </TouchableOpacity>

                        <View style={{ marginTop: 29 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'normal', color: 'black', }}>Basic Information</Text>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 22 }}>What's Your Home Address</Text>
                            <Text style={{ fontSize: 16, fontWeight: 'normal', color: '#4B5563', marginTop: 7 }}>Start typing to find your address</Text>


                        </View>

                        <View style={{ marginTop: 20 }}>
                            <TextInputCom startImageSrc={require('../../../../assets/Images/search.png')} placeholder={'Search'} text={address} setText={setAddress} />
                        </View>


                    </View>







                    <View style={{ marginBottom: 16 }}>



                        <View style={{ marginBottom: 16 }}>

                            <RoundButtonComp onpress={navigate} />


                        </View>


                    </View>



                </View>}</TouchableWithoutFeedback>
    )
}

export default Address