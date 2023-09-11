import { View, Text, StatusBar, Image } from 'react-native'
import React, { useState } from 'react'
import StepsComp from '../Components/StepsComp'
import  { MyPlaidComponent } from '../../../../utils/PlaidFunction'
import { PlaidLink, LinkSuccess, LinkExit, LinkLogLevel, LinkIOSPresentationStyle } from 'react-native-plaid-link-sdk';

const WelcomeFinwiz = ({ navigation }) => {
    const [linkToken, setLinkToken] = useState(null)

    const authToken="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBpLWZpbndpei5zb2Z0c3F1YXJlLmlvXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjk0MTg4NTUwLCJleHAiOjE2OTQ3OTMzNTAsIm5iZiI6MTY5NDE4ODU1MCwianRpIjoiaW5WQzFKd25NcUt6Y2x4MCIsInN1YiI6MTYsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.6QlBRLC-xX43b173paLwjrwtcnGO7ErljGTx245sK9I"
    
    const [steps, setsteps] = useState([
        {
            step: 'Step 1',
            title: 'Sync Your Accounts',
            description: 'Lörem ipsum dek presk, don sek, press. Onisade geoskap. ',
            selected: false,
            color: '#9747FF',
            imgsrc: require('../../../../assets/Images/account.png')
        },
        {
            step: 'Step 2',
            title: 'Setup Your Budget Plan ',
            description: 'Lörem ipsum dek presk, don sek, press. Onisade geoskap. ',
            selected: false,
            color: '#21014E',
            imgsrc: require('../../../../assets/Images/logo.png')
        },
    ])

    const navigate = () => {
        console.log('Create LINK TOKEN');

        createLinkToken()
    }

    const createLinkToken = React.useCallback(async () => {
        await fetch(`https://api-finwiz.softsquare.io/api/plaid-generate-link-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_name: "Muhammad Izhan",
                country_codes: [
                    "US"
                ],
                language: "en",
                user: {
                    "client_user_id": "1"
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
                handleApiCall()

            })
            .catch(err => {
                console.log(err);
            });
    }, [setLinkToken]);

    const handleApiCall = async () => {
        console.log('ACCESS TOKEN IS THIS ===== ', authToken);
      
      
      
        fetch('https://api-finwiz.softsquare.io/api/user/update-user', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plaid_access_token: "public-sandbox-20891662-f23b-444a-9d84-0919a0dc66f4",
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.status);
            if (data.status) {
              console.log(data);
      
      
            } else {
              console.log('MESSAGE', data.message);
            }
      
          })
          .catch((error) => {
            console.log(error);
          });
      
      
      
      };

    React.useEffect(() => {
        if (linkToken == null) {
            createLinkToken();
        }
    }, []);


    const plaidLinkFlow = () => {

        console.log('PLAID LINK FLOW');


      

    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
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
                {steps.map((item, index) => <StepsComp linkToken={linkToken} onpress={navigate} item={item} />)}
            </View>
            {/* {MyPlaidComponent(linkToken)} */}





        </View>
    )
}

export default WelcomeFinwiz