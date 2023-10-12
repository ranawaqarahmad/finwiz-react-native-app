import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  Switch, ScrollView,
  TouchableOpacity, TouchableWithoutFeedback, Keyboard, Modal, ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector } from 'react-redux';
import { } from 'react-native-gesture-handler';
import ChooseCategory from './ChooseCategory';
const RecordExpense = () => {
  const route=useRoute()
  const {type}=route.params
  const selector = useSelector(state => state.AppReducer);
  const authToken = selector.authToken;
  const [loader, setLoader] = useState(false)
  const navigation = useNavigation();
  const handleClick = () => {
    addExpense()
  }

  const [errorText, setErrorText] = useState('')
  const [errorVisible, setErrorVisible] = useState(false)
  const [amount, setAmount] = useState('')
  const [merchantName, setMerchantName] = useState('')
  const [categoryId, setCategoryId] = useState()
  const [date, setDate] = useState()
  const [modalVisible, setModalVisible] = useState(false)
  const [category, setCategory] = useState()
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(type);
  const [items, setItems] = useState([
    { label: 'Expense', value: 'Expense' },
    { label: 'Income', value: 'Income' }
  ]);


  const addExpense = async () => {
    setLoader(true);
    console.log('AuthToken is ', authToken);
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
    console.log(formattedDate);


    if (amount == '' || category == null || merchantName == ''||value=='null') {
      setErrorText('Fill all the details to proceed')
      setErrorVisible(true)
      setLoader(false)
      return;
    }

    console.log('Category ID is ', category.id);
    console.log('Merchant Name ', merchantName);
    console.log('Merchant Name ', amount);






    try {
      await fetch(`https://api-finwiz.softsquare.io/api/user/user-transaction`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          category_id: category.id,
          account_id: "vdaWNKxMroSqBXWpz33AH8Ez4vb7qJCqGK1bL",
          datetime: formattedDate,
          merchant_name: merchantName,
          transaction_type: value,
          location: "default"
        }),
      }).then((response) => response.json())
        .then((data) => {
          console.log(data);
          navigation.navigate('HomeScreen')
          // setLoader(false)


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
  const modleVisibiltyController = () => {
    setModalVisible(!modalVisible)
  }
  return (
    <SafeAreaView style={styles.container}>
      {loader ?
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
          <ActivityIndicator size={'large'} color={'#7C56FE'}></ActivityIndicator>
        </View>
        :
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={styles.container}>
          <ScrollView
            nestedScrollEnabled={true}

            contentContainerStyle={{ paddingBottom: 32 }} style={{ flex: 1, }}>
            <View style={styles.mainview}>
              {/* ADD NEW CATEGORY */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>
                  Record Expense
                </Text>
                <TouchableOpacity>
                  <Text onPress={() => navigation.goBack()} style={{ fontSize: 16, color: '#5145CD', alignSelf: 'center' }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>

              {/* add image */}


              {/* ENTER CATEGORY LABEL */}
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 14, color: 'black', marginBottom: 15, fontWeight: '500' }}>
                  Enter Amount
                </Text>

                {/* TextInput */}
                <TextInput
                  inputMode='numeric'
                  value={amount}
                  onChangeText={(text) => setAmount(text)}

                  style={{
                    width: '100%',
                    height: 58,
                    backgroundColor: 'white',
                    paddingHorizontal: 16,
                    fontSize: 14,
                    borderWidth: 1,
                    borderColor: '#9CA3AF',
                    borderRadius: 4,
                  }}
                  placeholder="$$$"
                />
              </View>

              <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 14, color: 'black', marginBottom: 15, fontWeight: '500' }}>
                  Enter Merchant Name
                </Text>

                {/* TextInput */}
                <TextInput
                  value={merchantName}
                  onChangeText={(text) => setMerchantName(text)}

                  style={{
                    width: '100%',
                    height: 58,
                    backgroundColor: 'white',
                    paddingHorizontal: 16,
                    fontSize: 14,
                    borderWidth: 1,
                    borderColor: '#9CA3AF',
                    borderRadius: 4,
                  }}
                  placeholder="Type Merchant Name Here"
                />
              </View>



              {/* CHOOSE CATEGORY TYPE */}

              <Text style={{ fontSize: 14, marginBottom: 20, color: 'black', fontWeight: '500', marginTop: 20 }}>
                Choose Category Type
              </Text>
              <TouchableOpacity onPress={() => modleVisibiltyController()}>
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
                  <Text>{category ? category.name : 'Choose Category'}</Text>
                  <Image
                    source={require('../../../../assets/Images/downarrow.png')}
                    style={{ height: 20, width: 20, marginLeft: 30 }}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>

              <Text style={{ fontSize: 14, marginBottom: 20, color: 'black', fontWeight: '500', marginTop: 20 }}>
                Choose Transaction Type
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
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


              {/* ATTACH RECIEPT OPTIONAL START */}
              <Text style={{ fontSize: 14, marginBottom: 20, color: 'black', fontWeight: '500', marginTop: 20 }}>
                Attach Reciept (Optional)
              </Text>
              <TouchableOpacity>
                <View
                  style={{
                    height: 56,
                    padding: 18,
                    borderRadius: 4,
                    flexDirection: 'row',
                    borderWidth: 1,
                    backgroundColor: '#F3F4F6',
                    borderColor: 'transparent',
                  }}>
                  <Image
                    source={require('../../../../assets/Images/attachfile.png')}
                    style={{ height: 20, width: 20, marginLeft: 10 }}
                    resizeMode="contain"
                  />
                  <Text style={{ marginLeft: 15, color: '#5145CD', fontWeight: '400' }}>Attach Reciept</Text>
                </View>
              </TouchableOpacity>

              {/* ADD BUTTON START */}
              {errorVisible && <Text style={{ color: 'red', fontWeight: '400', margin: 16,marginBottom:0 }}>{errorText}</Text>}

              <View style={{ height: 48, width: '100%' }}>
                <TouchableOpacity onPress={handleClick}>
                  <Image
                    source={require('../../../../assets/Images/addbutton.png')}
                    style={{ height: 48, width: '100%', borderRadius: 8, marginTop: 16 }}
                  />
                </TouchableOpacity>

              </View>
              {/* ADD BUTTON END */}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>}
      <Modal visible={modalVisible}>
        <ChooseCategory category={category} setCategory={setCategory} modleVisibiltyController={modleVisibiltyController} onlyCategory={false} />
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
    padding: 17,
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
export default RecordExpense;
