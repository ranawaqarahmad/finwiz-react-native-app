import React from 'react'
import { TouchableOpacity, View, Text, SafeAreaView, Image, StyleSheet } from 'react-native'
import moment from 'moment';

const TransactionComponent = ({ navigationClick, item }) => {

  const formatDate = (dateStr: any) => {
    const originalDate = moment(dateStr, 'YYYY-MM-DD HH:mm:ss').format('MMMM D');
    const formattedDate = originalDate;
    return formattedDate;
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => { navigationClick(item) }}
        style={[styles.container]}>

        <View style={{ flex: 1, marginTop: 16 }}>
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#000' }}>{item.merchant_name}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 12, fontWeight: '400', color: '#6B7280' }}>{formatDate(item.datetime)}</Text>
            <Text style={{ fontSize: 12, fontWeight: '400', color: '#6B7280' }}>{item.receipt ? ' - 1  Attachments' : ''}</Text>

          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: '500', color: '#000', marginEnd: 8 }}>{item.transaction_type == 'expense' ? ('' + item.amount) :'+$'+ item.amount}</Text>
          <Image source={require('../../../../assets/Images/verticaldots.png')}
            style={{ height: 20, width: 20 }}
          />
        </View>

      </TouchableOpacity>
      <View style={{ height: 1, backgroundColor: '#E8E8E8' }}></View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})

export default React.memo(TransactionComponent)


