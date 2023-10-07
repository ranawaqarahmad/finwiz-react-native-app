import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator } from 'react-native'
import TransactionComponent from '../Components/TransactionComponent'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const SubCategoryDetails = () => {
    const navigation = useNavigation()
    const navigationClick = (item) => {
        navigation.navigate('Reciept', { recieptDetails: item,basicDetails:basicDetails })
    }
    const selector = useSelector(state => state.AppReducer);
    const authToken = selector.authToken;
    const [subcategoryLoader, setSubcategoryLoader] = useState(true)

    const route = useRoute()
    const { basicDetails } = route.params;
    console.log('DATA INCOMING IN SUB CATEGORY', basicDetails);



    const [details, setDetails] = useState(
        // {
        //     basicDetails: basicDetails,
        //     transactionDetails: [
        //         {
        //             title: 'Transaction 1',
        //             date: 'July 18',
        //             category: 'Expense',
        //             amount: '$5',
        //             attachments: [
        //                 {
        //                     image: '',
        //                 },
        //             ]
        //         },
        //         {
        //             title: 'Transaction 2',
        //             date: 'July 19',
        //             category: 'Expense',

        //             amount: '$51',
        //             attachments: [
        //                 {
        //                     image: '',
        //                 },
        //             ]
        //         },
        //         {
        //             title: 'Transaction 3',
        //             date: 'July 20',
        //             category: 'Expense',

        //             amount: '$75',
        //             attachments: [
        //                 {
        //                     image: '',
        //                 },
        //             ]
        //         },

        //     ]
        // }
    )

    const getTransactions = async () => {
        setSubcategoryLoader(true)
        console.log('AuthToken is ', authToken);

        fetch(`https://api-finwiz.softsquare.io/api/user/transaction-count-with-detail/${basicDetails.id}/vdaWNKxMroSqBXWpz33AH8Ez4vb7qJCqGK1bL`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },

        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Categories', data.data.transaction);
                setDetails({ transactionDetails: data.data.transaction, basics: basicDetails })
                console.log('DETAILS IS THIS', details);

                // const array=data.data
                //    const array=[]
                //     data.data.map((item) => {
                //       console.log(item);
                //       array.push({...item,backgroundColor:getRandomColor()})
                //     });
                //     setBudgets(array)
                setSubcategoryLoader(false)



            })
            .catch((error) => {
                console.log(error);
                // setLoader(false)
            });



    };

    useEffect(() => {
        getTransactions()
        console.log(details);
        
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={'#FFFFFF'} barStyle={'dark-content'} />
            {
                subcategoryLoader ?
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size={'large'} color={'black'} />
                    </View>
                    :
                    <ScrollView style={styles.mainview}>
                        {/* BACK ARROW AND MONTH STARTS*/}
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require('../../../../assets/Images/backarrow.png')}
                                    style={{ height: 20, width: 20 }} />
                            </TouchableOpacity>

                            <View style={{ width: '30%', flexDirection: 'row', justifyContent: 'space-between', }}>

                                <View style={{ borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 16, fontWeight: '400', color: '#4B5563' }}>
                                        This Month
                                    </Text>
                                </View>
                                {/* down arrow */}
                                <TouchableOpacity>
                                    <View style={{ borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={require('../../../../assets/Images/downarrow.png')}
                                            style={{ height: 20, width: 20, alignSelf: 'center', }}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* back arrow and month ends */}

                        {/* EDIT CATEGORY STARTS */}

                        {!subcategoryLoader && (
                            <View style={{ height: 50, width: '100%', marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', }}>

                                    <View style={{}}>
                                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#111928', }}>{details.basics.category}</Text>
                                        <Text style={{ fontSize: 14, fontWeight: '400', color: '#6B7280' }}>{details.basics.count}{' Transactions'}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity >
                                    <View style={{ borderWidth: 1, borderRadius: 33, width: 81, justifyContent: 'center', borderColor: '#000', height: 33, }}>
                                        <Text style={{ textAlign: 'center', color: '#000', fontSize: 16, fontWeight: '500' }}>+Add</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}



                        {/* edit category ends */}



                        {/* Spending Limit Text */}

                        {/* Edit Category Starts */}
                        {/* <View style={{ height: 232, width: '100%', marginTop: 15, padding: 13, borderColor: '#D1D1D1', borderWidth: 1, borderRadius: 8 }}>
                    <Text style={{ fontSize: 14, fontWeight: '400', color: '#6B7280', marginBottom: 7 }}>Spending Summary</Text>
                    <View style={{ height: 180, width: '100%' }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#111928', marginBottom: 20 }}>{'$'}{details.basicDetails.spent}</Text>
                        <View style={{ borderWidth: 1, borderStyle: 'dashed', position: 'relative', borderColor: '#9CA3AF' }}></View>
                        <Image source={require('../../../../assets/Images/blackgraphline.png')}
                            resizeMode='contain'
                            style={{ height: 130, width: 315, position: 'absolute' }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: -15 }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#000' }}>Day 1</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#000' }}>30</Text>

                    </View>
                </View>
                <View style={{ justifyContent: 'center', width: '100%', marginTop: 8 }}>
                    <Image source={require('../../../../assets/Images/horizontaldotsblack.png')}
                        style={{ height: 6, width: 25, alignSelf: 'center' }}
                    />
                </View> */}
                        {/* Edit Category ends */}

                        <View style={{ marginTop: 25 }}>
                            <Text style={{ fontSize: 14, fontWeight: '600', color: '#000', marginBottom: 10 }}>Transactions</Text>
                        </View>
                        {
                    details.transactionDetails.map((item, index) => <TransactionComponent navigationClick={navigationClick} key={index} item={item} />)
                }





                    </ScrollView>
            }


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    mainview: {
        padding: 16,
        flex: 1,
    },
})
export default SubCategoryDetails