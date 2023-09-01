import { View, Text } from 'react-native'
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
import MonthlyAverageIncome from '../UI/FinancialPlan/Screens/MonthlyAverageIncome';
import FormsOfIncome from '../UI/FinancialPlan/Screens/FormsOfIncome';
import Dependants from '../UI/FinancialPlan/Screens/Dependants';
import Property from '../UI/FinancialPlan/Screens/Property';
import Mortage from '../UI/FinancialPlan/Screens/Mortage';

const Stack = createStackNavigator();

const FinancialPlanStack = () => {

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView />
            <Stack.Navigator initialRouteName="MonthlyAverageIncome" screenOptions={{ headerShown: false }}>

                <Stack.Screen name="MonthlyAverageIncome" component={MonthlyAverageIncome} />
                <Stack.Screen name="FormsOfIncome" component={FormsOfIncome} />
                <Stack.Screen name="Dependants" component={Dependants} />
                <Stack.Screen name="Property" component={Property} />
                <Stack.Screen name="Mortage" component={Mortage} />


                










            </Stack.Navigator>
        </View>
    )
}

export default FinancialPlanStack