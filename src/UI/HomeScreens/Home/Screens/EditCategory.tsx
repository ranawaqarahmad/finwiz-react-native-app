import { View, Text, SafeAreaView, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import DetailedCard from '../Components/DetailedCard';
import * as Progress from 'react-native-progress';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import MultiSliderComponent from '../Components/MultiSliderComponent';

const EditCategory = ({ }) => {
  const [errorVisible, setErrorVisible] = useState(false)
  const [errorText, setErrorText] = useState('')
  const navigation = useNavigation()
  const route = useRoute();
  const selector = useSelector(state => state.AppReducer);
  const authToken = selector.authToken;
  const { item } = route.params;
  console.log('This is the data we are getting in edit category', item);

  const [categoryDetails, setCategoryDetails] = useState();
  const [progress, setProgress] = useState(0);
  const [loader, setLoader] = useState(true)

  const [spendingLimit, setSpendingLimit] = useState(item.limitation)
  useEffect(() => {
    console.log('ITEM IS======================', item);

    setCategoryDetails(item);

    setLoader(false)
  }, [item]);

  const dispatch = useDispatch()




  const percent = (value, outof) => {
    var percent = value / outof;
    var string = (percent * 100).toString();
    var percentString = string.split('')
    var words = percentString.slice(0, 2).join('');
    return words
  }

  const openView = () => {
    setCategoryDetails(prevDetails => ({
      ...prevDetails,
      opened: !prevDetails.opened
    }));


  }

  const onChangeSlider = (value) => {
    const roundedValue = Math.round(value);
    console.log(roundedValue);
    setSpendingLimit(roundedValue);




  }



  const convertStringToNumber = (str) => {
    // Use parseFloat() to convert to a floating-point number
    return parseFloat(str);
  };


  const editCategory = async () => {
    setLoader(true);
    console.log('AuthToken is ', authToken);




    setCategoryDetails(prevDetails => ({
      ...prevDetails,
      limitation: spendingLimit
    }));
    console.log(categoryDetails.category_name);
    console.log('Spending limit is  =========================== ', convertStringToNumber(spendingLimit));
    console.log([categoryDetails.category_id]);
    const userCategories = []
    categoryDetails.user_category_pivots.map((item, index) => {
      // console.log('--------====-------------', item.category_id);
      userCategories.push(item.category_id)
    })



    try {
      await fetch(`https://api-finwiz.softsquare.io/api/user/user-categories/${categoryDetails.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category_name: categoryDetails.category_name,
          limitation: convertStringToNumber(spendingLimit),
          fixed: item.fixed

        }),
      }).then((response) => response.json())
        .then((data) => {

          console.log('Data is ', data);


          if (data.status == 'true') {
            console.log(data);
            navigation.navigate('HomeScreen')

          } else {
            setLoader(false)
            setErrorText(data.message)
            setErrorVisible(true)
          }


        })
        .catch((error) => {
          console.log(error);
          setLoader(false)
        });


    }
    catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  return (
    <View></View>
    // <View style={styles.container}>
    //   {/* mainview starts */}
    //   <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
    //   <View style={{ flex: 1 }}>
    //     {/* TOP BAR STARTS*/}
    //     <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16 }}>
    //       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //         <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Edit Budget</Text>


    //       </View>

    //       <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    //         {/* BELLICON STARTS */}

    //         <View style={{ borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
    //           <Text style={{ fontSize: 16, fontWeight: '400', color: '#4B5563' }}>
    //             This Month
    //           </Text>
    //         </View>
    //         {/* down arrow */}
    //         <TouchableOpacity style={{ marginStart: 5 }}>
    //           <Image source={require('../../../../assets/Images/downarrow.png')}
    //             style={{ height: 20, width: 20, alignSelf: 'center', }}
    //           />
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //     {/* top bar ends */}
    //     {loader ?
    //       <View style={{ flex: 1, justifyContent: 'center', }}>
    //         <ActivityIndicator size={'large'} color={'#6C2BD9'}></ActivityIndicator>
    //       </View>
    //       :

    //       <View style={styles.mainview}>
    //         <View style={styles.upperview}>
    //           <View style={{ justifyContent: 'center' }}>
    //             <View style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center', backgroundColor: item.backgroundColor, borderRadius: 5 }}>
    //               <Text style={{ fontWeight: 'bold', color: 'white' }}>{item.category_name.charAt(0)}</Text>
    //             </View>
    //           </View>

    //           {/* text1 */}
    //           <View style={{ justifyContent: 'center', flex: 1 }}>
    //             <Text style={{ fontSize: 16, fontWeight: '600', color: 'black', paddingLeft: 12 }}>{categoryDetails.category_name}</Text>
    //           </View>
    //           {/* image2 */}
    //           <View style={{ justifyContent: 'center', flexDirection: 'row', alignSelf: 'center', }}>

    //             <Image source={require('../../../../assets/Images/verticaldots.png')}
    //               style={{ height: 20, width: 20, }}
    //               resizeMode='contain'
    //             />

    //           </View>
    //         </View>

    //         <View style={styles.view2}>
    //           {/* VIEW A */}
    //           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16 }}>
    //             <Text style={{ fontSize: 14, fontWeight: '600', color: '#111928' }}>Spending Limit</Text>
    //             <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1F2A37' }}>{'$'}{spendingLimit}</Text>
    //           </View>


    //           <View style={{ alignItems: 'center' }}>

    //             <MultiSliderComponent onChangeSlider={onChangeSlider} item={categoryDetails} />

    //           </View>




    //           {/* VIEW C */}
    //           <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16 }}>
    //             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //               <Text style={{ fontSize: 12, fontWeight: 'normal', color: '#6B7280' }}>Recommended Range:  $230 - 300</Text>
    //             </View>
    //             {/* <View>
    //               <Text style={{ color: '#1F2A37', alignItems: 'center' }}>{categoryDetails.dayLeft}{' days left'}</Text>
    //             </View> */}
    //           </View>
    //         </View>
    //         {errorVisible && <Text style={{ color: 'red', fontWeight: '400', margin: 16 }}>{errorText}</Text>}


    //         {/* <TouchableOpacity onPress={() => { openView() }} style={{
    //           flexDirection: 'row', borderBottomLeftRadius: 8,
    //           borderBottomRightRadius: 8, justifyContent: 'space-between', alignItems: 'center',
    //           marginTop: 20,marginHorizontal:16
    //         }}>
    //           <Text style={{ color: '#111928', fontSize: 14, fontWeight: '600' }}>Subcategories</Text>
    //           <Image

    //             source={categoryDetails.opened ? require('../../../../assets/Images/downarrow.png') : require('../../../../assets/Images/righthalfarrow.png')}
    //             style={{ height: 20, width: 20 }}
    //           />
    //         </TouchableOpacity> */}

    //         {/* {categoryDetails.opened && (
    //           <View style={{ marginHorizontal:16 }}>


    //             {
    //               categoryDetails.subcategories.map((item, index) => <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 }}>
    //                 <View style={{ alignSelf: 'center' }}>
    //                   <Text style={styles.mortgagerentelectricitytext}>{item.title}</Text>
    //                   <Text style={styles.transactiontext}>{item.transactions}{' Transactions'}</Text>
    //                 </View>
    //                 <View style={{ alignSelf: 'center' }}>
    //                   <Text style={{ textAlign: 'right', fontSize: 14, fontWeight: '700', color: '#1F2A37' }}>{'$'}{item.spent}<Text style={{ textAlign: 'right', fontSize: 14, fontWeight: 'normal' }}>{' of $'}{item.budget}</Text></Text>
    //                   <Text style={styles.remainingbalance}>{'Remaining Balance'}</Text>
    //                 </View>
    //               </View>

    //               )
    //             }


    //           </View>
    //         )} */}

    //       </View>

    //     }
    //   </View>

    //   {/* mainview ends */}
    //   <View style={{ flexDirection: 'row', marginHorizontal: 16, columnGap: 16, height: 50, bottom: 0 }}>
    //     <TouchableOpacity onPress={() => navigation.goBack()} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
    //       <Text style={{ fontSize: 16, color: '#7C56FE', fontWeight: '600' }}>Cancel</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity onPress={() => editCategory()} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#7C56FE', borderRadius: 8 }}>
    //       <Text style={{ fontSize: 16, color: 'white', fontWeight: '600' }}>Save Budget</Text>
    //     </TouchableOpacity>

    //   </View>
    // </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between'
  },
  balanceview: {
    width: '100%',
    paddingVertical: 16
  },
  mainview: {
    marginTop: 15,
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: 'white',
    elevation: 10,
    marginHorizontal: 16,
    paddingVertical: 16
  },
  view2: {
    marginTop: 24,
  },
  upperview: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center'

  },
  mortgagerentelectricitytext: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4
  },
  transactiontext: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  remainingbalance: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4
  }
});

export default EditCategory