import { View, Text, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import RoundButtonComp from '../../BasicInfoScreens/Components/RoundButtonComp'
import SelectionComponent from '../../BasicInfoScreens/Components/SelectionComponent'

const FormsOfIncome = ({ navigation }) => {


    const [income, setincome] = useState([
        {
            title: 'Hourly Wage',
            selected: false
        },
        {
            title: 'Salary',
            selected: true
        },
        {
            title: 'Investments',
            selected: false
        },
        {
            title: 'Rents',
            selected: false
        },
    ])


    const navigate = () => {
        navigation.navigate('Dependants');
    }
    const goBack = () => {
        navigation.goBack()
    }




    const selectType = (index) => {
        // Step 3: Make a copy of the array
        let bool;
        const newArray = [...income];
        if (index >= 0 && index < income.length) {
            bool= income[index].selected;
          }
        // Modify the object at the specified index
        newArray[index] = { ...newArray[index], selected: !bool };
        
        // Update the state with the modified array
        setincome(newArray);
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
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 22 }}>What are your forms of income</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'normal', color: '#4B5563', marginTop: 7 }}>Select all that apply</Text>


                </View>

                <View style={{ marginTop: 29 }}>
                    {income.map((item, index,) => <SelectionComponent onpress={selectType} index={index} title={item.title} selected={item.selected}  />)}
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




export default FormsOfIncome