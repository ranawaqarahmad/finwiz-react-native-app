import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import AchieveScreen from '../../UI/OnboardingScreens/BudgetPlanScreens/Screens/AchieveScreen';
import BudgetingScreenA from '../../UI/OnboardingScreens/BudgetPlanScreens/Screens/BudgetingScreenA';
import BudgetingScreenB from '../../UI/OnboardingScreens/BudgetPlanScreens/Screens/BudgetingScreenB';
import CircularProgress from '../../UI/OnboardingScreens/BudgetPlanScreens/Screens/CircularProgress';
import DebtScreen from '../../UI/OnboardingScreens/BudgetPlanScreens/Screens/DebtScreen';
import FinancialScreenA from '../../UI/OnboardingScreens/BudgetPlanScreens/Screens/FinancialScreenA';
import FinancialScreenB from '../../UI/OnboardingScreens/BudgetPlanScreens/Screens/FinancialScreenB';
import GoalScreen from '../../UI/OnboardingScreens/BudgetPlanScreens/Screens/GoalScreen';
import RetirementScreenA from '../../UI/OnboardingScreens/BudgetPlanScreens/Screens/RetirementScreenA';
import RetirementScreenB from '../../UI/OnboardingScreens/BudgetPlanScreens/Screens/RetirementScreenB';

const Stack = createStackNavigator();

const BudgetPlanNavigation = () => {

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView />
            <Stack.Navigator initialRouteName="MonthlyAverageIncome" screenOptions={{ headerShown: false }}>

                <Stack.Screen name="AchieveScreen" component={AchieveScreen} />
                <Stack.Screen name="BudgetingScreenA" component={BudgetingScreenA} />
                <Stack.Screen name="BudgetingScreenB" component={BudgetingScreenB} />
                <Stack.Screen name="CircularProgress" component={CircularProgress} />
                <Stack.Screen name="DebtScreen" component={DebtScreen} />
                <Stack.Screen name="FinancialScreenA" component={FinancialScreenA} />
                <Stack.Screen name="FinancialScreenB" component={FinancialScreenB} />
                <Stack.Screen name="GoalScreen" component={GoalScreen} />
                <Stack.Screen name="RetirementScreenA" component={RetirementScreenA} />
                <Stack.Screen name="RetirementScreenB" component={RetirementScreenB} />



                










            </Stack.Navigator>
        </View>
    )
}

export default BudgetPlanNavigation