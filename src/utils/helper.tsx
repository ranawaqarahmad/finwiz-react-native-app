import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken, setBasicinfoCompleted, setFinancialInfoCompleted, setPhoneVerified, setUserId, setWelcomeNavStatus, setnotificationEnabled, setstack } from '../redux/AppReducer';



const dispatch = useDispatch()



export const getServerURL = async () => {
  const environment = await AsyncStorage.getItem('environment');
  if (environment == 'dev') {
    return 'https://api-finwiz.softsquare.io';
  } else if (environment == 'live') {
    return 'https://api-finwiz.softsquare.io';
  } else {
    return 'https://api-finwiz.softsquare.io';
  }
};

export const getPhoneVerified = async () => {
  try {
    const phoneVerified = await AsyncStorage.getItem('phoneVerified'); // Replace 'key' with the actual key you used to store the data
    if (phoneVerified != null) {
      console.log('Phone Verified in ONBOARD NAV IS THIS ', phoneVerified);
      dispatch(setPhoneVerified(true))
      return true

    } else {
      console.log('No data found in AsyncStorage.');
      return false

    }
  } catch (error) {
    console.error('Error retrieving data: ', error);
  }
};

export const getFaceIdVerified = async () => {
  try {
    const faceIdVerified = await AsyncStorage.getItem('faceIdVerified'); // Replace 'key' with the actual key you used to store the data
    if (faceIdVerified != null) {
      console.log('FACE ID Verified in ONBOARD NAV IS THIS ', faceIdVerified);
      dispatch(setPhoneVerified(true))
      return true

    } else {
      console.log('No data found in AsyncStorage.');
      return false

    }
  } catch (error) {
    console.error('Error retrieving data: ', error);
  }
};

export const getNotificationEnabled = async () => {
  try {
    const notificationEnabled = await AsyncStorage.getItem('notificationEnabledVerified'); // Replace 'key' with the actual key you used to store the data
    if (notificationEnabled != null) {


      console.log('notificationEnabled in ONBOARD NAV IS THIS ', notificationEnabled);
      dispatch(setnotificationEnabled(true))
      return true
    } else {
      console.log('No data found in AsyncStorage.');
      return false

    }
  } catch (error) {
    console.error('Error retrieving data: ', error);
  }
};

export const getBasicInfoCompleteStatus = async () => {
  try {
    const notificationEnabled = await AsyncStorage.getItem('basicInfoComplete'); // Replace 'key' with the actual key you used to store the data
    if (notificationEnabled != null) {


      console.log('Basic Info Completed Status is this ', notificationEnabled);
      dispatch(setBasicinfoCompleted(true))
      return true
    } else {
      console.log('No data found in AsyncStorage.');
      return false

    }
  } catch (error) {
    console.error('Error retrieving data: ', error);
  }
};

export const getfinancialPlanCompletedStatus = async () => {
  try {
    const notificationEnabled = await AsyncStorage.getItem('financialPlanCompleted'); // Replace 'key' with the actual key you used to store the data
    if (notificationEnabled != null) {


      console.log('Financial Info Completed Status is this ', notificationEnabled);
      dispatch(setFinancialInfoCompleted(true))
      return true
    } else {
      console.log('No data found in AsyncStorage.');
      return false

    }
  } catch (error) {
    console.error('Error retrieving data: ', error);
  }
};

export const getUserId = async () => {
  try {
    const savedNumber = await AsyncStorage.getItem('userId');
    const UserId = parseInt(savedNumber, 10);
    // Replace 'key' with the actual key you used to store the data
    if (UserId != null) {


      console.log('USER ID is this ', UserId);
      dispatch(setUserId(UserId))
      return true
    } else {
      console.log('No data found in AsyncStorage.');
      return false

    }
  } catch (error) {
    console.error('Error retrieving data: ', error);
  }
};

export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    console.log('All AsyncStorage data has been cleared.');
  } catch (error) {
    console.error('Error clearing AsyncStorage data:', error);
  }
}

export const getToken = async (basicInfoCompleted,phoneVerified) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      console.log('TOKEN IS THIS: ', token);
      dispatch(setAuthToken(token))
      console.log('BAISC INFO STACK COMPLETED', basicInfoCompleted);

      if (basicInfoCompleted) {
        if (phoneVerified) {
          console.log('INSIDE WELCOME NAV NOW');
          
          dispatch(setWelcomeNavStatus(2))
          dispatch(setstack('WelcomeNav'))
        } else {
          console.log('INSIDE AUTH NAV NOW');

          // dispatch(setFinancialPlanScreen(1))
          dispatch(setstack('AuthNav'))
          // dispatch(setWelcomeNavStatus(1))
        }


      } else {

        dispatch(setstack('BasicInfoStack'))
      }
    } else {
      console.log('No data found in AsyncStorage.');
    }
  } catch (error) {
    console.error('Error retrieving data: ', error);
  }
};




