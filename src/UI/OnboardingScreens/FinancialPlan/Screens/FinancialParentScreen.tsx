import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import MonthlyAverageIncome from './MonthlyAverageIncome';
import * as Progress from 'react-native-progress';
import {setWelcomeNavStatus, setstack} from '../../../../redux/AppReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

var questionCount = 0;

const FinancialParentScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const selector = useSelector(state => state.AppReducer);
  const questions = selector.questions;
  const answers = selector.answers;

  const [answerIndex, setAnswerIndex] = useState(10);
  const [question, setQuestion] = useState();
  const questionlength = questions.length;
  const [progress, setprogree] = useState(0);
  const progressfactor = 1 / questionlength;
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (isFocused) {
      setLoader(false);
      questionCount = 0;
      setprogree(0);
    }

    return () => {};
  }, [isFocused]);

  useEffect(() => {
    const allQuestions = selector.questions;
    setQuestion(allQuestions[questionCount]);
    getAnswer(allQuestions[questionCount]);
    // console.log('Question at '+questionCount+'is this',allQuestions[questionCount]);

    return () => {};
  }, []);

  const userId = selector.userId;

  const [loader, setLoader] = useState(false);
  const [answer, setanswer] = useState('');
  const authToken = selector.authToken;

  const [openDropDown, setOpenDropDown] = useState(false);
  const [dropDownValue, setDropDownValue] = useState('25');
  const [dropDownItems, setDropDownItems] = useState([]);

  const nextQuestion = () => {
    questionCount++;

    if (questionCount < questionlength) {
      setQuestion(questions[questionCount]);
      setprogree(progress + progressfactor);
      setAnswerIndex(10);
      getAnswer(questions[questionCount]);
    } else {
      navigation.navigate('CircularProgress');
    }
  };

  const getAnswer = question => {
    const answers = selector.answers;
    if (Array.isArray(answers)) {
      const answerIndex = answers.map(item => {
        if (item.question_id == question.id) {
          console.log('ANSWER AVAILABLE', item.answer);
          const index = question.options.indexOf(item.answer);
          setanswer(item.answer);

          console.log(index);
          setAnswerIndex(index);
          return index;
        } else {
          return null;
        }
      });
    } else {
    }
  };

  const setAnswerQuestion = text => {
    setIsErrorVisible(false);
    setErrorText('');
    setanswer(text);
  };

  const handleApiCall = async () => {
    if (questionCount < questionlength) {
      console.log('QUESTION ID', question.id);

      console.log('ANSWER IS THIS', answer);

      if (answer == '') {
        setIsErrorVisible(true);
        setErrorText('Select an option to proceed');
        return;
      }

      // console.log('QUESTION COUNT IS', questionCount);
      // console.log('User Id', userId);

      setLoader(true);
      fetch(
        'https://api-finwiz.softsquare.io/api/user/add-or-update-user-question',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: question.id === 13 ? 'integer' : question.type,
            question_id: question.id,
            answer: answer,
          }),
        },
      )
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.status == 'true') {
            setDropDownValue('');
            setOpenDropDown(false);
            setanswer('');
            console.log('Question Answered');
            setQuestion(null);
            nextQuestion();
            setLoader(false);
          } else {
            console.log('MESSAGE', data.message);
            setLoader(false);
          }
        })
        .catch(error => {
          console.log(error);
          setLoader(false);
        });
    } else {
      console.log('ALL QUESTIONS ANSWERED');
    }
  };

  const questionDetails = async questionId => {
    console.log('AuthToken is ', authToken);

    fetch(
      `https://api-finwiz.softsquare.io/api/user/get-user-question/${questionId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        // console.log('ALL ANSWERS OF QUESTIONS', data);
      })
      .catch(error => {
        console.log(error);
        // setLoader(false)
      });
  };

  const handleDropDownChange = value => {
    setErrorText('');
    setDropDownValue(value);
    setanswer(value);
  };

  useEffect(() => {
    const generateDropDownItems = (start, end) => {
      const items = [];
      for (let i = start; i <= end; i += 5) {
        items.push({label: i.toString(), value: i.toString()});
      }
      return items;
    };

    setDropDownItems(generateDropDownItems(20, 120));
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar
        backgroundColor={'white'}
        barStyle={'dark-content'}></StatusBar>
      <Progress.Bar
        unfilledColor="#F1F1F1"
        style={{borderRadius: 0, borderWidth: 0}}
        progress={progress}
        width={null}
        color="#9747FF"
      />
      <TouchableOpacity style={{marginHorizontal: 16}}>
        <Image
          style={{width: 24, height: 24, marginVertical: 24}}
          source={require('../../../../assets/Images/crossblack.png')}
        />
      </TouchableOpacity>

      {isErrorVisible && (
        <Text
          style={{
            paddingHorizontal: 15,
            color: 'red',
            fontWeight: '400',
            marginBottom: 8,
          }}>
          {errorText}
        </Text>
      )}

      {question && !loader ? (
        <View style={{flex: 1}}>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={'white'}></StatusBar>

          <MonthlyAverageIncome
            answerIndex={answerIndex}
            setAnswerQuestion={setAnswerQuestion}
            nextQuestion={handleApiCall}
            question={question}
            openDropDown={openDropDown}
            setOpenDropDown={setOpenDropDown}
            dropDownValue={dropDownValue}
            setDropDownValue={setDropDownValue}
            dropDownItems={dropDownItems}
            setDropDownItems={setDropDownItems}
            handleDropDownChange={handleDropDownChange}
          />
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator
            size={'large'}
            color={'#7C56FE'}></ActivityIndicator>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FinancialParentScreen;
