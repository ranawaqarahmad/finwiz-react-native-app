import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView, StatusBar, Modal } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import EditCategory from './EditCategory'

const CategoryDetails = () => {
    const navigation = useNavigation()
    const handlePress = () => {
        navigation.navigate('CoffeeCat')
    }
    const route = useRoute()
    const { item } = route.params
    console.log(item);


    const [categoryDetails, setcategoryDetails] = useState(
        item)
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={'#FFFFFF'} barStyle={'dark-content'} />
            <ScrollView contentContainerStyle={{ padding: 16, }} style={styles.mainview}>
                {/* BACK ARROW AND MONTH STARTS*/}
                <View style={{ height: 33, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ height: 33, width: '28%', flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../../../../assets/Images/backarrow.png')}
                                style={{ height: 20, width: 20 }} />
                        </TouchableOpacity>

                    </View>

                    <View style={{ height: 33, width: '30%', flexDirection: 'row', justifyContent: 'space-between', }}>
                        {/* BELLICON STARTS */}

                        <View style={{ height: 33, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: '400', color: '#4B5563' }}>
                                This Month
                            </Text>
                        </View>
                        {/* down arrow */}
                        <TouchableOpacity>
                            <View style={{ height: 33, width: 33, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require('../../../../assets/Images/downarrow.png')}
                                    style={{ height: 20, width: 20, alignSelf: 'center', }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* back arrow and month ends */}

                {/* EDIT CATEGORY STARTS */}
                <View style={{ width: '100%', marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* food icon and text*/}
                    <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', }}>
                        <View style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: item.backgroundColor, borderRadius: 5 }}>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 24 }}>{item.category_name.charAt(0)}</Text>
                        </View>
                        <View style={{ marginLeft: 12, }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#111928', }}>{categoryDetails.category_name}</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', color: '#6B7280' }}>12 Transactions</Text>
                        </View>

                    </View>
                    <TouchableOpacity onPress={handlePress}>
                        <View style={{ borderWidth: 1, borderRadius: 33, width: 81, justifyContent: 'center', borderColor: '#F09F4B', height: 33, }}>
                            <Text style={{ textAlign: 'center', color: '#F09F4B', fontSize: 16, fontWeight: '500' }}>+Add</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* edit category ends */}

                {/* spending limit starts */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#111928' }}>Spending Limit</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#111928' }}>{'$'}{categoryDetails.limitation}</Text>
                </View>
                {/* spending limit starts */}


                {/* Spending Limit Text */}
                <View style={{ flexDirection: 'row', marginTop: 10, columnGap: 8 }}>
                    <View
                        style={{ backgroundColor: '#FACA15', borderRadius: 100, height: 9, width: 9, marginTop: 2, }}
                    />
                    <Text style={{ fontSize: 12, fontWeight: 'normal', color: '#6B7280', flex: 1 }}>Finwiz Recommended limit is $300 for this category, based on your income and expenses</Text>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('EditCategory', { item: item })} style={{ marginTop: 12, borderRadius: 8, borderWidth: 1, borderColor: '#F09F4B', justifyContent: 'center', alignItems: 'center', paddingVertical: 8 }}>
                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#F09F4B', flex: 1 }}>Edit Category
                    </Text>
                </TouchableOpacity>
                {/* Spending Limit Text */}

                {/* Edit Category Starts */}
                <View style={{ height: 232, width: '100%', marginTop: 15, padding: 13, borderColor: '#D1D1D1', borderWidth: 1, borderRadius: 8 }}>
                    <Text style={{ fontSize: 14, fontWeight: '400', color: '#6B7280', marginBottom: 7 }}>Spending Summary</Text>
                    <View style={{ height: 180, width: '100%' }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#111928', marginBottom: 20 }}>{'$'}{categoryDetails.limitation}</Text>
                        <View style={{ borderWidth: 1, borderStyle: 'dashed', position: 'relative', borderColor: '#9CA3AF' }}></View>
                        <Image source={require('../../../../assets/Images/graphline.png')}
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
                    <Image source={require('../../../../assets/Images/horizontaldots.png')}
                        style={{ height: 6, width: 25, alignSelf: 'center' }}
                    />
                </View>
                {/* Edit Category ends */}

                <View style={{ marginTop: 25 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#000' }}>Overview</Text>
                </View>

                {/* {
                    categoryDetails.subcategories.map((item, index) => <View key={index}>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#000' }}>{item.title}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SubCategoryDetails', { basicDetails: item })}>
                                <Image source={require('../../../../assets/Images/righthalfarrow.png')}
                                    style={{ height: 20, width: 20 }}
                                />
                            </TouchableOpacity>

                        </View>
                        <Text style={{ marginTop: 3, fontSize: 14, fontWeight: '400' }}>{item.transactions} Transactions</Text>
                    </View>
                    )
                } */}

                {categoryDetails.user_category_pivots.map((item, index) => <View style={{ marginTop: 16, rowGap: 8 }} key={index}>
                    {item.category.sub_category.map((items, index) =>
                 <View key={index}>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#000' }}>{items.category}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SubCategoryDetails', { basicDetails: items })}>
                                <Image source={require('../../../../assets/Images/righthalfarrow.png')}
                                    style={{ height: 20, width: 20 }}
                                />
                            </TouchableOpacity>

                        </View>
                        <Text style={{ marginTop: 3, fontSize: 14, fontWeight: '400' }}>{items.count} Transactions</Text>
                    </View>

                    )}
                </View>)}



            </ScrollView>



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
    mortgagerentelectricitytext: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4
    },
    transactiontext: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
    },
})
export default CategoryDetails