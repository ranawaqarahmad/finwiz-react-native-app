import { View, Text, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import RoundButtonComp from '../../BasicInfoScreens/Components/RoundButtonComp'
import SelectionComponent from '../Components/SelectionComponent'
import TextInputCom from '../../BasicInfoScreens/Components/TextInputCom'
import { useDispatch } from 'react-redux'
import { setFinancialPlanScreen, setWelcomeNavStatus, setstack } from '../../../../redux/AppReducer'

const Mortage = ({ navigation }) => {


    const dispatch=useDispatch()
    const [amount,setAmount]=useState('')
    const [dependants, setdependants] = useState([
        {
            title: 'Yes',
        },
        {
            title: 'No',
        },
      
    ])


    const navigate = () => {
        dispatch(setFinancialPlanScreen(2))
        dispatch(setstack('WelcomeNav'))
        dispatch(setWelcomeNavStatus(1))






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
                    <Image style={{ width: 24, height: 24, }} source={require('../../../../assets/Images/backarrow.png')} />

                </TouchableOpacity>

                <View style={{ marginTop: 29 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'normal', color: 'black', }}>Financial Information</Text>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 22 }}>What’s the mortgage amount on property you own?</Text>


                </View>

                <View style={{ marginTop: 29 }}>
                <TextInputCom  startImageSrc={require('../../../../assets/Images/dollar.png')} placeholder={'enter amount'} text={amount} setText={setAmount} />
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




export default Mortage