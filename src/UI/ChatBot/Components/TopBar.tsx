import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const TopBar = ({goBack,more}) => {
  return (
    <View style={{ marginHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <TouchableOpacity onPress={goBack} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('../../../assets/Images/backarrow.png')}
          style={{ height: 24, width: 24 }} />
      </TouchableOpacity>

      <Image resizeMode='contain' source={require('../../../assets/Images/finwizchatbot.png')}
        style={{ height: 24, width: 100 }} />

      <TouchableOpacity style={{}}>


        <TouchableOpacity onPress={more} style={{ backgroundColor: '#F3F4F6', borderRadius: 8, height: 32, width: 32, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../../../assets/Images/verticaldots.png')}
            style={{
              transform: [{ rotate: '90deg' }], // Rotate the image 90 degrees
              height: 20,
              width: 20,
              alignSelf: 'center',
            }} />

        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  )
}

export default TopBar