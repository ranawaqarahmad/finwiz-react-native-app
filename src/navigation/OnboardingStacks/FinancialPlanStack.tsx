import { View, Text, StatusBar, BackHandler,TouchableOpacity, Button } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import FormsOfIncome from '../../UI/OnboardingScreens/FinancialPlan/Screens/FormsOfIncome';
import Dependants from '../../UI/OnboardingScreens/FinancialPlan/Screens/Dependants';
import Property from '../../UI/OnboardingScreens/FinancialPlan/Screens/Property';
import Mortage from '../../UI/OnboardingScreens/FinancialPlan/Screens/Mortage';
import FinancialParentScreen from '../../UI/OnboardingScreens/FinancialPlan/Screens/FinancialParentScreen';
import CircularProgress from '../../UI/OnboardingScreens/FinancialPlan/Screens/CircularProgress';
import { useDispatch } from 'react-redux';
import { setWelcomeNavStatus, setstack } from '../../redux/AppReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const FinancialPlanStack = () => {


    return (
        <View style={{ flex: 1,backgroundColor:'white',paddingVertical:16 }}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'}></StatusBar>
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

      const dispatch=useDispatch()

       const clearAllData = async () => {
        try {
          await AsyncStorage.clear();
          console.log('All AsyncStorage data has been cleared.');
        } catch (error) {
          console.error('Error clearing AsyncStorage data:', error);}
        }
        

    return(
        <View style={{flex:1,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
                <Text onPress={()=>{
                    dispatch(setstack('WelcomeNav'))
                    dispatch(setWelcomeNavStatus(0))
                    clearAllData()

                }} style={{color:'red',fontWeight:'bold',position:'absolute',right:16,top:16}}>LOGOUT</Text>
            <Text style={{textAlign:'center',fontSize:32,color:'black',fontWeight:'bold',padding:16}}>WELCOME TO FINWIZ APP</Text>
        </View>
    )
}

export default FinancialPlanStack