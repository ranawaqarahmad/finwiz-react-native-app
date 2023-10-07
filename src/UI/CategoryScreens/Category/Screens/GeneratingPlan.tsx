import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { TouchEventType } from 'react-native-gesture-handler/lib/typescript/TouchEventType';
import { TouchableOpacity } from 'react-native-gesture-handler';

const GeneratingPlan = () => {
  // const animationValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation(); // Get the navigation object
  const handlePress=()=>{
    navigation.navigate('NewBudget')
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainview}>
        {/* Logo */}
        <Image
          source={require('../../../../assets/Images/planlogo.png')}
          style={styles.logo}
        />

        {/* Title */}
        <Text style={styles.title}>Generating Plan</Text>

        {/* Description */}
        <Text style={styles.description}>
          AI is adjusting your budget to{'\n'}create room for this purchase,{'\n'}AI will adjust the budget from{'\n'}different categories to settle this{'\n'}purchase.
        </Text>
        <TouchableOpacity onPress={handlePress}>
        <Text style={{fontSize:20,fontWeight:'500',color:'#000'}}>
          10%
        </Text>
        </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 40,
  },
  mainview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 68,
    height: 69,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
    color: '#4B5563',
    fontWeight:'500',
    marginBottom:40
  },
  countdown: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 20,
    color: '#000',
  },
});

export default GeneratingPlan;
