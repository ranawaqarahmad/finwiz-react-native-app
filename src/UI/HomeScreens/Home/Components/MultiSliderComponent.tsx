// UPDATED

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
  console.log('');

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
