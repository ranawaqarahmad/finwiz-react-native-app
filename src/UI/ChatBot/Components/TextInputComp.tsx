import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

const TextInputComp = ({addQuestion}) => {
  const [message,setMessage]=useState('')
  return (
    <View style={{ flexDirection: 'row', marginHorizontal: 16, columnGap: 12 ,alignItems:'center'}}>
      <View style={{ flex: 1, borderWidth: 1, borderRadius: 12, borderColor: '#9CA3AF', flexDirection: 'row', padding: 8 ,paddingVertical:6}}>
        <TextInput onChangeText={(text)=>setMessage(text)} placeholder='Message' style={{ flex: 1, padding: 0 }}>{message}</TextInput>
      </View>

      <TouchableOpacity onPress={()=>{addQuestion(message),
      setMessage('')}} disabled={message==''?true:false} activeOpacity={0.8} style={{ opacity:message==''?0.5:1,width: 32, height: 32, backgroundColor: '#7C56FE', borderRadius: 1000, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('../../../assets/Images/whitearrowup.png')}
          style={{
            height: 20,
            width: 20,
            alignSelf: 'center',
          }} />
      </TouchableOpacity>
    </View>
  )
}

export default TextInputComp