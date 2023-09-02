import { View, Text, Image } from 'react-native'
import React from 'react'
import RoundButtonComp from '../../BasicInfoScreens/Components/RoundButtonComp'
import RoundButton from './RoundButton'

const StepsComp = ({ item, onpress }) => {
    return (
        <View style={{ marginVertical: 16 }}>
            <Text style={{ fontSize: 14, color: 'black' }}>{item.step}</Text>
            <View style={{ backgroundColor: 'white', borderRadius: 11, elevation: 4, padding: 16, marginTop: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ borderRadius: 9, backgroundColor: item.color, padding: 10, justifyContent: 'space-between' }}>
                        <Image style={{ width: 24, height: 24 }} source={item.imgsrc} />
                    </View>
                    {item.selected ? (
                        <Image style={{ width: 24, height: 24 }} source={require('../../../../assets/Images/greencheck.png')} />) : (
                        <View style={{ borderRadius: 100, borderWidth: 1, width: 24, height: 24, borderColor: '#00000020' }}></View>)}
                </View>
                <View style={{ marginTop: 16 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>{item.title}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4, alignItems: 'center' }}>
                        <Text style={{ marginEnd: 16, flex: 1, textAlignVertical: 'center', }}>
                            {item.description}
                        </Text>
                        <RoundButton onpress={onpress} />



                    </View>
                </View>
            </View>

        </View>
    )
}

export default StepsComp