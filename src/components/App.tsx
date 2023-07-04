/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListUsers from './ListUsers';
import ListUsersMarked from './ListUsersMarked';
import Viewer from './Viewer';
import { store } from '../slices/store';
import { Provider} from 'react-redux';




const Stack = createNativeStackNavigator();
const App = () => {

  // const state = useSelector((state: RootState) => state.state);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={ListUsers} />
          <Stack.Screen name="Details" component={ListUsersMarked} />
          <Stack.Screen name="Viewer" component={Viewer} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
