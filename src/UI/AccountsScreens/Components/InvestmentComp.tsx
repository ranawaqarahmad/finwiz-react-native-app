import { View, Text, Image } from 'react-native'
import React from 'react'

const InvestmentComp = ({ item }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 8 }}>
            <View style={{ width: 48, height: 48, borderRadius: 120, backgroundColor: '#424242' }} />
            <View style={{ rowGap: 2, flex: 1 }}>
                <Text style={{ color: 'black', fontSize: 18, fontWeight: '600' }}>{'Apple'}</Text>
                <Text style={{ color: '#374151', fontWeight: 'normal' }}>{'Apple Inc'}</Text>
            </View>
            <View style={{ rowGap: 2, flex: 1,alignItems:'flex-end' }}>
                <Text style={{ color: '#31C48D', fontSize: 13, fontWeight: 'normal' }}>{'+'+parseFloat(item.institution_price).toFixed(2)}</Text>
                <Text style={{ color: '#374151', fontWeight: 'normal' }}>{'Valuation - ' + parseFloat(item.institution_value).toFixed(2)}</Text>
            </View>
        </View>
    )
}

export default InvestmentComp