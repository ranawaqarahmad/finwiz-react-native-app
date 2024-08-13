import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TextInput,
    Switch, ScrollView,
    TouchableOpacity, TouchableWithoutFeedback, Keyboard, Modal, ActivityIndicator,
    FlatList
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector } from 'react-redux';
import { } from 'react-native-gesture-handler';
import ChooseCategory from './ChooseCategory';
import { launchImageLibrary } from 'react-native-image-picker';
import EditBudgetCard from '../../../HomeScreens/Home/Components/EditBudgetCard';
const EditAllCategories = ({ navigation }) => {


    const route = useRoute()
    const selector = useSelector(state => state.AppReducer);
    const { budgets } = route.params
    const authToken = selector.authToken;

    const [loader, setLoader] = useState(false)

    const [category_with_limit, setCategory_with_limit] = useState([





    ])

    const handleAddOrUpdate = (user_category_id, limitation) => {
        setCategory_with_limit(prevState => {
            // Check if an item with the same id already exists
            const existingItemIndex = prevState.findIndex(item => item.user_category_id === user_category_id);
            if (existingItemIndex >= 0) {
                console.log('update Item');

                // Update the existing item with the new value
                const updatedItems = [...prevState];
                updatedItems[existingItemIndex] = { ...updatedItems[existingItemIndex], limitation };
                return updatedItems;
            } else {
                // Add a new item if the id does not exist
                console.log('new Item');

                return [...prevState, { user_category_id, limitation }];
            }
        });
    };
    const editCategories = async () => {
        setLoader(true);

        if (category_with_limit.length == 0) {
            console.log('EDIT CATEGORIES');
            setLoader(false)
            return;
        }

        console.log(category_with_limit);





        try {
            await fetch(`https://api-finwiz.softsquare.io/api/user/update-multiple-category-limit`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category_with_limit: category_with_limit,


                }),
            }).then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setLoader(false)
                    navigation.navigate('HomeScreen')



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

    function getCurrentMonth() {
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
      
        const currentMonthIndex = new Date().getMonth(); // getMonth() returns 0-11
        return monthNames[currentMonthIndex];
      }

    return (
        <SafeAreaView style={styles.container}>
            {loader ?
                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
                    <ActivityIndicator size={'large'} color={'#7C56FE'}></ActivityIndicator>
                </View>
                :
                <ScrollView
                    nestedScrollEnabled={true}

                    contentContainerStyle={{ paddingBottom: 0 }} style={{ flex: 1, }}>
                    <View style={styles.mainview}>
                        {/* ADD NEW CATEGORY */}
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                margin: 16
                            }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>
                                Edit Budget
                            </Text>

                            <View style={{ height: 33, flexDirection: 'row', justifyContent: 'space-between', }}>

                                <View style={{ height: 33, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 16, fontWeight: '400', color: '#4B5563' }}>
                                        {getCurrentMonth()}
                                    </Text>
                                </View>
                                <TouchableOpacity>
                                    <View style={{ height: 33, width: 33, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={require('../../../../assets/Images/downarrow.png')}
                                            style={{ height: 20, width: 20, alignSelf: 'center', }}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <FlatList
                            data={budgets}
                            scrollEnabled={false}
                            contentContainerStyle={{ paddingBottom: 16 }}
                            renderItem={({ item, index }) => <EditBudgetCard key={index}
                                item={item} handleAddOrUpdate={handleAddOrUpdate}

                            />
                            }
                            keyExtractor={(item) => {
                                const key = item.id.toString();
                                return key;
                            }}
                        />

                    </View>
                </ScrollView>

            }
            <View style={{ flexDirection: 'row', margin: 16 }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.goback() }} style={{ borderRadius: 8, padding: 16, alignItems: 'center', flex: 1 }} >
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#7C56FE' }}>{'Cancel'}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => { editCategories() }} style={{ backgroundColor: '#7C56FE', borderRadius: 8, padding: 16, alignItems: 'center', flex: 1 }} >
                    <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>{'Save Budget'}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
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
        fontWeight: 'bold'
    },
});
export default EditAllCategories;
