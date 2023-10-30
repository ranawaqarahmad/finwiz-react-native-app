import { View, Text,Image } from 'react-native'
import React from 'react'

const AssetsComp = ({item}) => {
  return (
    <View style={{flexDirection:'row',alignItems:'center',columnGap:8}}>
        <Image source={item.image} resizeMode='contain' style={{width:60,height:60,borderRadius:12}}/>
        <View style={{rowGap:2,flex:1}}>
            <Text style={{color:'black',fontSize:18,fontWeight:'600'}}>{item.name}</Text>
            <Text  style={{color:'#374151',fontWeight:'normal'}}>{'Valuation - '+item.value}</Text>

        </View>
    </View>
  )
}

export default AssetsComp