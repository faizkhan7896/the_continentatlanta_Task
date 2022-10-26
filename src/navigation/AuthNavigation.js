import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import ForgotPassword from '../screens/auth/ForgotPassword';
import Login from '../screens/auth/Login';
import Otp from '../screens/auth/Otp';
import PasswordChanged from '../screens/auth/PasswordChanged';
import Signup from '../screens/auth/Signup';
import SplashScreen from '../screens/auth/SplashScreen';
import CreateNewPassword from '../screens/auth/CreateNewPassword';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Splash">
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="PasswordChanged" component={PasswordChanged} />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
    </Stack.Navigator>
  );
}

export default App;
