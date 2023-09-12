import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MobileNumberScreen from '../../UI/OnboardingScreens/SmartFinancialPlan/Screens/MobileNumberScreen';
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
import BasicInfoStack from './BasicInfoStack';
import FinancialPlanStack from './FinancialPlanStack';
import AuthNav from './AuthNav';
import WelcomeNav from './WelcomeNav';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthStackCompleted, setAuthToken, setFaceIdVerified, setFinancialPlanScreen, setPhoneVerified, setTokenSaved, setWelcomeNavStatus, setnotificationEnabled, setstack } from '../../redux/AppReducer';

const Stack = createStackNavigator();

const OnBoardNav = ({ stack, WelcomeScreen }) => {


    var phone: boolean, face: boolean, notification = false;
    const selector = useSelector(state => state.AppReducer);
    const currentStack = selector.stackinfo;
    const basicInfoCompleted = selector.basicInfoCompleted;
    const financialInfoCompleted = selector.financialInfoCompleted;


    const tokenSaved = selector.tokenSaved;
    const authStackCompleted = selector.authStackCompleted;


    const dispatch = useDispatch()
    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token'); // Replace 'key' with the actual key you used to store the data
            if (token !== null) {
                console.log('TOKEN IS THIS: ', token);
                dispatch(setAuthToken(token))
                dispatch(setTokenSaved(true))
                console.log('BAISC INFO STACK COMPLETED',basicInfoCompleted);
                
                if (basicInfoCompleted) { 
                    if(financialInfoCompleted){
                        dispatch(setFinancialPlanScreen(2))
                        dispatch(setstack('WelcomeNav'))
                        dispatch(setWelcomeNavStatus(1))
                    }else{
                        dispatch(setFinancialPlanScreen(1))
                        dispatch(setstack('WelcomeNav'))
                        dispatch(setWelcomeNavStatus(1))
                    }
                    
                  
                } else {
                    
                    dispatch(setstack('BasicInfoStack'))
                }
            } else {
                console.log('No data found in AsyncStorage.');
            }
        } catch (error) {
            console.error('Error retrieving data: ', error);
        }
    };
    var phoneVerified
    const getPhoneVerified = async () => {
        try {
            phoneVerified = await AsyncStorage.getItem('phoneVerified'); // Replace 'key' with the actual key you used to store the data
            if (phoneVerified != null) {
                console.log('Phone Verified in ONBOARD NAV IS THIS ', phoneVerified);
                dispatch(setPhoneVerified(true))
                phone = true
            } else {
                console.log('No data found in AsyncStorage.');
            }
        } catch (error) {
            console.error('Error retrieving data: ', error);
        }
    };

    const getFaceIdVerified = async () => {
        try {
            const faceIdVerified = await AsyncStorage.getItem('faceIdVerified'); // Replace 'key' with the actual key you used to store the data
            if (faceIdVerified != null) {
                console.log('FACE ID Verified in ONBOARD NAV IS THIS ', faceIdVerified);
                dispatch(setFaceIdVerified(true))
                face = true
            } else {
                console.log('No data found in AsyncStorage.');
            }
        } catch (error) {
            console.error('Error retrieving data: ', error);
        }
    };

    const getNotificationEnabled = async () => {
        try {
            const notificationEnabled = await AsyncStorage.getItem('notificationEnabledVerified'); // Replace 'key' with the actual key you used to store the data
            if (notificationEnabled != null) {


                console.log('notificationEnabled in ONBOARD NAV IS THIS ', notificationEnabled);
                dispatch(setnotificationEnabled(true))
                notification = true
            } else {
                console.log('No data found in AsyncStorage.');
            }
        } catch (error) {
            console.error('Error retrieving data: ', error);
        }
    };


    const navigation = useNavigation()
    useEffect(() => {

        if (phone && face && notification) {

            console.log('AUTH STACK COMPLETED');

            dispatch(setAuthStackCompleted(true))
        } else {
            console.log('These are the value ', phone, face, notification);

        }
        console.log('STACK Changed', currentStack);
        navigation.reset({
            index: 0,
            routes: [{ name: currentStack }],
        });
    }, [currentStack, tokenSaved, authStackCompleted, basicInfoCompleted]);

    useEffect(() => {


        getToken()
    }, [tokenSaved]);

    // getPhoneVerified()
    // getFaceIdVerified()
    // getNotificationEnabled()




    return (
        <View style={{ flex: 1,backgroundColor:'white'}}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'}/>

            <Stack.Navigator
                initialRouteName={currentStack}
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name="BasicInfoStack" component={BasicInfoStack} />
                <Stack.Screen name="FinancialPlanStack" component={FinancialPlanStack} />

                {!authStackCompleted && <Stack.Screen name="AuthNav" component={AuthNav} />}
                <Stack.Screen name="WelcomeNav" component={WelcomeNav} />

            </Stack.Navigator>


        </View>
    )
}

export default OnBoardNav