import { View, Text, Image, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import AccountComp from '../../../AccountsScreens/Components/AccountComp';
import NotificationComp from '../Components/NotificationComp';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
var notificationsData = [];

const Notifications = ({ navigation }) => {
  const [loader, setLoader] = useState(true)
  const isFocused = useIsFocused()

  const [notifications, setNotifications] = useState([

  ])

  const [pageNumber, setPageNumber] = useState(1)
  const [nextPage, setNextPage] = useState()
  const selector = useSelector(state => state.AppReducer);
  const authToken = selector.authToken;
  const getNotifications = async () => {

    setPageNumber(pageNumber + 1);
    console.log('Page Number Is ', pageNumber);

    fetch(`https://api-finwiz.softsquare.io/api/user/notifications?page=${pageNumber}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {


        console.log('THIS IS DATA', data);

        // console.log('Categories', data.data.transaction);
        // const categories = { transactionDetails: data.data.data,}
        // console.log('NEXT PAGE URL', categories.transactionDetails.next_page_url);
        if (data.status == 'true') {



          setNextPage(data.data.next_page_url)
          console.log(data.data);

          data.data.data.map((item) => {
            notificationsData.push(item)
          })
          setNotifications(notificationsData)

          setLoader(false)

        }

      })
      .catch((error) => {
        console.log('THIS IS ERROR', error);
        setLoader(false)
      });



  };

  const readAll = async () => {


    fetch(`https://api-finwiz.softsquare.io/api/user/mark-read-all-notifications`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {



        if (data.status == 'true') {



          setNextPage(data.data.next_page_url)
          console.log(data.data);

          data.data.data.map((item) => {
            notificationsData.push(item)
          })
          setNotifications(notificationsData)

          setLoader(false)

        }

      })
      .catch((error) => {
        setLoader(false)
      });



  };

  useEffect(() => {
    getNotifications()
    readAll()


  }, [])

  useEffect(() => {

    notificationsData = []
  }, [isFocused])
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16 }}>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <View style={{ height: 33, width: 33, borderRadius: 20, alignSelf: 'center', justifyContent: 'center' }}>
              <Image source={require('../../../../assets/Images/backarrow.png')}
                style={{ height: 24, width: 24, alignSelf: 'center' }}
              />
            </View>
          </TouchableOpacity>

          <Text onPress={() => {

          }
          } style={{ marginEnd: 16, fontSize: 18, fontWeight: 'bold', color: 'black', alignSelf: 'center', flex: 1, textAlign: 'center' }}>Notifications</Text>

        </View>
      </View>

      {loader ?
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color={'#722ED1'} size={'large'}></ActivityIndicator>
        </View>
        :
        <FlatList
          data={notifications}
          scrollEnabled={true}
          style={{}}
          onEndReached={({ distanceFromEnd }) => {

            console.log('END REACHED');

            if (distanceFromEnd > 0 && nextPage) {
              getNotifications();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => {
            if (nextPage) {
              return <ActivityIndicator color={'#722ED1'} size={'large'} />;
            } else {
              return null; // Return null to hide the footer when there's no next page.
            }
          }}
          ItemSeparatorComponent={() => <View style={{ margin: 8 }}></View>}

          contentContainerStyle={{ paddingBottom: 32, padding: 16 }}
          renderItem={({ item, index }) => <NotificationComp item={item} />
          }
          keyExtractor={(item) => {
            const key = item.id.toString();
            return key;
          }}
        />}
    </View>
  )
}

export default Notifications