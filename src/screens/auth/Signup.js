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
import DatePicker from 'react-native-date-picker';
import {ShowToast} from '../../utils/ToastFunction';
import moment from 'moment';
import {SIGNUP} from '../../redux/ActionTypes';
import store from '../../redux/store';

export default function Login({navigation}) {
  const {params} = useRoute();
  // alert(params);
  const [hide, setHide] = useState(false);
  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState();
  const [country_code, setCountry_code] = useState('');
  const [number, setNumber] = useState('');

  const [loading, setLoading] = useState(false);

  async function SignUp() {
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
    if (!password) {
      ShowToast('Please enter your password', 'error');
      return;
    }
    if (!name) {
      ShowToast('Please enter your name', 'error');
      return;
    }
    if (!date) {
      ShowToast('Please select your date of birth', 'error');
      return;
    }
    if (!country_code) {
      ShowToast('Please enter your country code', 'error');
      return;
    }
    if (!number) {
      ShowToast('Please enter your number', 'error');
      return;
    }
    // if (moment().diff(date, 'years') < 13) {
    //   ShowToast('You must be older than 13 years', 'error');
    //   return;
    // }

    try {
      setLoading(true);
      const url = baseUrl + 'signup';

      // const token = await firebase.messaging().getToken();
      // alert(token);
      const body = new FormData();
      body.append('email', email);
      body.append('password', password);
      body.append('name', name);
      body.append('dob', date);
      body.append('country_code', country_code);
      body.append('mobile', number);

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
          type: SIGNUP,
          payload: rslt.user_data,
        });
        ShowToast(rslt.message + ' Signup successfully.');
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

  const load = () => {
    if (!email) {
      ShowToast('Please enter your email', 'error');
      return;
    }
    if (!password) {
      ShowToast('Please enter password', 'error');
      return;
    }
    if (!date) {
      ShowToast('Please select your date of birth', 'error');
      return;
    }
    if (moment().diff(date, 'years') < 13) {
      ShowToast('You must be older than 13 years', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('CompleteProfile', {
        email: email,
        password: password,
        dob: date,
      });
    }, 2000);
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* <LoadingSpinner size={60} visible={loading} color={'#0091E7'} /> */}
      <Statusbar
        barStyle={'light-content'}
        backgroundColor={theme.colors.primary}
      />
      <DatePicker
        modal
        open={open}
        date={date || new Date()}
        mode={'date'}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <ScrollView>
        {/* <Image style={styles.btn} source={require('../../assets/Logo.png')} /> */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 30,
          }}>
          <TextFormated style={styles.title}>Welcome </TextFormated>
          <TextFormated style={styles.subtitle}>
            Signup to continue
          </TextFormated>
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
          <View style={{height: 15}} />
          <CustomTextInput
            onChangeText={setName}
            value={name}
            searchbar={require('../../assets/Email.png')}
            placeholder={'Name'}
          />
          <View style={{height: 15}} />

          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // borderWidth: 1,
              width: Dimensions.get('window').width - 30,
              paddingHorizontal: 15,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
            }}>
            <View
              style={{
                backgroundColor: theme.colors.inputBG,
                paddingHorizontal: 15,
                borderRadius: 10,
                marginTop: 10,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  height: 22,
                  width: 22,
                  resizeMode: 'contain',
                  // marginRight: 7,
                }}
                source={require('../../assets/DOB.png')}
              />

              {!date ? (
                <TextFormated
                  style={{
                    fontWeight: '500',
                    fontSize: 16,
                    paddingVertical: 15,
                    color: theme.colors.Gray,
                    flex: 1,
                    paddingHorizontal: 15,
                  }}>
                  Date of birth
                </TextFormated>
              ) : (
                <TextFormated
                  style={{
                    fontWeight: '500',
                    fontSize: 16,
                    paddingVertical: 15,
                    color: theme.colors.Black,
                    flex: 1,
                    paddingHorizontal: 15,
                  }}>
                  {moment(date).format('ll')}
                </TextFormated>
              )}
            </View>
          </TouchableOpacity>

          <View style={{height: 15}} />
          <CustomTextInput
            onChangeText={setCountry_code}
            value={country_code}
            searchbar={require('../../assets/Number.png')}
            placeholder={'Country Code'}
          />
          <View style={{height: 15}} />
          <CustomTextInput
            onChangeText={setNumber}
            value={number}
            searchbar={require('../../assets/Number.png')}
            placeholder={'Mobile Number'}
          />
        </View>
        <View style={{marginHorizontal: 20}}>
          <Button
            onPress={() => SignUp()}
            ButtonText={'SIGN UP'}
            paddingVertical={15}
            borderRadius={10}
            marginTop={50}
          />
        </View>
        {/* <View
          style={{
            marginTop: 30,
            alignItems: 'center',
            marginHorizontal: 30,
          }}>
          <TextFormated
            style={{color: theme.colors.Black, alignSelf: 'center'}}>
            or continue with
          </TextFormated>
        </View> */}
        {/* <View
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
            <Image
              style={styles.socialbutton}
              source={require('../../assets/Facebook_Button.png')}
            />
          </TouchableOpacity>
        </View> */}
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
            have an account yet?{' '}
          </TextFormated>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <TextFormated
              style={{
                color: theme.colors.yellow,
                fontWeight: '600',
                textDecorationLine: 'underline',
              }}>
              LOGIN
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
