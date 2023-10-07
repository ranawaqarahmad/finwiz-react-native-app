import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BudgetComponent from '../Components/BudgetComponent';
import {useNavigation} from '@react-navigation/native';

const NewBudget = () => {
    const navigation = useNavigation();

    const onClick=()=>{
        navigation.navigate('HomeScreen')
    }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainview}>
       <View style={{height:54,width:210,justifyContent:'center',alignSelf:'center'}}>
        <Text style={{fontSize:18,fontWeight:'600',fontFamily:'Inter',textAlign:'center'}}>Your new budget plan{'\n'}has been generated</Text>
       </View>
                <Text style={{fontSize:14,fontWeight:'600',marginTop:45,marginBottom:16}}>
                Adjustments
                </Text>
                <BudgetComponent image1={require('../../../../assets/Images/healthplus.png')}
                text1={'Health and Fitness'}
                text2={'-10%'}
                />
                <BudgetComponent image1={require('../../../../assets/Images/foldericon.png')}
                text1={'Bills and Utilities'}
                text2={'-6%'}
                />
                <BudgetComponent image1={require('../../../../assets/Images/foldericon.png')}
                text1={'Groceries'}
                text2={'-6%'}
                />
                <BudgetComponent image1={require('../../../../assets/Images/foldericon.png')}
                text1={'Groceries'}
                text2={'-6%'}
                />

                {/* BACK TO HOME BUTTON */}
                <View style={{marginTop:60}}>
                    <TouchableOpacity onPress={onClick}>
                    <Image
                    source={require('../../../../assets/Images/backtohomebtn.png')}
                    style={{height:48,width:'100%',borderRadius:8}}
                    />
                    </TouchableOpacity>
                </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainview: {
    flex: 1,
    padding: 17,
    marginTop:60
  },
});

export default NewBudget;
