import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import ChooseCategory from './ChooseCategory';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';






const PlanPurchase = ({ navigation }) => {
  const handleClick = () => {
    navigation.navigate('GeneratingPlan')
  }

  const route = useRoute()
  const { type } = route.params
  const selector = useSelector(state => state.AppReducer);
  const dispatch = useDispatch()
  const authToken = selector.authToken;

  const [name, setName] = useState('')
  const [amount, setAmount] = useState()

  const [errorText, setErrorText] = useState('')
  const [errorVisible, setErrorVisible] = useState(false)
  const [loader, setLoader] = useState(false)

  const GeneratePlan = async () => {



    if (amount == null || category == null || name == '' || dob == '') {
      setErrorText('Fill all the details to proceed')
      setErrorVisible(true)
      setLoader(false)
      return;
    }


    console.log('category.user_category_id====', category.user_category_id);

    try {
      await fetch(`https://api-finwiz.softsquare.io/api/user/future-goal`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category_id: category.user_category_id,
          purchase_name: name,
          transaction_type: value2,
          amount: amount,
          priority: priority,
          date: dob


        }),
      }).then((response) => response.json())
        .then((data) => {
          console.log(data);

          if (data.status) {
            navigation.navigate('GeneratingPlan')
          }


        })
        .catch((error) => {
          console.log(error);
        });


    }
    catch (error) {
      console.error(error);
    }
  };


  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [datePickerDate, setDatePickerDate] = useState(new Date());

  const [priority, setPriority] = useState('Normal')

  const [category, setCategory] = useState()


  const [modalVisible, setModalVisible] = useState(false)

  const modleVisibiltyController = () => {
    setModalVisible(!modalVisible)
  }


  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    { label: 'High', value: 'High' },
    { label: 'Normal', value: 'Normal' },
    { label: 'Low', value: 'Low' },

  ]);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(type);
  const [items2, setItems2] = useState([
    { label: 'Expense', value: 'Expense' },
    { label: 'Income', value: 'Income' }

  ]);

  const [dob, setDob] = useState('')


  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {


      // Parse the input date using the Date object
      const inputDate = new Date(selectedDate);

      // Format the date into Y-m-d
      const formattedDate = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${inputDate.getDate().toString().padStart(2, '0')}`;

      // setSelectedDate(formattedDate);
      setDob(formattedDate);
      // setDatePickerDate(selectedDate);

    }
    hideDatePicker();
  };


  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.mainview}>
          {/* ADD NEW CATEGORY */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>
              Plan Purchase
            </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ fontSize: 16, color: '#5145CD', alignSelf: 'center' }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>

          {/* add image */}


          {/* ENTER CATEGORY LABEL */}


          <Text style={{ fontSize: 14, marginBottom: 20, color: 'black', fontWeight: '600', }}>
            {'Choose Category Type'}
          </Text>
          <TouchableOpacity

            onPress={() => modleVisibiltyController()}>
            <View
              style={{
                height: 56,
                padding: 18,
                borderRadius: 4,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: '#9CA3AF',
              }}>
              <Text style={{ color: category ? '#000000' : '#00000050', flex: 1 }}>{category ? category.name : 'Choose Category'}</Text>

              <Image
                source={require('../../../../assets/Images/downarrow.png')}
                style={{ height: 20, width: 20, marginLeft: 30 }}
                resizeMode="contain"
              />


            </View>
            {/* {errorVisible && <Text style={{ color: 'red', fontWeight: '400', margin: 16 }}>{errorText}</Text>} */}
          </TouchableOpacity>

          <Text style={{ fontSize: 14, marginBottom: 20, color: 'black', fontWeight: '500', marginTop: 20 }}>
            Choose Transaction Type
          </Text>
          <View style={{ flexDirection: 'row', zIndex: 100 }}>
            <DropDownPicker
              open={open2}
              value={value2}
              items={items2}
              setOpen={setOpen2}
              setValue={setValue2}
              setItems={setItems2}
              scrollViewProps={{ scrollEnabled: false, nestedScrollEnabled: true }}
              listMode='SCROLLVIEW'
              placeholder='Select Transaction Type'
              style={{
                height: 56,
                padding: 18,
                borderRadius: 4,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: '#9CA3AF',
              }}

            />
          </View>

          {/* SET NAME START */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 14, color: 'black', marginBottom: 15, fontWeight: '500' }}>
              Set name for this purchase
            </Text>

            {/* TextInput */}
            <TextInput
              placeholderTextColor={'grey'}

              onChangeText={(text) => { setName(text) }}
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
              placeholder="I-e Macbook Pro M1"
            >{name}</TextInput>
          </View>
          {/* SET NAME START ends */}

          {/* HOW MUCH YOU NEED */}

          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 14, color: 'black', marginBottom: 10, fontWeight: '500' }}>
              How much do you need?
            </Text>

            {/* TextInput */}
            <TextInput
              placeholderTextColor={'grey'}
              keyboardType='numeric'
              onChangeText={(text) => { setAmount(text) }}


              style={{
                width: '100%',
                height: 58,
                backgroundColor: 'white',
                paddingHorizontal: 16,
                fontSize: 14,
                color: 'black',
                borderWidth: 1,
                borderColor: '#9CA3AF',
                borderRadius: 4,
              }}
              placeholder="Enter Amount $$$"
            >{amount}</TextInput>
          </View>

          <Text style={{ fontSize: 14, marginBottom: 20, color: 'black', fontWeight: '500', marginTop: 20 }}>
            When do you plan to purchase?
          </Text>
          <TouchableOpacity onPress={() => showDatePicker()}>
            <View
              style={{
                height: 56,
                padding: 18,
                borderRadius: 4,
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: '#9CA3AF'
              }}>
              <Image
                source={require('../../../../assets/Images/calendar.png')}
                style={{ height: 20, width: 20 }}
                resizeMode="contain"
              />
              <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-evenly' }}>
                <Text style={{ marginLeft: 15, color: dob ? 'black' : '#9CA3AF', fontWeight: '400', flex: .94, alignSelf: 'center', marginRight: -20 }}>{dob ? dob : 'Choose Dates'}</Text>
                <Image
                  source={require('../../../../assets/Images/righthalfarrow.png')}
                  style={{ height: 20, width: 20, }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </TouchableOpacity>

          {/* CHOOSE CATEGORY TYPE */}

          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 14, marginBottom: 20, color: 'black', fontWeight: '500', marginTop: 20 }}>
              Choose Priority
            </Text>

          </View>

          <View style={{ zIndex: 1000 }}>
            <View
              style={{
                borderRadius: 4,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: '#9CA3AF',
              }}>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <View style={{ flexDirection: 'row', flex: 1, }}>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    onSelectItem={(item) => setPriority(item.label)
                    }
                    setItems={setItems}
                    scrollViewProps={{ scrollEnabled: false, nestedScrollEnabled: false }}
                    listMode='SCROLLVIEW'
                    placeholder='Normal'
                    style={{
                      height: 56,
                      padding: 18,
                      borderRadius: 4,
                      width: '100%',
                      flexDirection: 'row',
                      paddingStart: 48,
                      borderWidth: 0,
                      justifyContent: 'space-between',
                    }}

                  />
                </View>
                {priority == 'Normal' && (
                  <Image source={require('../../../../assets/Images/normalflag.png')} style={{ height: 20, width: 20, position: 'absolute', alignSelf: 'center', marginStart: 16, zIndex: 1000000 }} resizeMode='contain' />
                )}
                {priority == 'High' && (
                  <Image source={require('../../../../assets/Images/flag.png')} style={{ height: 20, width: 20, position: 'absolute', alignSelf: 'center', marginStart: 16, zIndex: 1000000 }} resizeMode='contain' />
                )}
                {priority == 'Low' && (
                  <Image source={require('../../../../assets/Images/lowflag.png')} style={{ height: 20, width: 20, position: 'absolute', alignSelf: 'center', marginStart: 16, zIndex: 1000000 }} resizeMode='contain' />
                )}

              </View>

            </View>
          </View> */}

          {errorVisible && <Text style={{ color: 'red', fontWeight: '400', marginVertical: 16, marginBottom: 0 }}>{errorText}</Text>}


          {/* ADD BUTTON START */}
          <TouchableOpacity style={{ borderRadius: 8, backgroundColor: '#7C56FE', height: 48, width: '100%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 40 }} onPress={() => { GeneratePlan() }}>
            <Text style={{ fontSize: 16, color: 'white' }}>{`Set Goal `}</Text>

          </TouchableOpacity>
          {/* ADD BUTTON END */}
        </View>

      </ScrollView>

      <Modal visible={modalVisible}>
        <ChooseCategory category={category} setCategory={setCategory} modleVisibiltyController={modleVisibiltyController} onlyCategory={true} />
      </Modal>

      {isDatePickerVisible && (
        <DateTimePicker
          value={datePickerDate}
          mode="date"
          textColor='black'
          is24Hour={true}
          display="spinner" // or 'spinner' or 'calendar' (Android-specific)
          onChange={handleDateChange}
        />
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
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 20,
  },
  settingText: {
    fontSize: 14,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
});
export default PlanPurchase;
