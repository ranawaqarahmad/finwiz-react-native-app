import { View,SafeAreaView, Text, StatusBar } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AccountsScreen from '../UI/AccountsScreens/Screens/AccountsScreen';
import AccountDetails from '../UI/AccountsScreens/Screens/AccountDetails';
import AssetsDetail from '../UI/AccountsScreens/Screens/AssetsDetail';
import AddNewAsset from '../UI/AccountsScreens/Screens/AddNewAsset';
import InvestmentDetail from '../UI/AccountsScreens/Screens/InvestmentDetail';
import Notifications from '../UI/HomeScreens/Home/Screens/Notifications';

const AccountNav = () => {
  const Stack = createStackNavigator();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingVertical: 16 }}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'}></StatusBar>
      <Stack.Navigator initialRouteName='AccountsScreen'
        // {faceIdVerified ? (notificationEnabled ? ("") : "EnableNotifications") : ("FaceId")} 
        screenOptions={{ headerShown: false }}>


        <Stack.Screen name="AccountsScreen" component={AccountsScreen} />
        <Stack.Screen name="AccountDetails" component={AccountDetails} />
        <Stack.Screen name="AssetsDetail" component={AssetsDetail} />
        <Stack.Screen name="AddNewAsset" component={AddNewAsset} />
        <Stack.Screen name="InvestmentDetail" component={InvestmentDetail} />
        <Stack.Screen name="Notifications" component={Notifications} />




    












      </Stack.Navigator>
    </SafeAreaView>
  )
}

export default AccountNav