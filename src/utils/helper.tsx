import AsyncStorage from '@react-native-async-storage/async-storage';

export const getServerURL = async () => {
    const environment = await AsyncStorage.getItem('environment');
    if (environment == 'dev') {
      return 'https://api-finwiz.softsquare.io';
    }  else if (environment == 'live') {
      return 'https://api-finwiz.softsquare.io';
    } else {
      return 'https://api-finwiz.softsquare.io';
    }
  };