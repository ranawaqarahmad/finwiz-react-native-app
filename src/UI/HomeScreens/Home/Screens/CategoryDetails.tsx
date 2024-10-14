import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import EditCategory from './EditCategory';
import {LineChart} from 'react-native-chart-kit';
import {log} from 'console';
import LiabilityComp from '../../../CategoryScreens/Category/Components/LiabilityComp';
import {useSelector, useDispatch} from 'react-redux';
import RetirementComp from '../../../CategoryScreens/Category/Components/RetirementComp';
import PlannedPurchaseComp from '../../../CategoryScreens/Category/Components/PlannedPurchaseComp';
import Swiper from 'react-native-swiper';

const CategoryDetails = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('CoffeeCat');
  };
  const route = useRoute();
  const {item} = route.params;
  // console.log('THIS IS ITEM', item.user_category_pivots[0].category);
  const selector = useSelector(state => state.AppReducer);
  const dispatch = useDispatch();
  const authToken = selector.authToken;

  const [categoryDetails, setcategoryDetails] = useState(item);

  const [totalCount, setTotalCount] = useState();

  const [LiabilityItem, setLiabilityItem] = useState();
  const [RetirementItem, setRetirementItem] = useState();
  const [plannedpurchaseItem, setplannedpurchaseItem] = useState();

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    var total = 0;
    item?.user_category_pivots?.map(items => {
      {
        items?.category?.sub_category?.map(aitem => {
          total = total + aitem.count;
          console.log(total);
        });
      }
    });

    setTotalCount(total);
  }, []);

  function getCurrentMonth() {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const currentMonthIndex = new Date().getMonth(); // getMonth() returns 0-11
    return monthNames[currentMonthIndex];
  }

  useEffect(() => {
    setLoader(true);
    fetch(
      `https://api-finwiz.softsquare.io/api/user/category-graph-data/${item.user_category_pivots[0]?.category?.id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        if (item.user_category_pivots[0]?.category?.name == 'Liabilities') {
          setLiabilityItem(data.data);
        }

        if (item.user_category_pivots[0]?.category?.name == 'Retirement') {
          setRetirementItem(data.data);
        }

        if (
          item.user_category_pivots[0]?.category?.name == 'Planned Purchase'
        ) {
          setplannedpurchaseItem(data.data);
        }

        setLoader(false);
      })
      .catch(error => {
        console.log(error);
        setLoader(false);
      });
  }, []);

  const swiperRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = index => {
    // Update the state with the new index
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View></View>
      <StatusBar backgroundColor={'#FFFFFF'} barStyle={'dark-content'} />
      <ScrollView contentContainerStyle={{padding: 16}} style={styles.mainview}>
        {/* BACK ARROW AND MONTH STARTS*/}
        <View
          style={{
            height: 33,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              height: 33,
              width: '28%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{height: 30, width: 30, justifyContent: 'center'}}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../../../../assets/Images/backarrow.png')}
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: 33,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                height: 33,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 16, fontWeight: '400', color: '#4B5563'}}>
                {getCurrentMonth()}
              </Text>
            </View>
            <TouchableOpacity>
              <View
                style={{
                  height: 33,
                  width: 33,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../../../../assets/Images/downarrow.png')}
                  style={{height: 20, width: 20, alignSelf: 'center'}}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* back arrow and month ends */}

        {/* EDIT CATEGORY STARTS */}
        <View
          style={{
            width: '100%',
            marginTop: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {/* food icon and text*/}
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: item.backgroundColor,
                borderRadius: 5,
              }}>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize: 24}}>
                {item.category_name.charAt(0)}
              </Text>
            </View>
            <View style={{marginLeft: 12}}>
              <Text style={{fontSize: 16, fontWeight: '600', color: '#111928'}}>
                {categoryDetails.category_name}
              </Text>
              <Text style={{fontSize: 14, fontWeight: '400', color: '#6B7280'}}>
                {totalCount} Transactions
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (
                item.user_category_pivots[0]?.category?.name ==
                'Planned Purchase'
              ) {
                navigation.navigate('PlanPurchase', {type: 'null'});
              } else {
                navigation.navigate('RecordExpense', {type: 'null'});
              }
            }}>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 33,
                width: 81,
                justifyContent: 'center',
                borderColor: '#F09F4B',
                height: 33,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#F09F4B',
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                +Add
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* edit category ends */}

        {/* spending limit starts */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 14, fontWeight: 'bold', color: '#111928'}}>
            Spending Limit
          </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#111928'}}>
            {'$'}
            {categoryDetails.limitation}
          </Text>
        </View>
        {/* s imit starts */}

        {/* Spending Limit Text */}
        <View style={{flexDirection: 'row', marginTop: 10, columnGap: 8}}>
          <View
            style={{
              backgroundColor: '#FACA15',
              borderRadius: 100,
              height: 9,
              width: 9,
              marginTop: 2,
            }}
          />
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'normal',
              color: '#6B7280',
              flex: 1,
            }}>
            Finwiz Recommended limit is $300 for this category, based on your
            income and expenses
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('NewCategory', {
              items: item,
              editCategory: true,
            })
          }
          style={{
            marginTop: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#F09F4B',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 8,
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: '#F09F4B',
              flex: 1,
            }}>
            Edit Category
          </Text>
        </TouchableOpacity>
        {/* Spending Limit Text */}

        {/* Chart */}

        {!loader ? (
          <Swiper
            index={currentIndex}
            ref={swiperRef}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
              columnGap: 8,
            }}
            onIndexChanged={handleSlideChange}
            loop={false}
            showsPagination={true}
            height={340} // Adjust the height as needed
            activeDotColor="#9747FF"
            containerStyle={{marginTop: 32}}
            dotColor="#D6D6D6">
            <View
              style={{
                height: 280,
                paddingVertical: 8,
                elevation: 1,
                backgroundColor: 'white',
                margin: 2,
                marginEnd: 8,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#6B7280',
                  marginBottom: 7,
                  marginHorizontal: 16,
                }}>
                Spending Summary
              </Text>

              <LineChart
                data={{
                  labels: [
                    '1',
                    '30',
                    '1',
                    '30',
                    '1',
                    '30',
                    '1',
                    '30',
                    '1',
                    '30',
                    '1',
                    '30',
                    '1',
                    '30',
                  ],
                  datasets: [
                    {
                      data: [0, item.manual_spending],
                    },
                    {
                      data: [item.limitation],
                      color: () => item.backgroundColor,
                      strokeWidth: 1,
                      withDots: false,
                    },
                  ],
                }}
                width={Dimensions.get('window').width - 64}
                height={200}
                style={{marginHorizontal: 8, paddingRight: 0, marginTop: 25}}
                withOuterLines={false} // Hide outer lines
                withHorizontalLabels={false} // Hide horizontal labels
                withHorizontalLines={false} // Hide horizontal grid lines
                withVerticalLines={false} // Show vertical grid lines
                withVerticalLabels={false} // Hide vertical labels
                withDots={false} // Hide data points dots
                withShadow={false}
                bezier={true}
                chartConfig={{
                  backgroundGradientFrom: 'white',
                  backgroundGradientTo: 'white',

                  fillShadowGradient: 'white',
                  backgroundColor: 'white',
                  color: (opacity = 1) => item.backgroundColor, // Change color here
                }}
              />

              <View style={{position: 'absolute', width: '90%'}}>
                <View
                  style={{
                    width: '100%',
                    marginTop: 32,
                    flex: 1,
                    height: 180,
                    marginHorizontal: 16,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#111928',
                      marginBottom: 20,
                    }}>
                    {'$'}
                    {categoryDetails.limitation}
                  </Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderStyle: 'dashed',
                      borderColor: '#9CA3AF',
                      width: '100%',
                    }}></View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 24,
                    marginHorizontal: 16,
                  }}>
                  <Text
                    style={{fontSize: 14, fontWeight: '500', color: '#000'}}>
                    Day 1
                  </Text>
                  <Text
                    style={{fontSize: 14, fontWeight: '500', color: '#000'}}>
                    Day 30
                  </Text>
                </View>
              </View>
            </View>
            {LiabilityItem && <LiabilityComp key={2} item={LiabilityItem} />}
            {RetirementItem && (
              <RetirementComp item={RetirementItem} authToken={authToken} />
            )}
            {plannedpurchaseItem && (
              <PlannedPurchaseComp key={2} item={plannedpurchaseItem} />
            )}
          </Swiper>
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator
              size={'large'}
              color={'#7C56FE'}></ActivityIndicator>
          </View>
        )}

        {/* <View style={{ justifyContent: 'center', width: '100%', marginTop: 8 }}>
                    <Image source={require('../../../../assets/Images/horizontaldots.png')}
                        style={{ height: 6, width: 25, alignSelf: 'center' }}
                    />
                </View> */}
        {/* Edit Category ends */}

        <View style={{marginTop: 25}}>
          <Text style={{fontSize: 14, fontWeight: '600', color: '#000'}}>
            Overview
          </Text>
        </View>

        {/* {
                    categoryDetails.subcategories.map((item, index) => <View key={index}>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#000' }}>{item.title}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SubCategoryDetails', { basicDetails: item })}>
                                <Image source={require('../../../../assets/Images/righthalfarrow.png')}
                                    style={{ height: 20, width: 20 }}
                                />
                            </TouchableOpacity>

                        </View>
                        <Text style={{ marginTop: 3, fontSize: 14, fontWeight: '400' }}>{item.transactions} Transactions</Text>
                    </View>
                    )
                } */}

        {categoryDetails?.user_category_pivots?.map((item, index) => (
          <View style={{marginTop: 16, rowGap: 8}} key={index}>
            {item.category?.sub_category?.map((items, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SubCategoryDetails', {
                    basicDetails: items,
                  })
                }
                key={index}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                  }}>
                  <Text
                    style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
                    {items.category}
                  </Text>
                  <TouchableOpacity>
                    <Image
                      source={require('../../../../assets/Images/righthalfarrow.png')}
                      style={{height: 20, width: 20}}
                    />
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    marginTop: 3,
                    fontSize: 14,
                    fontWeight: '400',
                    color: '#1F2A37',
                  }}>
                  {items.count} Transactions
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  mainview: {
    flex: 1,
  },
  mortgagerentelectricitytext: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  transactiontext: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeDot: {
    backgroundColor: '#9747FF',
    width: 8,
    height: 8,
    borderRadius: 100,
  },
  dot: {
    backgroundColor: '#D6D6D6',
    width: 8,
    height: 8,
    borderRadius: 100,
  },
  slide: {
    flex: 1,
  },
});
export default CategoryDetails;
