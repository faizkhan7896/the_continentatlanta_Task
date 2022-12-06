import {View, Text, Alert, Image} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/Header';
import Statusbar from '../../../components/Statusbar';
import {theme} from '../../../utils/theme';
import SettingItem from '../../../components/SettingItem';
import LoadingSpinner from '../../../components/LoadingSpinner';
import {Switch} from 'react-native-paper';
import store from '../../../redux/store';
import {SIGNOUT} from '../../../redux/ActionTypes';
import {useSelector} from 'react-redux';
import {baseUrl} from '../../../utils/constance';
import {ShowToast} from '../../../utils/ToastFunction';

export default function Settings({navigation}) {
  const [first, setFirst] = useState(false);
  const [secand, setSecand] = useState(false);
  const [third, setThird] = useState(false);
  const auth = useSelector(state => state.auth);
  // alert(JSON.stringify(auth));

  const Logout_Confirmation = () => {
    return Alert.alert('Logout!', 'Are you sure you want to logout?', [
      {
        text: 'Yes',
        onPress: () => {
          store.dispatch({
            type: SIGNOUT,
          });
        },
      },
      {text: 'No'},
    ]);
  };

  const Delete_Account_Confirmation = () => {
    return Alert.alert(
      'Delete Account!',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Yes',
          onPress: () => {
            DeleteAccount();
          },
        },
        {text: 'No'},
      ],
    );
  };

  async function DeleteAccount() {
    try {
      setThird(true);
      const url = baseUrl + 'delete_profile';
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

      if (rslt.success == '1') {
        store.dispatch({
          type: SIGNOUT,
        });

        ShowToast('Account deleted successfully.');
      } else {
        ShowToast(rslt.message || 'Unknown error', 'error');
      }
      setThird(false);
    } catch (e) {
      setThird(false);
      // alert('An error occured.');
      ShowToast('An error occured.', 'error');

      console.log(e);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <LoadingSpinner
        size="small"
        color={theme.colors.yellow}
        loading={third}
      />
      <Statusbar
        barStyle="dark-content"
        backgroundColor={theme.colors.primary}
      />
      <Header navigation={navigation} Headertext={'Settings'} />

      <View
        style={{
          paddingTop: 20,
          paddingHorizontal: 20,
          // flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colors.primary,
        }}>
        <Image
          style={{
            height: 100,
            width: 100,
            resizeMode: 'contain',
            borderRadius: 50,
            marginRight: 15,
            // borderWidth: 1,
            shadowColor: theme.colors.yellow,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
          source={require('../../../assets/userimg.png')}
        />
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <Text style={{fontSize: 19, fontWeight: '600'}}>{auth?.name}</Text>
          <Text style={{color: theme.colors.Gray, marginTop: 5}}>
            {auth?.email}
          </Text>
        </View>
      </View>

      <View style={{alignItems: 'center', marginTop: 20}}>
        <SettingItem
          text={'Support'}
          source={require('../../../assets/email_yellow.png')}
          onPress={() => {
            navigation.navigate('Support');
          }}
        />
        {/* <SettingItem text={'FAQ'} source={require('../../../assets/FAQ.png')} /> */}
        {/* <SettingItem
          text={'Privacy Statement'}
          source={require('../../../assets/PrivacyPolicy.png')}
        /> */}
        <SettingItem
          text={'About us'}
          source={require('../../../assets/Abouts.png')}
          onPress={() => {
            navigation.navigate('About');
          }}
        />
        <SettingItem
          text={'Privacy Policy'}
          source={require('../../../assets/PrivacyPolicy.png')}
          onPress={() => {
            navigation.navigate('Privacy');
          }}
        />
        <SettingItem
          text={'Delete Account'}
          source={require('../../../assets/DeleteAccount.png')}
          height={28}
          width={28}
          marginLeft={8}
          onPress={() => Delete_Account_Confirmation()}
        />
        <SettingItem
          text={'Logout'}
          source={require('../../../assets/Logout.png')}
          onPress={() => Logout_Confirmation()}
        />
      </View>
    </View>
  );
}
