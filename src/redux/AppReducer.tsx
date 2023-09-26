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
    financialInfoCompleted: false,

    financialPlanComplete: false,
    identityVerificationComplete: false,
    phoneVerified: false,
    faceIdVerified:false,
    notificationEnabled:false,
    authStackCompleted:false,
    questions:'',
    answers:'',

    userId:0,
    syncAccountDone:false,
    setupBudgetPlanDone:false,

    

};
selfPatient: null




export const AppSlice = createSlice({
    name: "AppReducer",
    initialState,
    reducers: {
        // appLanguage: (state, action) => {
        //   state.currentLanguage = action.payload;
        // },
        // setFirstScreen: (state, action) => {
        //   state.firstScreen = action.payload;
        // },
        // setUserData: (state, action) => {
        //   state.userData = action.payload;
        // },
        // startLoader: (state, action) => {
        //   state.loader = action.payload;
        // },
        // setAlertObj: (state, action) => {
        //   state.alertObj = action.payload;
        // },
        // setUSerProfileInformation:(state,action)=>{
        //   state.userProfileInfo=action.payload;
        // },
        // setLoginInformation:(state,action)=>{
        //   state.userLoginInfo=action.payload;
        // },
        // patientSelfData:(state,action)=>{
        //   state.selfPatient=action.payload;
        // },
        // patientAllAnwsers:(state,action)=>{
        //   state.patientAnwser=action.payload;
        // },
        // DetailsList:(state,action)=>{
        //   state.detailArray=action.payload;
        // },
        // PatientAnwserSubmission:(state,action)=>{
        //   state.isPatientSubmittedAnwsers=action.payload
        // },
        // BpmConnectionStatus:(state,action)=>{
        //   state.isDeviceConnected=action.payload
        // },
        // isQuestion:(state,action)=>{
        //   state.Question=action.payload
        // },
        // events: (state, action) => {
        //   state.eventText = action.payload;
        // },
        // isBPMVisible:(state,action)=>{
        //   state.isBPM=action.payload
        // },
        // UserProfileData:(state,action)=>{
        //   state.user_profile_Info=action.payload
        // },
        // NotificationCountUser:(state,action)=>{
        //   state.user_notification_count+=1
        // },
        // IsNotificationScreenOpen:(state,action)=>{
        //  state.notifyscreen=action.payload
        // },
        // NotificationMessage:(state,action)=>{
        //   state.messagenotification=action.payload
        //  }, 
        //  ToastNumber:(state,action)=>{
        //   state.number_toast=action.payload
        //  }, 
        //  Setruncounter:(state,action)=>{
        //   state.runcounter=action.payload
        //  },
        setstack: (state, action) => {
            state.stackinfo = action.payload
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
            state.setupBudgetPlanDone = action.payload
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
    setAnswers


} = AppSlice.actions;

export default AppSlice.reducer;