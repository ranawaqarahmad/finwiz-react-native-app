import { View, Text, Image, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const CategoryComp = ({ item }) => {


    function getFirstCharacterOfFirstWord(text) {
        const words = text.charAt(0);
        return words

    }

    const colors = ['#B39966', '#E499F9', '#ED8080', '#F09F4B', '#848C93'];

    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }
    return (
        <View>
            <TouchableOpacity
                style={[styles.container]}>
                <View style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center', backgroundColor: getRandomColor(), borderRadius: 5 }}>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>{getFirstCharacterOfFirstWord(item.name)}</Text>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#000' }}>{item.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* <Text style={{ fontSize: 16, fontWeight: '500', color: '#000', marginEnd: 8 }}>{item.transaction_type == 'expense' ? ('-$' + item.amount) : '+$' + item.amount}</Text> */}
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#000', marginEnd: 8 }}>{'USD $'}{item.total}</Text>


                </View>

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 12
    },
    mainview: {
        marginTop: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,

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

export default CategoryComp