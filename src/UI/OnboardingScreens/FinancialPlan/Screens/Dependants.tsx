import { View, Text, StatusBar, TouchableOpacity, Image, TextInput, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import RoundButtonComp from '../../BasicInfoScreens/Components/RoundButtonComp'
import SelectionComponent2 from '../Components/SelectionComponent2'
import { useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'

const Dependants = ({ navigation }) => {

    const isFocused = useIsFocused();

    useEffect(() => {
         if(isFocused){
             setLoader(false)
 
         }
     
 
         return () => {
           
         };
       }, [isFocused]);
    const [count,setcount]=useState(1)
    const selector = useSelector(state => state.AppReducer);
    const questions = selector.questions;
    const userId = selector.userId;
    const [loader, setLoader] = useState(false)
    const [answer, setanswer] = useState('No, I do not have dependents')

    const authToken = selector.authToken;
    const [dependants, setdependants] = useState([
        {
            id:1,
            title: questions[2].options[0],
            selected:false
        },
        {
            id:2,
            title: questions[2].options[1],
            selected:true
        },
      
    ])


    const navigate = () => {
       handleApiCall()
    }
    const goBack = () => {
        navigation.goBack()
    }

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
                "question_id": 3,
                "answer": answer
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status) {
                    console.log('Question Answered');
                    if(dependants[1].selected){
                        navigation.navigate('Property');
                    }else{
                        handleApiCall2()
                    }
                   

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

    const handleApiCall2 = async () => {

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
                "question_id": 4,
                "answer": count
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status) {
                    console.log('Question Answered');
                        navigation.navigate('Property');
                    
                   

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

        console.log(indexToEdit);
        const specificValue = dependants[indexToEdit]['title'];
        setanswer(specificValue)
        console.log(specificValue);
        // Create a copy of the original employementTypes array and set all selected values to false
        const updatedEmployementTypes = dependants.map((type, index) => ({
            ...type,
            selected: index === indexToEdit ? true : false, // Set the selected value at the specified index to true, others to false
        }));

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
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 22 }}>{questions[2].question}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'normal', color: '#4B5563', marginTop: 7 }}>Which method works best for you ?</Text>


                </View>

                <View style={{ marginTop: 29 }}>
                    {dependants.map((item, index,) => <SelectionComponent2 key={index} count={count} setcount={setcount} onpress={selectType} index={index} title={item.title} selected={item.selected} id={item.id} />)}
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




export default Dependants