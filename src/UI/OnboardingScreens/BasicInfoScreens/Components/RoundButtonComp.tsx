import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const RoundButtonComp = ({onpress}) => {
  return (
    <TouchableOpacity
    onPress={onpress}
    style={{ width: 60, height: 60, backgroundColor: 'black', alignSelf: 'flex-end', borderRadius: 400, alignItems: 'center', justifyContent: 'center', padding: 16, marginTop: 25, }}>
    <Image style={{ width: 24, height: 24 }} source={require('../../../../assets/Images/whitearrow.png')} />

</TouchableOpacity>
  )
}

export default RoundButtonComp