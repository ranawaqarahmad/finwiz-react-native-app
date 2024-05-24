import React, { useState } from 'react'
import * as Progress from 'react-native-progress';

import { TouchableOpacity, View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
const DetailedCard = ({ openSheet, item, openView, index, onClick }) => {
    console.log('=============================', item);

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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainview}>

                <TouchableOpacity onPress={() => onClick(item)} activeOpacity={0.8}>
                  
                  
                  
                    <View style={styles.upperview}>
                        <View style={{ justifyContent: 'center' }}>
                            <View style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center', backgroundColor: item.backgroundColor, borderRadius: 5 }}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>{getFirstCharacterOfFirstWord(item.category_name)}</Text>
                            </View>
                        </View>

                        <View style={{ justifyContent: 'center', flex: 1 }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: 'black', paddingLeft: 12 }}>{item.category_name}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            {item.fixed == 1 && (
                                <TouchableOpacity onPress={() => {
                                    console.log('PRESSED');

                                    openSheet(item)
                                }} style={{ padding: 2, justifyContent: 'center', flexDirection: 'row', alignSelf: 'center', }}>

                                    <Image source={require('../../../../assets/Images/lock.png')}
                                        style={{ height: 20, width: 20, }}
                                        resizeMode='contain'
                                    />

                                </TouchableOpacity>
                            )}

                            <TouchableOpacity onPress={() => {
                                console.log('PRESSED');

                                openSheet(item)
                            }} style={{ justifyContent: 'center', padding: 2, flexDirection: 'row', alignSelf: 'center', }}>

                                <Image source={require('../../../../assets/Images/verticaldots.png')}
                                    style={{ height: 20, width: 20, }}
                                    resizeMode='contain'
                                />

                            </TouchableOpacity>
                        </View>

                    </View>









                    <View style={styles.view2}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, fontWeight: 'normal', color: '#000' }}>Balance</Text>
                            <Text style={{ fontSize: 12, fontWeight: '400', color: '#000' }}>{percent(item.manual_spending, item.limitation)}{'%'}</Text>
                        </View>

                        <Progress.Bar borderRadius={10} unfilledColor='#F9FAFB' style={{ borderRadius: 10, borderWidth: 0, marginVertical: 6 }}     progress={item.manual_spending==0|| item.limitation==0? 0 : item.manual_spending / item.limitation} 
height={5} width={null} color="#000000" />


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F2A37' }}>{'$'}{item.manual_spending}</Text>
                                <Text style={{ fontSize: 12, fontWeight: '400', textAlign: 'center', color: '#1F2A37' }}>{' of '}{'$'}{item.limitation}</Text>
                            </View>
                            <View>
                                <Text style={{ color: '#1F2A37', alignItems: 'center' }}>{item.dayLeft}{' days left'}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>













                <TouchableOpacity onPress={() => openView(index)} style={{
                    flexDirection: 'row', borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8, justifyContent: 'space-between', alignItems: 'center',
                    marginTop: 20
                }}>
                    <Text style={{ color: '#111928', fontSize: 14, fontWeight: '500' }}>Overview</Text>
                    <Image

                        source={item.opened ? require('../../../../assets/Images/downarrow.png') : require('../../../../assets/Images/righthalfarrow.png')}
                        style={{ height: 20, width: 20 }}
                    />
                </TouchableOpacity>


                {item.opened && <View style={{ width: '100%', marginTop:8}}>


                    {item.user_category_pivots.map((item, index) => <View style={{marginTop:8, rowGap: 8 }} key={index}>
                        {item.category.sub_category.map((items, index) =>
                            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <View style={{flexDirection:'row',flex:1}}>
                                    <Text style={styles.mortgagerentelectricitytext}>{items.category}</Text>
                                    <Text style={{...styles.transactiontext}}>{items.count}{' Transactions'}</Text>

                                </View>
                            </View>

                        )}
                    </View>)}
                

                    <View style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 24 }}>
                        <TouchableOpacity onPress={() => onClick(item)}>
                            <Text style={{ color: '#6C2BD9', fontSize: 16, fontWeight: '600' }}>View Detail</Text>
                        </TouchableOpacity>
                    </View>
                </View>}

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
        flex:1
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

export default DetailedCard