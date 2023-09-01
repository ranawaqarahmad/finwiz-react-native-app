import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MobileNumberScreen from '../UI/screens/MobileNumberScreen';
import OTPVerification from '../UI/screens/OTPVerification';
import Welcome from '../UI/screens/Welcome';
import Name from '../UI/BasicInfoScreens/Screens/Name';
import Dob from '../UI/BasicInfoScreens/Screens/Dob';
import Address from '../UI/BasicInfoScreens/Screens/Address';
import EmployementStatus from '../UI/BasicInfoScreens/Screens/EmployementStatus';
import YearsExp from '../UI/BasicInfoScreens/Screens/YearsExp';
import Retire from '../UI/BasicInfoScreens/Screens/Retire';

const Stack = createStackNavigator();

const AuthNav = () => {

    return (
        <Stack.Navigator initialRouteName="Name" screenOptions={{ headerShown: false }}>
            
            <Stack.Screen name="MobileNumberScreen" component={MobileNumberScreen} />
            <Stack.Screen name="OTPVerification" component={OTPVerification} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Name" component={Name} />
            <Stack.Screen name="Dob" component={Dob} />
            <Stack.Screen name="Address" component={Address} />
            <Stack.Screen name="EmployementStatus" component={EmployementStatus} />
            <Stack.Screen name="YearsExp" component={YearsExp} />
            <Stack.Screen name="Retire" component={Retire} />






        </Stack.Navigator>
    )
}

export default AuthNav