import React from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import UsersListScreen from './screens/UsersListScreen';
import UserDetailScreen from './screens/UserDetailScreen';
import CreateUserScreen from './screens/CreateUserScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="UsersListScreen" 
        component={ UsersListScreen } 
        options={{ title: 'Users Lists'}} 
      />
      <Stack.Screen 
        name="CreateUserScreen" 
        component={ CreateUserScreen } 
        options={{ title: 'Create User'}} 
      />
      <Stack.Screen 
        name="UserDetailScreen" 
        component={ UserDetailScreen } 
        options={{ title: 'User Detail'}} 
      />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
