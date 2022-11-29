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
import {LOGIN} from '../../redux/ActionTypes';
import store from '../../redux/store';
import {baseUrl} from '../../utils/constance';
import {theme} from '../../utils/theme';
import {ShowToast} from '../../utils/ToastFunction';

export default function Login({navigation}) {
  const {params} = useRoute();
  const CurrentFlow = useSelector(state => state.CurrentFlow);
  // alert(JSON.stringify(CurrentFlow));
  const [hide, setHide] = useState(false);

  const [email, setEmail] = useState('Alfaiz@gmail.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  async function Login() {
    if (!email) {
      ShowToast('Please enter your email.', 'error');
      return;
    }
    if (!password) {
      ShowToast('Please enter your password.', 'error');
      return;
    }

    try {
      setLoading(true);
      const url = baseUrl + 'login';

      // const token = await firebase.messaging().getToken();
      // alert(token);
      const body = new FormData();
      body.append('email', email);
      body.append('password', password);

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
        store.dispatch({
          type: LOGIN,
          payload: rslt.user_data,
        });
        ShowToast('Login successfully.');
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

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* <LoadingSpinner size={60} visible={loading} color={'#0091E7'} /> */}
      <Statusbar
        barStyle={'dark-content'}
        backgroundColor={theme.colors.primary}
      />
      <ScrollView>
        <View
          style={{
            width: 100,
            height: 100,
            marginTop: 50,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            backgroundColor: theme.colors.primary,
            borderWidth: 1,
            borderColor: theme.colors.Black,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            borderRadius: 10,
          }}>
          <Image
            style={{
              borderRadius: 10,
              width: 100,
              height: 100,
              resizeMode: 'contain',
            }}
            source={require('../../assets/Logo.png')}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 30,
          }}>
          <TextFormated style={styles.title}>Welcome Back!</TextFormated>
          <TextFormated style={styles.subtitle}>Login to continue</TextFormated>
        </View>
        <View style={{alignItems: 'center'}}>
          <CustomTextInput
            onChangeText={setEmail}
            value={email}
            searchbar={require('../../assets/Email.png')}
            placeholder={'Email'}
          />
          <View style={{height: 15}} />
          <CustomTextInput
            onChangeText={setPassword}
            value={password}
            searchbar={require('../../assets/Password.png')}
            placeholder={'Password'}
            Hide={
              hide == false
                ? require('../../assets/HidePassword.png')
                : require('../../assets/unhide.png')
            }
            HideOnPress={() => setHide(!hide)}
            secureTextEntry={hide ? false : true}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <TextFormated
              style={{
                textDecorationLine: 'underline',
                fontWeight: '500',
                color: theme.colors.Black,
                marginTop: 30,
              }}>
              Forgot password?
            </TextFormated>
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 20}}>
          <Button
            onPress={() => {
              Login();
            }}
            // source={require('../../assets/Loginicon.png')}
            ButtonText={'LOGIN'}
            paddingVertical={15}
            borderRadius={10}
            marginTop={50}
            loading={loading}
          />
        </View>
        <View
          style={{
            marginTop: 30,
            alignItems: 'center',
            marginHorizontal: 30,
          }}>
          <TextFormated
            style={{color: theme.colors.Black, alignSelf: 'center'}}>
            or continue with
          </TextFormated>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              ShowToast('This feature will come in future update');
            }}>
            <Image
              style={styles.socialbutton}
              source={require('../../assets/Google_Button.png')}
            />
          </TouchableOpacity>
          {/* <View style={{borderEndWidth: 30}} /> */}
          <TouchableOpacity
            onPress={() => {
              ShowToast('This feature will come in future update');
            }}>
            <Image
              style={styles.socialbutton}
              source={require('../../assets/Apple_Button.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              ShowToast('This feature will come in future update');
            }}>
            {/* <View style={{borderEndWidth: 30}} /> */}
            <Image
              style={styles.socialbutton}
              source={require('../../assets/Facebook_Button.png')}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 20,
          }}>
          <TextFormated
            style={{
              alignSelf: 'center',
              color: '#000',
            }}>
            Don’t have an account yet?{' '}
          </TextFormated>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <TextFormated
              style={{
                color: theme.colors.yellow,
                fontWeight: '600',
                textDecorationLine: 'underline',
              }}>
              SIGNUP
            </TextFormated>
          </TouchableOpacity>
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '400',
    marginTop: 10,
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
