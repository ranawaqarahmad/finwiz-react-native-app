import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MobileNumberScreen from '../../UI/OnboardingScreens/SmartFinancialPlan/Screens/MobileNumberScreen';
import OTPVerification from '../../UI/OnboardingScreens/SmartFinancialPlan/Screens/OTPVerification';
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
import WelcomeFinwiz from '../../UI/OnboardingScreens/SmartFinancialPlan/Screens/WelcomeFinwiz';
import SmartFinancialPlanScreen from '../../UI/OnboardingScreens/SmartFinancialPlan/Screens/SmartFinancialPlanScreen';
import SplashScreen from '../../UI/OnboardingScreens/SmartFinancialPlan/Screens/FirstScreen';
import FirstScreen from '../../UI/OnboardingScreens/SmartFinancialPlan/Screens/FirstScreen';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import SignIn from '../../UI/OnboardingScreens/SmartFinancialPlan/Screens/SignIn';
import Welcome from '../../UI/OnboardingScreens/SmartFinancialPlan/Screens/Welcome';

const Stack = createStackNavigator();

const WelcomeNav = () => {

    const selector = useSelector(state => state.AppReducer);
    const financialPlanScreen=selector.financialPlanScreen

    const welcomeNavStatus = selector.welcomeNavStatus;

    const navigation = useNavigation()

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView />
            <Stack.Navigator
                initialRouteName={welcomeNavStatus === 0 ? ("FirstScreen") : (welcomeNavStatus === 1 ? ("SmartFinancialPlan") : (welcomeNavStatus === 2 ? ("WelcomeFinwiz") : ('')))} screenOptions={{ headerShown: false }}>

                <Stack.Screen name="SmartFinancialPlan" component={SmartFinancialPlan} />
                <Stack.Screen name="WelcomeFinwiz" component={WelcomeFinwiz} />
                <Stack.Screen name="SmartFinancialPlanScreen" component={SmartFinancialPlanScreen} />
                <Stack.Screen name="FirstScreen" component={FirstScreen} />
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="SignIn" component={SignIn} />
                {/* {!phoneVerified && ( */}
                <Stack.Screen name="MobileNumberScreen" component={MobileNumberScreen} />
               
                {/* {!phoneVerified && ( */}
                <Stack.Screen name="OTPVerification" component={OTPVerification} />
                {/* )} */}










            </Stack.Navigator>
        </View>
    )
}

export default WelcomeNav