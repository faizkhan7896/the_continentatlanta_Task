// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import * as React from 'react';
// import Home from '../screens/home/Home';
// import DrawerNavigator from './DrawerNavigator';

// const Stack = createNativeStackNavigator();

// function App() {
//   return (
//     <Stack.Navigator
//       screenOptions={{headerShown: false}}
//       initialRouteName="DrawerNavigator">
//       {/* <Stack.Screen name="Home" component={Home} /> */}
//       <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
//     </Stack.Navigator>
//   );
// }

// export default App;
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import Home from '../screens/home/Tab/User/Home';
import Favourite from '../screens/home/Drawer/Favourite';
import Orders from '../screens/home/Drawer/Orders';
import About from '../screens/home/Drawer/About';
import Privacy from '../screens/home/Drawer/Privacy';
import Settings from '../screens/home/Drawer/Settings';
import SubCart from '../screens/home/Drawer/SubCart';
import LogOut from '../screens/home/Drawer/LogOut';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import {Alert, Image, View} from 'react-native';
import {theme} from '../utils/theme';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function App({navigation}) {
  async function Login() {
    try {
      setLoading(true);
      const url = baseUrl + 'delete_user';
      const body = new FormData();
      body.append('user_id', auth.id);

      const res = await fetch(url, {
        method: 'POST',
        body: body,
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      console.log(res);
      const rslt = await res.json();
      console.log(rslt);

      if (rslt.status == '1') {
        store.dispatch({
          type: SELECTEDLANGUAGE,
          payload: {lang: ''},
        });
        store.dispatch({
          type: LANGUAGESELECTED,
          payload: {select: false},
        });
        store.dispatch({
          type: SIGNOUT,
        });

        ShowToast('Account deleted successfully.');
      } else {
        ShowToast(rslt.message || 'Unknown error', 'error');
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      // alert('An error occured.');
      ShowToast('An error occured.', 'error');

      console.log(e);
    }
  }

  // const showConfirmDialog = () => {
  //   return Alert.alert(
  //     'Are your sure?',
  //     'Are you sure you want to remove this beautiful box?',
  //     [
  //       // The "Yes" button
  //       {
  //         text: 'Yes',
  //         onPress: () => {
  //           // setShowBox(false);
  //         },
  //       },
  //       // The "No" button
  //       // Does nothing but dismiss the dialog when tapped
  //       {
  //         text: 'No',
  //         onPress: () => {
  //           navigation.goBack();
  //         },
  //       },
  //     ],
  //   );
  // };

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: theme.colors.primary,
        drawerActiveTintColor: theme.colors.Black,
        drawerInactiveTintColor: theme.colors.Gray,
        drawerLabelStyle: {marginLeft: -20, fontSize: 16},
      }}
      backBehavior="firstRoute"
      initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{drawerItemStyle: {height: 0}}}
      />
      {/* <Drawer.Screen
        name="Favourite"
        component={Favourite}
        options={{
          drawerIcon: ({color}) => (
            <Image
              style={{
                height: 30,
                width: 30,
                resizeMode: 'contain',
              }}
              source={require('../assets/MyFavorites.png')}
            />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="Orders"
        component={Orders}
        options={{
          drawerIcon: ({color}) => (
            <Image
              style={{
                height: 30,
                width: 30,
                resizeMode: 'contain',
              }}
              source={require('../assets/Myorder.png')}
            />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="About"
        component={About}
        options={{
          drawerIcon: ({color}) => (
            <Image
              style={{
                height: 30,
                width: 30,
                tintColor: theme.colors.yellow,
                resizeMode: 'contain',
              }}
              source={require('../assets/Abouts.png')}
            />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="Privacy"
        component={Privacy}
        options={{
          drawerIcon: ({color}) => (
            <Image
              style={{
                height: 30,
                width: 30,
                resizeMode: 'contain',
                tintColor: theme.colors.yellow,
              }}
              source={require('../assets/PrivacyPolicy.png')}
            />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({color}) => (
            <Image
              style={{
                height: 24,
                width: 24,
                resizeMode: 'contain',
                marginLeft: 5,
              }}
              source={require('../assets/Setting.png')}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({color}) => (
            <Image
              style={{
                height: 30,
                width: 30,
                resizeMode: 'contain',
              }}
              source={require('../assets/Setting.png')}
            />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="SubCart"
        component={SubCart}
        options={{
          drawerIcon: ({color}) => (
            <Image
              style={{
                height: 30,
                width: 30,
                resizeMode: 'contain',
              }}
              source={require('../assets/Subcart.png')}
            />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="LogOut"
        component={LogOut}
        options={{
          drawerIcon: ({color}) => (
            <Image
              style={{
                height: 30,
                width: 30,
                tintColor: theme.colors.yellow,
                resizeMode: 'contain',
              }}
              source={require('../assets/Logout.png')}
            />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
}

export default App;
