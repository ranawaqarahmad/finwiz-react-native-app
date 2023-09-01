import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MobileNumberScreen from '../UI/IdentityVerification/Screens/MobileNumberScreen';
import OTPVerification from '../UI/IdentityVerification/Screens/OTPVerification';
import Welcome from '../UI/IdentityVerification/Screens/Welcome';
import Name from '../UI/BasicInfoScreens/Screens/Name';
import Dob from '../UI/BasicInfoScreens/Screens/Dob';
import Address from '../UI/BasicInfoScreens/Screens/Address';
import EmployementStatus from '../UI/BasicInfoScreens/Screens/EmployementStatus';
import YearsExp from '../UI/BasicInfoScreens/Screens/YearsExp';
import Retire from '../UI/BasicInfoScreens/Screens/Retire';
import SmartFinancialPlan from '../UI/SmartFinancialPlan/SmartFinancialPlan';
import { SafeAreaView } from 'react-native-safe-area-context';
import FaceId from '../UI/IdentityVerification/Screens/FaceId';
import EnableNotifications from '../UI/IdentityVerification/Screens/EnableNotifications';

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


            </Stack.Navigator>
        </View>
    )
}

export default AuthNav