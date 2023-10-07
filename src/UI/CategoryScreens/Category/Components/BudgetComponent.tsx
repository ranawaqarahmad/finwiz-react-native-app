import React from 'react'
import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native'

const BudgetComponent = ({ image1, text1,borderStyle, text2  }) => {

  return (
    <SafeAreaView>
      <View
        style={[styles.container, borderStyle]}
      >
        {/* green arrow */}
        <View style={{justifyContent:'center'}}>
          <Image
            source={image1}
            style={{ height: 32, width: 32,}}
            resizeMode='contain'
          />
        </View>

        {/* text1 */}
        <View style={{ flex: 0.9 ,justifyContent:'center'}}>
          <Text style={{ fontSize: 14, color: 'black', paddingLeft: 10 }}>{text1}</Text>
        </View>

        {/* right text2*/}
        <View style={{justifyContent:'center'}}>
          <Text style={{fontSize:14,fontWeight:'500'}}>{text2}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles=StyleSheet.create({
    container:{
        height: 55,
          width: '100%',
          flexDirection: 'row',
          justifyContent:'space-evenly',
    }
})

export default BudgetComponent
