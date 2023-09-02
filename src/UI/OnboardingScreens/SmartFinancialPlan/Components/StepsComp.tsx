import { View, Text } from 'react-native'
import React from 'react'

const StepsComp = ({item}) => {
  return (
    <View>
      <Text>{item.step}</Text>
    </View>
  )
}

export default StepsComp