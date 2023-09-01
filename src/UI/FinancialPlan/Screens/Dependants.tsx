import { View, Text, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import RoundButtonComp from '../../BasicInfoScreens/Components/RoundButtonComp'
import SelectionComponent2 from '../Components/SelectionComponent2'

const Dependants = ({ navigation }) => {


    const [count,setcount]=useState(1)
    const [dependants, setdependants] = useState([
        {
            id:1,
            title: 'Yes i have dependents',
            selected:true
        },
        {
            id:2,
            title: 'No, i dont have dependents',
            selected:false
        },
      
    ])


    const navigate = () => {
        navigation.navigate('Property');
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
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 22 }}>Do you have any dependents? or planning to have any.</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'normal', color: '#4B5563', marginTop: 7 }}>Which method works best for you ?</Text>


                </View>

                <View style={{ marginTop: 29 }}>
                    {dependants.map((item, index,) => <SelectionComponent2 count={count} setcount={setcount} onpress={selectType} index={index} title={item.title} selected={item.selected} id={item.id} />)}
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




export default Dependants