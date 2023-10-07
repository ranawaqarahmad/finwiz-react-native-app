import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import Slider from '@react-native-community/slider';
import CategoryDetails from '../Screens/CategoryDetails';

const SliderCompo = ({ onChangeSlider, item }) => {
  var maxvalue, value;
  console.log('=============================',item);


  const convertStringToNumber = (str) => {
    console.log('=============================',item);
    
    // Use parseFloat() to convert to a floating-point number
    return parseFloat(str);
  };

  const [sliderValue, setSliderValue] = useState(convertStringToNumber(item.limitation));


  useEffect(() => {
    maxvalue = convertStringToNumber(item.limitation * 2);
    value = convertStringToNumber(item.limitation);
    console.log(maxvalue,value);
    
    
  }, [])



  const onValueChange = (value) => {
    setSliderValue(value);
  };

  const getTrackColor = (value) => {
    return value >= 10 ? { backgroundColor: '#F3F4F6', borderColor: 'black' } : { backgroundColor: 'black', borderColor: 'black' };
  };


  console.log('OUTSIDE   ',maxvalue+value);


  return (

    <Slider
      style={{ flex: 1, height: 40 }}
      minimumValue={0}
      maximumValue={maxvalue?maxvalue:convertStringToNumber(item.limitation * 2)}
      value={value?value:convertStringToNumber(item.limitation)}
      minimumTrackTintColor="#000000"
      maximumTrackTintColor="grey"
      thumbTintColor='black'
      onValueChange={onChangeSlider}


    />

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'white',
  },
  mainview: {

  },
});

export default SliderCompo;
