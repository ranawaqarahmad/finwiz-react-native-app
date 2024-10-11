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
import RoundButtonComp from '../../BasicInfoScreens/Components/RoundButtonComp';
import SelectionComponent from '../../BasicInfoScreens/Components/SelectionComponent';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

interface Option {
  label: string;
  value: string;
}

const MonthlyAverageoptions = ({
  answerIndex,
  question,
  nextQuestion,
  setAnswerQuestion,
  openDropDown,
  setOpenDropDown,
  dropDownValue,
  setDropDownValue,
  dropDownItems,
  setDropDownItems,
  handleDropDownChange,
}) => {
  const isFocused = useIsFocused();
  const [options, setOptions] = useState([]);
  const selector = useSelector(state => state.AppReducer);
  const userId = selector.userId;
  const authToken = selector.authToken;
  const answers = selector.answers;

  console.log('ANSWER INDEX IS THIS', answerIndex);

  // console.log('QUESTIONS ARRAY', question);

  const array = question.options.map((item, index) => ({
    title: item,
    selected: answerIndex == index ? true : false,
  }));

  // console.log('ARRAY IS ', array);

  const [labeledArray, setLabeledArray] = useState(array);

  // console.log('LABELLED ARRAY', labeledArray);

  const [loader, setLoader] = useState(false);
  const [answer, setanswer] = useState('Enter Manually');

  const selectType = (indexToEdit: number) => {
    console.log(indexToEdit);
    const specificValue = labeledArray[indexToEdit]['title'];

    console.log('SPECIFIC', specificValue);

    setAnswerQuestion(specificValue);

    // Create a copy of the original employementTypes array and set all selected values to false
    const updatedEmployementTypes = labeledArray.map((type, index) => ({
      ...type,
      selected: index === indexToEdit ? true : false, // Set the selected value at the specified index to true, others to false
    }));
    console.log('UPDATED', updatedEmployementTypes);
    // Update the state with the modified copy
    setLabeledArray(updatedEmployementTypes);
  };

  const navigate = () => {};

  // const handleApiCall = async () => {

  //     console.log('Answer Is this', answer);
  //     console.log('User Id', userId);

  //     setLoader(true)
  //     fetch('https://api-finwiz.softsquare.io/api/user/add-user-question', {
  //         method: 'POST',
  //         headers: {
  //             'Authorization': `Bearer ${authToken}`,
  //             'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //             question_id: question.question.id,
  //             answer: answer,
  //             type: "multiple choice"
  //         }),
  //     })
  //         .then((response) => response.json())
  //         .then((data) => {
  //             console.log(data.status);
  //             if (data.status) {
  //                 console.log('Question Answered');
  //                 nextQuestion()
  //                 // setQuestionCount(questionCount + 1)
  //             } else {
  //                 console.log('MESSAGE', data.message);
  //                 setLoader(false)
  //             }

  //         })
  //         .catch((error) => {
  //             console.log(error);
  //             setLoader(false)
  //         });

  // };

  const handleUpdateAnswer = () => {};

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {loader ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator
            size={'large'}
            color={'#7C56FE'}></ActivityIndicator>
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
            paddingHorizontal: 16,
            backgroundColor: 'white',
            justifyContent: 'space-between',
          }}>
          <View>
            <View style={{}}>
              <Text style={{fontSize: 16, fontWeight: '600', color: '#9747FF'}}>
                Financial Goals
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: 'black',
                  marginTop: 22,
                }}>
                {question.question}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'normal',
                  color: '#4B5563',
                  marginTop: 7,
                }}>
                {question.i_e_text}
              </Text>
            </View>

            {question.id === 13 ? (
              <View>
                <DropDownPicker
                  open={openDropDown}
                  value={dropDownValue}
                  items={dropDownItems}
                  setOpen={setOpenDropDown}
                  setValue={setDropDownValue}
                  setItems={setDropDownItems}
                  onChangeValue={handleDropDownChange}
                  placeholder="Select Age Group"
                />
              </View>
            ) : (
              <View style={{marginTop: 29}}>
                {labeledArray.map((item, index) => (
                  <SelectionComponent
                    key={index}
                    onpress={selectType}
                    index={index}
                    title={item.title}
                    selected={item.selected}
                  />
                ))}
              </View>
            )}
          </View>

          <View style={{marginBottom: 16}}>
            <View style={{marginBottom: 16}}>
              <RoundButtonComp
                onpress={() => {
                  nextQuestion();
                }}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default MonthlyAverageoptions;
