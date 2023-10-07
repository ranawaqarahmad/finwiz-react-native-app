import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, StatusBar } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import moment from 'moment'

const Reciept = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { recieptDetails, basicDetails } = route.params
    const handlePress = () => {
        navigation.navigate('AddIncomeA')
    }
    const formatDate = (dateStr: any) => {
        const originalDate = moment(dateStr, 'YYYY-MM-DD HH:mm:ss').format('MMMM D');
        const formattedDate = originalDate;
        return formattedDate;
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
            <View style={styles.mainview}>

                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row' }}>
                        <Image source={require('../../../../assets/Images/backarrow.png')}
                            style={{ height: 20, width: 20 }} />
                    </TouchableOpacity>
                    {/* dots */}
                    <TouchableOpacity>
                        <Image source={require('../../../../assets/Images/verticaldots.png')}
                            style={{ height: 20, width: 20, alignSelf: 'center', marginLeft: 20 }}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={{ marginTop: 10, fontSize: 12, fontWeight: '400', color: '#6B7280' }}>ID 1234567898</Text>

                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#111928' }}>{recieptDetails.merchant_name}</Text>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#111928' }}>{recieptDetails.amount}</Text>
                </View>
                <Text style={{ marginTop: 4 }}>
                    {formatDate(recieptDetails.datetime)} , {basicDetails.category}
                </Text>

                <View>
                    <View style={{ flexDirection: 'row', marginTop: 30, width: '100%', }}>
                        <Text style={{ width: '50%', fontSize: 12, fontWeight: 'normal', color: '#6B7280' }}>Merchant Name</Text>
                        <Text style={{ fontSize: 12, fontWeight: '600', color: '#111928', textAlign: 'right', }}>{recieptDetails.merchant_name}</Text>
                    </View>
                    {/* <View style={{ flexDirection: 'row', marginTop: 20, width: '100%',  marginBottom: 70 }}>
                        <Text style={{width:'50%', fontSize: 12, fontWeight: 'normal',color:'#6B7280' }}>Merchant id</Text>
                        <Text style={{  fontSize: 12, fontWeight: '600',color:'#111928', textAlign: 'right',  }}>1234567</Text>
                    </View> */}
                </View>
                {recieptDetails.receipt ?
                <Image resizeMode='stretch' source={{uri:recieptDetails.receipt}} style={{height:200,width:100,marginTop:70,alignSelf:'center'}}></Image>
                :
                    <View style={{ marginTop: 70 }}>
                        <View style={{ alignSelf: 'center' }}>
                            <Image source={require('../../../../assets/Images/reciept.png')}
                                style={{ height: 95, width: 100 }}
                            />
                        </View>
                        <TouchableOpacity onPress={handlePress}>
                            <View style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 30, marginBottom: 20 }}>
                                <Image source={require('../../../../assets/Images/recieptbutton.png')}
                                    style={{ height: 41, width: 155 }}
                                />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'justify', alignSelf: 'center', fontSize: 14, fontWeight: '400', color: 'gray', marginTop: 20 }}>or</Text>
                        <TouchableOpacity>
                            <Text style={{ textAlign: 'justify', alignSelf: 'center', fontSize: 14, fontWeight: '400', color: '#7C56FE', marginTop: 30 }}>Upload Reciept</Text>
                        </TouchableOpacity>
                    </View>}

            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    mainview: {
        padding: 16
    }


})

export default Reciept