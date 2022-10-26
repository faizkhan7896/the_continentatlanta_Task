import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {useSelector} from 'react-redux';
import AuthNavigation from './AuthNavigation';
import HomeNavigator from './HomeNavigation';

const Stack = createNativeStackNavigator();

function App() {
  const isLoggedIn = useSelector(state => !!state?.auth?.id);

  if (!isLoggedIn) {
    return (
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  );
}

export default App;
