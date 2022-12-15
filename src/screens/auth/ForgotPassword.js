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
import Header from '../../components/Header';
import {baseUrl} from '../../utils/constance';
import {theme} from '../../utils/theme';
import {ShowToast} from '../../utils/ToastFunction';

export default function Login({navigation}) {
  const {params} = useRoute();
  const CurrentFlow = useSelector(state => state.CurrentFlow);
  // alert(JSON.stringify(CurrentFlow));
  const [hide, setHide] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function ForgotPassword() {
    if (!email) {
      ShowToast('Please enter your email.', 'error');
      return;
    } else if (
      email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
    } else {
      ShowToast('Invalid email address.', 'error');
      return;
    }
    try {
      setLoading(true);
      const url = baseUrl + 'forgot_password';

      const body = new FormData();
      body.append('email', email);

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
        ShowToast(rslt.message);

        navigation.goBack();
        // navigation.replace('Otp', {email: email});
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
        barStyle={'light-content'}
        backgroundColor={theme.colors.primary}
      />
      <Header navigation={navigation} />
      <ScrollView>
        <Image style={styles.btn} source={require('../../assets/Logo.png')} />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 30,
          }}>
          <TextFormated style={styles.title}>Forgot Password?</TextFormated>
          <TextFormated style={styles.subtitle}>
            Don't worry! It occurs. Please enter the email address linked with
            your account.
          </TextFormated>
        </View>
        <View style={{alignItems: 'center'}}>
          <CustomTextInput
            onChangeText={setEmail}
            value={email}
            searchbar={require('../../assets/Email.png')}
            placeholder={'Email'}
          />
        </View>
        <View style={{marginHorizontal: 20}}>
          <Button
            // onPress={() => Login()}
            onPress={() => ForgotPassword()}
            // source={require('../../assets/Loginicon.png')}
            ButtonText={'SEND'}
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
    marginHorizontal: 40,
    textAlign: 'center',
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
