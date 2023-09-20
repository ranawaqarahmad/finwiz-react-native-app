import { View, Text, StatusBar, TouchableOpacity, Image, TextInput, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import RoundButtonComp from '../../BasicInfoScreens/Components/RoundButtonComp'
import { useSelector } from 'react-redux'
import SelectionComponent from '../../BasicInfoScreens/Components/SelectionComponent'
import { useIsFocused } from '@react-navigation/native'

const Property = ({ navigation }) => {
    const isFocused = useIsFocused();

    useEffect(() => {
         if(isFocused){
             setLoader(false)
 
         }
     
 
         return () => {
           
         };
       }, [isFocused]);
    const selector = useSelector(state => state.AppReducer);
    const questions = selector.questions;
    const userId = selector.userId;
    const [loader, setLoader] = useState(false)
    const [answer, setanswer] = useState('Yes')

    const authToken = selector.authToken;
    const [dependants, setdependants] = useState([
        {
            title: questions[4].options[0],
            selected:true

        },
        {
            title: questions[4].options[1],
            selected:false

        },

    ])


    const handleApiCall = async () => {

        console.log('Answer Is this', answer);
        console.log('User Id', userId);


        setLoader(true)
        fetch('https://api-finwiz.softsquare.io/api/user/add-user-question', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id": userId,
                "question_id": 5,
                "answer": answer
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status) {
                    console.log('Question Answered');
                    navigation.navigate('Mortage');


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


    const navigate = () => {
        handleApiCall()
    }
    const goBack = () => {
        navigation.goBack()
    }




    const selectType = (indexToEdit: number) => {
        console.log(indexToEdit);
        const specificValue = dependants[indexToEdit]['title'];
        setanswer(specificValue)
        console.log(specificValue);
        // Create a copy of the original employementTypes array and set all selected values to false
        const updatedEmployementTypes = dependants.map((type, index) => ({
            ...type,
            selected: index === indexToEdit ? true : false, // Set the selected value at the specified index to true, others to false
        }));

        // Update the state with the modified copy
        setdependants(updatedEmployementTypes);
    };

    return (

        <View style={{ flex: 1, backgroundColor: 'white' }}>
                                   

        {loader ?
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} color={'#7C56FE'}></ActivityIndicator>
            </View> :
        <View style={{ width: '100%', height: '100%', paddingHorizontal: 16, backgroundColor: 'white', justifyContent: 'space-between' }}>
            <StatusBar backgroundColor={'#F9FAFB'} barStyle={'dark-content'}></StatusBar>
            <View>
                <TouchableOpacity
                    onPress={goBack}>
                    <Image style={{ width: 24, height: 24, }} source={require('../../../../assets/Images/backarrow.png')} />

                </TouchableOpacity>

                <View style={{ marginTop: 29 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'normal', color: 'black', }}>Financial Information</Text>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 22 }}>Do you own a property</Text>


                </View>

                <View style={{ marginTop: 29 }}>
                    {dependants.map((item, index,) => <SelectionComponent key={index} onpress={selectType} index={index} title={item.title} selected={item.selected}/>)}
                </View>


            </View>







            <View style={{ marginBottom: 16 }}>



                <View style={{ marginBottom: 16 }}>

                    <RoundButtonComp onpress={navigate} />


                </View>


            </View>



        </View>}
        </View>
    )
}




export default Property