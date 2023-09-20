import { View, Text,TouchableWithoutFeedback, TouchableOpacity, Image, TextInput, StatusBar, ActivityIndicator, Keyboard, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import TextInputCom from '../Components/TextInputCom'
import RoundButtonComp from '../Components/RoundButtonComp'
import { useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'

const Name = ({ navigation }) => {
    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused){
            setLoader(false)

        }
    

        return () => {
          
        };
      }, [isFocused]);
    const [firstName, setFirstName] = useState('Tamoor')
    const [secondName, setSecondName] = useState('Malik')
    const [loader, setLoader] = useState(false)
    const selector = useSelector(state => state.AppReducer);
    const authToken = selector.authToken;

    const navigate = () => {
        console.log(authToken);

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
                name: firstName + ' ' + secondName,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status) {
                    console.log('Name Updated');
                    navigation.navigate('Dob');
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


        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}} style={{ backgroundColor: 'white',flex:1 ,justifyContent: 'center',
        alignItems: 'center', }}>

            {loader ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'white' }}>
                <ActivityIndicator size={'large'} color={'#7C56FE'}></ActivityIndicator>
            </View>:

<View style={{ width: '100%',flex:1,paddingHorizontal: 16, backgroundColor: 'white', justifyContent: 'space-between' }} onPress={()=>{Keyboard.dismiss()}} >
           

                <View style={{}}>
                    <TouchableOpacity style={{ width: 32, height: 32,alignItems:'center',justifyContent:'center' }}>
                        <Image style={{ width: 24, height: 24, }} source={require('../../../../assets/Images/crossblack.png')} />

                    </TouchableOpacity>

                    <View style={{ marginTop: 29 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'normal', color: '#4B5563', }}>Basic Information</Text>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 22 }}>What's Your Name</Text>
                    </View>

                    <View style={{ marginTop: 35 }}>
                        <TextInputCom placeholder={'Legal First Name'} text={firstName} setText={setFirstName} startImageSrc={null} />
                        <TextInputCom placeholder={'Legal Second Name'} text={secondName} setText={setSecondName} startImageSrc={null} />
                    </View>


                </View>







                <View style={{ marginBottom: 16}}>



                    <View style={{ marginBottom: 16 }}>

                        <RoundButtonComp onpress={navigate} />


                    </View>


                </View>



           </View>
            }
        </TouchableWithoutFeedback>

    )
}

export default Name