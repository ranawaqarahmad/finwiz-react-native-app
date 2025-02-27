import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, BackHandler, Image, TouchableOpacity } from 'react-native';
import Svg, { Circle, } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import { setAccountId, setSetupBudgetPlanDone } from '../../../../redux/AppReducer';

const GeneratingPlan = ({ navigation }) => {
  const [progress, setProgress] = useState(0);
  const [isPlanGenerated, setIsPlanGenerated] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
    }, 50);

    if (progress === 100) {
      clearInterval(interval);
      setIsPlanGenerated(true)
      navigation.navigate("NewBudget")
    }
    return () => {
      clearInterval(interval);
    };
  }, [navigation, progress]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.progressbar}>
        {/* <Svg width={200} height={200}>
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
        </Svg> */}

        <Image style={{ width: 70, height: 70 }} source={require('../../../../assets/Images/logo.png')} />

        <Text style={{ fontSize: 18, textAlign: 'center', color: '#000', fontWeight: '600' }}>

          {isPlanGenerated==false ?
            ' Generating Plan' :
            'Your plan has been generated'
           
}
        </Text>
        <Text style={{ textAlign: 'center', fontSize: 16, color: '#4B5563', }}>
          AI is adjusting your budget to create a room for this purchase, AI will adjust the budget from different categories to settle this purchase
        </Text>

        <View style={styles.progressTextContainer}>
          <Text style={styles.progressText}>{`${progress}%`}</Text>
        </View>

      </View>
      {isPlanGenerated && (
        <TouchableOpacity style={{ borderRadius: 8, backgroundColor: '#7C56FE', height: 48, width: '90%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 32 }} onPress={() => { navigation.navigate('HomeScreen') }}>
          <Text style={{ fontSize: 16, color: 'white' }}>{`Back to Home`}</Text>

        </TouchableOpacity>

      )}
    </View>
  );
};

export default GeneratingPlan;

const styles = StyleSheet.create({
  progressbar: {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 20,
    margin: 20,
  },
  progressTextContainer: {
  },
  progressText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
});
