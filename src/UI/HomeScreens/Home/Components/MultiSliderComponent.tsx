import React, {useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

const MultiSliderComponent = ({
  onChangeSlider,
  item,
  isEnabled,
  // spendingLimit,
}) => {
  const {width} = Dimensions.get('window');
  const selector = useSelector(state => state.AppReducer);

  const convertStringToNumber = str => {
    return parseFloat(str);
  };

  const [sliderValue, setSliderValue] = useState(
    convertStringToNumber(item.spendingLimit),
  );
  const [maxValue, setMaxValue] = useState(
    convertStringToNumber(item.maxLimit),
  );

  // Only run on component mount or when `item` changes
  useEffect(() => {
    const initialMaxValue = convertStringToNumber(item.maxLimit);
    const initialValue = convertStringToNumber(item.spendingLimit);
    if (initialMaxValue !== maxValue) {
      setMaxValue(initialMaxValue);
    }
    if (initialValue !== sliderValue) {
      setSliderValue(initialValue);
    }
  }, [item, maxValue, sliderValue]);

  const onValueChange = value => {
    setSliderValue(value[0]); // Keep state updated
    onChangeSlider(value);
  };

  const interpolateMarkerColor = value => {
    const ratio = value / (maxValue || 1000);

    const colors = [
      [14, 219, 140], // #0edb8c
      [158, 204, 66], // #9ecc42
      [221, 201, 16], // #ddc910
      [247, 179, 10], // #f7b30a
      [226, 105, 52], // #e26934
      [197, 33, 81], // #c52151
    ];

    const locations = [0, 0.28, 0.36, 0.76, 0.83, 1];

    for (let i = 0; i < locations.length - 1; i++) {
      if (ratio >= locations[i] && ratio <= locations[i + 1]) {
        const localRatio =
          (ratio - locations[i]) / (locations[i + 1] - locations[i]);
        return interpolateColor(localRatio, colors[i], colors[i + 1]);
      }
    }

    return `rgb(${colors[colors.length - 1].join(',')})`;
  };

  const interpolateColor = (ratio, color1, color2) => {
    const r = Math.round(color1[0] + ratio * (color2[0] - color1[0]));
    const g = Math.round(color1[1] + ratio * (color2[1] - color1[1]));
    const b = Math.round(color1[2] + ratio * (color2[2] - color1[2]));
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <View style={{paddingHorizontal: 24, alignItems: 'center'}}>
      <View
        style={{
          width: width - 48,
          height: 6,
          position: 'absolute',
          top: 12,
          borderRadius: 3,
          overflow: 'hidden',
        }}>
        <LinearGradient
          colors={[
            '#0edb8c',
            '#9ecc42',
            '#ddc910',
            '#f7b30a',
            '#e26934',
            '#c52151',
          ]}
          locations={[0, 0.28, 0.36, 0.76, 0.83, 1]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>

      <MultiSlider
        min={0}
        sliderLength={width - 48}
        markerStyle={{
          backgroundColor: interpolateMarkerColor(item.spendingLimit),
          height: 20,
          width: 20,
          borderRadius: 10,
          top: -6,
        }}
        trackStyle={{
          height: 6,
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
        max={maxValue || 1000}
      />
    </View>
  );
};

export default MultiSliderComponent;
