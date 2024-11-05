import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CategoryComp from '../Components/CategoryComp';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import DashedLine from 'react-native-dashed-line';

const InsightScreen = () => {
  const [categories, setCategories] = useState([]);

  const [monthlyTotal, setMonthlyTotal] = useState();
  const [allMonths, setAllMonths] = useState();

  const [monthDetails, setMonthDetails] = useState();
  const [loader, setLoader] = useState(true);
  const selector = useSelector(state => state.AppReducer);
  const authToken = selector.authToken;

  const updateEnabledAtIndex = index => {
    const updatedArray = allMonths.map((item, i) => ({
      ...item,
      enabled: i === index,
    }));

    setAllMonths(updatedArray);
    setMonthDetails(updatedArray[index]);
    setCategories(updatedArray[index].category);
  };

  const colors = ['#B39966', '#E499F9', '#ED8080', '#F09F4B', '#848C93'];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  const getInsights = async () => {
    setLoader(true);

    fetch(`https://api-finwiz.softsquare.io/api/user/insights`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.status == 'true') {
          var array = [];
          const array2 = [];
          // console.log('DATA INSIGHTS ####', JSON.stringify(data.data));

          const validData = data.data.filter(item => item !== null);

          if (validData.length === 0) {
            setLoader(false);
            return;
          }

          const lastMonthDetails =
            data.data[data.data.length - 1] !== null
              ? data.data[data.data.length - 1]
              : validData[validData.length - 1];

          setMonthDetails(lastMonthDetails);

          const categoryArray = lastMonthDetails.category.map(item => ({
            ...item,
            backgroundColor: getRandomColor(),
          }));

          // data.data.map(item => {
          //   array2.push(item.total);
          // });
          getNextMonths(lastMonthDetails.month, 2);

          normalizeValues(validData);

          setAllMonths(validData);

          setCategories(categoryArray);

          normalizeAndSetState(validData);
          setLoader(false);
        }
      })
      .catch(error => {
        console.log(error);
        setLoader(false);
      });
  };

  function getMonthName(monthNumber) {
    const months = [
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

    // Ensure the monthNumber is within a valid range
    if (monthNumber >= 1 && monthNumber <= 12) {
      // Array indices are zero-based, so subtract 1 from the monthNumber
      return months[monthNumber - 1];
    } else {
      // Handle invalid month numbers
      return 'Invalid Month';
    }
  }

  function normalizeValues(inputArray) {
    // Find the maximum value in the array
    const maxInput = Math.max(...inputArray);

    // If the maximum value is 0, return an array of zeros to avoid division by zero
    if (maxInput === 0) {
      return inputArray.map(() => 0);
    }

    // Normalize each value relative to the maximum value
    const normalizedArray = inputArray.map(value => (value / maxInput) * 200);
    setMonthlyTotal(normalizedArray);
  }

  const normalizeAndSetState = data => {
    const validData = data.filter(item => item !== null && item.total);

    if (validData.length === 0) {
      console.log('No valid data to process.');
      return;
    }

    const getMaxTotal = () => {
      return Math.max(...validData.map(item => item.total));
    };

    const normalizedData = validData.map((item, index) => {
      const normalizedTotal = (item.total / getMaxTotal()) * 200;
      return {
        ...item,
        adjustedValue: normalizedTotal,
        enabled: index == data.length - 1 ? true : false,
      };
    });

    setAllMonths(normalizedData);
  };

  const [nextMonths, setNextMonths] = useState();
  function getNextMonths(currentMonth, numberOfMonths) {
    const nextMonths = [];

    for (let i = 1; i <= numberOfMonths; i++) {
      const nextMonth = (currentMonth + i) % 12 || 12; // Ensure the month is between 1 and 12
      nextMonths.push(nextMonth);
    }
    setNextMonths(nextMonths);
  }

  useEffect(() => {
    getInsights();
  }, []);

  return (
    <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <View style={{flexDirection: 'row', marginHorizontal: 16}}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
            Insights
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            columnGap: 8,
          }}>
          {/* BELLICON STARTS */}
          <TouchableOpacity onPress={() => console.log(categories)}>
            <Image
              source={require('../../../assets/Images/calendarblack.png')}
              style={{height: 24, width: 24, alignSelf: 'center'}}
            />
          </TouchableOpacity>
          {/* ProfileIcon */}
        </View>
      </View>

      {loader ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} color={'black'} />
        </View>
      ) : (
        <ScrollView>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
              marginTop: 16,
              marginHorizontal: 16,
            }}>
            {getMonthName(monthDetails.month)}
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 24,
              fontWeight: '600',
              marginBottom: 0,
              margin: 16,
            }}>
            {'USD $'}
            {monthDetails.total}
          </Text>
          <Text
            style={{
              color: '#4B5563',
              fontSize: 16,
              fontWeight: '600',
              marginHorizontal: 14,
            }}>
            {'Total Spending'}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              height: 250,
              marginHorizontal: 16,
              columnGap: 16,
              marginTop: 24,
              alignItems: 'flex-end',
            }}>
            {allMonths.map((item, index) => (
              <View key={index} style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => updateEnabledAtIndex(index)}
                  style={{
                    height: item.adjustedValue,
                    backgroundColor: item.enabled ? '#7E3AF2' : '#CABFFD',
                    width: 50,
                    borderRadius: 16,
                  }}></TouchableOpacity>

                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: item.enabled ? '700' : 'normal',
                    marginTop: 8,
                    marginHorizontal: 16,
                    color: item.enabled ? 'black' : '#4B5563',
                  }}>
                  {/* {getMonthName(item.month)} */}
                </Text>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 100,
                    backgroundColor: item.enabled ? '#7E3AF2' : 'transparent',
                    marginTop: 2,
                  }}></View>
              </View>
            ))}

            {nextMonths.length < 5 &&
              nextMonths.map((item, index) => (
                <View key={index + 100} style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: item.enabled ? '700' : 'normal',
                      marginTop: 8,
                      marginHorizontal: 16,
                      color: item.enabled ? 'black' : '#4B5563',
                    }}>
                    {getMonthName(item)}
                  </Text>
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 100,
                      backgroundColor: item.enabled ? '#7E3AF2' : 'transparent',
                      marginTop: 2,
                    }}></View>
                </View>
              ))}

            <View
              style={{
                height: 300,
                position: 'absolute',
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 25,
                  paddingHorizontal: 16,
                }}>
                <Text style={{color: 'black', fontSize: 10, fontWeight: '500'}}>
                  Avg
                </Text>
              </View>

              <View style={{flex: 1}}>
                <DashedLine dashColor="#9CA3AF" dashLength={5} />
              </View>
            </View>
          </View>

          <View
            style={{
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowRadius: 4,
              borderRadius: 9,
              marginTop: 16,
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'space-between',
              elevation: 10,
              marginHorizontal: 16,
              padding: 16,
            }}>
            <View
              style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
              <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                $4500
              </Text>
              <Text style={{color: '#6B7280', fontSize: 14, fontWeight: '600'}}>
                Total Income
              </Text>
            </View>
            <View
              style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
              <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                $4500
              </Text>
              <Text style={{color: '#6B7280', fontSize: 14, fontWeight: '600'}}>
                Savings
              </Text>
            </View>
            <View
              style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
              <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                $4500
              </Text>
              <Text style={{color: '#6B7280', fontSize: 14, fontWeight: '600'}}>
                Investments
              </Text>
            </View>
          </View>

          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
              margin: 16,
            }}>
            Categories
          </Text>

          <FlatList
            data={categories}
            ItemSeparatorComponent={() => <View style={{margin: 8}}></View>}
            style={{
              backgroundColor: 'white',
              elevation: 10,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowRadius: 4,
            }}
            contentContainerStyle={{padding: 16}}
            scrollEnabled={false}
            keyExtractor={item => {
              const key = item.parent_id.toString();
              return key;
            }}
            renderItem={({item, index}) => <CategoryComp item={item} />}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default InsightScreen;
