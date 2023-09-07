import { View, Text, Image, TextInput, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken, setState, setTokenSaved, setUserId, setstack } from '../../../../redux/AppReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../../../../redux/store';

const SignIn = ({ navigation }) => {

    const [password, setPassword] = useState('Profe$$ional789')
    const [email, setEmail] = useState('tamoormalik088@gmail.com')
    const [loader, setLoader] = useState(false)
    const selector = useSelector(state => state.AppReducer);
    const tokenSaved = selector.tokenSaved;


    if(tokenSaved){
        console.log(tokenSaved);
        console.log('NAVIGATE DIRECTLY');
        
    }
    const handleSignIn = async () => {

        setLoader(true)
        fetch('https://api-finwiz.softsquare.io/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status === true) {
                    
                    console.log('TOKEN SAVED',data.token);
                    storeToken(data.token)
                    storeId(data.data.id)
                   

                    navigation.navigate('MobileNumberScreen',{token:data.token,id:data.data.id})

                    


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

    const storeToken = async (token: string) => {
        
        try {
            await AsyncStorage.setItem('token', token);
            console.log('Token stored successfully.');
        } catch (error) {
            console.error('Error storing data: ', error);
        }
    };

    const storeId = async (id) => {
        try {
            await AsyncStorage.setItem('userId', id.toString());
            console.log('User ID stored successfully.');
        } catch (error) {
            console.error('Error storing data: ', error);
        }
      
    };

    const dispatch = useDispatch()
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>

            {loader ? (
                <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} size={'large'} color={'#7C56FE'}></ActivityIndicator>
                </View>) : (
                <View style={{ width: '100%', height: '100%', padding: 16, backgroundColor: 'white', justifyContent: 'space-between' }}>

                    <StatusBar backgroundColor='white'></StatusBar>
                    <View>
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <Image style={{ width: 24, height: 24, }} source={require('../../../../assets/Images/backarrow.png')} />

                        </TouchableOpacity>

                        <View style={{ marginTop: 29 }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>Welcome Back</Text>
                            <Text style={{ fontSize: 16, fontWeight: 'normal', color: '#4B5563', marginTop: 4 }}>Enter your credentials to continue</Text>
                        </View>

                        <View style={{ marginTop: 35 }}>
                            <TextInput placeholder='Email' style={{ borderWidth: 1, borderColor: '#E5E7EB', fontSize: 16, fontWeight: 'normal', color: 'black', backgroundColor: '#F9FAFB', borderRadius: 8, marginBottom: 9, padding: 10 }}></TextInput>
                            <TextInput
                                onChangeText={(text) => { setPassword(text) }}
                                secureTextEntry={true}
                                placeholder='Password' style={{ borderWidth: 1, borderColor: '#E5E7EB', fontSize: 16, fontWeight: 'normal', color: 'black', backgroundColor: '#F9FAFB', borderRadius: 8, marginTop: 9, padding: 10 }}></TextInput>
                        </View>

                        {/* <View style={{ marginTop: 25 }}>
          <Text style={{ fontSize: 14, fontWeight: '400', color: '#6B7280' }}>Password Strength</Text>
          {pass === 'strong' && (
              <View style={{ flexDirection: 'row', marginTop: 12 }}>
  
                  <View style={{ height: 3, flex: 1, backgroundColor: '#31EE66' }}></View>
                  <View style={{ height: 3, flex: 1, backgroundColor: '#31EE66', marginHorizontal: 4 }}></View>
                  <View style={{ height: 3, flex: 1, backgroundColor: '#31EE66' }}></View>
              </View>
          )}
          {pass === 'weak' && (
              <View style={{ flexDirection: 'row', marginTop: 12 }}>
  
                  <View style={{ height: 3, flex: 1, backgroundColor: '#E60E0E' }}></View>
                  <View style={{ height: 3, flex: 1, backgroundColor: '#F9FAFB', marginHorizontal: 4 }}></View>
                  <View style={{ height: 3, flex: 1, backgroundColor: '#F9FAFB' }}></View>
              </View>
          )}
          {pass === 'medium' && (
              <View style={{ flexDirection: 'row', marginTop: 12 }}>
  
                  <View style={{ height: 3, flex: 1, backgroundColor: '#31EE66' }}></View>
                  <View style={{ height: 3, flex: 1, backgroundColor: '#E60E0E', marginHorizontal: 4 }}></View>
                  <View style={{ height: 3, flex: 1, backgroundColor: '#F9FAFB' }}></View>
              </View>
          )}
          {pass === 'default' && (
              <View style={{ flexDirection: 'row', marginTop: 12 }}>
  
                  <View style={{ height: 3, flex: 1, backgroundColor: '#F9FAFB' }}></View>
                  <View style={{ height: 3, flex: 1, backgroundColor: '#F9FAFB', marginHorizontal: 4 }}></View>
                  <View style={{ height: 3, flex: 1, backgroundColor: '#F9FAFB' }}></View>
              </View>
          )}
  
          <Text style={{ fontSize: 14, fontWeight: '400', color: '#6B7280', marginTop: 18 }}>Password must be a minimum of 8 characters, include one letter one number and one symbol</Text>
  
      </View> */}
                    </View>







                    <View style={{ marginBottom: 16 }}>


                        <TouchableOpacity
                            onPress={() => { handleSignIn() }}
                            style={{ backgroundColor: '#7C56FE', borderRadius: 4, alignItems: 'center', justifyContent: 'center', padding: 16, marginTop: 25 }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>Continue</Text>
                        </TouchableOpacity>

                        <View>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: 'black', alignSelf: 'center', marginTop: 25 }}>Don't have an account? <Text onPress={() => { navigation.navigate('Welcome') }} style={{ color: '#1C64F2' }}>Sign Up</Text></Text>
                        </View>
                    </View>



                </View>
            )}



        </View>

    )
}

export default SignIn