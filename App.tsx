/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';

import AuthNav from './src/navigation/OnboardingStacks/AuthNav';
import BasicInfoStack from './src/navigation/OnboardingStacks/BasicInfoStack';
import OnBoardNav from './src/navigation/OnboardingStacks/OnboardNav';

// import BasicInfoStack from './src/navigation/BasicInfoStack';






function App() {

  const [stack,setstack]=useState('')
 
  return (
    <NavigationContainer>
      <OnBoardNav/>
    </NavigationContainer>
  );
}


export default App;
