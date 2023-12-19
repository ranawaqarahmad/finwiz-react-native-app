import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import TopBar from '../Components/TopBar'
import TextInputComp from '../Components/TextInputComp'
import Question from '../Components/Question'
import Answer from '../Components/Answer'
import { useSelector } from 'react-redux'

const ChatScreen = ({ navigation }) => {
  const selector = useSelector(state => state.AppReducer);
  const authToken = selector.authToken;
  const goBack = () => {
    navigation.goBack()
  }

  const more = () => {

  }

  const [chat, setChat] = useState([




  ])
  const [pageNumber, setPageNumber] = useState(1)

  const [details, setDetails] = useState(

  )

  const [transactionDetails, setTransactionDetails] = useState()

  const [nextPage, setNextPage] = useState()


  useEffect(() => {
    getChat()
  }, [])
  const getChat = async () => {


    fetch(`https://api-finwiz.softsquare.io/api/user/user-ai-chat`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },

    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.data);

        // console.log('Categories', data.data.transaction);
        setChat(data.data.data)



      })
      .catch((error) => {
        console.log(error);
        // setLoader(false)
      });



  };



  const addMessage = async (message) => {


    const newMessage = {
      type: 'user',
      message: message,
    };

    setChat((prevChat) => [newMessage, ...prevChat]);


    fetch('https://api-finwiz.softsquare.io/api/user/send-ai-message', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('chat response ', data);

        const newMessage = {
          type: 'ai',
          message: data.data,
        };

        setChat((prevChat) => [newMessage, ...prevChat]);



      })
      .catch((error) => {

      });



  };





  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <TopBar goBack={goBack} more={more} />
      {/* <FlatList/> */}
      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={chat}
        keyExtractor={(item) => {
          const key = item.id.toString()
          return key;
        }}
        inverted
        renderItem={({ item, index }) => {
          return item.type == 'user' ? <Question item={item} /> : <Answer item={item} />;
        }}
      />


      <TextInputComp addQuestion={addMessage} />

    </View>
  )
}

export default ChatScreen