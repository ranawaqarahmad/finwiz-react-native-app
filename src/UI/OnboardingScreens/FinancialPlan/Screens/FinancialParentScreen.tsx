import { View, Text, StatusBar, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native'
import MonthlyAverageIncome from './MonthlyAverageIncome'
import * as Progress from 'react-native-progress';

var questionCount = 0;

const FinancialParentScreen = ({ navigation }) => {

    const isFocused = useIsFocused();
    const selector = useSelector(state => state.AppReducer);
    const questions = selector.questions;
    const [question, setQuestion] = useState()
    const questionlength = questions.length
    console.log('length of array is', questionlength);
    const [progress, setprogree] = useState(0)
    const progressfactor=1/questionlength
    const [isErrorVisible, setIsErrorVisible] = useState(false)
    const [errorText, setErrorText] = useState('')


    useEffect(() => {
        if (isFocused) {
            setLoader(false)
            questionCount=0
            setprogree(0)

        }


        return () => {

        };
    }, [isFocused]);

    useEffect(() => {
        const allQuestions = selector.questions;
        setQuestion(allQuestions[questionCount])
        // console.log('Question at '+questionCount+'is this',allQuestions[questionCount]);




        return () => {

        };
    }, []);



    const userId = selector.userId;

    const [loader, setLoader] = useState(false)
    const [answer, setanswer] = useState('')
    const authToken = selector.authToken;


  


 
  

    const nextQuestion = () => {
        questionCount++;

        if (questionCount < questionlength) {
            setQuestion(questions[questionCount])
            setprogree(progress + progressfactor)
        } else {
            navigation.navigate('CircularProgress')
        }

    }








    const setAnswerQuestion = (text) => {
        setIsErrorVisible(false)
        setErrorText('')
        setanswer(text)
    }
    const handleApiCall = async () => {
        if (questionCount < questionlength) {


            if(answer==''){
                setIsErrorVisible(true)
                setErrorText('Select an option to proceed')
                return;
            }


            console.log('QUESTION COUNT IS', questionCount);
            console.log('User Id', userId);


            setLoader(true)
            fetch('https://api-finwiz.softsquare.io/api/user/add-user-question', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "type": question.type,
                    "question_id": question.id,
                    "answer": answer
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.status == 'true') {
                        console.log('Question Answered');
                        setQuestion(null)
                        nextQuestion()
                        setLoader(false)
                        setanswer('')
                    } else {
                        console.log('MESSAGE', data.message);
                        setLoader(false)
                    }

                })
                .catch((error) => {
                    console.log(error);
                    setLoader(false)
                });


        } else {
            console.log('ALL QUESTIONS ANSWERED');

        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'}></StatusBar>
            <Progress.Bar unfilledColor='#F1F1F1' style={{ borderRadius: 0, borderWidth: 0, }} progress={progress} width={null} color="#9747FF" />
            <TouchableOpacity style={{marginHorizontal:16}}
                        >
                            <Image style={{ width: 24, height: 24,marginVertical:24 }} source={require('../../../../assets/Images/crossblack.png')} />

                        </TouchableOpacity>

                        {isErrorVisible && (<Text style={{ paddingHorizontal:15,color: 'red', fontWeight: '400', marginBottom: 8 }}>{errorText}</Text>)}

            {question && !loader ?
                <View style={{ flex: 1 }}>
                    <StatusBar barStyle={'dark-content'} backgroundColor={'white'}></StatusBar>


                    <MonthlyAverageIncome setAnswerQuestion={setAnswerQuestion} nextQuestion={handleApiCall} question={question} />

                </View>
                :
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={'large'} color={'#7C56FE'}></ActivityIndicator>
                </View>
            }</SafeAreaView>
    )
}




export default FinancialParentScreen