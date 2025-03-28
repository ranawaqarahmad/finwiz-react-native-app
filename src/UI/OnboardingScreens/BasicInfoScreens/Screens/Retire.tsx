import { View, Text, StatusBar, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, ActivityIndicator, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import RoundButtonComp from '../Components/RoundButtonComp'
import SelectionComponent from '../Components/SelectionComponent'
import { useDispatch, useSelector } from 'react-redux'
import { setBasicinfoCompleted, setFinancialPlanScreen, setWelcomeNavStatus, setstack } from '../../../../redux/AppReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'

const Retire = ({ navigation }) => {

    const isFocused = useIsFocused();

   useEffect(() => {
        if(isFocused){
            setLoader(false)

        }
    

        return () => {
          
        };
      }, [isFocused]);
    const dispatch = useDispatch()
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
                retire: years,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status) {
                    console.log('Retirement Updated');
                    console.log(data.data);
                    dispatch(setBasicinfoCompleted(true))
                    storeBasicInfoCompleted('true')
                    dispatch(setFinancialPlanScreen(1))
                    dispatch(setstack('WelcomeNav'))
                    dispatch(setWelcomeNavStatus(1))
                   
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


    const storeBasicInfoCompleted = async (token: string) => {
        try {
            await AsyncStorage.setItem('basicInfoComplete', token);
            console.log('Basic Info status Stored successfully.');
        } catch (error) {
            console.error('Error storing data: ', error);
        }
    };

    const selectType = (indexToEdit: number) => {
        const specificValue = retire[indexToEdit]['title'];
        setYears(specificValue)
        console.log(specificValue);
        // Create a copy of the original employementTypes array and set all selected values to false
        const updatedEmployementTypes = retire.map((type, index) => ({
            ...type,
            selected: index === indexToEdit ? true : false, // Set the selected value at the specified index to true, others to false
        }));

        // Update the state with the modified copy
        setRetire(updatedEmployementTypes);
    };

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }} style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>

            {loader ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'white' }}>
                <ActivityIndicator size={'large'} color={'#7C56FE'}></ActivityIndicator>
            </View> :
        <View style={{ width: '100%', height: '100%', paddingHorizontal: 16, backgroundColor: 'white', justifyContent: 'space-between' }}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'}></StatusBar>
            <View>
                <TouchableOpacity
                    onPress={goBack}>
                    <Image style={{ width: 24, height: 24, }} source={require('../../../../assets/Images/crossblack.png')} />

                </TouchableOpacity>

                <View style={{ marginTop: 29 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'normal', color: 'black', }}>Basic Information</Text>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 22 }}>When would to like to Retire</Text>


                </View>

                <View style={{ marginTop: 29 }}>
                    {retire.map((item, index) => <SelectionComponent key={index} onpress={selectType} index={index} title={item.title} selected={item.selected} />)}
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

export default Retire


