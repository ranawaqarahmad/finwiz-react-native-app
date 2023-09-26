import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MobileNumberScreen from '../../UI/OnboardingScreens/IdentityVerification/Screens/MobileNumberScreen';
import Name from '../../UI/OnboardingScreens/BasicInfoScreens/Screens/Name';
import Dob from '../../UI/OnboardingScreens/BasicInfoScreens/Screens/Dob';
import Address from '../../UI/OnboardingScreens/BasicInfoScreens/Screens/Address';
import EmployementStatus from '../../UI/OnboardingScreens/BasicInfoScreens/Screens/EmployementStatus';
import YearsExp from '../../UI/OnboardingScreens/BasicInfoScreens/Screens/YearsExp';
import Retire from '../../UI/OnboardingScreens/BasicInfoScreens/Screens/Retire';
import SmartFinancialPlan from '../../UI/OnboardingScreens/SmartFinancialPlan/Screens/SmartFinancialPlan';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const BasicInfoStack = () => {

    return (
        <View style={{ flex: 1,backgroundColor:'white',paddingVertical:16 }}>
            <SafeAreaView />
            <Stack.Navigator initialRouteName="Name" screenOptions={{ headerShown: false }}>

                <Stack.Screen name="Name" component={Name} />
                {/* <Stack.Screen name="Dob" component={Dob} />
                <Stack.Screen name="Address" component={Address} />
                <Stack.Screen name="EmployementStatus" component={EmployementStatus} />
                <Stack.Screen name="YearsExp" component={YearsExp} />
                <Stack.Screen name="Retire" component={Retire} />
                <Stack.Screen name="SmartFinancialPlan" component={SmartFinancialPlan} /> */}







            </Stack.Navigator>
        </View>
    )
}

export default BasicInfoStack