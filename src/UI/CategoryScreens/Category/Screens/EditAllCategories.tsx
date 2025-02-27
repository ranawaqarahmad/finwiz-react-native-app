import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  Switch,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useSelector} from 'react-redux';
import {} from 'react-native-gesture-handler';
import ChooseCategory from './ChooseCategory';
import {launchImageLibrary} from 'react-native-image-picker';
import EditBudgetCard from '../../../HomeScreens/Home/Components/EditBudgetCard';
const EditAllCategories = ({navigation}) => {
  const route = useRoute();
  const selector = useSelector(state => state.AppReducer);
  const {budgets} = route.params;
  const authToken = selector.authToken;

  const [loader, setLoader] = useState(false);

  const [category_with_limit, setCategory_with_limit] = useState([]);

  const [regenData, setRegenData] = useState(null);
  const [isRegenerated, setIsRegenerated] = useState(false);
  const [regenLoader, setRegenLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handleAddOrUpdate = (user_category_id, limitation) => {
    setCategory_with_limit(prevState => {
      // Check if an item with the same id already exists
      const existingItemIndex = prevState.findIndex(
        item => item.user_category_id === user_category_id,
      );
      if (existingItemIndex >= 0) {
        console.log('update Item');

        // Update the existing item with the new value
        const updatedItems = [...prevState];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          limitation,
        };
        return updatedItems;
      } else {
        // Add a new item if the id does not exist
        console.log('new Item');

        return [...prevState, {user_category_id, limitation}];
      }
    });
  };
  const editCategories = async () => {
    setLoader(true);

    if (category_with_limit.length == 0) {
      console.log('EDIT CATEGORIES');
      setLoader(false);
      return;
    }

    try {
      await fetch(
        `https://api-finwiz.softsquare.io/api/user/update-multiple-category-limit`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            category_with_limit: category_with_limit,
          }),
        },
      )
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setLoader(false);
          navigation.navigate('HomeScreen');
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

  const regenerateData = async () => {
    setRegenLoader(true);
    console.log('AUTH', authToken);
    try {
      const response = await fetch(
        `https://api-finwiz.softsquare.io/api/user/get-user-limition-with-percentage`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      const data = await response.json();

      setRegenData(Object.values(data.data));
      setModalVisible(true);
      setIsRegenerated(true);
    } catch (error) {
      console.error(error);
    } finally {
      setRegenLoader(false);
    }
  };

  const RegeneratedCategoryCard = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.category_name}</Text>
      <Text style={styles.cardText}>
        Limitation: {item.limitation.toFixed(2)}
      </Text>
      <Text style={styles.cardText}>
        Max Limit: {item.max_limit.toFixed(2)}
      </Text>
      <Text style={styles.cardText}>
        Percentage Change: {item.limitation_percentage_change.toFixed(2)}%
      </Text>
    </View>
  );

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
          nestedScrollEnabled={true}
          contentContainerStyle={{paddingBottom: 0}}
          style={{flex: 1}}>
          <View style={styles.mainview}>
            {/* ADD NEW CATEGORY */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 16,
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                Edit Budget
              </Text>

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
                  <Text
                    style={{fontSize: 16, fontWeight: '400', color: '#4B5563'}}>
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

            <FlatList
              data={budgets}
              scrollEnabled={false}
              contentContainerStyle={{paddingBottom: 16}}
              renderItem={({item, index}) => (
                <EditBudgetCard
                  key={index}
                  item={item}
                  handleAddOrUpdate={handleAddOrUpdate}
                />
              )}
              keyExtractor={item => {
                const key = item.id.toString();
                return key;
              }}
            />
          </View>
        </ScrollView>
      )}
      <View style={{flexDirection: 'row', margin: 16}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.goback();
          }}
          style={{borderRadius: 8, padding: 16, alignItems: 'center', flex: 1}}>
          <Text style={{fontSize: 16, fontWeight: '600', color: '#7C56FE'}}>
            {'Cancel'}
          </Text>
        </TouchableOpacity>

        {!isRegenerated ? (
          <TouchableOpacity
            onPress={regenerateData}
            style={styles.regenerateButton}
            disabled={regenLoader}>
            {regenLoader ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Regenerate</Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              editCategories();
            }}
            style={{
              backgroundColor: '#7C56FE',
              borderRadius: 8,
              padding: 16,
              alignItems: 'center',
              flex: 1,
            }}>
            <Text style={{fontSize: 16, fontWeight: '600', color: 'white'}}>
              {'Save Budget'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Regenerated Data</Text>
            {regenData ? (
              <FlatList
                data={regenData}
                keyExtractor={item => item.user_category_id.toString()}
                renderItem={({item}) => <RegeneratedCategoryCard item={item} />}
              />
            ) : (
              <Text style={styles.noDataText}>No data available.</Text>
            )}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainview: {
    flex: 1,
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
    fontWeight: 'bold',
  },
  regenerateButton: {
    backgroundColor: '#7C56FE',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#7C56FE',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {color: 'white', fontSize: 16, fontWeight: '600'},
  card: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  noDataText: {
    textAlign: 'center',
    color: '#555',
    fontSize: 16,
    marginTop: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    padding: 16,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
});
export default EditAllCategories;
