import React from 'react'
import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native'

const IncomeComponent = ({ image1, text,borderStyle  }) => {

  return (
    <SafeAreaView>
      <View
        style={[styles.container, borderStyle]}
      >
        {/* green arrow */}
        <View style={{justifyContent:'center'}}>
          <Image
            source={image1}
            style={{ height: 20, width: 20,}}
            resizeMode='contain'
          />
        </View>

        {/* text */}
        <View style={{ flex: 0.9 ,justifyContent:'center'}}>
          <Text style={{ fontSize: 14, color: 'black', paddingLeft: 10 }}>{text}</Text>
        </View>

        {/* right arrow */}
        <View style={{justifyContent:'center'}}>
          <Image
            source={require('../../../../assets/Images/righthalfarrow.png')}
            style={{ height: 20, width: 20, marginLeft: 30, }}
            resizeMode='contain'
          />
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
        //   borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        //   borderBottomWidth:1,
          justifyContent:'space-evenly',
    }
})

export default IncomeComponent
