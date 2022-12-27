import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import Statusbar from '../../components/Statusbar';
import TextFormated from '../../components/TextFormated';
import CustomTextInput from '../../components/TextInput';
import {baseUrl} from '../../utils/constance';
import {theme} from '../../utils/theme';
import {ShowToast} from '../../utils/ToastFunction';

export default function Login({navigation}) {
  const {params} = useRoute();
  const CurrentFlow = useSelector(state => state.CurrentFlow);
  // alert(JSON.stringify(params));
  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function CreatePassword() {
    if (!password) {
      ShowToast('Please enter new password.', 'error');
      return;
    }
    if (!confirmPassword) {
      ShowToast('Please enter again new password.', 'error');
      return;
    }
    if (password != confirmPassword) {
      ShowToast('Password and confirm password do not match.', 'error');
      return;
    }

    try {
      setLoading(true);
      const url = baseUrl + 'new_password';
      console.log(url);

      const body = new FormData();
      body.append('email', params.email);
      body.append('n_password', password);
      body.append('c_password', password);

      console.log(body);

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
        ShowToast(rslt.message + ' Password changed successfully.');
        navigation.replace('PasswordChanged');
      } else {
        ShowToast(rslt.result || rslt.message || 'Unknown error', 'error');
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      // alert('An error occured.');
      ShowToast('An error occured.', 'error');

      console.log(e);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* <LoadingSpinner size={60} visible={loading} color={'#0091E7'} /> */}
      <Statusbar
        barStyle={'dark-content'}
        backgroundColor={theme.colors.primary}
      />
      <ScrollView>
        <Image style={styles.btn} source={require('../../assets/Logo.png')} />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 30,
          }}>
          <TextFormated style={styles.title}>Creat new password</TextFormated>
          <TextFormated style={styles.subtitle}>
            Your new password must be unique from those previously used.
          </TextFormated>
        </View>
        <View style={{alignItems: 'center'}}>
          <CustomTextInput
            onChangeText={setPassword}
            value={password}
            searchbar={require('../../assets/Password.png')}
            placeholder={'New Password'}
            Hide={
              hide == false
                ? require('../../assets/HidePassword.png')
                : require('../../assets/unhide.png')
            }
            HideOnPress={() => setHide(!hide)}
            secureTextEntry={hide ? false : true}
          />
          <View style={{height: 15}} />
          <CustomTextInput
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            searchbar={require('../../assets/Password.png')}
            placeholder={'Confirm Password'}
            Hide={
              hide2 == false
                ? require('../../assets/HidePassword.png')
                : require('../../assets/unhide.png')
            }
            HideOnPress={() => setHide2(!hide2)}
            secureTextEntry={hide2 ? false : true}
          />
        </View>
        <View style={{marginHorizontal: 20}}>
          <Button
            onPress={() => CreatePassword()}
            // source={require('../../assets/Loginicon.png')}
            ButtonText={'RESET PASSWORD'}
            paddingVertical={15}
            borderRadius={10}
            marginTop={50}
            loading={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    height: Dimensions.get('window').width - 153,
    width: Dimensions.get('window').width,
    resizeMode: 'contain',
    // borderWidth: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    height: Dimensions.get('window').width / 4.5,
    width: Dimensions.get('window').width / 4.5,
    resizeMode: 'contain',
    marginTop: 50,
    alignSelf: 'center',
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
  },
  subtitle: {
    fontWeight: '400',
    marginTop: 10,
    textAlign: 'center',
    marginHorizontal: 40,
  },
  forgot: {
    color: '#ADA4A5',
    fontWeight: '600',
    alignSelf: 'center',
    textDecorationLine: 'underline',
    marginTop: 10,
    // flexDirection:"row"
  },
  lines: {
    height: 2,
    backgroundColor: '#DDDADA',
    marginTop: 5,
    width: Dimensions.get('window').width / 2.6,
  },
  socialbutton: {
    height: Dimensions.get('window').width / 5,
    width: Dimensions.get('window').width / 3.4,
    resizeMode: 'contain',
    // borderWidth: 1,
  },
});
