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
import Header from '../../components/Header';

export default function Login({navigation}) {
  const {params} = useRoute();
  const CurrentFlow = useSelector(state => state.CurrentFlow);
  // alert(JSON.stringify(CurrentFlow));
  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

      if (rslt.status == '1') {
        // store.dispatch({
        //   type: LOGIN,
        //   payload: rslt.result,
        // });
        ShowToast('Login successfully.');

        navigation.replace('otpVerify', {data: rslt.result});
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
      <Header />
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 30,
          }}>
          <TextFormated style={styles.title}>Password Changed!</TextFormated>
          <TextFormated style={styles.subtitle}>
            Your password has been changed successfully.
          </TextFormated>
        </View>
        <Image
          style={styles.btn}
          source={require('../../assets/Password_Changed.png')}
        />
        <View style={{marginHorizontal: 20}}>
          <Button
            onPress={() => {
              navigation.goBack();
              navigation.goBack();
              navigation.goBack();
              navigation.goBack();
            }}
            // source={require('../../assets/Loginicon.png')}
            ButtonText={'BACK TO LOGIN'}
            paddingVertical={15}
            borderRadius={10}
            marginTop={50}
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
    height: Dimensions.get('window').width / 2,
    width: Dimensions.get('window').width / 1.2,
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
    marginHorizontal: 80,
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
