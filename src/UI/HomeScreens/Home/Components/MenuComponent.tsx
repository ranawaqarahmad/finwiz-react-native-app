import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const MenuComponent = ({menuItem,onDelete,onMerge,onEdit,lockCategory,unlockCategory}) => {
    console.log('MENU ID in the bottom sheet is this', menuItem);
    
    return (
        <View style={{flex:1,}}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black',margin:16,marginTop:0 }}>Edit Actions</Text>
            <View style={{ marginHorizontal:24, flex: 1,rowGap:12,}}>
                <TouchableOpacity onPress={()=>onEdit(menuItem)} style={{ flexDirection: 'row', alignItems: 'center', columnGap: 16, }}>
                    <Image style={{ width: 24, height: 24 }} source={require('../../../../assets/Images/edit.png')} />
                    <Text style={{ fontSize: 16, fontWeight: '600', color: 'black' }}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>onMerge()} style={{ flexDirection: 'row', alignItems: 'center', columnGap: 16, }}>
                    <Image style={{ width: 24, height: 24 }} source={require('../../../../assets/Images/merge.png')} />
                    <Text style={{ fontSize: 16, fontWeight: '600', color: 'black' }}>Merge </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    {
                        menuItem.fixed==0?
                        lockCategory(menuItem):
                        unlockCategory(menuItem)

                    }
                    }} style={{ flexDirection: 'row', alignItems: 'center', columnGap: 16, }}>
                    <Image style={{ width: 24, height: 24 }} source={menuItem.fixed==0?require('../../../../assets/Images/lockblack.png'):require('../../../../assets/Images/unlock.png')} />
                    <Text style={{ fontSize: 16, fontWeight: '600', color: 'black' }}>{menuItem.fixed==0?'Lock':'Unlock'}</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={()=>onDelete(menuItem.id)} style={{ flexDirection: 'row', alignItems: 'center', columnGap: 16, }}>
                    <Image style={{ width: 24, height: 24 }} source={require('../../../../assets/Images/delete.png')} />
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#E02424' }}>Delete</Text>
                </TouchableOpacity> */}
            </View>
        </View>

    )
}

export default MenuComponent