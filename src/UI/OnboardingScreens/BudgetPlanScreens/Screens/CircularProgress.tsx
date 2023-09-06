import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle } from 'react-native-svg';

const CircularProgress = () => {
  const [progress, setProgress] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
    }, 50);

    if (progress === 100) {
      clearInterval(interval);
      navigation.navigate('AchieveScreen');
    }
    return () => {
      clearInterval(interval);
    };
  }, [navigation, progress]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.progressbar}>
        <Svg width={200} height={200}>
          <Circle
            cx={100}
            cy={100}
            r={80}
            stroke={'#9747FF'}
            strokeWidth={10}
            fill="none"
            strokeDasharray={`${progress} ${100 - progress}`}
            strokeLinecap="round"
          />
        </Svg>
        <View style={styles.progressTextContainer}>
          <Text style={styles.progressText}>{`${progress}%`}</Text>
        </View>
        <Text style={{ fontSize: 18, textAlign: 'center', color: '#000',marginTop:20,fontWeight:'600'}}>
          Generating Your Plan
        </Text>
        <Text style={{ textAlign: 'center', fontSize: 14,marginTop:20}}>
          Getting Trends from your history, setting up budget and making sure
          you meet your financial goal
        </Text>
      </View>
    </View>
  );
};

export default CircularProgress;

const styles = StyleSheet.create({
  progressbar: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  progressTextContainer: {
    position: 'absolute',
    transform: [{ translateX: 5 }, { translateY: -50 }], // Adjust the values for proper positioning
  },
  progressText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
});
