import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const RoundButton = ({onpress}) => {
  return (
    <TouchableOpacity
    onPress={onpress}
    style={{ width: 36, height: 36, backgroundColor: 'black', alignSelf: 'flex-end', borderRadius: 400, alignItems: 'center', justifyContent: 'center', padding: 16, }}>
    <Image style={{ width: 16, height: 16 }} source={require('../../../../assets/Images/whitearrow.png')} />

</TouchableOpacity>
  )
}

export default RoundButton