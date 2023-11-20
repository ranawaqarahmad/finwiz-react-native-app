import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused, useRoute } from '@react-navigation/native'
import TransactionComponent from '../../HomeScreens/Home/Components/TransactionComponent'
import { useSelector } from 'react-redux';
var transactionData = [];

const AccountDetails = () => {
    const route = useRoute()
    const { item } = route.params
    const selector = useSelector(state => state.AppReducer);
    const authToken = selector.authToken;
    const isFocused=useIsFocused()



    const capitalizeFirstWord = (str) => {
        if (typeof str !== 'string' || str.length === 0) {
            return str; // Return the input if it's not a string or an empty string
        }

        // Capitalize the first letter and concatenate it with the rest of the string
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const navigationClick = () => {

    }

    const [loader, setLoader] = useState(true)

    const [transactionDetails, setTransactionDetails] = useState()
    const [subcategoryLoader, setSubcategoryLoader] = useState(true)
    const [pageNumber, setPageNumber] = useState(1)
    const [nextPage, setNextPage] = useState()

    const getTransactions = async () => {

        setPageNumber(pageNumber + 1);
        console.log('Page Number Is ', pageNumber);

        fetch(`https://api-finwiz.softsquare.io/api/user/transaction-records-filter?page=${pageNumber}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                account_id: item.account_id,
                filter: 'none'


            }),

        })
            .then((response) => response.json())
            .then((data) => {
                // console.log('Categories', data.data.transaction);
                // const categories = { transactionDetails: data.data.data,}
                // console.log('NEXT PAGE URL', categories.transactionDetails.next_page_url);

                setNextPage(data.data.next_page_url)
                console.log(data.data);

                data.data.data.map((item) => {
                    transactionData.push(item)
                })
                setTransactionDetails(transactionData)



                setSubcategoryLoader(false)
                setLoader(false)



            })
            .catch((error) => {
                console.log(error);
                setLoader(false)

                // setLoader(false)
            });



    };

    useEffect(() => {
        getTransactions()


    }, [])

    useEffect(() => {

        transactionData=[]
    }, [isFocused])
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', marginHorizontal: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Text style={{ color: 'black', fontSize: 18, fontWeight: '600' }}>Accounts</Text>

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', columnGap: 8, }}>


                    {/* BELLICON STARTS */}
                    <TouchableOpacity>
                        <View style={{ height: 33, width: 33, borderRadius: 20, backgroundColor: '#E5E7EB', alignSelf: 'center', justifyContent: 'center' }}>
                            <Image source={require('../../../assets/Images/bellicon.png')}
                                style={{ height: 24, width: 24, alignSelf: 'center' }}
                            />
                        </View>
                    </TouchableOpacity>
                    {/* ProfileIcon */}
                    <TouchableOpacity>
                        <View style={{ height: 33, width: 33, backgroundColor: '#E5E7EB', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../../../assets/Images/user.png')}
                                style={{ height: 24, width: 24, alignSelf: 'center', }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.mainview}>

                <View >
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#9CA3AF', marginBottom: 8 }}>{capitalizeFirstWord(item.type)}</Text>

                    <View style={styles.upperview}>
                        <Image resizeMode='contain' style={{ width: 20, height: 20 }} source={require('../../../assets/Images/plaid.png')} />
                        <Text style={{ fontSize: 14, fontWeight: '600', color: 'black', paddingLeft: 8, flex: 1 }}>{item.name}</Text>
                    </View>


                </View>

                <View style={styles.view2}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000' }}>{'USD ' + Math.round(item.balances_current)}</Text>
                            <Text style={{ color: '#9CA3AF', fontSize: 14, fontWeight: '600' }}>{'Available'}</Text>

                        </View>
                        {item.balances_available && (
                            <View>
                                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000' }}>{'USD ' + Math.round(item.balances_available)}</Text>
                                <Text style={{ color: '#9CA3AF', fontSize: 14, fontWeight: '600' }}>{'Amount in Debt'}</Text>
                            </View>
                        )}


                    </View>
                </View>






            </View>


            <View style={{ marginTop: 25, marginHorizontal: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#000', marginBottom: 10 }}>Transactions</Text>
            </View>

            {loader ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator color={'#722ED1'} size={'large'}></ActivityIndicator>
                </View>
                :
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
                            return <ActivityIndicator color={'#722ED1'} size={'large'} />;
                        } else {
                            return null; // Return null to hide the footer when there's no next page.
                        }
                    }}
                     renderItem={({ item, index }) => <TransactionComponent navigationClick={navigationClick} key={index} item={item} />}



                />}


        </View>
    )
}
const styles = StyleSheet.create({

    mainview: {
        marginTop: 15,
        borderRadius: 8,

        marginHorizontal: 16,
    },
    view2: {
        width: '100%',
        marginTop: 24
    },
    upperview: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
})


export default AccountDetails