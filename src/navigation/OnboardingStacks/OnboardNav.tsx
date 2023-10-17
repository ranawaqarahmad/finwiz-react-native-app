import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MobileNumberScreen from '../../UI/OnboardingScreens/IdentityVerification/Screens/MobileNumberScreen';
import OTPVerification from '../../UI/OnboardingScreens/IdentityVerification/Screens/OTPVerification';
import Name from '../../UI/OnboardingScreens/BasicInfoScreens/Screens/Name';
import SmartFinancialPlan from '../../UI/OnboardingScreens/SmartFinancialPlan/Screens/SmartFinancialPlan';
import WelcomeNav from './WelcomeNav';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import FaceId from '../../UI/OnboardingScreens/IdentityVerification/Screens/FaceId';
import EnableNotifications from '../../UI/OnboardingScreens/IdentityVerification/Screens/EnableNotifications';
import WelcomeFinwiz from '../../UI/OnboardingScreens/SmartFinancialPlan/Screens/WelcomeFinwiz';
import SmartFinancialPlanScreen from '../../UI/OnboardingScreens/SmartFinancialPlan/Screens/SmartFinancialPlanScreen';
import FirstScreen from '../../UI/OnboardingScreens/SmartFinancialPlan/Screens/FirstScreen';
import SignIn from '../../UI/OnboardingScreens/SmartFinancialPlan/Screens/SignIn';
import Welcome from '../../UI/OnboardingScreens/SmartFinancialPlan/Screens/Welcome';
import FinancialParentScreen from '../../UI/OnboardingScreens/FinancialPlan/Screens/FinancialParentScreen';
import CircularProgress from '../../UI/OnboardingScreens/FinancialPlan/Screens/CircularProgress';

const Stack = createStackNavigator();

const OnBoardNav = ({ }) => {


    const selector = useSelector(state => state.AppReducer);
    // console.log('selector.authToken',selector.authToken);
    // console.log('selector.basicInfoCompleted',selector.basicInfoCompleted);
    // console.log('selector.phoneVerified',selector.phoneVerified);
    // console.log('selector.setupBudgetPlanDone ',selector.setupBudgetPlanDone );

    const dispatch = useDispatch()
    const navigation = useNavigation()






    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

            <Stack.Navigator
                initialRouteName='Name'
                screenOptions={{ headerShown: false }}>

                <Stack.Screen name="Name" component={Name} />
                <Stack.Screen name="MobileNumberScreen" component={MobileNumberScreen} />
                <Stack.Screen name="OTPVerification" component={OTPVerification} />
                <Stack.Screen name="FaceId" component={FaceId} />
                <Stack.Screen name="EnableNotifications" component={EnableNotifications} />
                <Stack.Screen name="WelcomeFinwiz" component={WelcomeFinwiz} />
                <Stack.Screen name="WelcomeNav" component={WelcomeNav} />
                <Stack.Screen name="SmartFinancialPlan" component={SmartFinancialPlan} />
                <Stack.Screen name="SmartFinancialPlanScreen" component={SmartFinancialPlanScreen} />
                <Stack.Screen name="FinancialParentScreen" component={FinancialParentScreen} />
                <Stack.Screen name="CircularProgress" component={CircularProgress} />

            </Stack.Navigator>


        </View>
    )
}



export default OnBoardNav