import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import AssetsComp from '../Components/AssetsComp'

const AssetsDetail = ({ navigation }) => {
  const [assets, setAssets] = useState([
    {
      name: 'Example Property 1',
      valuation: '$40M',
      image: require('../../../assets/Images/property.png'),

    },
    {
      name: 'Watch 1',
      valuation: '$40k',
      image: require('../../../assets/Images/watch.png'),

    },
  ])
  return (
    <View style={{ backgroundColor: 'white', flex: 1, paddingHorizontal: 16 }}>
      {/* TOP BACK ROW */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../../assets/Images/backarrow.png')}
            style={{ height: 20, width: 20 }} />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('AddNewAsset')} activeOpacity={0.8} style={{ backgroundColor: '#E5E7EB', borderRadius: 100, width: 32, height: 32, justifyContent: 'center', alignItems: 'center', }}>


          <Image source={require('../../../assets/Images/plusiconblack.png')}
            style={{ height: 20, width: 20, alignSelf: 'center', }}
          />
        </TouchableOpacity>
      </View>

      {
        assets.length > 0 ?
          <>
            <Text style={{ fontSize: 20, fontWeight: '600', color: 'black', marginTop: 16 }}>Assets</Text>

            <FlatList
              style={{ marginTop: 16 }}
              renderItem={({ item, index }) => <AssetsComp item={item} />}
              ItemSeparatorComponent={() => <View style={{ margin: 6 }}></View>}
              data={assets} /></>
          :
          <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ alignItems: 'center' ,flex:1,width:'100%',justifyContent:'center'}}>
              <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>No Asset Added Yet</Text>
              <Text style={{marginTop:4, fontSize: 16, fontWeight: '400', color: '#374151', width: '70%', textAlign: 'center' }}>Add your assets here and track your progress to freedom</Text>
              <TouchableOpacity activeOpacity={0.8} style={{ marginTop:16, backgroundColor: '#7C56FE', borderRadius: 8, columnGap: 8, padding: 8, paddingHorizontal: 16, flexDirection: 'row' }}>
                <Image source={require('../../../assets/Images/plusicon.png')}

                  style={{ height: 10, width: 10, alignSelf: 'center', }}
                />
                <Text style={{ fontSize: 16, fontWeight: '400', color: 'white' }}>Add New Asset</Text>
              </TouchableOpacity>
            </View>
          </View>

      }

    </View>
  )
}

export default AssetsDetail