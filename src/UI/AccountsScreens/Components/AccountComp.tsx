import React, { useState } from 'react'

import { TouchableOpacity, View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
const AccountComp = ({ item,navigate }) => {
 

    const capitalizeFirstWord=(str) =>{
        if (typeof str !== 'string' || str.length === 0) {
          return str; // Return the input if it's not a string or an empty string
        }
      
        // Capitalize the first letter and concatenate it with the rest of the string
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={()=>navigate(item)} activeOpacity={0.8} style={styles.mainview}>

                <View >
                    <View style={styles.upperview}>
                        <Image resizeMode='contain' style={{ width: 20, height: 20 }} source={require('../../../assets/Images/plaid.png')} />
                        <Text style={{ fontSize: 14, fontWeight: '600', color: 'black', paddingLeft: 8, flex: 1 }}>{item.name}</Text>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#9CA3AF', paddingLeft: 0 }}>{capitalizeFirstWord(item.type)}</Text>
                    </View>


                </View>

                <View style={styles.view2}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000' }}>{item.balances_available?'USD '+item.balances_available:'USD '+item.balances_current}</Text>
                        {item.isInvestment &&
                            <Text style={{ color: '#31C48D', fontSize: 20, fontWeight: '600' }}>{item.increase}</Text>

                        }
                        {/* <Text style={{ fontSize: 12, fontWeight: '400', color: '#000' }}>{percent(item.manual_spending, item.limitation)}{'%'}</Text> */}
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row', borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8, justifyContent: 'space-between', alignItems: 'center',

                }}>
                    <Text style={{ color: '#9CA3AF', fontSize: 14, fontWeight: '600' }}>{capitalizeFirstWord(item.subtype)}</Text>
                    {item.isInvestment ?
                        <Text style={{ color: '#9CA3AF', fontSize: 14, fontWeight: '600' }}>{item.date}</Text>

                        :
                        <Text style={{ color: '#111928', fontSize: 16, fontWeight: '600' }}>{'View All'}</Text>
                    }

                </View>




            </TouchableOpacity>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainview: {
        marginTop: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,

        elevation: 10,
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
    mortgagerentelectricitytext: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
        flex: 1
    },
    transactiontext: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
    },
    remainingbalance: {
        color: '#9CA3AF',
        fontSize: 14,
        fontWeight: '400',
        marginTop: 4
    }
})


export default AccountComp