import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MobileNumberScreen from '../../UI/OnboardingScreens/IdentityVerification/Screens/MobileNumberScreen';
import OTPVerification from '../../UI/OnboardingScreens/IdentityVerification/Screens/OTPVerification';
import Welcome from '../../UI/OnboardingScreens/IdentityVerification/Screens/Welcome';
import Name from '../../UI/OnboardingScreens/BasicInfoScreens/Screens/Name';
import Dob from '../../UI/OnboardingScreens/BasicInfoScreens/Screens/Dob';
import Address from '../../UI/OnboardingScreens/BasicInfoScreens/Screens/Address';
import EmployementStatus from '../../UI/OnboardingScreens/BasicInfoScreens/Screens/EmployementStatus';
import YearsExp from '../../UI/OnboardingScreens/BasicInfoScreens/Screens/YearsExp';
import Retire from '../../UI/OnboardingScreens/BasicInfoScreens/Screens/Retire';
import { SafeAreaView } from 'react-native-safe-area-context';
import FaceId from '../../UI/OnboardingScreens/IdentityVerification/Screens/FaceId';
import EnableNotifications from '../../UI/OnboardingScreens/IdentityVerification/Screens/EnableNotifications';
import SignIn from '../../UI/OnboardingScreens/IdentityVerification/Screens/SignIn';

const Stack = createStackNavigator();

const AuthNav = () => {

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'}></StatusBar>
            <SafeAreaView />
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="MobileNumberScreen" component={MobileNumberScreen} />
                <Stack.Screen name="OTPVerification" component={OTPVerification} />
                <Stack.Screen name="FaceId" component={FaceId} />
                <Stack.Screen name="EnableNotifications" component={EnableNotifications} />
                <Stack.Screen name="SignIn" component={SignIn} />
            </Stack.Navigator>
        </View>
    )
}

export default AuthNav