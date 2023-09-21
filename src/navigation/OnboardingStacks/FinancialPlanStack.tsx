import { View, Text, StatusBar, BackHandler } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MobileNumberScreen from '../../UI/OnboardingScreens/IdentityVerification/Screens/MobileNumberScreen';
import OTPVerification from '../../UI/OnboardingScreens/IdentityVerification/Screens/OTPVerification';
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
import FinancialParentScreen from '../../UI/OnboardingScreens/FinancialPlan/Screens/FinancialParentScreen';
import CircularProgress from '../../UI/OnboardingScreens/FinancialPlan/Screens/CircularProgress';

const Stack = createStackNavigator();

const FinancialPlanStack = () => {

    return (
        <View style={{ flex: 1,backgroundColor:'white',paddingVertical:16 }}>
            <SafeAreaView/>
            <Stack.Navigator initialRouteName="FinancialParentScreen" screenOptions={{ headerShown: false }}>


                <Stack.Screen name="FormsOfIncome" component={FormsOfIncome} />
                <Stack.Screen name="Dependants" component={Dependants} />
                <Stack.Screen name="Property" component={Property} />
                <Stack.Screen name="Mortage" component={Mortage} />
                <Stack.Screen name="FinancialParentScreen" component={FinancialParentScreen} />
                <Stack.Screen name="CircularProgress" component={CircularProgress} />
                <Stack.Screen name="FurtherApp" component={FurtherApp} />




                










            </Stack.Navigator>
        </View>
    )
}

const FurtherApp=()=>{
    BackHandler.addEventListener('hardwareBackPress', () => {
        // Exit the app (this will close the app)
        BackHandler.exitApp();
        return true; // Prevent default behavior (e.g., navigating back)
      });
    return(
        <View style={{flex:1,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
            <Text style={{textAlign:'center',fontSize:32,color:'black',fontWeight:'bold',padding:16}}>WELCOME TO FINWIZ APP</Text>
        </View>
    )
}

export default FinancialPlanStack