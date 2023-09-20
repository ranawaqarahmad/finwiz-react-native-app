import { View, Text, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import FaceId from '../../UI/OnboardingScreens/IdentityVerification/Screens/FaceId';
import EnableNotifications from '../../UI/OnboardingScreens/IdentityVerification/Screens/EnableNotifications';

import { useDispatch, useSelector } from 'react-redux';


const Stack = createStackNavigator();

const AuthNav = () => {

    const selector = useSelector(state => state.AppReducer);
    const phoneVerified = selector.phoneVerified;
    const faceIdVerified = selector.faceIdVerified;
    const notificationEnabled = selector.notificationEnabled;


    const dispatch = useDispatch()
    console.log('PHONE VERIFIED IS THIS', phoneVerified);



    const LoaderScreen=()=>{

       return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
         <ActivityIndicator size={'large'}></ActivityIndicator>
       </View>
    }



    return (
        <View style={{ flex: 1,backgroundColor:'white',paddingVertical:16 }}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'}></StatusBar>
            <Stack.Navigator initialRouteName={faceIdVerified ? (notificationEnabled ? ("") : "EnableNotifications") : ("FaceId")} screenOptions={{ headerShown: false }}>

              
                {!faceIdVerified && (<Stack.Screen name="FaceId" component={FaceId} />)}
                {!notificationEnabled && (<Stack.Screen name="EnableNotifications" component={EnableNotifications} />)}
                <Stack.Screen name="loaderScreen" component={LoaderScreen} />


            </Stack.Navigator>
        </View>
    )
}

export default AuthNav