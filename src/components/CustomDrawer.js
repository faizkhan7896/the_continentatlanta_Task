import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Statusbar from './Statusbar';
import {theme} from '../utils/theme';
import TextFormatted from './TextFormated';
import {baseUrl} from '../utils/constance';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {ShowToast} from '../utils/ToastFunction';

export default function CustomDrawer(props) {
  const auth = useSelector(state => state.auth);
  const [data, setData] = useState();

  async function GetProfile(silent = false) {
    try {
      const url = baseUrl + 'get_profile?user_id=' + auth.id;
      console.log(url);

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      console.log(res);
      const rslt = await res.json();
      console.log(rslt);

      if (rslt.success == '1') {
        setData(rslt.user_data);
      } else {
        // ShowToast(rslt.message || 'Unknown error', 'error');
      }
    } catch (e) {
      // alert('An error occured.');
      ShowToast('An error occured.', 'error');
      console.log(e);
    }
  }

  useEffect(() => {
    GetProfile();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.primary}}>
      <Statusbar
        barStyle={'dark-content'}
        backgroundColor={theme.colors.primary}
      />
      <View
        style={{
          // paddingTop: 20,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colors.primary,
        }}>
        <View>
          <Text
            style={{
              fontSize: 19,
              fontWeight: '600',
              color: theme.colors.primary,
            }}>
            {data?.name}
          </Text>
          <Text style={{color: theme.colors.primary, marginTop: 5}}>
            {data?.email}
          </Text>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
}
