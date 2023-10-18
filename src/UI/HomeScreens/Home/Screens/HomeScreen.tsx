import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, View, TouchableOpacity, Text, StyleSheet, SafeAreaView, ScrollView, Image, ImageBackground, FlatList, ActivityIndicator } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import DetailedCard from '../Components/DetailedCard';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet from "react-native-raw-bottom-sheet";
import MenuComponent from '../Components/MenuComponent';
import { setAccountId, setAuthToken, setBasicinfoCompleted, setPhoneVerified, setSyncAccountDone, setTokenSaved, setTotalBalances, setWelcomeNavStatus, setstack } from '../../../../redux/AppReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation = useNavigation()
  const selector = useSelector(state => state.AppReducer);
  const dispatch = useDispatch()
  const authToken = selector.authToken;
  const accountId = selector.accountId;
  const [categoryLoader, setCategoryLoader] = useState(false)
  const isFocused = useIsFocused()

  useEffect(() => {


    setTotalBalance(0)
    setAvailableBalance(0)
    getCategories()
    authUser()
    closeSheet()

    console.log('selector.authToken', selector.authToken);
    console.log('selector.basicInfoCompleted', selector.basicInfoCompleted);
    console.log('selector.phoneVerified', selector.phoneVerified);
    console.log('selector.syncAccountDone ', selector.syncAccountDone);
    console.log('selector.accountId ', selector.accountId);
    console.log('selector.setupBudgetPlanDone ', selector.setupBudgetPlanDone);
  }, [isFocused])

  const onClick = (item) => {
    navigation.navigate('CategoryDetails', { item: item });
  }

  const colors = ['#B39966', '#E499F9', '#ED8080', '#F09F4B', '#848C93'];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  const [menuItem, setMenuItem] = useState()
  const [totalBalance, setTotalBalance] = useState(selector.totalBalance)
  const [availableBalance, setAvailableBalance] = useState(0)
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [budgets, setBudgets] = useState([])

  const lockCategory = async (items) => {
    setCategoryLoader(true)



    console.log(items);

    try {
      await fetch(`https://api-finwiz.softsquare.io/api/user/user-categories/${items.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category_name: items.category_name,
          limitation: convertStringToNumber(items.limitation),
          fixed: 1


        }),
      }).then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log(data);
          getCategories()
          closeSheet()

        })
        .catch((error) => {
          console.log(error);
        });


    }
    catch (error) {
      console.error(error);
    }
  };

  const getCategories = async () => {
    setCategoryLoader(true)
    fetch(`https://api-finwiz.softsquare.io/api/user/user-all-categories`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },

    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('Categories', data.data);
        // const array=data.data
        const array = []
        data.data.map((item) => {
          // console.log(item);
          array.push({ ...item, backgroundColor: getRandomColor() })
        });
        setBudgets(array)
        setCategoryLoader(false)



      })
      .catch((error) => {
        console.log(error);
        setCategoryLoader(false)
      });



  };

  const convertStringToNumber = (str) => {

    // Use parseFloat() to convert to a floating-point number
    return parseFloat(str);
  };

  const authUser = async () => {

   


    setTotalBalance(0)
    setCategoryLoader(true)
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
        var amount=0
        data.data[0].auth.map((item, index) => {


          
          if (item.balances_current) {
            amount=amount+convertStringToNumber(item.balances_current)
            setTotalBalance(amount);
            console.log('TOTAL BALANCE IN HOME',amount);
            
            dispatch(setTotalBalances(amount))

          }


          if (item.balances_available) {
            setAvailableBalance((prevTotalBalance) => prevTotalBalance + convertStringToNumber(item.balances_available));

          }

        })
      })
      .catch((error) => {
        console.log(error);
        // setLoader(false)
      });



  };

  const openView = (indextoEdit) => {
    const updatedArray = budgets.map((obj, index) => {
      if (index === indextoEdit) {
        // Update the value for the specific object at the given index
        return { ...obj, opened: !budgets[index].opened };
      }
      // Return the object as is for others
      return obj;
    });

    setBudgets(updatedArray)
    // console.log(updatedArray);
  }

  const openSheet = (item) => {

    console.log('OPEN THE BOTTOM SHEET');

    setMenuItem(item)
    bottomSheetRef.current.open()

  }

  const closeSheet = () => {
    if (bottomSheetRef.current) {
      console.log('BOTTOM SHEET CLOSED');

      bottomSheetRef.current.close();
    } else {
      console.log('Close EMPTY');
    }
  };

  const onEdit = (items) => {
    navigation.navigate('NewCategory', { editCategory: true, items: items })
  }

  const onMerge = () => {
  }

  const onDelete = (id) => {
    setCategoryLoader(true)
    // console.log('AuthToken is ', authToken);

    fetch(`https://api-finwiz.softsquare.io/api/user/user-categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },

    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('Categories', data.data);
        // const array=data.data
        console.log(data);
        getCategories()
        closeSheet()



      })
      .catch((error) => {
        console.log(error);
        // setLoader(false)
      });




  }

  const clearAllData = async () => {
    dispatch(setBasicinfoCompleted(false))
    dispatch(setPhoneVerified(false))
    dispatch(setSyncAccountDone(false))
    dispatch(setAuthToken(null))
    dispatch(setTokenSaved(false))
    dispatch(setAccountId(''))

    try {
      await AsyncStorage.clear();
      console.log('All AsyncStorage data has been cleared.');
    } catch (error) {
      console.error('Error clearing AsyncStorage data:', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* mainview starts */}
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      {/* TOP BAR STARTS*/}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../../../assets/Images/logo.png')}
            style={{ height: 26, width: 27 }} />
          <Image
            source={require('../../../../assets/Images/finwiz.png')}
            style={{ height: 15, width: 58, marginLeft: 8 }}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

          <Text onPress={() => {
            console.log('LOGOUT PRESSED');
            dispatch(setAuthToken(null))
            
            dispatch(setstack('WelcomeNav'))
            dispatch(setWelcomeNavStatus(0))
            clearAllData()
          }
          } style={{ marginEnd: 16, fontWeight: 'bold', color: 'red' }}>logout</Text>
          {/* BELLICON STARTS */}
          <TouchableOpacity>
            <View style={{ height: 33, width: 33, borderRadius: 20, backgroundColor: '#E5E7EB', alignSelf: 'center', justifyContent: 'center' }}>
              <Image source={require('../../../../assets/Images/bellicon.png')}
                style={{ height: 24, width: 24, alignSelf: 'center' }}
              />
            </View>
          </TouchableOpacity>
          {/* ProfileIcon */}
          <TouchableOpacity>
            <View style={{ height: 33, width: 33, backgroundColor: '#E5E7EB', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
              <Image source={require('../../../../assets/Images/user.png')}
                style={{ height: 24, width: 24, alignSelf: 'center', }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* top bar ends */}
      <BottomSheet
        ref={bottomSheetRef}
        height={200} // Adjust the height according to your requirements
        duration={250} // Animation duration in milliseconds
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {

            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,

          }
        }}
      >
        <MenuComponent lockCategory={lockCategory} menuItem={menuItem} onDelete={onDelete} onEdit={onEdit} onMerge={onMerge} />
      </BottomSheet>

      <ScrollView style={styles.mainview}>


        {/* BALANCE VIEW STARTS */}
        <View style={{ height: 150, marginHorizontal: 16, marginTop: 24, }}>
          <ImageBackground source={require('../../../../assets/Images/balanceview.png')} resizeMode='stretch' style={styles.balanceview}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
              <View style={{ justifyContent: 'center' }}>
                <TouchableOpacity>
                  <View style={{ height: 31, width: 100, backgroundColor: '#FFFFFF10', borderRadius: 20, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Image
                      source={require('../../../../assets/Images/calendarwhite.png')}
                      style={{ height: 20, width: 20 }}
                    />
                    <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '500' }}>July</Text>
                    <Image
                      source={require('../../../../assets/Images/downarrowwhite.png')}
                      style={{ height: 20, width: 20 }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 12, paddingHorizontal: 16, }}>
              <View style={{ flex: 1, height: 75, justifyContent: 'center' }}>
                <Text style={{ fontSize: 30, fontWeight: '500', color: '#ffffff' }}>${totalBalance}</Text>
                <Text style={{ fontSize: 12, fontWeight: '500', color: '#ffffff80' }}>Total Balance</Text>
              </View>
              <View style={{ height: 75, justifyContent: 'center', }}>
                <Text style={{ fontSize: 30, fontWeight: '500', color: '#ffffff' }}>${availableBalance}</Text>
                <Text style={{ fontSize: 12, fontWeight: '500', color: '#ffffff80' }}>Unassigned Cash</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        {/* balance view ends */}

        {/* BUDGETVIEW STARTS */}
        <View style={{ height: 30, marginHorizontal: 16, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: 'black', marginRight: 12, alignItems: 'center' }}>Budget </Text>
            <Text style={{ fontSize: 16, fontWeight: '400', color: '#4B5563', textAlign: 'center', }}>July</Text>
            <Image source={require('../../../../assets/Images/downarrow.png')}
              style={{ height: 20, width: 20, alignSelf: 'center', marginLeft: 10 }}
            />
          </View>
          <View style={{ justifyContent: 'center' }}>
            <TouchableOpacity>
              <Text style={{ fontSize: 16, fontWeight: '400', color: '#000' }}>Edit</Text>
            </TouchableOpacity>
          </View>

        </View>
        {/* budgetview ends */}


        {/* BUDGET VIEW BOTTOM */}

        <View style={{ height: 50, width: '66%', marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <TouchableOpacity>
            <View style={{ backgroundColor: '#1F2A37', borderRadius: 15, height: 29, justifyContent: 'center', width: 49, alignItems: 'center' }}><Text style={{ fontSize: 14, fontWeight: '500', color: '#FFFFFF', borderRadius: 20, justifyContent: 'center' }}>All</Text></View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ backgroundColor: '#E5E7EB', borderRadius: 15, height: 29, justifyContent: 'center', width: 84, alignItems: 'center' }}><Text style={{ fontSize: 14, fontWeight: '500', color: '#000', borderRadius: 20, justifyContent: 'center' }}>Flexible</Text></View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ backgroundColor: '#E5E7EB', borderRadius: 15, height: 29, justifyContent: 'center', width: 69, alignItems: 'center' }}><Text style={{ fontSize: 14, fontWeight: '500', color: '#000', borderRadius: 20, justifyContent: 'center' }}>Fixed</Text></View>
          </TouchableOpacity>
        </View>
        {/* BUDGET BOTTOM */}
        {categoryLoader ?
          <ActivityIndicator style={{ height: 250, justifyContent: 'center', alignItems: 'center', }} size={'large'} color={'black'}></ActivityIndicator>
          :
          <FlatList
            data={budgets}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 16 }}
            renderItem={({ item, index }) => <DetailedCard openSheet={openSheet} key={index} index={index}
              item={item} openView={openView} onClick={onClick}

            />
            }
            keyExtractor={(item) => {
              const key = item.id.toString();
              return key;
            }}
          />
        }





      </ScrollView>
      {/* mainview ends */}



    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  mainview: {
    flex: 1,
    backgroundColor: 'white',
  },
  balanceview: {
    width: '100%',
    paddingVertical: 16
  }
});

export default HomeScreen;
