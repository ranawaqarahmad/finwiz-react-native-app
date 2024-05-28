import React from 'react';
import { TouchableWithoutFeedback, View, TouchableOpacity, StyleSheet, SafeAreaView, Image, Alert } from 'react-native';
import IncomeComponent from '../Components/IncomeComponent';
import { useNavigation } from '@react-navigation/native';

// WE ARE USING FLEXDIRECTION:'COLUMN REVERSE IN THIS SCREEN'

const AddIncomeA = ({ controlModalVisibility }) => {

  const navigation = useNavigation();

  const handlePressAddIncome = () => {
    controlModalVisibility()
    navigation.navigate('RecordExpense',{type:'Income'})
  }
  const handlePressRecordExpense = () => {
    controlModalVisibility()

    navigation.navigate('RecordExpense',{type:'Expense'})
  }
  const handlePressAddNewCategory = () => {
    controlModalVisibility()

    navigation.navigate('NewCategory',{editCategory:false})
  };
  const handlePressPlanPurchase = () => {
    controlModalVisibility()

    navigation.navigate('PlanPurchase',{type:'Income'})
  };

  const ChatNav = () => {
    controlModalVisibility()

    navigation.navigate('ChatNav')
  };
  return (
    <TouchableWithoutFeedback onPress={() => {
      console.log('ONPRESS');

      controlModalVisibility()
    }} style={styles.container}>
      <View
        style={styles.mainview}>


        <View
          style={{
            paddingLeft: 17,
            backgroundColor: '#FFF',
            borderRadius: 10,
            paddingRight: 17,
            bottom: 90,
            marginHorizontal: 16,
            position: 'absolute',
          }}>
          <TouchableOpacity onPress={handlePressAddIncome}>
            <IncomeComponent
              borderStyle={{
                borderBottomWidth: 1,
                borderBottomColor: '#D3D3D3'
              }}
              image1={require('../../../../assets/Images/greendownarrow.png')}
              text={'Add Income'}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePressRecordExpense}>
            <IncomeComponent
              borderStyle={{
                borderBottomWidth: 1,
                borderBottomColor: '#D3D3D3'
              }}
              image1={require('../../../../assets/Images/reduparrow.png')}
              text={'Record Expense'}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePressAddNewCategory}>
            <IncomeComponent
              borderStyle={{
                borderBottomWidth: 1,
                borderBottomColor: '#D3D3D3'
              }}
              image1={require('../../../../assets/Images/grid.png')}
              text={'Add New Category'}
            />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handlePressPlanPurchase}>
            <IncomeComponent
              borderStyle={{
                borderBottomWidth: 1,
                borderBottomColor: '#D3D3D3'
              }}
              image1={require('../../../../assets/Images/calendar.png')}
              text={'Plan Purchase'}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={ChatNav}>
            <IncomeComponent
              image1={require('../../../../assets/Images/chatbot.png')}
              text={'Chat Bot'}
            />
          </TouchableOpacity>

          <Image
            source={require('../../../../assets/Images/rectangle.png')}
            style={{
              height: 20,
              width: 20,
              position: 'absolute',
              bottom: -10,
              alignSelf: 'center',
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000010',
  },
  mainview: {
    flex: 1,
    backgroundColor: '#00000010',

  },
});

export default AddIncomeA;
