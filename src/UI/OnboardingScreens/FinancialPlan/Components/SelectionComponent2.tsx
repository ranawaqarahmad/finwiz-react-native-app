import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const SelectionComponent2 = ({ onpress, selected, index, title, id,count,setcount }) => {
    var counti=count
    return (
        <View key={index}>
            <TouchableOpacity onPress={() => onpress(index)} activeOpacity={0.9} style={{ backgroundColor: 'white', padding: 16, flexDirection: 'row', borderRadius: 4, alignItems: 'center', elevation: 5, marginBottom: 13 }}>
                <Text style={{ flex: 1, fontSize: 16, fontWeight: '500', color: 'black' }}>{title}</Text>
                {selected && (<Image style={{ width: 16, height: 16 }} source={require('../../../../assets/Images/greencheck.png')} />
                )}
            </TouchableOpacity>
            {selected && id === 1 && (
                <View>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>No of Dependents</Text>
                    <View style={{ backgroundColor: 'white', padding: 16, flexDirection: 'row', justifyContent: 'center', borderRadius: 4, alignItems: 'center', elevation: 5, marginVertical: 13 }}>
                        <TouchableOpacity onPress={()=>setcount(counti-1)}>

                            <Image style={{ width: 24, height: 24 }} source={require('../../../../assets/Images/minus.png')} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: 'black',marginHorizontal:15 }}>{counti}</Text>
                        <TouchableOpacity onPress={()=>setcount(counti+1)}>

                            <Image style={{ width: 24, height: 24 }} source={require('../../../../assets/Images/minus.png')} />
                        </TouchableOpacity>

                    </View>


                    

                  


                    <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>Relation</Text>
                    <View style={{ backgroundColor: 'white', padding: 16, flexDirection: 'row', justifyContent: 'space-between', borderRadius: 4, alignItems: 'center', elevation: 5, marginVertical: 13 }}>
                       
                        <Text style={{ fontSize: 16, fontWeight: '400', color: '#6B7280',marginHorizontal:15 }}>Relation</Text>
                        <TouchableOpacity onPress={()=>setcount(counti+1)}>

                            <Image style={{ width: 24, height: 24 }} source={require('../../../../assets/Images/downarrow.png')} />
                        </TouchableOpacity>

                    </View>
                </View>
            )}
        </View>

    )
}

export default SelectionComponent2