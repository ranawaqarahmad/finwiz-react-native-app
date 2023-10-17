/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import OnBoardNav from './src/navigation/OnboardingStacks/OnboardNav';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAccountId, setAuthToken, setBasicinfoCompleted, setFinancialInfoCompleted, setOTPScreen, setPhoneVerified, setSetupBudgetPlanDone, setSyncAccountDone, setTokenSaved, setUserId, setWelcomeNavStatus, setnotificationEnabled, setstack } from './src/redux/AppReducer';
import BtmNav from './src/navigation/BtmNav';
import { ActivityIndicator, View } from 'react-native';
import WelcomeNav from './src/navigation/OnboardingStacks/WelcomeNav';










function App() {


  const getServerURL = async () => {
    const environment = await AsyncStorage.getItem('environment');
    if (environment == 'dev') {
      return 'https://api-finwiz.softsquare.io';
    } else if (environment == 'live') {
      return 'https://api-finwiz.softsquare.io';
    } else {
      return 'https://api-finwiz.softsquare.io';
    }
  };

  const getPhoneVerified = async () => {
    try {
      const phoneVerified = await AsyncStorage.getItem('phoneVerified'); // Replace 'key' with the actual key you used to store the data
      if (phoneVerified != null) {
        // console.log('Phone Verified in ONBOARD NAV IS THIS ', phoneVerified);
        dispatch(setPhoneVerified(true))
        return true

      } else {
        // console.log('No data found in AsyncStorage.');
        return false

      }
    } catch (error) {
      console.error('Error retrieving data: ', error);
    }
  };

  const getFaceIdVerified = async () => {
    try {
      const faceIdVerified = await AsyncStorage.getItem('faceIdVerified'); // Replace 'key' with the actual key you used to store the data
      if (faceIdVerified != null) {
        // console.log('FACE ID Verified in ONBOARD NAV IS THIS ', faceIdVerified);
        dispatch(setPhoneVerified(true))
        return true

      } else {
        // console.log('No data found in AsyncStorage.');
        return false

      }
    } catch (error) {
      console.error('Error retrieving data: ', error);
    }
  };

  const getNotificationEnabled = async () => {
    try {
      const notificationEnabled = await AsyncStorage.getItem('notificationEnabledVerified'); // Replace 'key' with the actual key you used to store the data
      if (notificationEnabled != null) {


        // console.log('notificationEnabled in ONBOARD NAV IS THIS ', notificationEnabled);
        dispatch(setnotificationEnabled(true))
        return true
      } else {
        // console.log('No data found in AsyncStorage.');
        return false

      }
    } catch (error) {
      console.error('Error retrieving data: ', error);
    }
  };

  const getBasicInfoCompleteStatus = async () => {
    try {
      const notificationEnabled = await AsyncStorage.getItem('basicInfoComplete'); // Replace 'key' with the actual key you used to store the data
      if (notificationEnabled != null) {


        // console.log('Basic Info Completed Status is this ', notificationEnabled);
        dispatch(setBasicinfoCompleted(true))
        return true
      } else {
        // console.log('No data found in AsyncStorage.');
        return false

      }
    } catch (error) {
      console.error('Error retrieving data: ', error);
    }
  };

  const getfinancialPlanCompletedStatus = async () => {
    try {
      const notificationEnabled = await AsyncStorage.getItem('financialPlanCompleted'); // Replace 'key' with the actual key you used to store the data
      if (notificationEnabled != null) {


        // console.log('Financial Info Completed Status is this ', notificationEnabled);
        dispatch(setFinancialInfoCompleted(true))
        return true
      } else {
        // console.log('No data found in AsyncStorage.');
        return false

      }
    } catch (error) {
      console.error('Error retrieving data: ', error);
    }
  };

  const getUserId = async () => {
    try {
      const savedNumber = await AsyncStorage.getItem('userId');
      const UserId = parseInt(savedNumber, 10);
      // Replace 'key' with the actual key you used to store the data
      if (UserId != null) {


        // console.log('USER ID is this ', UserId);
        dispatch(setUserId(UserId))
        return true
      } else {
        // console.log('No data found in AsyncStorage.');
        return false

      }
    } catch (error) {
      console.error('Error retrieving data: ', error);
    }
  };

  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log('All AsyncStorage data has been cleared.');
    } catch (error) {
      console.error('Error clearing AsyncStorage data:', error);
    }
  }

  const getToken = async (basicInfoCompleted, phoneVerified) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        // console.log('TOKEN IS THIS: ', token);
        dispatch(setAuthToken(token))
        // console.log('BAISC INFO STACK COMPLETED', basicInfoCompleted);
        authUser()

        if (basicInfoCompleted) {
          if (phoneVerified) {
            // console.log('INSIDE WELCOME NAV NOW');
            // dispatch(setstack('AuthNav'))
            dispatch(setWelcomeNavStatus(2))
            dispatch(setstack('WelcomeNav'))
          } else {
            // console.log('INSIDE AUTH NAV NOW');

            // dispatch(setFinancialPlanScreen(1))
            dispatch(setstack('AuthNav'))
            // dispatch(setWelcomeNavStatus(1))
          }


        } else {

          // console.log('INSIDE ELSE CONDITION');

          dispatch(setstack('BasicInfoStack'))
        }
      } else {
        console.log('No data found in AsyncStorage.');
      }
    } catch (error) {
      console.error('Error retrieving data: ', error);
    }
  };













  const selector = useSelector(state => state.AppReducer);
  // const welcomeScreen = selector.WelcomeScreen;
  const basicInfoCompleted = selector.basicInfoCompleted;
  const phoneVerified = selector.phoneVerified;

  const authToken = selector.authToken;
  const [loader, setLoader] = useState(false)
  const [flag, setFlag] = useState(false)



  const dispatch = useDispatch()

  const getVerifications = async () => {
    getBasicInfoCompleteStatus()
    getUserId()
    getfinancialPlanCompletedStatus()
    getPhoneVerified()
    getToken(basicInfoCompleted, phoneVerified)
  }

  useEffect(() => {
    getVerifications()

  }, [basicInfoCompleted, phoneVerified])

  useEffect(() => {
    getToken(basicInfoCompleted, phoneVerified)
  }, [authToken])


  const authUser = async () => {


    console.log('AUTH USER RUNS=======================');



    // console.log('auth token is', authToken);


    fetch(`https://api-finwiz.softsquare.io/api/user/auth-user`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },

    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);

        if (data.status == 'true') {
          if (data.data[0].name) {
            dispatch(setBasicinfoCompleted(true))
          }
          if (data.data[0].verified == 1) {
            dispatch(setPhoneVerified(true))
            dispatch(setOTPScreen(true))
          }
          if (data.data[0].plaid_access_token) {
            dispatch(setSyncAccountDone(true))
          }


          if (data.data[0]?.auth[0]?.account_id) {
            console.log('Account ID is', data.data[0].auth[0].account_id);

            dispatch(setAccountId(data.data[0].auth[0].account_id))

          }

          setTimeout(() => {
            dispatch(setTokenSaved(true))
            console.log('TOKEN SAVED TRUE RUN');
            

          }, 4000);

        }




      })
      .catch((error) => {
        console.log(error);
        // setLoader(false)
      });



  };

  const checkUserQuestionAnswers = async () => {

    console.log('AuthToken is ', authToken);

    fetch('https://api-finwiz.softsquare.io/api/user/get-user-question', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },

    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('ALL ANSWERS OF QUESTIONS', data);
        if (data.data.user_question_answer_count == data.data.total_questions) {
          dispatch(setSetupBudgetPlanDone(true))
        }



      })
      .catch((error) => {
        console.log(error);
      });



  };


  useEffect(() => {

    // console.log('selector.authToken',selector.authToken);
    // console.log('selector.basicInfoCompleted',selector.basicInfoCompleted);
    // console.log('selector.phoneVerified',selector.phoneVerified);
    // console.log('selector.setupBudgetPlanDone ',selector.setupBudgetPlanDone );


    console.log('USE EFFECT RUNS AGAINS');
    authUser()
    checkUserQuestionAnswers()
  }, [])


  useEffect(() => {




    console.log('USE EFFECT RUNS');
    console.log('selector.tokenSaved', selector.tokenSaved);

    dispatch(setTokenSaved(false))
    console.log('selector.tokenSaved', selector.tokenSaved);



  }, [selector.authToken])

  // const isFocused=useIsFocused()
  // useEffect(() => {

  //   // console.log('selector.authToken',selector.authToken);
  //   // console.log('selector.basicInfoCompleted',selector.basicInfoCompleted);
  //   // console.log('selector.phoneVerified',selector.phoneVerified);
  //   // console.log('selector.setupBudgetPlanDone ',selector.setupBudgetPlanDone );


  //  setFlag(false)
  // }, [isFocused])








  return (
    <NavigationContainer>
      {loader ? <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={'#7C56FE'}></ActivityIndicator>
      </View> :
        selector.authToken && selector.basicInfoCompleted && selector.phoneVerified && selector.syncAccountDone && selector.accountId && selector.setupBudgetPlanDone ?
          <BtmNav /> :

          selector.tokenSaved == true ?
            <OnBoardNav /> :
            <WelcomeNav />

      }

    </NavigationContainer>
  );
}


export default App;
