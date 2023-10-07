import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, View, TouchableOpacity, Text, StyleSheet, SafeAreaView, ScrollView, Image, ImageBackground, FlatList, ActivityIndicator } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import DetailedCard from '../Components/DetailedCard';
import { useSelector } from 'react-redux';
import BottomSheet from "react-native-raw-bottom-sheet";
import MenuComponent from '../Components/MenuComponent';

const HomeScreen = () => {
  const navigation = useNavigation()
  const selector = useSelector(state => state.AppReducer);
  const authToken = selector.authToken;
  const [categoryLoader, setCategoryLoader] = useState(false)

  const isFocused = useIsFocused()
  useEffect(() => {

    console.log('USE EFFECT');
    
    setTotalBalance(0)
    setAvailableBalance(0)

    getCategories()
    authUser()
    closeSheet()
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
  const [totalBalance, setTotalBalance] = useState(0)
  const [availableBalance, setAvailableBalance] = useState(0)


  const bottomSheetRef = useRef<BottomSheet>(null);
  const [budgets, setBudgets] = useState([
    // {
    //   icon: require('../../../../assets/Images/hammericon.png'),
    //   title: 'Bills and Utilities',
    //   budget: '2000',
    //   spent: '1000',
    //   opened: false,
    //   dayLeft: '14',
    //   subcategories: [
    //     {
    //       title: 'Mortage',
    //       budget: '700',
    //       spent: '680',
    //       transactions: '3',
    //     },
    //     {
    //       title: 'Rent',
    //       budget: '700',
    //       spent: '500',
    //       transactions: '3',
    //     },
    //     {
    //       title: 'Electricity',
    //       budget: '600',
    //       spent: '200',
    //       transactions: '3',
    //     },
    //   ]


    // },
    // {
    //   icon: require('../../../../assets/Images/healthplus.png'),
    //   title: 'Health and Fitness',
    //   budget: '1300',
    //   spent: '200',
    //   opened: false,

    //   dayLeft: '11',
    //   subcategories: [
    //     {
    //       title: 'Hospital',
    //       budget: '700',
    //       spent: '100',
    //       transactions: '3',
    //     },
    //     {
    //       title: 'Medicines',
    //       budget: '700',
    //       spent: '100',
    //       transactions: '3',
    //     },

    //   ]


    // },
    // {
    //   icon: require('../../../../assets/Images/pinkicon.png'),
    //   title: 'Entertainment',
    //   budget: '1000',
    //   spent: '500',
    //   opened: false,

    //   dayLeft: '11',
    //   subcategories: [
    //     {
    //       title: 'Cinema',
    //       budget: '700',
    //       spent: '300',
    //       transactions: '1',
    //     },
    //     {
    //       title: 'Sports',
    //       budget: '300',
    //       spent: '100',
    //       transactions: '3',
    //     },

    //   ]


    // },
    // {
    //   icon: require('../../../../assets/Images/foodicon.png'),
    //   title: 'Food and Drinks',
    //   budget: '500',
    //   spent: '200',
    //   opened: false,

    //   dayLeft: '11',
    //   subcategories: [
    //     {
    //       title: 'Lunch',
    //       budget: '300',
    //       spent: '100',
    //       transactions: '1',
    //     },
    //     {
    //       title: 'Cofee',
    //       budget: '200',
    //       spent: '50',
    //       transactions: '3',
    //     },

    //   ]


    // },
    // {
    //   icon: require('../../../../assets/Images/subscription.png'),
    //   title: 'Subscription',
    //   budget: '250',
    //   spent: '100',
    //   opened: false,

    //   dayLeft: '11',
    //   subcategories: [
    //     {
    //       title: 'Netflix',
    //       budget: '250',
    //       spent: '50',
    //       transactions: '1',
    //     },


    //   ]


    // },
  ])

  const getCategories = async () => {
    setCategoryLoader(true)
    // console.log('AuthToken is ', authToken);

    fetch(`https://api-finwiz.softsquare.io/api/user/user-all-categories/vdaWNKxMroSqBXWpz33AH8Ez4vb7qJCqGK1bL`, {
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
        // setLoader(false)
      });



  };
  const convertStringToNumber = (str) => {

    // Use parseFloat() to convert to a floating-point number
    return parseFloat(str);
  };
  const authUser = async () => {

    console.log('AUTH USER IS ACTIVE');
    console.log('AUTH USER IS ACTIVE');
    console.log('AUTH USER IS ACTIVE');
    console.log('AUTH USER IS ACTIVE');
    console.log('AUTH USER IS ACTIVE');
    console.log('AUTH USER IS ACTIVE');
    console.log('AUTH USER IS ACTIVE');

    
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
        data.data[0].auth.map((item, index) => {


          if (item.balances_current) {
            setTotalBalance((prevTotalBalance) => prevTotalBalance + convertStringToNumber(item.balances_current));

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

        <View style={{ width: '24%', flexDirection: 'row', justifyContent: 'space-between' }}>
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
          height={250} // Adjust the height according to your requirements
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
          <MenuComponent menuItem={menuItem} onDelete={onDelete} onEdit={onEdit} onMerge={onMerge} />
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



    </SafeAreaView>
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
