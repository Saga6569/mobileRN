/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListUsers from './ListUsers';
import ListUsersMarked from './ListUsersMarked';
import { store } from '../slices/store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={ListUsers} />
          <Stack.Screen name="Details" component={ListUsersMarked} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
