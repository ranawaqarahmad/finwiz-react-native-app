// import React, {useEffect, useState} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   Platform,
//   StatusBar,
//   Dimensions,
// } from 'react-native';
// import Slider from '@react-native-community/slider';
// import CategoryDetails from '../Screens/CategoryDetails';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
// import {useSelector} from 'react-redux';
// import LinearGradient from 'react-native-linear-gradient';

// const MultiSliderComponent = ({
//   onChangeSlider,
//   item,
//   isEnabled,
//   spendingLimit,
// }) => {
//   var maxvalue, value;
//   // console.log('=============================', item);

//   const {width, height} = Dimensions.get('window');
//   const selector = useSelector(state => state.AppReducer);
//   // console.log('=============================', selector.totalBalances);

//   const convertStringToNumber = str => {
//     // console.log('=============================', item);

//     return parseFloat(str);
//   };

//   const [sliderValue, setSliderValue] = useState(
//     convertStringToNumber(item.limitation),
//   );

//   useEffect(() => {
//     maxvalue = convertStringToNumber(item.max_limit);
//     value = convertStringToNumber(item.limitation);
//     console.log(maxvalue, value);
//   }, []);

//   const onValueChange = value => {
//     setSliderValue(value);
//   };

//   const getTrackColor = value => {
//     return value >= 10
//       ? {backgroundColor: '#F3F4F6', borderColor: 'black'}
//       : {backgroundColor: 'black', borderColor: 'black'};
//   };

//   // console.log('OUTSIDE   ',item.max_limit);

//   const getMarkerStyle = value => {
//     if (value >= 10) {
//       return {backgroundColor: 'green', height: 20, width: 20}; // Example: green marker for values >= 10
//     } else if (value >= 5) {
//       return {backgroundColor: 'yellow', height: 15, width: 15}; // Example: yellow marker for values >= 5
//     } else {
//       return {backgroundColor: 'red', height: 10, width: 10}; // Example: red marker for values < 5
//     }
//   };

//   const interpolateMarkerColor = value => {
//     const min = 0;
//     const max = item.max_limit || 1000; // Ensure there's a max value

//     const middle = max / 2;

//     if (value <= middle) {
//       // Interpolate between blue (start) and red (middle)
//       const ratio = value / middle;
//       return interpolateColor(ratio, [0, 0, 255], [255, 0, 0]); // Blue to Red
//     } else {
//       // Interpolate between red (middle) and yellow (end)
//       const ratio = (value - middle) / middle;
//       return interpolateColor(ratio, [255, 0, 0], [255, 255, 0]); // Red to Yellow
//     }
//   };

//   // Helper function to interpolate between two RGB colors
//   const interpolateColor = (ratio, color1, color2) => {
//     const r = Math.round(color1[0] + ratio * (color2[0] - color1[0]));
//     const g = Math.round(color1[1] + ratio * (color2[1] - color1[1]));
//     const b = Math.round(color1[2] + ratio * (color2[2] - color1[2]));
//     return `rgb(${r}, ${g}, ${b})`;
//   };

//   console.log('HHHHHHHHHH', spendingLimit);

//   return (
//     <View style={{paddingHorizontal: 24, alignItems: 'center'}}>
//       <LinearGradient
//         colors={['blue', 'red', 'yellow']} // Define the gradient colors
//         start={{x: 0, y: 0}}
//         end={{x: 1, y: 0}} // Horizontal gradient (left to right)
//         style={{
//           position: 'absolute', // Make sure it stays behind the slider
//           top: 15, // Adjust this to vertically center the gradient behind the track
//           width: width - 48,
//           height: 10, // Match the track height
//           borderRadius: 5,
//         }}
//       />
//       <MultiSlider
//         min={0}
//         sliderLength={width - 48}
//         markerStyle={{
//           backgroundColor: interpolateMarkerColor(sliderValue), // Dynamic marker color based on value
//           height: 20,
//           width: 20,
//           borderRadius: 10,
//         }}
//         trackStyle={{height: 10, borderRadius: 5}}
//         onValuesChange={onChangeSlider}
//         enabledOne={!isEnabled}
//         values={[value ? value : convertStringToNumber(item.limitation)]}
//         // max={maxvalue ? maxvalue : convertStringToNumber(item.limitation * 2)}
//         max={item.max_limit ? item.max_limit : 1000}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//     backgroundColor: 'white',
//   },
//   mainview: {},
// });

// export default MultiSliderComponent;

import React, {useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

const MultiSliderComponent = ({
  onChangeSlider,
  item,
  isEnabled,
  spendingLimit,
}) => {
  const {width} = Dimensions.get('window');
  const selector = useSelector(state => state.AppReducer);

  const convertStringToNumber = str => {
    return parseFloat(str);
  };

  const [sliderValue, setSliderValue] = useState(
    convertStringToNumber(item.limitation),
  );
  const [maxValue, setMaxValue] = useState(
    convertStringToNumber(item.max_limit),
  );

  useEffect(() => {
    const initialMaxValue = convertStringToNumber(item.max_limit);
    const initialValue = convertStringToNumber(item.limitation);
    setMaxValue(initialMaxValue);
    setSliderValue(initialValue);
  }, [item]);

  const onValueChange = value => {
    setSliderValue(value[0]);
    onChangeSlider(value);
  };

  const interpolateMarkerColor = value => {
    const min = 0;
    const max = maxValue || 1000;
    const middle = max / 2;

    if (value <= middle) {
      const ratio = value / middle;
      return interpolateColor(ratio, [0, 0, 255], [255, 0, 0]);
    } else {
      const ratio = (value - middle) / middle;
      return interpolateColor(ratio, [255, 0, 0], [255, 255, 0]);
    }
  };

  const interpolateColor = (ratio, color1, color2) => {
    const r = Math.round(color1[0] + ratio * (color2[0] - color1[0]));
    const g = Math.round(color1[1] + ratio * (color2[1] - color1[1]));
    const b = Math.round(color1[2] + ratio * (color2[2] - color1[2]));
    return `rgb(${r}, ${g}, ${b})`;
  };
  console.log('s', sliderValue);
  return (
    <View style={{paddingHorizontal: 24, alignItems: 'center'}}>
      <View
        style={{width: width - 48, height: 10, position: 'absolute', top: 18}}>
        <LinearGradient
          colors={['blue', 'red', 'yellow']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 5,
          }}
        />
      </View>

      <MultiSlider
        min={0}
        sliderLength={width - 48}
        markerStyle={{
          backgroundColor: interpolateMarkerColor(spendingLimit),
          height: 20,
          width: 20,
          borderRadius: 10,
          top: 4,
        }}
        trackStyle={{
          height: 10,
          backgroundColor: 'transparent',
        }}
        selectedStyle={{
          backgroundColor: 'transparent',
        }}
        unselectedStyle={{
          backgroundColor: 'transparent',
        }}
        onValuesChange={onValueChange}
        enabledOne={!isEnabled}
        values={[sliderValue]}
        max={maxValue ? maxValue : 1000}
      />
    </View>
  );
};

export default MultiSliderComponent;
