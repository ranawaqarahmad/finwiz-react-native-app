import { View, SafeAreaView, Text, StatusBar } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import InsightScreen from '../UI/InsightScreens/Screens/InsightScreen';
import Notifications from '../UI/HomeScreens/Home/Screens/Notifications';
import ChatScreen from '../UI/ChatBot/Screens/ChatScreen';
import Welcome from '../UI/ChatBot/Screens/Welcome';

const ChatNav = () => {
  const Stack = createStackNavigator();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white',  }}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'}></StatusBar>
      <Stack.Navigator initialRouteName='InsightScreen'
        screenOptions={{ headerShown: false }}>


        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="Welcome" component={Welcome} />



















      </Stack.Navigator>
    </SafeAreaView>
  )
}

export default ChatNav