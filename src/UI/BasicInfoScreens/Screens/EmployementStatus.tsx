import { View, Text, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import TextInputCom from '../Components/TextInputCom'
import RoundButtonComp from '../Components/RoundButtonComp'
import SelectionComponent from '../Components/SelectionComponent'

const EmployementStatus = ({ navigation }) => {

 
    const [employementTypes, setEmployementTypes] = useState([
        {
            title: 'Employed',
            selected: false
        },
        {
            title: 'Self Employed',
            selected: true
        },
        {
            title: 'Unemployed',
            selected: false
        },
        {
            title: 'Student',
            selected: false
        },
        {
            title: 'Retired',
            selected: false
        },
      

    ])


    const navigate = () => {
        navigation.navigate('YearsExp');
    }

    const goBack=()=>{
        navigation.goBack()
    }



    const selectType = (indexToEdit) => {
        // Create a copy of the original employementTypes array and set all selected values to false
        const updatedEmployementTypes = employementTypes.map((type, index) => ({
          ...type,
          selected: index === indexToEdit ? true : false, // Set the selected value at the specified index to true, others to false
        }));
      
        // Update the state with the modified copy
        setEmployementTypes(updatedEmployementTypes);
      };

    return (
        <View style={{ width: '100%', height: '100%', padding: 16, backgroundColor: '#F9FAFB', justifyContent: 'space-between' }}>
            <StatusBar backgroundColor={'#F9FAFB'} barStyle={'dark-content'}></StatusBar>
            <View>
            <TouchableOpacity 
                onPress={goBack}>
                    <Image style={{ width: 24, height: 24, }} source={require('../../../assets/Images/crossblack.png')} />

                </TouchableOpacity>

                <View style={{ marginTop: 29 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'normal', color: 'black', }}>Basic Information</Text>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 22 }}>What's Your Employment Status</Text>


                </View>

                <View style={{ marginTop: 29 }}>
                {employementTypes.map((item,index)=><SelectionComponent onpress={selectType} index={index} title={item.title} selected={item.selected}/>)}
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

export default EmployementStatus


