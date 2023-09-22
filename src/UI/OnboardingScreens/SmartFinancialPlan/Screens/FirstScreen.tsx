import { View, Text, StatusBar, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import { setstack } from '../../../../redux/AppReducer';

const FirstScreen = ({navigation}) => {
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar backgroundColor={'#7C56FE'} barStyle={'light-content'} />

      <View style={{ flex: 0.5, backgroundColor: '#7C56FE' }}></View>

      <View style={{ flex: 0.5, padding: 16, justifyContent: 'space-between' }}>


        <View style={{ alignItems: 'center', marginHorizontal:24 }}>
          <View>
            <Text style={{ fontSize: 24, fontWeight: '600', color: 'black', textAlign: 'center' }}>Artificial Intelligence</Text>
            <Text style={{ fontSize: 14, fontWeight: '400', color: '#4B5563', opacity: 0.7, marginTop: 4, textAlign: 'center' }}>Manage everything in your financials, let AI give you suggestions </Text>
          </View>
        </View>

        <View style={{marginBottom:16}}>

          <View style={{  flexDirection: 'row' }}>


            <TouchableOpacity
              onPress={() => {
               
                
                navigation.navigate('Welcome') }}
              style={{ flex: 1, backgroundColor: '#9747FF', alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 4 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: 'white', }}>Create Profile</Text>

            </TouchableOpacity>



          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: '500', color: 'black', alignSelf: 'center', marginTop: 25 }}>Already have an account? <Text onPress={() => { navigation.navigate('SignIn') }} style={{ color: '#1C64F2' }}>Sign In</Text></Text>
          </View>
        </View>

      </View>
    </View>
  )
}

export default FirstScreen