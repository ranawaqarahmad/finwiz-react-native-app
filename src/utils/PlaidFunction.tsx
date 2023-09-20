import { Text } from 'react-native';
import { PlaidLink, LinkSuccess, LinkExit, LinkLogLevel, LinkIOSPresentationStyle } from 'react-native-plaid-link-sdk';
import RoundButton from '../UI/OnboardingScreens/SmartFinancialPlan/Components/RoundButton';
import { useSelector } from 'react-redux';
const selector = useSelector(state => state.AppReducer);
const authToken = selector.authToken;
export const MyPlaidComponent = (linkToken: any, onpress) => {
  return (

    <PlaidLink
      tokenConfig={{
        token: linkToken,
        // OPTIONAL - log level.
        logLevel: LinkLogLevel.ERROR,
        // OPTIONAL - Hides native activity indicator if true.
        noLoadingState: false,
      }}
      onSuccess={(success: LinkSuccess) => {
        console.log('SUCCESS');

        console.log(success)
        // handleApiCall(success.publicToken)

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
      <Text> </Text>
      <RoundButton onpress={onpress} />
    </PlaidLink>
  );
};

