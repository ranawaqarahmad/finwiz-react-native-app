import React from 'react';
import {View, Text, SafeAreaView, Image, StyleSheet} from 'react-native';

const LiabilityComp = ({item, month}) => {
  return (
    <View
      style={{backgroundColor: 'white', margin: 2, elevation: 1, height: 280}}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}>
          <View style={{flex: 1, padding: 16}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
              {'$' + item.credit_total}
            </Text>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#4B5563'}}>
              Total Credit Used
            </Text>
          </View>
          <View style={{flex: 1, padding: 16}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
              {'$' + item.paid_total}
            </Text>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#4B5563'}}>
              {month}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}>
          <View style={{flex: 1, padding: 16}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'black',
                  flex: 1,
                }}>
                {item.credit_limit_remaining_percent + '%'}
              </Text>
              {/* <Image resizeMode='contain' style={{ width: 20, height: 20 }} source={require('../../../../assets/Images/infoicon.png')} /> */}
            </View>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#4B5563'}}>
              Credit Utilization Rate
            </Text>
          </View>
          <View style={{flex: 1, padding: 16}}></View>
        </View>
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#00000020',
              position: 'absolute',
              alignSelf: 'center',
            }}></View>
          <View
            style={{
              width: 1,
              height: '100%',
              backgroundColor: '#00000020',
              position: 'absolute',
              alignSelf: 'center',
            }}></View>
        </View>
      </View>
      <View
        style={{height: 1, width: '100%', backgroundColor: '#00000020'}}></View>
      <Text
        style={{
          fontSize: 16,
          margin: 16,
          textAlign: 'center',
          color: '#6B7280',
        }}>
        You will be debt free by the end of next year
        <Text style={{color: '#1F2A37', fontWeight: 'bold'}}> dec 2025</Text>
      </Text>
    </View>
  );
};

export default LiabilityComp;
