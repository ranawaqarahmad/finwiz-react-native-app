import { View, Text, StatusBar, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import RoundButtonComp from '../../BasicInfoScreens/Components/RoundButtonComp'
import SelectionComponent from '../Components/SelectionComponent'
import { useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native'

const MonthlyAverageIncome = ({ navigation }) => {
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
    const [answer, setanswer] = useState('Enter Manually')
    const authToken = selector.authToken;
   
   
    const [income, setincome] = useState([
        {
            title: questions[0].options[0],
        },
        {
            title: questions[0].options[1],
        },
        {
            title: questions[0].options[2],
        },
    ])


    const navigate = () => {
        console.log(questions[0].question);


        handleApiCall()
    }
    const goBack = () => {
        navigation.goBack()
    }




    const selectType = (indexToEdit: number) => {
        console.log(indexToEdit);
        const specificValue = income[indexToEdit]['title'];
        setanswer(specificValue)
        console.log('Specific Value',specificValue);
        handleApiCall()

        // Create a copy of the original employementTypes array and set all selected values to false


        // Update the state with the modified copy
    };



    const handleApiCall = async () => {

        console.log('Answer Is this',answer);
        console.log('User Id',userId);

        
        setLoader(true)
        fetch('https://api-finwiz.softsquare.io/api/user/add-user-question', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id": userId,
                "question_id": 1,
                "answer": answer
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status) {
                    console.log('Question Answered');
                    navigation.navigate('FormsOfIncome');


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
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 22 }}>{questions[0].question}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'normal', color: '#4B5563', marginTop: 7 }}>Which method works best for you ?</Text>


                </View>

                <View style={{ marginTop: 29 }}>
                    {income.map((item, index,) => <SelectionComponent key={index} imgsrc={require('../../../../assets/Images/backarrow.png')} onpress={selectType} index={index} title={item.title} />)}
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




export default MonthlyAverageIncome