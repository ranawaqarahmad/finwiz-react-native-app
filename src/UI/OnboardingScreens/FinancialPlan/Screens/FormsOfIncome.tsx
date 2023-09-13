import { View, Text, StatusBar, TouchableOpacity, Image, TextInput, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import RoundButtonComp from '../../BasicInfoScreens/Components/RoundButtonComp'
import SelectionComponent from '../../BasicInfoScreens/Components/SelectionComponent'
import { useSelector } from 'react-redux'

const FormsOfIncome = ({ navigation }) => {

    const selector = useSelector(state => state.AppReducer);
    const questions = selector.questions;
    const userId = selector.userId;

    const [loader, setLoader] = useState(false)
    const [answer, setanswer] = useState('Salary')
    const authToken = selector.authToken;
    const [income, setincome] = useState([
        {
            title: questions[1].options[0],
            selected: false
        },
        {
            title: questions[1].options[1],
            selected: true
        },
        {
            title: questions[1].options[2],
            selected: false
        },
        {
            title: questions[1].options[3],
            selected: false
        },
    ])


    const navigate = () => {
        handleApiCall()
    }
    const goBack = () => {
        navigation.goBack()
    }




    const selectType = (index) => {

        console.log(index);
        const specificValue = income[index]['title'];
        setanswer(specificValue)
        console.log(specificValue);
        
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
                "question_id": 2,
                "answer": answer
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status) {
                    console.log('Question Answered');
                    navigation.navigate('Dependants');


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
                        <SafeAreaView style={{flex:1}}>

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
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 22 }}>{questions[1].question}</Text>
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



        </View>}
        </SafeAreaView></View>
    )
}




export default FormsOfIncome