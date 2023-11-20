import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainNav from './MainNav';
import AccountsScreen from '../UI/AccountsScreens/Screens/AccountsScreen';
import MoreScreen from '../UI/MoreScreens/Screens/MoreScreen';
import AddIncomeA from '../UI/CategoryScreens/Category/Screens/AddIncomeA';
import { Image, Modal, View, StyleSheet } from 'react-native';
import InsightScreen from '../UI/InsightScreens/Screens/InsightScreen';
import CustomBottomTabBar from './CustomBottomTabBar';
import { useState } from 'react';
import AccountNav from './AccountNav';
import InsightsNav from './InsightsNav';

const Tab = createBottomTabNavigator();

const BtmNav = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const controlModalVisibility = () => {
    setModalVisible(!modalVisible)
  }
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        tabBar={props => <CustomBottomTabBar {...props} controlModalVisibility={controlModalVisibility} />}
        sceneContainerStyle={{ backgroundColor: 'white' }}
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          
        }}
      >
        <Tab.Screen name="Home" component={MainNav} />
        <Tab.Screen name="Accounts" component={AccountNav} />
        <Tab.Screen name="Plus" component={AddIncomeA} />
        <Tab.Screen name="InsightsNav" component={InsightsNav} />
        <Tab.Screen name="More" component={MoreScreen} />
      </Tab.Navigator>
      <Modal  visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <AddIncomeA controlModalVisibility={controlModalVisibility} />
          {/* Add a button or gesture handler to close the modal */}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Adjust this to position the modal content as needed
  },
});

export default BtmNav;
