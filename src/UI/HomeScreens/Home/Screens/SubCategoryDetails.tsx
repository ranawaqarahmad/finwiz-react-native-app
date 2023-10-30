import React, { useEffect, useState } from 'react'
import { FlatList, View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator } from 'react-native'
import TransactionComponent from '../Components/TransactionComponent'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'
// var pageNumber=0;
var transactionData = [];

const SubCategoryDetails = () => {
    const navigation = useNavigation()
    const navigationClick = (item) => {
        navigation.navigate('Reciept', { recieptDetails: item, basicDetails: basicDetails })
    }
    const selector = useSelector(state => state.AppReducer);
    const authToken = selector.authToken;
    const isFocused = useIsFocused()
    const [pageNumber, setPageNumber] = useState(1)
    const accountId = selector.accountId;
    const [subcategoryLoader, setSubcategoryLoader] = useState(true)
    const [nextPage, setNextPage] = useState()


    const [transactionCount, setTransactionCount] = useState(0)

    const route = useRoute()
    const { basicDetails } = route.params;
    // console.log('DATA INCOMING IN SUB CATEGORY', basicDetails);



    const [details, setDetails] = useState(

    )

    const [transactionDetails, setTransactionDetails] = useState()
    const getTransactions = async () => {
        setPageNumber(pageNumber + 1);
        console.log('Page Number Is ', pageNumber);

        fetch(`https://api-finwiz.softsquare.io/api/user/transaction-count-with-detail/${basicDetails.id}?page=${pageNumber}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },

        })
            .then((response) => response.json())
            .then((data) => {
                // console.log('Categories', data.data.transaction);
                const categories = { transactionDetails: data.data.transaction, basics: basicDetails }
                setDetails({ transactionDetails: data.data.transaction, basics: basicDetails })
                console.log('NEXT PAGE URL', categories.transactionDetails.next_page_url);
                setNextPage(categories.transactionDetails.next_page_url)
                categories.transactionDetails.data.map((item) => {
                    transactionData.push(item)
                })
                setTransactionDetails(transactionData)

                setTransactionCount(transactionData.length)

                console.log('DETAILS IS THIS', details);

                setSubcategoryLoader(false)



            })
            .catch((error) => {
                console.log(error);
                // setLoader(false)
            });



    };

    useEffect(() => {
        setPageNumber(1)
        transactionData = []
        console.log("USE EFFECT--------------------------");

    }, [isFocused])

    useEffect(() => {
        getTransactions()
      

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
                    <View style={styles.mainview}>
                        {/* BACK ARROW AND MONTH STARTS*/}
                        <View style={{ marginHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require('../../../../assets/Images/backarrow.png')}
                                    style={{ height: 20, width: 20 }} />
                            </TouchableOpacity>

                            <View style={{ width: '30%', flexDirection: 'row', justifyContent: 'space-between', }}>

                                <View style={{ borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 16, fontWeight: '400', color: '#4B5563' }}>
                                        This Month {transactionCount}
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
                            <View style={{ marginHorizontal: 16, height: 50, marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', }}>

                                    <View style={{}}>
                                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#111928', }}>{details.basics.category}</Text>
                                        <Text style={{ fontSize: 14, fontWeight: '400', color: '#6B7280' }}>{details.basics.count}{' Transactions'}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate('RecordExpense', { type: 'null' })}>
                                    <View style={{ borderWidth: 1, borderRadius: 33, width: 81, justifyContent: 'center', borderColor: '#000', height: 33, }}>
                                        <Text style={{ textAlign: 'center', color: '#000', fontSize: 16, fontWeight: '500' }}>+Add</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}



                 

                        <View style={{ marginTop: 25, marginHorizontal: 16 }}>
                            <Text style={{ fontSize: 14, fontWeight: '600', color: '#000', marginBottom: 10 }}>Transactions</Text>
                        </View>


                        <FlatList
                            data={transactionDetails}
                            scrollEnabled={true}
                            style={{ paddingHorizontal: 16 }}
                            keyExtractor={(item) => {
                                const key = item.id.toString()
                                return key
                            }}
                            onEndReached={({ distanceFromEnd }) => {

                                console.log('END REACHED');

                                if (distanceFromEnd > 0 && nextPage) {
                                    getTransactions();
                                }
                            }}
                            onEndReachedThreshold={0.5}
                            ListFooterComponent={() => {
                                if (nextPage) {
                                    return <ActivityIndicator size={'large'} />;
                                } else {
                                    return null; // Return null to hide the footer when there's no next page.
                                }
                            }} renderItem={({ item, index }) => <TransactionComponent navigationClick={navigationClick} key={index} item={item} />}



                        />
                        {/* {
                            details.transactionDetails.data.map((item, index) => <TransactionComponent navigationClick={navigationClick} key={index} item={item} />)
                        } */}





                    </View>
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
        flex: 1,
    },
})
export default SubCategoryDetails