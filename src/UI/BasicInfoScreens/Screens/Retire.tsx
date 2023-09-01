import { View, Text, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import TextInputCom from '../Components/TextInputCom'
import RoundButtonComp from '../Components/RoundButtonComp'
import SelectionComponent from '../Components/SelectionComponent'

const Retire = ({ navigation }) => {


    const [retire, setRetire] = useState([
        {
            title: 'less then 6 months',
            selected: false
        },
        {
            title: '6 to 12 months',
            selected: true
        },
        {
            title: '1 to 2 years',
            selected: false
        },
        {
            title: '3 to 5 years',
            selected: false
        },
        {
            title: 'more than 5 years',
            selected: false
        },


    ])


    const navigate = () => {
        // navigation.navigate('Dob');
    }




    const selectType = (indexToEdit: number) => {
        // Create a copy of the original employementTypes array and set all selected values to false
        const updatedEmployementTypes = retire.map((type, index) => ({
            ...type,
            selected: index === indexToEdit ? true : false, // Set the selected value at the specified index to true, others to false
        }));

        // Update the state with the modified copy
        setRetire(updatedEmployementTypes);
    };

    return (
        <View style={{ width: '100%', height: '100%', padding: 16, backgroundColor: '#F9FAFB', justifyContent: 'space-between' }}>
            <StatusBar backgroundColor={'#F9FAFB'}></StatusBar>
            <View>
                <TouchableOpacity>
                    <Image style={{ width: 24, height: 24, }} source={require('../../../assets/Images/crossblack.png')} />

                </TouchableOpacity>

                <View style={{ marginTop: 29 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'normal', color: 'black', }}>Basic Information</Text>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 22 }}>When would to like to Retire</Text>


                </View>

                <View style={{ marginTop: 29 }}>
                    {retire.map((item, index) => <SelectionComponent onpress={selectType} index={index} title={item.title} selected={item.selected} />)}
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

export default Retire


