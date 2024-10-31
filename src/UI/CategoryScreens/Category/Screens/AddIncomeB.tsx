import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  Modal,
  ActivityIndicator,
} from 'react-native';
import IncomeComponent from '../Components/IncomeComponent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import ChooseCategory from './ChooseCategory';

const AddIncomeB = () => {
  const selector = useSelector(state => state.AppReducer);
  const authToken = selector.authToken;
  const [amount, setAmount] = useState('');
  const [merchantName, setMerchantName] = useState('');
  const [categoryId, setCategoryId] = useState();
  const [date, setDate] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState();
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const handleClick = () => {};

  const addIncome = async () => {
    setLoader(true);
    console.log('AuthToken is ', authToken);
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${currentDate
      .getDate()
      .toString()
      .padStart(2, '0')} ${currentDate
      .getHours()
      .toString()
      .padStart(2, '0')}:${currentDate
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${currentDate
      .getSeconds()
      .toString()
      .padStart(2, '0')}`;
    console.log(formattedDate);
    try {
      await fetch(
        `https://api-finwiz.softsquare.io/api/user/user-transaction`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amount,
            category_id: category.id,
            account_id: 'vdaWNKxMroSqBXWpz33AH8Ez4vb7qJCqGK1bL',
            datetime: formattedDate,
            merchant_name: merchantName,
            transaction_type: 'Income',
            location: 'default',
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
  const modleVisibiltyController = () => {
    setModalVisible(!modalVisible);
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
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
          style={styles.container}>
          <ScrollView
            contentContainerStyle={{paddingBottom: 32}}
            style={{flex: 1}}>
            <View style={styles.mainview}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 40,
                }}>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                  Add Income
                </Text>
                <TouchableOpacity>
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
                </TouchableOpacity>
              </View>

              <View style={{marginTop: 0}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'black',
                    marginBottom: 15,
                    fontWeight: '500',
                  }}>
                  Enter Amount
                </Text>

                {/* TextInput */}
                <TextInput
                  inputMode="numeric"
                  value={amount}
                  onChangeText={text => setAmount(text)}
                  placeholderTextColor={'grey'}
                  style={{
                    width: '100%',
                    height: 58,
                    backgroundColor: 'white',
                    paddingHorizontal: 16,
                    fontSize: 14,
                    borderWidth: 1,
                    borderColor: '#9CA3AF',
                    borderRadius: 4,
                    color: 'black',
                  }}
                  placeholder="$$$"
                />
              </View>

              <View style={{marginTop: 20}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'black',
                    marginBottom: 15,
                    fontWeight: '500',
                  }}>
                  Enter Merchant Name
                </Text>

                {/* TextInput */}
                <TextInput
                  value={merchantName}
                  onChangeText={text => setMerchantName(text)}
                  placeholderTextColor={'grey'}
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
              <Text
                style={{
                  fontSize: 14,
                  marginBottom: 20,
                  color: 'black',
                  fontWeight: '500',
                  marginTop: 20,
                }}>
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
                  <Text>{category ? category.name : ''}</Text>
                  <Image
                    source={require('../../../../assets/Images/downarrow.png')}
                    style={{height: 20, width: 20, marginLeft: 30}}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>

              {/* ADD BUTTON */}
              <View>
                <TouchableOpacity onPress={addIncome}>
                  <Image
                    source={require('../../../../assets/Images/addbutton.png')}
                    style={{
                      height: 48,
                      width: '100%',
                      borderRadius: 8,
                      marginTop: 70,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      )}
      <Modal visible={modalVisible}>
        <ChooseCategory
          category={category}
          setCategory={setCategory}
          modleVisibiltyController={modleVisibiltyController}
          onlyCategory={false}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainview: {
    flex: 1,
    padding: 17,
  },
});

export default AddIncomeB;
