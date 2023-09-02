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

import { useDispatch, useSelector } from 'react-redux';
import FinancialPlanStack from './src/navigation/OnboardingStacks/FinancialPlanStack';




function App() {

  const selector = useSelector(state => state.AppReducer);
  const stack=selector.stackinfo;
  console.log(stack);
  


  

 
  return (
    <NavigationContainer>
      {stack==='onboard'&&(<OnBoardNav />)}
      {stack==='Auth'&&(<AuthNav />)}
      {stack==='BasicInfo'&&(<BasicInfoStack />)}
      {stack==='FinancialPlan'&&(<FinancialPlanStack />)}

      

    </NavigationContainer>
  );
}


export default App;
