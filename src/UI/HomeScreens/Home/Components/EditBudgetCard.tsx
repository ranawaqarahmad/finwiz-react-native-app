import React, { useState } from 'react'
import * as Progress from 'react-native-progress';

import { TouchableOpacity, View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import MultiSliderComponent from './MultiSliderComponent';
const EditBudgetCard = ({ item, onClick,handleAddOrUpdate }) => {

    const convertStringToNumber = (str) => {

        // Use parseFloat() to convert to a floating-point number
        return parseFloat(str);
    };
    const [progress, setProgress] = useState(0)
    const percent = (value, outof) => {
        var percent = value / outof;
        var string = (percent * 100).toString();
        var percentString = string.split('')
        var words = percentString.slice(0, 2).join('');
        // console.log('Value is ' + value, ' Out of is ' + outof);

        if (convertStringToNumber(value) >= convertStringToNumber(outof)) {

            words = '100'

        }
        return words
    }


    function getFirstCharacterOfFirstWord(text) {
        // console.log('--------------------------------------', text);
        const words = text.charAt(0);
        return words

    }
    const [spendingLimit, setSpendingLimit] = useState(item ? item.limitation : '50')
    const onChangeSlider = (value) => {
        const roundedValue = Math.round(value);
        

        setSpendingLimit(roundedValue);

        handleAddOrUpdate(item.user_category_pivots[0].user_category_id,roundedValue)
    }

    const items = {
        limitation: Math.round(convertStringToNumber(item.limitation)),
        max_limit: Math.round(convertStringToNumber(item.max_limit)),
    }
    const [isEnabled, setIsEnabled] = useState(item ? item.fixed == 1 ? true : false : false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainview}>

                <View>



                    <View style={styles.upperview}>
                        <View style={{ justifyContent: 'center' }}>
                            <View style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center', backgroundColor: item.backgroundColor, borderRadius: 5 }}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>{getFirstCharacterOfFirstWord(item.category_name)}</Text>
                            </View>
                        </View>

                        <View style={{ justifyContent: 'center', flex: 1 }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: 'black', paddingLeft: 12 }}>{item.category_name}</Text>
                        </View>



                    </View>


                    <View
                        style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#00000060', alignSelf: 'center', }}>Set Spending Limit</Text>

                        <View
                            style={{

                            }}>
                            <Text
                                style={{ fontWeight: 'bold', color: '#111928', fontSize: 18, textAlign: 'center' }}>
                                {'$'}{Math.round(spendingLimit)}
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 32 }}>
                        <MultiSliderComponent isEnabled={isEnabled} onChangeSlider={onChangeSlider} item={items} />

                    </View>







                </View>















         

            </View>
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
        elevation: 1,
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

export default EditBudgetCard