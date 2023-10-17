import { View, Text, TextInput,Image } from 'react-native'
import React from 'react'

const TextInputCom = ({errorInvisible, placeholder, text, setText,startImageSrc,keyboardType }) => {
    return (
        <View style={{ borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#F9FAFB', borderRadius: 8, marginVertical: 9,flexDirection:'row',alignItems:'center' }}>
           {startImageSrc!=null&&(
           <Image style={{width:20,height:20,marginStart:10}} source={startImageSrc} />

           )} 
        <TextInput keyboardType={keyboardType?keyboardType:'default'} value={text} onChangeText={(text) => { 
            console.log(text);
            
            errorInvisible()
            setText(text) }} placeholderTextColor={'grey'} placeholder={placeholder} style={{  flex:1,fontSize: 16, fontWeight: 'normal', color: 'black', backgroundColor: '#F9FAFB', borderRadius: 8,  padding: 10 }}></TextInput>
        </View>
    )
}

export default TextInputCom