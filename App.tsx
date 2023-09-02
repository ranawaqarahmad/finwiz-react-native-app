/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import AuthNav from './src/navigation/AuthNav';
import BasicInfoStack from './src/navigation/BasicInfoStack';
import FinancialPlanStack from './src/navigation/FinancialPlanStack';
import WelcomeNav from './src/navigation/WelcomeNav';
// import BasicInfoStack from './src/navigation/BasicInfoStack';






function App() {
 
  return (
    <NavigationContainer>
      <WelcomeNav/>
    </NavigationContainer>
  );
}


export default App;
