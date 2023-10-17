import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import { setAccountId } from '../../../../redux/AppReducer';

const CircularProgress = ({navigation}) => {
  const [progress, setProgress] = useState(0);
  const selector = useSelector(state => state.AppReducer);
  // const welcomeScreen = selector.WelcomeScreen;


  const authToken = selector.authToken;
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 2));
    }, 50);

    if (progress >= 100) {
      clearInterval(interval);
      navigation.navigate('FurtherApp');
    }
    return () => {
      clearInterval(interval);
    };
  }, [navigation, progress]);

  BackHandler.addEventListener('hardwareBackPress', () => {
    // Exit the app (this will close the app)
    BackHandler.exitApp();
    return true; // Prevent default behavior (e.g., navigating back)
  });




  const dispatch=useDispatch()
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

          console.log(data.data[0].auth[0]);
          
         
          
         


          if (data.data[0]?.auth[0]?.account_id) {
            console.log('Account ID is', data.data[0].auth[0].account_id);

            dispatch(setAccountId(data.data[0].auth[0].account_id))

          }

       

        }




      })
      .catch((error) => {
        console.log(error);
        // setLoader(false)
      });



  };

  useEffect(()=>{
authUser()
  },[])
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
