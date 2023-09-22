import { View, Text, StatusBar, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import StepsComp from '../Components/StepsComp'
import { MyPlaidComponent } from '../../../../utils/PlaidFunction'
import { PlaidLink, LinkSuccess, LinkExit, LinkLogLevel, LinkIOSPresentationStyle } from 'react-native-plaid-link-sdk';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { setSyncAccountDone } from '../../../../redux/AppReducer';

const WelcomeFinwiz = ({ navigation }) => {
    // const [linkToken, setLinkToken] = useState(null)
    var authToken: any;
    const [linkToken, setLinkToken] = useState(null)
    const [errorText,setErrorText]=useState('')
    const [comp,setComp]=useState(-1)


    const dispatch=useDispatch()

    const selector = useSelector(state => state.AppReducer);
    authToken = selector.authToken;

    const [steps, setsteps] = useState([
        {
            step: 'Step 1',
            title: 'Sync Your Accounts',
            description: 'Lörem ipsum dek presk, don sek, press. Onisade geoskap. ',
            selected:selector.syncAccountDone?true: false,
            color: '#9747FF',
            imgsrc: require('../../../../assets/Images/account.png'),
            auto:true,
        },
        {
            step: 'Step 2',
            title: 'Setup Your Budget Plan ',
            description: 'Lörem ipsum dek presk, don sek, press. Onisade geoskap. ',
            selected: false,
            color: '#21014E',
            imgsrc: require('../../../../assets/Images/logo.png'),
            auto:false,

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
    const navigate2 = () => {
        console.log('Create LINK TOKEN');

        navigation.navigate('SmartFinancialPlanScreen')
        // handleApiCall()
    }
    const errorShow=()=>{
        setErrorText('Complete the account sync process first')
        setComp(0)
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
                console.log('ERROR IS THIS ',err);
            });
    }, [setLinkToken]);


    // const handleApiCall = async () => {

    //     console.log('AuthToken is ', authToken);

    //     fetch('https://api-finwiz.softsquare.io/api/user/plaid-auth', {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': `Bearer ${authToken}`,
    //             'Content-Type': 'application/json',
    //         },

    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);


    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             // setLoader(false)
    //         });



    // };
    // handleApiCall()
    React.useEffect(() => {
        if (linkToken == null) {
            createLinkToken();
        }
    }, []);





    // const plaidLinkFlow = () => {

    //     console.log('PLAID LINK FLOW');




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
                    {steps.map((item, index) => <StepsComp errorShow={errorShow} index={index} error={errorText} comp={comp} navigate2={navigate2} key={index} linkToken={linkToken} onpress={toggleSelected} item={item} />)}
                </View>
                {/* {MyPlaidComponent(linkToken)} */}




            </SafeAreaView>
        </View>
    )
}

export default WelcomeFinwiz