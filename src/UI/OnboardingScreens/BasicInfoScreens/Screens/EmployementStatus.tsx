import { View, Text, StatusBar, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, ActivityIndicator, Keyboard } from 'react-native'
import React, { useState } from 'react'
import RoundButtonComp from '../Components/RoundButtonComp'
import SelectionComponent from '../Components/SelectionComponent'
import { useSelector } from 'react-redux'

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
    const [employment,setEmployment]=useState('Self Employed')
    const [loader, setLoader] = useState(false)
    const selector = useSelector(state => state.AppReducer);
    const authToken = selector.authToken;

    const navigate = () => {

        handleApiCall()
    }
    const goBack = () => {
        navigation.goBack()
    }
    const handleApiCall = async () => {
       
        setLoader(true)
        fetch('https://api-finwiz.softsquare.io/api/user/update-user', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                employment_status: employment,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status) {
                    console.log('Employment Updated');
                    navigation.navigate('YearsExp');
                } else {
                    console.log('MESSAGE', data.message);
                    setLoader(false)
                }

            })
            .catch((error) => {
                console.log(error);
                setLoader(false)
            });



    };



    const selectType = (indexToEdit) => {
        const specificValue = employementTypes[indexToEdit]['title'];
        setEmployment(specificValue)
        console.log(specificValue);
        
        // Create a copy of the original employementTypes array and set all selected values to false
        const updatedEmployementTypes = employementTypes.map((type, index) => ({
            ...type,
            selected: index === indexToEdit ? true : false, // Set the selected value at the specified index to true, others to false
        }));

        // Update the state with the modified copy
        setEmployementTypes(updatedEmployementTypes);
    };

    return (




        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }} style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>

            {loader ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} color={'#7C56FE'}></ActivityIndicator>
            </View> :
        <View style={{ width: '100%', height: '100%', padding: 16, backgroundColor: '#F9FAFB', justifyContent: 'space-between' }}>
            <StatusBar backgroundColor={'#F9FAFB'} barStyle={'dark-content'}></StatusBar>
            <View>
                <TouchableOpacity
                    onPress={goBack}>
                    <Image style={{ width: 24, height: 24, }} source={require('../../../../assets/Images/crossblack.png')} />

                </TouchableOpacity>

                <View style={{ marginTop: 29 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'normal', color: 'black', }}>Basic Information</Text>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 22 }}>What's Your Employment Status</Text>


                </View>

                <View style={{ marginTop: 29 }}>
                    {employementTypes.map((item, index) => <SelectionComponent onpress={selectType} index={index} title={item.title} selected={item.selected} />)}
                </View>


            </View>







            <View style={{ marginBottom: 16 }}>



                <View style={{ marginBottom: 16 }}>

                    <RoundButtonComp onpress={navigate} />


                </View>


            </View>



        </View>}</TouchableWithoutFeedback>
    )
}

export default EmployementStatus


