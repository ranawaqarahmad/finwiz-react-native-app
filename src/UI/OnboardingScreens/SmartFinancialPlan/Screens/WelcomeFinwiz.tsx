import { View, Text, StatusBar, Image, Alert, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import StepsComp from '../Components/StepsComp'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken, setBasicinfoCompleted, setPhoneVerified, setSetupBudgetPlanDone, setSyncAccountDone, setTokenSaved, setWelcomeNavStatus, setstack } from '../../../../redux/AppReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeFinwiz = ({ navigation }) => {
    // const [linkToken, setLinkToken] = useState(null)



    const showAlert = () => {
        Alert.alert(
            'Are You Sure',       // Title of the alert
            'Are you sure you want to quit the app?',     // Message of the alert
            [
                {
                    text: 'OK',       // Button text
                    onPress: () => {
                        BackHandler.exitApp(); // Exit the app
                        console.log('OK button pressed');
                    },
                },
                {
                    text: 'Cancel',
                    onPress: () => {
                        // Action to perform when the user clicks the "Cancel" button
                        console.log('Cancel button pressed');
                    },
                    style: 'cancel',
                },
            ],
            { cancelable: false } // Set to false to prevent dismissing the alert by tapping outside
        );
    };

    React.useEffect(() => {
        const backAction = () => {
            // Handle what you want to do when the user tries to go back
            showAlert(); // Display the alert when the user presses the back button
            return true; // Return true to block the back action.
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);
    var authToken: any;
    const [linkToken, setLinkToken] = useState(null)
    const [errorText, setErrorText] = useState('')
    const [comp, setComp] = useState(-1)

    const dispatch = useDispatch()

    const selector = useSelector(state => state.AppReducer);
    authToken = selector.authToken;
    // console.log('AUTH TOKEN IN WELCOME FINWIZ IS THIS ', authToken);


    const [steps, setsteps] = useState([
        {
            step: 'Step 1',
            title: 'Sync Your Accounts',
            description: 'Lörem ipsum dek presk, don sek, press. Onisade geoskap. ',
            selected: selector.syncAccountDone ? true : false,
            color: '#9747FF',
            imgsrc: require('../../../../assets/Images/account.png'),
            auto: true,
        },
        {
            step: 'Step 2',
            title: 'Setup Your Budget Plan ',
            description: 'Lörem ipsum dek presk, don sek, press. Onisade geoskap. ',
            selected: selector.setupBudgetPlanDone ? true : false,
            color: '#21014E',
            imgsrc: require('../../../../assets/Images/logo.png'),
            auto: false,

        },
    ])

    const toggleSelected = (index) => {
        const updatedSteps = [...steps];
        updatedSteps[index].selected = true;
        setsteps(updatedSteps);
        dispatch(setSyncAccountDone(true))
        setErrorText('')
        setComp(-1)
    };

    const toggleSelected2 = (index) => {
        const updatedSteps = [...steps];
        updatedSteps[index].selected = true;
        setsteps(updatedSteps);
        dispatch(setSetupBudgetPlanDone(true))
        setErrorText('')
        setComp(-1)



        console.log('selector.authToken', selector.authToken);
        console.log('selector.basicInfoCompleted', selector.basicInfoCompleted);
        console.log('selector.phoneVerified', selector.phoneVerified);
        console.log('selector.syncAccountDone ', selector.syncAccountDone);
        console.log('selector.accountId ', selector.accountId);
        console.log('selector.setupBudgetPlanDone ', selector.setupBudgetPlanDone);


    };

    const errorShow = () => {
        setErrorText('Complete the account Sync First')
        setComp(0)
    }

    const errorShow2 = () => {
        setErrorText('Already Synced')
        setComp(0)
    }

    const navigate2 = () => {
        console.log('Create LINK TOKEN');

        navigation.navigate('SmartFinancialPlanScreen')
        // handleApiCall()
    }
    const createLinkToken = React.useCallback(async () => {
        await fetch(`https://api-finwiz.softsquare.io/api/user/plaid-generate-link-token
        `, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_name: "Finwiz",
                country_codes: [
                    "US"
                ],
                language: "en",
                user: {
                    "client_user_id": "4"
                },
                products: [
                    [
                        "auth",
                        "transactions",
                        "identity",
                        "investments"
                    ]
                ]
            }),
        })
            .then(response => response.json())
            .then(data => {
                setLinkToken(data.link_token);
                console.log(data);
                // handleApiCall()

            })
            .catch(err => {
                console.log('ERROR IS THIS ', err);
            });
    }, [setLinkToken]);




    const checkPlaidSignIn = async () => {

        // console.log('AuthToken is ', authToken);

        fetch('https://api-finwiz.softsquare.io/api/user/auth-user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },

        })
            .then((response) => response.json())
            .then((data) => {
                console.log('CHECK PLAID ===== ', data.data.plaid_access_token);
                if (data.data.plaid_access_token) {
                    toggleSelected(0)
                }


            })
            .catch((error) => {
                console.log(error);
                // setLoader(false)
            });



    };

    const checkUserQuestionAnswers = async () => {

        // console.log('AuthToken is ', authToken);

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
                    toggleSelected2(1)
                }





            })
            .catch((error) => {
                console.log(error);
                // setLoader(false)
            });



    };


    const publicTokenApiCall = async (publicToken) => {

        // console.log('AuthToken is ', authToken);

        fetch('https://api-finwiz.softsquare.io/api/user/plaid-get-access-token', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                public_token: publicToken,

            }),

        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);


            })
            .catch((error) => {
                console.log(error);
                // setLoader(false)
            });



    };
    // handleApiCall()
    React.useEffect(() => {
        if (linkToken == null) {
            createLinkToken();
            checkPlaidSignIn();
            checkUserQuestionAnswers()
        }
    }, []);





    // const plaidLinkFlow = () => {

    //     console.log('PLAID LINK FLOW');



    const clearAllData = async () => {
        try {
            await AsyncStorage.clear();
            console.log('All AsyncStorage data has been cleared.');
        } catch (error) {
            console.error('Error clearing AsyncStorage data:', error);
        }
    }

    // }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar backgroundColor={'#21014E'} barStyle={'light-content'}></StatusBar>
                <View style={{ flex: 0.3, backgroundColor: '#21014E', borderBottomLeftRadius: 24, borderBottomRightRadius: 24, }}>
                    <View style={{ padding: 16, paddingVertical: 32, flex: 1, justifyContent: 'space-between', width: '70%' }}>
                        <Image style={{ width: 31, height: 31, }} source={require('../../../../assets/Images/logo.png')} />
                        <View>
                            <Text style={{ fontSize: 24, fontWeight: '600', color: '#9747FF' }}>Welcome to Finwiz</Text>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#FFFFFF', opacity: 0.7, marginTop: 4 }}>Lets get you set up, complete your profile and get started.</Text></View>

                    </View>
                    <View style={{ position: 'absolute', right: -40, top: 32 }}>
                        <Image style={{ width: 130, height: 130, opacity: 0.2 }} source={require('../../../../assets/Images/logo.png')} />
                    </View>
                </View>
                <View style={{ flex: 0.7, paddingHorizontal: 16 }}>
                    {steps.map((item, index) => <StepsComp publicTokenApiCall={publicTokenApiCall} errorShow2={errorShow2} errorShow={errorShow} index={index} error={errorText} comp={comp} navigate2={navigate2} key={index} linkToken={linkToken} onpress={toggleSelected} item={item} />)}
                </View>
                {/* {MyPlaidComponent(linkToken)} */}



                <Text onPress={() => {
                    dispatch(setstack('WelcomeNav'))
                    dispatch(setWelcomeNavStatus(0))
                    dispatch(setBasicinfoCompleted(false))
                    dispatch(setPhoneVerified(false))
                    dispatch(setSyncAccountDone(false))
                    dispatch(setAuthToken(null))
                    dispatch(setTokenSaved(false))
                    clearAllData()

                }} style={{ elevation: 5, color: 'white', fontWeight: 'bold', position: 'absolute', right: 16, top: 16 }}>LOGOUT</Text>
            </SafeAreaView>
        </View>
    )
}

export default WelcomeFinwiz


