import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused, useRoute } from '@react-navigation/native'
import TransactionComponent from '../../HomeScreens/Home/Components/TransactionComponent'
import { useSelector } from 'react-redux';
import InvestmentComp from '../Components/InvestmentComp';
import { LineChart } from 'react-native-chart-kit'

var transactionData = [];

const InvestmentDetail = () => {
    const route = useRoute()
    const { item } = route.params
    console.log(item);
    const [totalIncrease, setTotalIncrease] = useState(0)

    const selector = useSelector(state => state.AppReducer);
    const authToken = selector.authToken;



    const capitalizeFirstWord = (str) => {
        if (typeof str !== 'string' || str.length === 0) {
            return str; // Return the input if it's not a string or an empty string
        }

        // Capitalize the first letter and concatenate it with the rest of the string
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const navigationClick = () => {

    }


    const [transactionDetails, setTransactionDetails] = useState()
    const [subcategoryLoader, setSubcategoryLoader] = useState(true)
    const [pageNumber, setPageNumber] = useState(1)
    const [nextPage, setNextPage] = useState()

    const getTransactions = async () => {
        setPageNumber(pageNumber + 1);
        console.log('Page Number Is ', pageNumber);

        fetch(`https://api-finwiz.softsquare.io/api/user/show-investment-holding/${item.account_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },


        })
            .then((response) => response.json())
            .then((data) => {

                console.log(data.data);
                var dataaa = 0

                data.data.map((item) => {
                    transactionData.push(item)

                    dataaa = dataaa + convertStringToNumber(item.institution_price)
                })
                setTransactionDetails(transactionData)
                setTotalIncrease(dataaa)



                setSubcategoryLoader(false)



            })
            .catch((error) => {
                console.log(error);
                // setLoader(false)
            });



    };

    useEffect(() => {
        getTransactions()


    }, [])

    const isFocused=useIsFocused()

    useEffect(() => {

        transactionData=[]
    }, [isFocused])

    const convertStringToNumber = (str) => {
        // Use parseFloat() to convert to a floating-point number
        return parseFloat(str);
    };
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

            <ScrollView>
                <View style={styles.mainview}>

                    <View >
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#9CA3AF', marginBottom: 8 }}>{capitalizeFirstWord(item.type)}</Text>

                        <View style={styles.upperview}>
                            <Image resizeMode='contain' style={{ width: 20, height: 20 }} source={require('../../../assets/Images/plaid.png')} />
                            <Text style={{ fontSize: 14, fontWeight: '600', color: 'black', paddingLeft: 8, flex: 1 }}>{item.name}</Text>
                        </View>


                    </View>

                    <View style={styles.view2}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <View>
                                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000' }}>{'USD ' + Math.round(item.balances_current)}</Text>
                                <Text style={{ color: '#9CA3AF', fontSize: 14, fontWeight: '500' }}>{'Portfolio'}</Text>

                            </View>

                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: 20, fontWeight: '500', color: '#31C48D' }}>{'+' + totalIncrease.toFixed(2)}</Text>
                                <Text style={{ color: '#9CA3AF', fontSize: 14, fontWeight: '500' }}>{'30th Oct 2023'}</Text>
                            </View>


                        </View>
                    </View>






                </View>


                <LineChart
                    data={{
                        labels: ["1", "30", "1", "30", "1", "30", "1", "30", "1", "30", "1", "30", "1", "30"],
                        datasets: [
                            {
                                data: [0, 5, 6, 12, 12, 12, 13, 14, 16, 25, 29, 11, 23, 42, 43, 53, 53, 12,],
                            },
                            {
                                data: [0, 5, 6, 12, 12, 12, 13, 14, 16, 25, 29, 11, 23, 42, 43, 53, 53, 12,],
                                color: () => item.backgroundColor,
                                strokeWidth: 1,
                                withDots: false,


                            },

                        ]
                    }}
                    width={Dimensions.get('window').width + 32}
                    height={200}
                    style={{ paddingRight: 0, marginTop: 25 }}
                    withOuterLines={false} // Hide outer lines
                    withHorizontalLabels={false} // Hide horizontal labels
                    withHorizontalLines={false} // Hide horizontal grid lines
                    withVerticalLines={false} // Show vertical grid lines
                    withVerticalLabels={false} // Hide vertical labels
                    withDots={false} // Hide data points dots
                    withShadow={true}



                    bezier={true}
                    chartConfig={{
                        backgroundGradientFrom: 'white',
                        backgroundGradientTo: 'white',

                        fillShadowGradient: 'white',
                        backgroundColor: 'white',
                        color: (opacity = 1) => '#722ED1', // Change color here
                    }}
                />


                <View style={{ marginHorizontal: 16 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#000', marginBottom: 10 }}>My Investments</Text>
                </View>


                <FlatList
                    data={transactionDetails}
                    scrollEnabled={false}
                    style={{ padding: 16 }}
                    keyExtractor={(item) => {
                        const key = item.id.toString()
                        return key
                    }}
                    ItemSeparatorComponent={() => <View style={{ margin: 8 }}></View>}
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
                    }} renderItem={({ item, index }) => <InvestmentComp key={index} item={item} />}



                />

            </ScrollView>
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


export default InvestmentDetail