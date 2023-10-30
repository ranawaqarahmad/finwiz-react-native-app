import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Platform, StatusBar, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import CategoryDetails from '../Screens/CategoryDetails';
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { useSelector } from 'react-redux';


const MultiSliderComponent = ({ onChangeSlider, item,isEnabled }) => {
  var maxvalue, value;
  console.log('=============================', item);

  const { width, height } = Dimensions.get('window');
  const selector = useSelector(state => state.AppReducer);
  console.log('=============================', selector.totalBalances);


  const convertStringToNumber = (str) => {
    console.log('=============================', item);

    return parseFloat(str);
  };

  const [sliderValue, setSliderValue] = useState(convertStringToNumber(item.limitation));


  useEffect(() => {
    maxvalue = convertStringToNumber(item.limitation * 2);
    value = convertStringToNumber(item.limitation);
    console.log(maxvalue, value);


  }, [])



  const onValueChange = (value) => {
    setSliderValue(value);
  };

  const getTrackColor = (value) => {
    return value >= 10 ? { backgroundColor: '#F3F4F6', borderColor: 'black' } : { backgroundColor: 'black', borderColor: 'black' };
  };


  console.log('OUTSIDE   ', maxvalue + value);


  return (


    // <Slider
    //   style={{ flex: 1, height: 40,width:'100%' }}
    //   minimumValue={0}
    //   maximumValue={maxvalue?maxvalue:convertStringToNumber(item.limitation * 2)}
    //   value={value?value:convertStringToNumber(item.limitation)}
    //   minimumTrackTintColor='transparent'
    //   maximumTrackTintColor="grey"
    //   thumbTintColor='black'
    //   onValueChange={onChangeSlider}


    // />

    <MultiSlider
    

      min={0}
      sliderLength={width-48}
      markerStyle={{ backgroundColor: 'red', marginTop: 2 }}
      trackStyle={{ alignItems: 'center' }}
      onValuesChange={onChangeSlider}
      enabledOne={!isEnabled}
      values={[value ? value : convertStringToNumber(item.limitation)]}
      // max={maxvalue ? maxvalue : convertStringToNumber(item.limitation * 2)}
      max={selector.totalBalances}




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

export default MultiSliderComponent;
