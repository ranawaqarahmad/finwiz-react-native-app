import { View, Text } from 'react-native'
import React from 'react'

const Question = ({ item }) => {
  return (

    <View style={{marginBottom:16,rowGap:8}}>
      <View style={{ height: 32, width: 32, backgroundColor: '#7C56FE', borderRadius: 1000, alignItems: 'center', justifyContent: 'center', }}>
        <Text style={{ fontWeight: 'bold' ,color:'white'}}>D</Text>
      </View>
      <View style={{ backgroundColor: '#7C56FE', borderRadius: 16, borderTopLeftRadius: 0, paddingVertical: 8, paddingHorizontal: 16, marginVertical: 4, marginEnd: 64 }}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: '500' }}>{item.message}</Text>
      </View>

    </View>
  )
}

export default Question