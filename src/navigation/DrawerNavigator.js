import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import CustomDrawer from '../components/CustomDrawer';
import Gallery from '../screens/Gallery';
import MemberShip from '../screens/MemberShip';
import Menue from '../screens/Menue';
import OurStory from '../screens/OurStory';
import TheChef from '../screens/TheChef';
import TheMoxologist from '../screens/TheMoxologist';
import Welcome from '../screens/Welcome';
import {theme} from '../utils/theme';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function App({navigation}) {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: theme.colors.primary,
        drawerActiveTintColor: theme.colors.Black,
        drawerInactiveTintColor: theme.colors.Gray,
        drawerLabelStyle: {marginLeft: 20, fontSize: 16},
      }}
      backBehavior="firstRoute"
      initialRouteName="Menu">
      {/* <Drawer.Screen
        name="Home"
        component={Home}
        options={{drawerItemStyle: {height: 0}}}
      /> */}
      <Drawer.Screen name="Welcome" component={Welcome} />
      <Drawer.Screen name="Menu" component={Menue} />

      <Drawer.Screen name="Our Story" component={OurStory} />
      <Drawer.Screen name="The Chef" component={TheChef} />
      <Drawer.Screen name="The Moxologist" component={TheMoxologist} />
      <Drawer.Screen name="MemberShip" component={MemberShip} />
      <Drawer.Screen name="Gallery" component={Gallery} />
    </Drawer.Navigator>
  );
}

export default App;
