import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { setAuthToken, setstack, setWelcomeNavStatus } from '../../../redux/AppReducer';
import { clearAllData } from '../../../utils/helper';
import AccountComp from '../Components/AccountComp';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

const AccountsScreen = ({ navigation }) => {
  const selector = useSelector(state => state.AppReducer);
  const authToken = selector.authToken;
  const [loader, setLoader] = useState(false)
  const isFocused = useIsFocused()
  const [accounts, setAccounts] = useState([

  ])

  const authUser = async () => {


    setLoader(true)


    // console.log('AuthToken is ', authToken);

    fetch(`https://api-finwiz.softsquare.io/api/user/auth-user`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },

    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.data);
        // console.log(data.data[0].auth);

        if (data.status == 'true') {
          setAccounts(data.data[0].auth)
          setLoader(false)

        }
        setLoader(false)



      })
      .catch((error) => {
        console.log(error);
        setLoader(false)

        // setLoader(false)
      });



  };

  useEffect(() => {
    authUser()
  }, [])

  useEffect(() => {
    setLoader(false)
  }, [isFocused])

  const navigate = (item) => {

    console.log('TYPE=======', item.type)
    if (item.type == 'investment') {
      navigation.navigate('InvestmentDetail', { item: item })

      return
    }
    if (item.isAsset) {
      navigation.navigate('AssetsDetail', { item: item })

    } else {
      navigation.navigate('AccountDetails', { item: item })

    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', marginHorizontal: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <Text style={{ color: 'black', fontSize: 18, fontWeight: '600' }}>Accounts</Text>

        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', columnGap: 8, }}>


          {/* BELLICON STARTS */}
          <TouchableOpacity>
            <View style={{ height: 33, width: 33, borderRadius: 20, backgroundColor: '#E5E7EB', alignSelf: 'center', justifyContent: 'center' }}>
              <Image source={require('../../../assets/Images/bellicon.png')}
                style={{ height: 24, width: 24, alignSelf: 'center' }}
              />
            </View>
          </TouchableOpacity>
          {/* ProfileIcon */}
          <TouchableOpacity>
            <View style={{ height: 33, width: 33, backgroundColor: '#E5E7EB', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
              <Image source={require('../../../assets/Images/user.png')}
                style={{ height: 24, width: 24, alignSelf: 'center', }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {loader ?
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <ActivityIndicator color={'#722ED1'} size={'large'}></ActivityIndicator>
        </View>
        :
        <FlatList
          data={accounts}
          scrollEnabled={true}
          style={{}}
          contentContainerStyle={{ paddingBottom: 32 }}
          renderItem={({ item, index }) => <AccountComp item={item} navigate={navigate} />
          }
          keyExtractor={(item) => {
            const key = item.id.toString();
            return key;
          }}
        />}
    </View>
  )
}

export default AccountsScreen