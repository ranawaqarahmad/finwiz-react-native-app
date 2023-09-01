import { View, Text, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import RoundButtonComp from '../../BasicInfoScreens/Components/RoundButtonComp'
import SelectionComponent from '../Components/SelectionComponent'

const Property = ({ navigation }) => {


    const [dependants, setdependants] = useState([
        {
            title: 'Yes',
        },
        {
            title: 'No',
        },
      
    ])


    const navigate = () => {
        navigation.navigate('Mortage');
    }
    const goBack = () => {
        navigation.goBack()
    }




    const selectType = (indexToEdit: number) => {
        // Create a copy of the original employementTypes array and set all selected values to false
        const updatedEmployementTypes = dependants.map((type, index) => ({
            ...type,
            selected: index === indexToEdit ? true : false, // Set the selected value at the specified index to true, others to false
        }));

        // Update the state with the modified copy
        setdependants(updatedEmployementTypes);
    };

    return (
        <View style={{ width: '100%', height: '100%', padding: 16, backgroundColor: '#F9FAFB', justifyContent: 'space-between' }}>
            <StatusBar backgroundColor={'#F9FAFB'} barStyle={'dark-content'}></StatusBar>
            <View>
                <TouchableOpacity
                    onPress={goBack}>
                    <Image style={{ width: 24, height: 24, }} source={require('../../../assets/Images/backarrow.png')} />

                </TouchableOpacity>

                <View style={{ marginTop: 29 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'normal', color: 'black', }}>Financial Information</Text>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 22 }}>Do you own a property</Text>


                </View>

                <View style={{ marginTop: 29 }}>
                    {dependants.map((item, index,) => <SelectionComponent onpress={navigate}  index={index} title={item.title} imgsrc={null} />)}
                </View>


            </View>







            <View style={{ marginBottom: 16 }}>



                <View style={{ marginBottom: 16 }}>

                    <RoundButtonComp onpress={navigate} />


                </View>


            </View>



        </View>
    )
}




export default Property