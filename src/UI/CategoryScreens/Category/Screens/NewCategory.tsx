import React, {useState} from 'react';
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
import SliderCompo from '../../../HomeScreens/Home/Components/SliderCompo';
import ToggleSwitch from 'toggle-switch-react-native';
import CategoryDetails from '../../../HomeScreens/Home/Screens/CategoryDetails';
import ChooseCategory from './ChooseCategory';
import {useSelector} from 'react-redux';
import MultiSliderComponent from '../../../HomeScreens/Home/Components/MultiSliderComponent';

const NewCategory = () => {
  const route = useRoute();

  const [category, setCategory] = useState();

  const {editCategory, items} = route.params;
  const selector = useSelector(state => state.AppReducer);
  const authToken = selector.authToken;

  const navigation = useNavigation();

  const convertStringToNumber = str => {
    // Use parseFloat() to convert to a floating-point number
    return parseFloat(str);
  };

  const [item, setItem] = useState({
    spendingLimit: editCategory
      ? Math.round(convertStringToNumber(items.limitation))
      : 50,
    maxLimit: editCategory
      ? Math.round(convertStringToNumber(items.max_limit))
      : 1000,
  });
  // const [spendingLimit, setSpendingLimit] = useState(
  //   items ? items.limitation : '50',
  // );
  const [loader, setLoader] = useState(false);
  const [categoryName, setCategoryName] = useState(
    items ? items.category_name : '',
  );
  const [errorText, setErrorText] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  // console.log('ITEM IS FUCKING THIS', items);

  const handleClick = () => {};

  const [isNotificationEnabled, setIsNotificationEnabled] =
    React.useState(false);
  const handleNotificationToggle = () => {
    setIsNotificationEnabled(prev => !prev);
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
  const [isEnabled, setIsEnabled] = useState(
    items ? (items.fixed == 1 ? true : false) : false,
  );
  const toggleSwitch = () => {
    console.log(isEnabled);

    setIsEnabled(isEnabled => !isEnabled);
  };

  // const item = {
  //   limitation: editCategory
  //     ? Math.round(convertStringToNumber(items.limitation))
  //     : 50,
  //   max_limit: editCategory
  //     ? Math.round(convertStringToNumber(items.max_limit))
  //     : 100,
  // };
  // console.log('THIS IS LIMITATION', item.limitation);

  const [modalVisible, setModalVisible] = useState(false);

  const modleVisibiltyController = () => {
    setModalVisible(!modalVisible);
    console.log('category is equal to this', category);
  };

  const addCategory = async () => {
    setLoader(true);
    console.log('AuthToken is ', authToken);

    if (categoryName == '' || item.spendingLimit == '') {
      setErrorText('Fill all the details to proceed');
      setErrorVisible(true);
      setLoader(false);

      return;
    }

    console.log('ITEM LOG', editCategory ? items : category);

    const id = editCategory ? items.id : category.user_category_id;

    console.log('Category Name', categoryName);
    console.log('Spending Limit', convertStringToNumber(item.spendingLimit));
    console.log('Id is this', [id]);

    try {
      await fetch(
        `https://api-finwiz.softsquare.io/api/user/user-categories/${id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            category_name: categoryName,
            limitation: convertStringToNumber(item.spendingLimit),
            fixed: isEnabled ? 1 : 0,
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
              {editCategory ? 'Edit Category' : ' Add New Category'}
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
            contentContainerStyle={{paddingBottom: 32}}>
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
                // spendingLimit={spendingLimit}
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
              Fixed Category means when you edit your budget we wont change the
              limit or balance for this category
            </Text>

            <Text
              style={{
                fontSize: 14,
                marginBottom: 20,
                color: 'black',
                fontWeight: '600',
                marginHorizontal: 16,
              }}>
              {editCategory ? 'Category' : 'Choose Category Type'}
            </Text>

            <TouchableOpacity
              disabled={editCategory}
              onPress={() => modleVisibiltyController()}>
              <View
                style={{
                  height: 56,
                  padding: 18,
                  borderRadius: 4,
                  marginHorizontal: 16,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderWidth: 1,
                  borderColor: '#9CA3AF',
                }}>
                {editCategory ? (
                  <Text
                    style={{
                      color: category ? '#000000' : '#00000050',
                      flex: 1,
                    }}>
                    {items ? items.category_name : 'Choose Category'}
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: category ? '#000000' : '#00000050',
                      flex: 1,
                    }}>
                    {category ? category.name : 'Choose Category'}
                  </Text>
                )}
                {!editCategory && (
                  <Image
                    source={require('../../../../assets/Images/downarrow.png')}
                    style={{height: 20, width: 20, marginLeft: 30}}
                    resizeMode="contain"
                  />
                )}
              </View>
              {errorVisible && (
                <Text style={{color: 'red', fontWeight: '400', margin: 16}}>
                  {errorText}
                </Text>
              )}
            </TouchableOpacity>

            <View style={{marginHorizontal: 16, marginTop: 16}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#7C56FE',
                  borderRadius: 8,
                  paddingVertical: 16,
                  alignItems: 'center',
                }}
                onPress={addCategory}>
                <Text style={{fontSize: 16, fontWeight: '600', color: 'white'}}>
                  {editCategory ? 'Save' : 'Add'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      <Modal visible={modalVisible}>
        <ChooseCategory
          category={category}
          setCategory={setCategory}
          modleVisibiltyController={modleVisibiltyController}
          onlyCategory={true}
        />
      </Modal>
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
export default NewCategory;
