import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MobileNumberScreen from '../../UI/OnboardingScreens/IdentityVerification/Screens/MobileNumberScreen';
import OTPVerification from '../../UI/OnboardingScreens/IdentityVerification/Screens/OTPVerification';
import Name from '../../UI/OnboardingScreens/BasicInfoScreens/Screens/Name';
import Dob from '../../UI/OnboardingScreens/BasicInfoScreens/Screens/Dob';
import Address from '../../UI/OnboardingScreens/BasicInfoScreens/Screens/Address';
import EmployementStatus from '../../UI/OnboardingScreens/BasicInfoScreens/Screens/EmployementStatus';
import YearsExp from '../../UI/OnboardingScreens/BasicInfoScreens/Screens/YearsExp';
import Retire from '../../UI/OnboardingScreens/BasicInfoScreens/Screens/Retire';
import { SafeAreaView } from 'react-native-safe-area-context';
import FaceId from '../../UI/OnboardingScreens/IdentityVerification/Screens/FaceId';
import EnableNotifications from '../../UI/OnboardingScreens/IdentityVerification/Screens/EnableNotifications';
import SignIn from '../../UI/OnboardingScreens/SmartFinancialPlan/Screens/SignIn';
import { useDispatch, useSelector } from 'react-redux';
import { setPhoneVerified } from '../../redux/AppReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AuthNav = () => {

    const selector = useSelector(state => state.AppReducer);
    const phoneVerified = selector.phoneVerified;
    const faceIdVerified = selector.faceIdVerified;
    const notificationEnabled = selector.notificationEnabled;


    const dispatch = useDispatch()
    console.log('PHONE VERIFIED IS THIS', phoneVerified);






    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'}></StatusBar>
            <SafeAreaView />
            <Stack.Navigator initialRouteName={phoneVerified ? (faceIdVerified ? (notificationEnabled ? ("") : "EnableNotifications") : ("FaceId")) : "MobileNumberScreen"} screenOptions={{ headerShown: false }}>

                {!phoneVerified && (<Stack.Screen name="MobileNumberScreen" component={MobileNumberScreen} />)}
                {!phoneVerified && (<Stack.Screen name="OTPVerification" component={OTPVerification} />)}
                {!faceIdVerified && (<Stack.Screen name="FaceId" component={FaceId} />)}
                {!notificationEnabled && (<Stack.Screen name="EnableNotifications" component={EnableNotifications} />)}

            </Stack.Navigator>
        </View>
    )
}

export default AuthNav