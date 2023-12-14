import { View,SafeAreaView, Text, StatusBar } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../UI/HomeScreens/Home/Screens/HomeScreen';
import CategoryDetails from '../UI/HomeScreens/Home/Screens/CategoryDetails';
import SubCategoryDetails from '../UI/HomeScreens/Home/Screens/SubCategoryDetails';
import Reciept from '../UI/HomeScreens/Home/Screens/Reciept';
import EditCategory from '../UI/HomeScreens/Home/Screens/EditCategory';
import AddIncomeA from '../UI/CategoryScreens/Category/Screens/AddIncomeA';
import AddIncomeB from '../UI/CategoryScreens/Category/Screens/AddIncomeB';
import GeneratingPlan from '../UI/CategoryScreens/Category/Screens/GeneratingPlan';
import NewBudget from '../UI/CategoryScreens/Category/Screens/NewBudget';
import NewCategory from '../UI/CategoryScreens/Category/Screens/NewCategory';
import PlanPurchase from '../UI/CategoryScreens/Category/Screens/PlanPurchase';
import RecordExpense from '../UI/CategoryScreens/Category/Screens/RecordExpense';
import Merge from '../UI/CategoryScreens/Category/Screens/Merge';
import Notifications from '../UI/HomeScreens/Home/Screens/Notifications';
import ChatNav from './ChatNav';

const MainNav = () => {
  const Stack = createStackNavigator();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingVertical: 16 }}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'}></StatusBar>
      <Stack.Navigator initialRouteName='HomeScreen'
        // {faceIdVerified ? (notificationEnabled ? ("") : "EnableNotifications") : ("FaceId")} 
        screenOptions={{ headerShown: false }}>


        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CategoryDetails" component={CategoryDetails} />
        <Stack.Screen name="SubCategoryDetails" component={SubCategoryDetails} />
        <Stack.Screen name="Reciept" component={Reciept} />
        <Stack.Screen name="EditCategory" component={EditCategory} />

        <Stack.Screen name="Notifications" component={Notifications} />



        <Stack.Screen name="AddIncomeA" component={AddIncomeA} />
        <Stack.Screen name="AddIncomeB" component={AddIncomeB} />
        <Stack.Screen name="GeneratingPlan" component={GeneratingPlan} />
        <Stack.Screen name="NewBudget" component={NewBudget} />
        <Stack.Screen name="NewCategory" component={NewCategory} />
        <Stack.Screen name="PlanPurchase" component={PlanPurchase} />
        <Stack.Screen name="RecordExpense" component={RecordExpense} />

        <Stack.Screen name="Merge" component={Merge} />

        <Stack.Screen name="ChatNav" component={ChatNav} />













      </Stack.Navigator>
    </SafeAreaView>
  )
}

export default MainNav