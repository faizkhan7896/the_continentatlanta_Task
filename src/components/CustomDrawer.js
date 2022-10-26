import {View, Text, Image} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Statusbar from './Statusbar';
import {theme} from '../utils/theme';
import TextFormatted from './TextFormated';

export default function CustomDrawer(props) {
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.primary}}>
      <Statusbar
        barStyle={'dark-content'}
        backgroundColor={theme.colors.primary}
      />
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{
            height: 70,
            width: 70,
            resizeMode: 'contain',
            borderRadius: 50,
            marginRight: 15,
          }}
          source={{uri: 'https://picsum.photos/500'}}
        />
        <View>
          <Text style={{fontSize: 19, fontWeight: '600'}}>Alex Nikiforov</Text>
          <Text style={{color: theme.colors.Gray, marginTop: 5}}>
            Fashion Designer
          </Text>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
}
