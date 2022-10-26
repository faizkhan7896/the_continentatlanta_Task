import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/Header';
import Statusbar from '../../../components/Statusbar';
import {theme} from '../../../utils/theme';
import SettingItem from '../../../components/SettingItem';
import {Switch} from 'react-native-paper';

export default function Settings({navigation}) {
  const [first, setFirst] = useState(false);
  const [secand, setSecand] = useState(false);
  const [third, setThird] = useState(false);

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
      <Header navigation={navigation} Headertext={'Settings'} />
      <View style={{alignItems: 'center', marginTop: 20}}>
        <SettingItem
          text={'Email Support'}
          source={require('../../../assets/email_yellow.png')}
        />
        <SettingItem text={'FAQ'} source={require('../../../assets/FAQ.png')} />
        <SettingItem
          text={'Privacy Statement'}
          source={require('../../../assets/PrivacyPolicy.png')}
        />
        <SettingItem
          text={'Notification'}
          source={require('../../../assets/notification.png')}
          toggle
          value={first}
          onValueChange={() => setFirst(!first)}
        />
        <SettingItem
          text={'Update'}
          source={require('../../../assets/update.png')}
          toggle
          value={secand}
          onValueChange={() => setSecand(!secand)}
        />
        <SettingItem
          text={'Driver Mode'}
          source={require('../../../assets/update.png')}
          toggle
          value={third}
          onValueChange={() => setThird(!third)}
        />
      </View>
    </View>
  );
}
