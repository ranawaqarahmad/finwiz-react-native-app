import { View, Text, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import RoundButtonComp from '../../BasicInfoScreens/Components/RoundButtonComp'
import SelectionComponent from '../Components/SelectionComponent'

const MonthlyAverageIncome = ({ navigation }) => {


    const [income, setincome] = useState([
        {
            title: 'Upload W2 Forms',
        },
        {
            title: 'Other income forms',
        },
        {
            title: 'Enter Manually',
        },
    ])


    const navigate = () => {
        navigation.navigate('FormsOfIncome');
    }
    const goBack = () => {
        navigation.goBack()
    }




    const selectType = (indexToEdit: number) => {
        // Create a copy of the original employementTypes array and set all selected values to false
        const updatedEmployementTypes = income.map((type, index) => ({
            ...type,
            selected: index === indexToEdit ? true : false, // Set the selected value at the specified index to true, others to false
        }));

        // Update the state with the modified copy
        setincome(updatedEmployementTypes);
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
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 22 }}>We need to calculate your monthly average income.</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'normal', color: '#4B5563', marginTop: 7 }}>Which method works best for you ?</Text>


                </View>

                <View style={{ marginTop: 29 }}>
                    {income.map((item, index,) => <SelectionComponent imgsrc={require('../../../assets/Images/backarrow.png')} onpress={navigate}  index={index} title={item.title} />)}
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




export default MonthlyAverageIncome