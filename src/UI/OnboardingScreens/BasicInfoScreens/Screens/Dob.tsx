import {
    View, Text, StatusBar, TouchableOpacity, Image,TouchableWithoutFeedback, TextInput, ActivityIndicator, KeyboardAvoidingView, Keyboard, Modal
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react'
import RoundButtonComp from '../Components/RoundButtonComp'
import { useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native';

const Dob = ({ navigation }) => {
    const isFocused = useIsFocused();

   useEffect(() => {
        if(isFocused){
            setLoader(false)

        }
    

        return () => {
          
        };
      }, [isFocused]);
    const [dob, setDob] = useState('')
    const [loader, setLoader] = useState(false)
    const selector = useSelector(state => state.AppReducer);
    const authToken = selector.authToken;

    const navigate = () => {

        handleApiCall()
    }
    const goBack = () => {
        navigation.goBack()
    }

    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [datePickerDate, setDatePickerDate] = useState(new Date());
 
   
    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };
  


    const handleApiCall = async () => {

        setLoader(true)
        fetch('https://api-finwiz.softsquare.io/api/user/update-user', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date_of_birth: dob,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status) {
                    console.log('Date Of Birth Updated');
                    navigation.navigate('Address');
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





    const handleDateChange = (event, selectedDate) => {
        if (selectedDate) {
            const formattedDate = selectedDate.toLocaleDateString();
            // setSelectedDate(formattedDate);
            setDob(formattedDate);
            // setDatePickerDate(selectedDate);

        }
        hideDatePicker();
    };
    return (

        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }} style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>

            {loader ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'white' }}>
                <ActivityIndicator size={'large'} color={'#7C56FE'}></ActivityIndicator>
            </View> :
                <View style={{ width: '100%', height: '100%', paddingHorizontal: 16, backgroundColor: 'white', justifyContent: 'space-between' }}>
                    <StatusBar backgroundColor='white' barStyle={'dark-content'}></StatusBar>

                    <View>
                        <TouchableOpacity
                            onPress={goBack}>
                            <Image style={{ width: 24, height: 24, }} source={require('../../../../assets/Images/crossblack.png')} />

                        </TouchableOpacity>

                        <View style={{ marginTop: 29 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'normal', color: '#4B5563', }}>Basic Information</Text>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 22 }}>What's Your Date of Birth</Text>

                        </View>

                        <TouchableOpacity onPress={() => {
                        showDatePicker()
                         }} style={{ marginTop: 20 }}>
                            <View style={{ borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#F9FAFB', borderRadius: 8, marginVertical: 9, flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={{ width: 20, height: 20, marginStart: 10 }} source={require('../../../../assets/Images/calendar.png')} />

                                
                                <Text style={{ fontSize: 16, fontWeight: 'normal', color: 'black', backgroundColor: '#F9FAFB', borderRadius: 8, padding: 10 }}>{dob}</Text>
                            </View>
                        </TouchableOpacity>


                    </View>

                    <View style={{ marginBottom: 16 }}>



                        <View style={{ marginBottom: 16 }}>

                            <RoundButtonComp onpress={navigate} />


                        </View>


                    </View>
                    {isDatePickerVisible && (
                        <DateTimePicker
                        value={datePickerDate}
                        mode="date"
                        is24Hour={true}
                        display="spinner" // or 'spinner' or 'calendar' (Android-specific)
                        onChange={handleDateChange}
                      />
                    )}


                </View>}

        </TouchableWithoutFeedback>

    )
}

export default Dob




