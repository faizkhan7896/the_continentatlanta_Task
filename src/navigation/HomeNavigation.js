import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import DrawerNavigator from '../navigation/DrawerNavigator';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, orientation: 'portrait'}}
      // initialRouteName="Scanner">
      initialRouteName="DrawerNavigator">
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </Stack.Navigator>
  );
}

export default App;
