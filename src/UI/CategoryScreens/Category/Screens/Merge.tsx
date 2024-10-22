import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import ToggleSwitch from 'toggle-switch-react-native';
import ChooseCategory from './ChooseCategory';
import {useSelector} from 'react-redux';
import MultiSliderComponent from '../../../HomeScreens/Home/Components/MultiSliderComponent';
import DropDownPicker from 'react-native-dropdown-picker';

var userCategories = [];
const Merge = () => {
  const selector = useSelector(state => state.AppReducer);
  const authToken = selector.authToken;
  const navigation = useNavigation();
  const [item, setItem] = useState({
    spendingLimit: 50,
    maxLimit: 1000,
  });
  // const [spendingLimit, setSpendingLimit] = useState('50');
  const [loader, setLoader] = useState(false);
  const [categoryName, setCategoryName] = useState();
  const [errorText, setErrorText] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);

  const convertStringToNumber = str => {
    // Use parseFloat() to convert to a floating-point number
    return parseFloat(str);
  };
  const onChangeSlider = value => {
    const roundedValue = Math.round(value);

    // setSpendingLimit(roundedValue);
    if (roundedValue !== item.spendingLimit) {
      setItem(prevItem => ({
        ...prevItem,
        spendingLimit: roundedValue,
      }));
      console.log('Slider Rounded Value:', roundedValue);
    }
  };
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    console.log(isEnabled);

    setIsEnabled(isEnabled => !isEnabled);
  };

  // const item = {
  //   limitation: '50',
  // };
  // console.log('THIS IS LIMITATION', item.limitation);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple2', value: 'appele'},
    {label: 'Bananaa', value: 'bassnana'},
    {label: 'Applea', value: 'apgple'},
    {label: 'Bananaaa', value: 'baanana'},
    {label: 'Applea', value: 'apzple'},
    {label: 'Bananaaa', value: 'bagnana'},
    {label: 'Appsle', value: 'ap`ple'},
    {label: 'Banfana', value: 'ba2nana'},
    {label: 'Appgle', value: 'app5le'},
    {label: 'Bangana', value: 'ba6nana'},
  ]);

  const getCategories = async () => {
    setLoader(true);

    console.log('AuthToken is ', authToken);

    fetch(
      `https://api-finwiz.softsquare.io/api/user/main-categories-with-user-category-id`,
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
        // console.log('ALL ANSWERS OF QUESTIONS', data.data.data);
        // data.data.data.map((item) => {
        //     array.push(item)
        // })
        setItems(data.data);
        console.log(data.data);

        setLoader(false);
      })
      .catch(error => {
        console.log(error);
        setLoader(false);

        // setLoader(false)
      });
  };

  const mergeCategory = async () => {
    setLoader(true);
    console.log('AuthToken is ', authToken);

    if (categoryName == '' || item.spendingLimit == '') {
      setErrorText('Fill all the details to proceed');
      setErrorVisible(true);
      setLoader(false);
      return;
    }

    console.log('Category Name', categoryName);
    // console.log('Spending Limit', convertStringToNumber(spendingLimit));
    // console.log('Spending Limit', convertStringToNumber(spendingLimit));
    console.log('userCategories', userCategories);

    try {
      await fetch(
        `https://api-finwiz.softsquare.io/api/user/merge-user-categories`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            category_name: categoryName,
            limitation: convertStringToNumber(item.spendingLimit),
            user_category_id: userCategories,
          }),
        },
      )
        .then(response => response.json())
        .then(data => {
          console.log(data);
          navigation.navigate('HomeScreen');
          // setLoader(false)
        })
        .catch(error => {
          console.log(error);
          setLoader(false);
        });
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getIds = item => {
    console.log('GET IDS CLICKED');

    userCategories = [];
    {
      item.map((items, index) => {
        console.log(items.user_category_id);
        userCategories.push(items.user_category_id);
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {loader ? (
        <View
          style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
          <ActivityIndicator
            size={'large'}
            color={'#7C56FE'}></ActivityIndicator>
        </View>
      ) : (
        <ScrollView
          scrollEnabled={false}
          contentContainerStyle={{flex: 1}}
          style={{flex: 1}}>
          <View style={styles.mainview}>
            {/* ADD NEW CATEGORY */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 16,
                alignItems: 'center',
                marginHorizontal: 16,
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                Merge Categories
              </Text>
              <Text
                onPress={() => navigation.goBack()}
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#5145CD',
                  alignSelf: 'center',
                }}>
                Cancel
              </Text>
            </View>

            <ScrollView
              style={{flex: 1}}
              contentContainerStyle={{paddingBottom: 16, flex: 1}}>
              <View
                style={{
                  marginTop: 20,
                  marginHorizontal: 16,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: 'black',
                    marginBottom: 15,
                  }}>
                  Enter Category Label
                </Text>

                {/* TextInput */}
                <TextInput
                  value={categoryName}
                  onChangeText={text => setCategoryName(text)}
                  placeholderTextColor={'grey'}
                  style={{
                    width: '100%',
                    height: 58,
                    backgroundColor: 'white',
                    paddingHorizontal: 16,
                    fontSize: 14,
                    borderWidth: 1,
                    color: 'black',
                    borderColor: '#9CA3AF',
                    borderRadius: 4,
                  }}
                  placeholder="Enter Category Label"></TextInput>
              </View>

              {/* Set Spending Limit */}
              <View
                style={{
                  marginHorizontal: 16,
                  marginTop: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: 'black',
                    alignSelf: 'center',
                  }}>
                  Set Spending Limit
                </Text>

                <View
                  style={{
                    borderWidth: 1,
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    justifyContent: 'center',
                    borderRadius: 4,
                    borderColor: '#D1D5DB',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#111928',
                      fontSize: 18,
                      textAlign: 'center',
                    }}>
                    {'$'}
                    {Math.round(item.spendingLimit)}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  width: '100%',
                  justifyContent: 'center',
                }}>
                <MultiSliderComponent
                  isEnabled={isEnabled}
                  onChangeSlider={onChangeSlider}
                  item={item}
                />
              </View>

              {/* NOTIFICATION SWITCH */}
              <View style={styles.settingItem}>
                <Text style={styles.settingText}>Fixed Category</Text>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ToggleSwitch
                    isOn={isEnabled}
                    onColor="#00ff00"
                    offColor="#000000"
                    size="medium"
                    onToggle={() => {
                      toggleSwitch();
                    }}
                    thumbOnStyle={{backgroundColor: '#FFFFFF'}}
                    thumbOffStyle={{backgroundColor: '#FFFFFF'}}
                    trackOnStyle={{backgroundColor: '#7C56FE'}}
                    trackOffStyle={{backgroundColor: '#D1D5DB'}}
                    animationSpeed={300}
                  />
                </View>
              </View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'normal',
                  color: '#6B7280',
                  marginBottom: 25,
                  marginHorizontal: 16,
                }}>
                Fixed Category means when you edit your budget we wont change
                the limit or balance for this category
              </Text>

              <Text
                style={{
                  fontSize: 14,
                  marginBottom: 20,
                  color: 'black',
                  fontWeight: '600',
                  marginHorizontal: 16,
                }}>
                {'Choose categories to merge'}
              </Text>

              <View style={{marginHorizontal: 16}}>
                <DropDownPicker
                  schema={{
                    label: 'name',
                    value: 'user_category_id',
                  }}
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  mode="BADGE"
                  setItems={setItems}
                  onSelectItem={item => {
                    console.log(item), getIds(item);
                  }}
                  multiple={true}
                  scrollViewProps={{
                    scrollEnabled: true,
                    nestedScrollEnabled: true,
                  }}
                  listMode="SCROLLVIEW"
                  placeholder="Select Categories"
                  style={{
                    padding: 18,
                    borderRadius: 4,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderWidth: 1,
                    borderColor: '#9CA3AF',
                  }}
                />
              </View>

              <View style={{marginHorizontal: 16, marginTop: 16}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#7C56FE',
                    borderRadius: 8,
                    paddingVertical: 16,
                    alignItems: 'center',
                  }}
                  onPress={mergeCategory}>
                  <Text
                    style={{fontSize: 16, fontWeight: '600', color: 'white'}}>
                    {'Merge'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainview: {
    flex: 1,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 16,
  },
  settingText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
});
export default Merge;
