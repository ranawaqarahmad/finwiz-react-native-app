import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import TopBar from '../Components/TopBar'
import TextInputComp from '../Components/TextInputComp'
import Question from '../Components/Question'
import Answer from '../Components/Answer'

const ChatScreen = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack()
  }

  const more = () => {

  }

  const [chat, setChat] = useState([
   
    {
      user: false,
      message:
        'Certainly! Budgeting is a crucial aspect of financial management. Here are some tips to help you get started:\n\n' +
        '- Track your expenses: Record all your income and expenses to understand your spending habits.\n' +
        '- Set financial goals: Define short-term and long-term financial goals to guide your budgeting decisions.\n' +
        '- Create a budget: Allocate your income into categories like housing, transportation, savings, etc., to control spending.\n' +
        '- Prioritize needs over wants: Focus on essential expenses and cut back on non-essential ones to save more.\n' +
        '- Build an emergency fund: Save a portion of your income for unexpected expenses or emergencies.\n' +
        '- Review and adjust regularly: Keep track of your budget and make necessary adjustments to stay on track.'
    },
    {
      user: true,
      message: 'Hello! Can you give me tips on budgeting? Hello! Can you give me tips on budgeting?',


    },


  ])

  const addMessage = ( message) => {
    const newMessage = {
      user: true,
      message: message,
    };
  
    setChat((prevChat) => [newMessage, ...prevChat]);
  };
  

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <TopBar goBack={goBack} more={more} />
      {/* <FlatList/> */}
      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={chat}
        inverted
        renderItem={({ item, index }) => {
          return item.user ? <Question item={item} /> : <Answer item={item} />;
        }}
      />


      <TextInputComp addQuestion={addMessage} />

    </View>
  ) 
}

export default ChatScreen