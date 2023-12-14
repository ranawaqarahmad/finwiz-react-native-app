import { View, Text, Image } from 'react-native'
import React from 'react'

const Answer = ({item}) => {
  return (
    <View style={{marginBottom :16,rowGap:8}}>
      <Image source={require('../../../assets/Images/ailogo.png')} style={{height:32,width:32,}}/>
      
    <View style={{elevation:1,backgroundColor:'#F9FAFB',borderRadius:16,borderTopLeftRadius:0,paddingVertical:8,paddingHorizontal:16,marginVertical:4}}>
      <Text style={{color:'#1F2A37',fontSize:14,fontWeight:'normal'}}>{item.message}</Text>
    </View>
    </View>
  )
}

export default Answer