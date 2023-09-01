import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const SelectionComponent = ({onpress, index,title,imgsrc }) => {
    return (
        <View key={index}>
             <TouchableOpacity onPress={()=>onpress(index)} activeOpacity={0.9}  style={{ backgroundColor: 'white', padding: 16, flexDirection: 'row', borderRadius: 4, alignItems: 'center', elevation: 5, marginBottom: 13 }}>
            <Text style={{ flex: 1, fontSize: 16, fontWeight: '500', color: 'black' }}>{title}</Text>
            {imgsrc!=null&&<Image style={{ width: 16, height: 16,transform:[{rotate:'180deg'}] }} source={imgsrc} />
           }
        </TouchableOpacity>
        </View>
       
    )
}


export default SelectionComponent