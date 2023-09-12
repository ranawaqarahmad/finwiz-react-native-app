import { View, Text, StatusBar, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, ActivityIndicator, Keyboard } from 'react-native'
import React, { useState } from 'react'
import TextInputCom from '../Components/TextInputCom'
import RoundButtonComp from '../Components/RoundButtonComp'
import SelectionComponent from '../Components/SelectionComponent'
import { useSelector } from 'react-redux'

const YearsExp = ({ navigation }) => {


    const [yearsOfExp, setyearsOfExp] = useState([
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


    const [years, setYears] = useState('6 to 12 months')
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
                years_of_working: years,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status) {
                    console.log('Employment Updated');
                    navigation.navigate('Retire');
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



    const selectType = (indexToEdit: number) => {
        const specificValue = yearsOfExp[indexToEdit]['title'];
        setYears(specificValue)
        console.log(specificValue);
        // Create a copy of the original employementTypes array and set all selected values to false
        const updatedEmployementTypes = yearsOfExp.map((type, index) => ({
            ...type,
            selected: index === indexToEdit ? true : false, // Set the selected value at the specified index to true, others to false
        }));

        // Update the state with the modified copy
        setyearsOfExp(updatedEmployementTypes);
    };

    return (

        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }} style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>

            {loader ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'white' }}>
                <ActivityIndicator size={'large'} color={'#7C56FE'}></ActivityIndicator>
            </View> :
                <View style={{ width: '100%', height: '100%', paddingHorizontal: 16, backgroundColor: '#F9FAFB', justifyContent: 'space-between' }}>
                    <StatusBar backgroundColor={'#F9FAFB'} barStyle={'dark-content'}></StatusBar>
                    <View>
                        <TouchableOpacity
                            onPress={goBack}>
                            <Image style={{ width: 24, height: 24, }} source={require('../../../../assets/Images/crossblack.png')} />

                        </TouchableOpacity>

                        <View style={{ marginTop: 29 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'normal', color: 'black', }}>Basic Information</Text>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 22 }}>For how many years you have been working</Text>


                        </View>

                        <View style={{ marginTop: 29 }}>
                            {yearsOfExp.map((item, index) => <SelectionComponent onpress={selectType} index={index} title={item.title} selected={item.selected} />)}
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

export default YearsExp


