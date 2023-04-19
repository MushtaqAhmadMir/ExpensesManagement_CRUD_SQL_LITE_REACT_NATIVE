// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyExpenses from '../Screens/MyExpenses'
import ExpenseForm from '../Screens/ExpenseForm'
import navigationEnum from '../Constants/navigationEnum'


const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown:false}} >
        <Stack.Screen  name={navigationEnum.MY_EXPENSES} component={MyExpenses} />
        <Stack.Screen name={navigationEnum.EXPENSE_FORM}component={ExpenseForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;