import { View, Text } from 'react-native'
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
import SmartFinancialPlan from '../../UI/OnboardingScreens/SmartFinancialPlan/Screens/SmartFinancialPlan';
import { SafeAreaView } from 'react-native-safe-area-context';
import MonthlyAverageIncome from '../../UI/OnboardingScreens/FinancialPlan/Screens/MonthlyAverageIncome';
import FormsOfIncome from '../../UI/OnboardingScreens/FinancialPlan/Screens/FormsOfIncome';
import Dependants from '../../UI/OnboardingScreens/FinancialPlan/Screens/Dependants';
import Property from '../../UI/OnboardingScreens/FinancialPlan/Screens/Property';
import Mortage from '../../UI/OnboardingScreens/FinancialPlan/Screens/Mortage';

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