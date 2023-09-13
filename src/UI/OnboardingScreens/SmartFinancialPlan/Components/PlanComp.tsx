import { View, Text } from 'react-native'
import React from 'react'

const PlanComp = ({data,index}) => {
  return (
    <View  style={{marginBottom:16}}>
        <View style={{flexDirection:'row',}}>
            
            <View style={{marginEnd:10,borderRadius:10000,backgroundColor:data.selected&&data.color,width:31,height:31,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:16,fontWeight:'500',color:data.selected?'white':'#00000050'}}>{data.number}</Text>
            </View>
            <View style={{flex:1,marginTop:4,marginEnd:16,}}>
            <Text style={{fontSize:16,fontWeight:'600',color:data.selected?'black':'#00000050'}}>{data.title}</Text>
            <Text style={{fontSize:14,fontWeight:'400',color:'#00000050'}}>{data.desctiption}</Text>

            </View>
        </View>
    </View>
  )
}

export default PlanComp