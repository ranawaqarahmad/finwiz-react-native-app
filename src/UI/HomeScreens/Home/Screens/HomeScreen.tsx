import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, View, TouchableOpacity, Text, StyleSheet, SafeAreaView, ScrollView, Image, ImageBackground, FlatList, ActivityIndicator, Modal, TouchableOpacityBase, Animated } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import DetailedCard from '../Components/DetailedCard';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet from "react-native-raw-bottom-sheet";
import MenuComponent from '../Components/MenuComponent';
import { setAccountId, setNotificationsCount, setAuthToken, setBasicinfoCompleted, setPhoneVerified, setSyncAccountDone, setTokenSaved, setTotalBalances, setWelcomeNavStatus, setstack } from '../../../../redux/AppReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScrollViewDropDown from '../Components/ScrollViewDropDown';



const HomeScreen = () => {
  const navigation = useNavigation()
  const selector = useSelector(state => state.AppReducer);
  const dispatch = useDispatch()
  const authToken = selector.authToken;
  const [categoryLoader, setCategoryLoader] = useState(false)
  const isFocused = useIsFocused()
  const [type, setType] = useState(null)
  const [nextMonth1, setNextMonth1] = useState('')
  const [nextMonth2, setNextMonth2] = useState('')

  const [apiCallDOne, setApiCallDone] = useState(false)



  useEffect(() => {


    setTotalBalance(0)
    setAvailableBalance(0)
    getCategories(type)
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


  const createInsights = async () => {

    fetch(`https://api-finwiz.softsquare.io/api/user/generate-insight`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },


    })
      .then((response) => response.json())
      .then((data) => {



      })
      .catch((error) => {
        console.log(error);
      });



  };

  const colors = ['#B39966', '#E499F9', '#ED8080', '#F09F4B', '#848C93'];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  const [menuItem, setMenuItem] = useState()
  const [month, setMonth] = useState('')
  const [totalBalance, setTotalBalance] = useState(selector.totalBalance)
  const [availableBalance, setAvailableBalance] = useState(0)
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [budgets, setBudgets] = useState([])

  const [budgets2, setBudgets2] = useState([])
  const [budgets3, setBudgets3] = useState([])


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

  const unlockCategory = async (items) => {
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
          fixed: 0


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

  const getCategories = async (type) => {
    setCategoryLoader(true)
    fetch(`https://api-finwiz.softsquare.io/api/user/user-all-categories/${type}`, {
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
        const array1 = []
        const array2 = []

        console.log('MONTH IS THIS',data);
        console.log('Future 1st Month IS THIS',data?.data.futureMonth[0][0]?.month);
        console.log('Future 2nd MONTH IS THIS',data?.data.futureMonth[1][0]?.month);

        
        const month = data?.data.currentMonth[0]?.month;
        setNextMonth1(data?.data.futureMonth[0][0]?.month)
        setNextMonth2(data?.data.futureMonth[1][0]?.month)



        if (month) {
          const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
          setMonth(capitalizedMonth);
        } else {
          // Handle the case where month is null or undefined
          setMonth(''); // or setMonth(null) or any default value as needed
        }

        // setMonth(data.data[0].month.toUpperCase())
        data.data.currentMonth.map((item) => {
          // console.log(item);
          array.push({ ...item, backgroundColor: getRandomColor() })
        });

        data.data.futureMonth[0].map((item) => {
          // console.log(item);
          array1.push({ ...item, backgroundColor: getRandomColor() })
        });
        data.data.futureMonth[0].map((item) => {
          // console.log(item);
          array2.push({ ...item, backgroundColor: getRandomColor() })
        });
        console.log('ARRaY', data);
        console.log(array);


        setBudgets(array)
        setBudgets2(array1)
        setBudgets3(array2)

        setApiCallDone(true)

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
        var amount = 0
        var unassignedcash = 0
        data.data[0].auth.map((item, index) => {



          if (item.balances_current) {
            amount = amount + convertStringToNumber(item.balances_current)
            setTotalBalance(amount);
            console.log('TOTAL BALANCE IN HOME', amount);



          }


          if (item.balances_available) {
            unassignedcash = unassignedcash + convertStringToNumber(item.balances_available)
            setAvailableBalance(unassignedcash);
            dispatch(setTotalBalances(amount))
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
    navigation.navigate('Merge')
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

  useEffect(() => {
    createInsights()
  }, [])

  useEffect(() => {
    readAll()
    setOpen(false)

  }, [isFocused])


  const readAll = async () => {


    fetch(`https://api-finwiz.softsquare.io/api/user/unseen-notifications`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {



        if (data.status == 'true') {



          if (data.data.data.length == 0) {
            setNotifications(false)
            dispatch(setNotificationsCount('false'))
          } else {
            setNotifications(true)
            dispatch(setNotificationsCount('true'))


          }


        }

      })
      .catch((error) => {


      });



  };

  const ChatNav = () => {

    navigation.navigate('ChatNav')
  };


  const [isFloatingButtonVisible, setisFloatingButtonVisible] = useState(true);
  const floatingButtonOpacity = useRef(new Animated.Value(1)).current;
  const floatingButtonScale = useRef(new Animated.Value(1)).current;

  const animateFloatingButton = () => {
    // Hide the button with spring animation
    Animated.parallel([
      Animated.timing(floatingButtonOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(floatingButtonScale, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After 2 seconds, show the button with spring animation
      setTimeout(() => {
        Animated.parallel([
          Animated.spring(floatingButtonOpacity, {
            toValue: 1,
            useNativeDriver: true,
          }),
          Animated.spring(floatingButtonScale, {
            toValue: 1,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setisFloatingButtonVisible(true);
        });
      }, 1000);
    });
  };

  const handleScroll = () => {
    // Trigger the animation when scrolling occurs
    animateFloatingButton();
  };


  const [notifications, setNotifications] = useState(false)

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (apiCallDOne) {
      setItems([
        { label: month, value: 'month' },
        { label: nextMonth1, value: 'nextMonth1' },
        { label: nextMonth2, value: 'nextMonth2' },
      ]);
    }
  }, [apiCallDOne]); // This useEffect will run whenever apiCallDone changes



  const onDropDownChange=(value)=>{

    setCategoryLoader(true)
    

    if(value=='month'){
      setBudgets(budgets)
    }
    if(value=='nextMonth1'){
      setBudgets(budgets2)
    }
    if(value=='nextMonth2'){
      setBudgets(budgets3)
    }

    setTimeout(() => {
      setCategoryLoader(false)
      
    }, 2000);

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

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', columnGap: 8 }}>

          <Text onPress={() => {
            console.log('LOGOUT PRESSED');
            dispatch(setAuthToken(null))
            dispatch(setstack('WelcomeNav'))
            dispatch(setWelcomeNavStatus(0))
            clearAllData()
          }
          } style={{ marginEnd: 16, fontWeight: 'bold', color: 'red' }}>logout</Text>
          {/* BELLICON STARTS */}
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <View style={{ height: 33, width: 33, borderRadius: 20, backgroundColor: '#E5E7EB', alignSelf: 'center', justifyContent: 'center' }}>
              {selector.notifications == 'true' && (
                <View style={{ width: 8, height: 8, backgroundColor: 'red', borderRadius: 100, position: 'absolute', right: 0, top: 0 }}></View>
              )}
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
        <MenuComponent unlockCategory={unlockCategory} lockCategory={lockCategory} menuItem={menuItem} onDelete={onDelete} onEdit={onEdit} onMerge={onMerge} />
      </BottomSheet>

      <ScrollView onScroll={handleScroll} showsVerticalScrollIndicator={false} style={styles.mainview}>


        {/* BALANCE VIEW STARTS */}
        <View style={{ height: 150, marginHorizontal: 16, marginTop: 24, }}>
          <ImageBackground source={require('../../../../assets/Images/balanceview.png')} resizeMode='stretch' style={styles.balanceview}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
              <View style={{ justifyContent: 'center' }}>
                <View>
                  <View style={{ height: 31, columnGap: 8, paddingHorizontal: 8, backgroundColor: '#FFFFFF10', borderRadius: 20, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Image
                      source={require('../../../../assets/Images/calendarwhite.png')}
                      style={{ height: 20, width: 20 }}
                    />
                    <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '500' }}>{month}</Text>

                  </View>
                </View>
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

        {/* 0-VIEW STARTS */}
        <View style={{ height: 30, marginHorizontal: 16, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', zIndex: 1000 }}>
          <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: 'black', marginRight: 12, alignItems: 'center' }}>Budget </Text>
            {categoryLoader == false && apiCallDOne == true && (
              <View style={{ zIndex: 1000 }}>
                <ScrollViewDropDown


onDropDownChange={onDropDownChange}

                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  modalTitle={month}
                  setValue={setValue}
                  setItems={setItems}
                />
              </View>
            )}

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
          <TouchableOpacity
            onPress={() => {
              if (type != null) {
                setType(null)
                getCategories(null)
              }

            }}
          >
            <View style={{ backgroundColor: type == null ? '#1F2A37' : '#E5E7EB', borderRadius: 15, height: 29, justifyContent: 'center', paddingHorizontal: 16, alignItems: 'center' }}><Text style={{ fontSize: 14, fontWeight: '500', color: type == null ? '#FFFFFF' : '#000000', borderRadius: 20, justifyContent: 'center' }}>All</Text></View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (type != 0) {
                setType(0)
                getCategories(0)
              }
            }}
          >
            <View style={{ backgroundColor: type == 0 ? '#1F2A37' : '#E5E7EB', borderRadius: 15, height: 29, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16, }}><Text style={{ fontSize: 14, fontWeight: '500', color: type == 0 ? '#FFFFFF' : '#000000', borderRadius: 20, justifyContent: 'center' }}>Flexible</Text></View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (type != 1) {
                setType(1)
                getCategories(1)
              }
            }}
          >
            <View style={{ backgroundColor: type == 1 ? '#1F2A37' : '#E5E7EB', borderRadius: 15, height: 29, justifyContent: 'center', paddingHorizontal: 16, alignItems: 'center' }}><Text style={{ fontSize: 14, fontWeight: '500', color: type == 1 ? '#FFFFFF' : '#000000', borderRadius: 20, justifyContent: 'center' }}>Fixed</Text></View>
          </TouchableOpacity>
        </View>
        {/* BUDGET BOTTOM */}
        {categoryLoader ?
          <ActivityIndicator style={{ height: 250, justifyContent: 'center', alignItems: 'center', }} size={'large'} color={'#7C56FE'}></ActivityIndicator>
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

        {budgets.length == 0 && categoryLoader === false && (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 32, marginEnd: 32 }} source={require('../../../../assets/Images/page.png')} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#347BFA' }}>The list is Empty</Text>
          </View>

        )}





      </ScrollView>
      {/* mainview ends */}
      {
        isFloatingButtonVisible && (
          <Animated.View
            style={{
              opacity: floatingButtonOpacity,
              transform: [{ scale: floatingButtonScale }],
              position: 'absolute',
              right: 16,
              bottom: 16,
            }}
          >
            <TouchableOpacity onPress={ChatNav} activeOpacity={0.8} style={{ backgroundColor: '#7C56FE', alignItems: 'center', justifyContent: 'center', borderRadius: 1000, width: 75, height: 75 }}>
              <Image style={{ width: 50, height: 50 }} source={require('../../../../assets/Images/chatbot.png')} />
            </TouchableOpacity>
          </Animated.View>
        )
      }




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
