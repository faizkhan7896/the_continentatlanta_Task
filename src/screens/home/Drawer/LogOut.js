import {View, Text} from 'react-native';
import React from 'react';
import Header from '../../../components/Header';
import Statusbar from '../../../components/Statusbar';
import {theme} from '../../../utils/theme';
import store from '../../../redux/store';
import {SIGNOUT} from '../../../redux/ActionTypes';

export default function LogOut({navigation}) {
  store.dispatch({
    type: SIGNOUT,
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <Statusbar
        barStyle="dark-content"
        backgroundColor={theme.colors.primary}
      />
      <Header
        navigation={navigation}
        sourcetwo={require('../../../assets/Cart.png')}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>LogOut</Text>
      </View>
    </View>
  );
}
