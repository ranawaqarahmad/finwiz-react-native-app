/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import AuthNav from './src/navigation/OnboardingStacks/AuthNav';
import BasicInfoStack from './src/navigation/OnboardingStacks/BasicInfoStack';
import OnBoardNav from './src/navigation/OnboardingStacks/OnboardNav';

// import BasicInfoStack from './src/navigation/BasicInfoStack';

import { useDispatch, useSelector } from 'react-redux';
import FinancialPlanStack from './src/navigation/OnboardingStacks/FinancialPlanStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthStackCompleted, setAuthToken, setTokenSaved, setWelcomeNavStatus, setstack } from './src/redux/AppReducer';
import { clearAllData, getBasicInfoCompleteStatus, getFaceIdVerified, getNotificationEnabled, getPhoneVerified, getUserId } from './src/utils/helper';




function App() {

  const selector = useSelector(state => state.AppReducer);
  const stack = selector.stackinfo;
  const welcomeScreen = selector.WelcomeScreen;
  const dispatch = useDispatch()

  console.log('STACK APP IS', stack);

  useEffect(() => {

    // getVerifications()
    console.log('STACK Changed');

  }, []);





  const getVerifications = async () => {
    getBasicInfoCompleteStatus()
    getUserId()
    // clearAllData()

    // if(await getPhoneVerified()&&await getNotificationEnabled()&&await getFaceIdVerified()){
    //   dispatch(setAuthStackCompleted(true))
    //   dispatch(setstack('WelcomeNav'))
    //   dispatch(setWelcomeNavStatus(2))

    // }
  }

  getVerifications()







  return (
    <NavigationContainer>
      {selector.stackinfo && (<OnBoardNav stack={selector.stackinfo} WelcomeScreen={welcomeScreen} />)}
    </NavigationContainer>
  );
}


export default App;
