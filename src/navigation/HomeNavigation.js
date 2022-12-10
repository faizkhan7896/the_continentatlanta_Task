import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import DrawerNavigator from '../navigation/DrawerNavigator';
import ProductDetail from '../screens/home/Tab/User/ProductDetail';
import OrderDetails from '../screens/home/Tab/User/OrderDetails';
import Cart from '../screens/home/Tab/User/Cart';
import Address from '../screens/home/Tab/User/Address';
import AddAddress from '../screens/home/Tab/User/AddAddress';
import Card from '../screens/home/Tab/User/Card';
import AddCard from '../screens/home/Tab/User/AddCard';
import OrderConfirm from '../screens/home/Tab/User/OrderConfirm';
import AddProduct from '../screens/home/Tab/Owner/AddProduct';
import Payment from '../screens/home/Tab/User/Payment';
import OwnerSignup from '../screens/home/Tab/User/OwnerSignup';
import JoinedMarkets from '../screens/home/Tab/User/JoinedMarkets';
import AllMarketProduct from '../screens/home/Tab/User/AllMarketProduct';
import SelectProduct from '../screens/home/Tab/User/SelectProduct';
import UpdateMarket from '../screens/home/Tab/User/UpdateMarket';
import Scanner from '../screens/home/Tab/User/Scanner';
import Privacy from '../screens/home/Drawer/Privacy';
import About from '../screens/home/Drawer/About';
import Support from '../screens/home/Drawer/Support';
import ImageZoom from '../components/ImageZoom';
import FullVideo from '../components/FullVideo';
import MapScreen from '../components/MapScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, orientation: 'portrait'}}
      // initialRouteName="Scanner">
      initialRouteName="DrawerNavigator">
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="AddAddress" component={AddAddress} />
      <Stack.Screen name="Card" component={Card} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="OrderConfirm" component={OrderConfirm} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="ImageZoom" component={ImageZoom} />
      <Stack.Screen name="FullVideo" component={FullVideo} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="OwnerSignup" component={OwnerSignup} />
      <Stack.Screen name="Scanner" component={Scanner} />
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="JoinedMarkets" component={JoinedMarkets} />
      <Stack.Screen name="AllMarketProduct" component={AllMarketProduct} />
      <Stack.Screen name="SelectProduct" component={SelectProduct} />
      <Stack.Screen name="UpdateMarket" component={UpdateMarket} />
    </Stack.Navigator>
  );
}

export default App;
