import React from 'react'
import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native'

const PlannedPurchaseComp = ({ item }) => {

    return (
        <View style={{ backgroundColor: 'white',  rowGap: 16,margin:2,elevation:1,height:280, }}>
        <View style={{ backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 16,flex:1 }}>
            <View style={{ flex: 1, padding: 16 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>{'$'+item.goal}</Text>
                <Text style={{ fontSize: 14, fontWeight: '400', color: '#4B5563' }}>Your Purchase Goal</Text>
            </View>
            <View style={{ flex: 1, padding: 16 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>{'$'+item.goal_achieved}</Text>
                <Text style={{ fontSize: 14, fontWeight: '400', color: '#4B5563' }}>Total Saved</Text>
            </View>

        </View>
    
        <View style={{height:1,width:'100%',backgroundColor:'#00000020'}}></View>
        <Text style={{fontSize:16,margin:16,textAlign:'center',color:'#6B7280'}}>Your goals will be achieved by the end of
        <Text style={{color:'#1F2A37',fontWeight:'bold'}}> dec 2025</Text>
        </Text>

    </View>
    )
}


export default PlannedPurchaseComp
