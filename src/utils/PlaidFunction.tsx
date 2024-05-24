import { Image, Text, TouchableOpacity, View } from 'react-native';
import { PlaidLink, LinkSuccess, LinkExit, LinkLogLevel, LinkIOSPresentationStyle } from 'react-native-plaid-link-sdk';

const MyPlaidComponent = ({ linkToken, onpress, publicTokenApiCall,errorShow3 }) => {
  console.log(linkToken,'LINKTOKEN');
  
  return (
<View>
  {linkToken?
    <PlaidLink
      tokenConfig={{
        token: linkToken,
        logLevel: LinkLogLevel.ERROR,
        noLoadingState: false,
      }}
      onSuccess={(success: LinkSuccess) => {
        console.log('SUCCESS');
        onpress(0)


        console.log(success.publicToken)
        publicTokenApiCall(success.publicToken)

        success.metadata.accounts.map((item) => {
          console.log(item);

        })
      }}
      onExit={(exit: LinkExit) => {
        console.log('EXIT');

        console.log(exit)
      }}
      // OPTIONAL - MODAL or FULL_SCREEEN presentation on iOS. Defaults to MODAL.
      // UI is always presented in full screen on Android.
      iOSPresentationStyle={LinkIOSPresentationStyle.MODAL}
    >
      <View
        style={{ width: 36, height: 36, backgroundColor: 'black', alignSelf: 'flex-end', borderRadius: 400, alignItems: 'center', justifyContent: 'center', padding: 16, marginTop: 25, }}>
        <Image style={{ width: 16, height: 16 }} source={require('../assets/Images/whitearrow.png')} />

      </View>
    </PlaidLink>:
       <TouchableOpacity onPress={()=>{
        errorShow3()
       }}
       style={{ width: 36, height: 36, backgroundColor: 'black', alignSelf: 'flex-end', borderRadius: 400, alignItems: 'center', justifyContent: 'center', padding: 16, marginTop: 25, }}>
       <Image style={{ width: 16, height: 16 }} source={require('../assets/Images/whitearrow.png')} />

     </TouchableOpacity>}
    </View>
  );
};

export default MyPlaidComponent



