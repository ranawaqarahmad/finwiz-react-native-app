import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const SelectionComponent = ({ onpress, index, title, selected, }) => {
    return (
        <View style={{ elevation: 5 }}>
            <TouchableOpacity onPress={() => onpress(index)} activeOpacity={0.9} style={{
                shadowOffset: { width: 1, height: 2 },
                shadowColor: 'black',
                shadowOpacity: 0.1,
                elevation: 3, backgroundColor: 'white', padding: 16, flexDirection: 'row', borderRadius: 4, alignItems: 'center', marginBottom: 13
            }}>
                <Text style={{ flex: 1, fontSize: 16, fontWeight: '500', color: 'black' }}>{title}</Text>
                {selected ? <Image style={{ width: 16, height: 16 }} source={require('../../../../assets/Images/greencheck.png')} />
                :<View style={{width:16,height:16,borderRadius:100,borderWidth:1,borderColor:'#CBCBCB'}}></View>}
            </TouchableOpacity>
        </View>

    )
}

export default SelectionComponent