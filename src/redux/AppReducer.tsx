import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-test-renderer";

const initialState = {
    //   currentLanguage: "",
    //   eventText: '',
    //   firstScreen: "",
    //   userData: null,
    //   loader: false,
    //   alertObj: {
    //     showPopup: false,
    //     title: "",
    //     content: "",
    //   },
    // userProfileInfo:{
    //   name:'',
    //   age:'',
    //   role:'',
    //   about:'',
    //   image:'',
    //   gender:'',
    //   education:'',
    //   workExperience:'',
    //   marital_status:'',
    //   user_id:'',
    //   firstName:''
    // },
    // userLoginInfo:null,
    // patientAnwser:null,
    // detailArray:null,
    // isPatientSubmittedAnwsers:null,
    // isDeviceConnected:null,
    // Question:false,
    // isBPM:false,
    // user_profile_Info:false,
    // user_notification_count:0,
    // notifyscreen:false,
    // messagenotification:'',
    // number_toast:0,
    // runcounter:true,
    // refreshChat:0,
    stackinfo: 'WelcomeNav',
    welcomeScreen: 1,
    welcomeNavStatus: 0,
    financialPlanScreen: 0,
    authToken: null,
    tokenSaved: false,


    basicInfoCompleted: false,
    phoneVerified: false,
    OTPScreen:false,
    faceIdVerified: false,
    notificationEnabled: false,
    syncAccountDone: false,
    setupBudgetPlanDone: false,

    financialInfoCompleted: false,

    btmNavVisibility: true,
    financialPlanComplete: false,
    identityVerificationComplete: false,

    authStackCompleted: false,
    questions: '',
    answers: '',

    userId: 0,

    accountId: '',
    totalBalances:0,
    notifications:'false'






};
selfPatient: null




export const AppSlice = createSlice({
    name: "AppReducer",
    initialState,
    reducers: {

        setstack: (state, action) => {
            state.stackinfo = action.payload
        },
        setBtmNavVisibility: (state, action) => {
            state.btmNavVisibility = action.payload
        },

        setnotificationEnabled: (state, action) => {
            state.notificationEnabled = action.payload
        },
        setAuthStackCompleted: (state, action) => {
            state.authStackCompleted = action.payload
        },
        setTokenSaved: (state, action) => {
            state.tokenSaved = action.payload
        },
        setFaceIdVerified: (state, action) => {
            state.faceIdVerified = action.payload
        },
        setPhoneVerified: (state, action) => {
            state.phoneVerified = action.payload
        },
        setAuthToken: (state, action) => {
            state.authToken = action.payload
        },
        setWelcomeScreen: (state, action) => {
            state.welcomeScreen += 1
        },
        setWelcomeNavStatus: (state, action) => {
            state.welcomeNavStatus = action.payload
        },
        setFinancialPlanScreen: (state, action) => {
            state.financialPlanScreen = action.payload
        },
        setBasicinfoCompleted: (state, action) => {
            state.basicInfoCompleted = action.payload
        },
        setFinancialInfoCompleted: (state, action) => {
            state.financialInfoCompleted = action.payload
        },
        setQuestions: (state, action) => {
            state.questions = action.payload
        },
        setAnswers: (state, action) => {
            state.answers = action.payload
        },
        setUserId: (state, action) => {
            state.userId = action.payload
        },
        setSyncAccountDone: (state, action) => {
            state.syncAccountDone = action.payload
        },
        setSetupBudgetPlanDone: (state, action) => {
            console.log('setSetupBudgetPlanDone+++++++++++++++++++++++++++++++++++',action.payload);
            
            state.setupBudgetPlanDone = action.payload
        },
        setAccountId: (state, action) => {
            state.accountId = action.payload
        },
        setOTPScreen: (state, action) => {
            state.OTPScreen = action.payload
        },
        setTotalBalances: (state, action) => {
            state.totalBalances = action.payload
        },
        setNotificationsCount: (state, action) => {
            state.notifications = action.payload
        },


    },
});

export const {
    //   appLanguage,
    //   setFirstScreen,
    //   setUserData,
    //   startLoader,
    //   setAlertObj,
    //   setUSerProfileInformation,
    //   setLoginInformation,
    //   patientSelfData,
    //   patientAllAnwsers,
    //   DetailsList,
    //   PatientAnwserSubmission,
    //   BpmConnectionStatus,
    //   isQuestion,
    //   isBPMVisible,
    //   UserProfileData,
    //   events,
    //   NotificationCountUser,
    //   IsNotificationScreenOpen,
    //   NotificationMessage,
    //   ToastNumber,
    //   Setruncounter,
    //   LoadChats,
    setOTPScreen,
    setBtmNavVisibility,
    setstack,
    setWelcomeScreen,
    setWelcomeNavStatus,
    setFinancialPlanScreen,
    setAuthToken,
    setTokenSaved,
    setPhoneVerified,
    setFaceIdVerified,
    setnotificationEnabled,
    setAuthStackCompleted,
    setBasicinfoCompleted,
    setQuestions,
    setUserId,
    setFinancialInfoCompleted,
    setSyncAccountDone,
    setSetupBudgetPlanDone,
    setAnswers,
    setAccountId,
    setTotalBalances,
    setNotificationsCount,


} = AppSlice.actions;

export default AppSlice.reducer;