import { View, SafeAreaView, Text, StatusBar } from 'react-native'
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
import AccountsScreen from '../UI/AccountsScreens/Screens/AccountsScreen';
import AccountDetails from '../UI/AccountsScreens/Screens/AccountDetails';
import AssetsDetail from '../UI/AccountsScreens/Screens/AssetsDetail';
import AddNewAsset from '../UI/AccountsScreens/Screens/AddNewAsset';
import InvestmentDetail from '../UI/AccountsScreens/Screens/InvestmentDetail';
import InsightScreen from '../UI/InsightScreens/Screens/InsightScreen';
import Notifications from '../UI/HomeScreens/Home/Screens/Notifications';

const InsightsNav = () => {
  const Stack = createStackNavigator();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingVertical: 16 }}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'}></StatusBar>
      <Stack.Navigator initialRouteName='InsightScreen'
        // {faceIdVerified ? (notificationEnabled ? ("") : "EnableNotifications") : ("FaceId")} 
        screenOptions={{ headerShown: false }}>


        <Stack.Screen name="InsightScreen" component={InsightScreen} />
        <Stack.Screen name="Notifications" component={Notifications} />


















      </Stack.Navigator>
    </SafeAreaView>
  )
}

export default InsightsNav