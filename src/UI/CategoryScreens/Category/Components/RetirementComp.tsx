import React from 'react'
import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native'

const RetirementComp = ({ item }) => {

    return (
        <View style={{ backgroundColor: 'white',  rowGap: 16,margin:2,elevation:1,height:280, }}>
            <View style={{ flexDirection: 'row', padding: 16,flex:1 ,alignItems:'center'}}>
                <View style={{ flex: 1, padding: 16, }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>{item.retirement.answer}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '400', color: '#4B5563' }}>Retirement Age</Text>
                </View>
                <View style={{ flex: 1, padding: 16,}}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>{'$' + item.saving}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '400', color: '#4B5563' }}>Current Savings</Text>
                </View>

            </View>
            <View style={{  flexDirection: 'row', padding: 16,flex:1 ,alignItems:'center'  }}>
                
                <View style={{ flex: 1, padding: 16  }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black', flex: 1 }}>{item.lifestyle.answer}</Text>
                    </View>
                    <Text style={{ fontSize: 14, fontWeight: '400', color: '#4B5563' }}>Lifestyle</Text>
                </View>

            </View>
            <View style={{width:'100%',height:'100%',position:'absolute',alignItems:'center',justifyContent:'center'}}>
            <View style={{ height: 1, width: '100%', borderWidth: 1,borderColor:'#EEEEEE' }}></View>
            <View style={{ width: 1, height: '100%', borderWidth: 1,position:'absolute',borderColor:'#EEEEEE' }}></View>

            </View>
        </View>
    )
}


export default RetirementComp
