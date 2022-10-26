import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import Statusbar from '../../components/Statusbar';
import TextFormatted from '../../components/TextFormated';
import {theme} from '../../utils/theme';

import store from '../../redux/store';
import Header from '../../components/Header';
import {ShowToast} from '../../utils/ToastFunction';
// import {SIGNUP, LOGIN} from '../../redux/Actiontypes';
export default class OTPVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pin1: '',
      pin2: '',
      pin3: '',
      pin4: '',
      spinnerVisible: false,
    };
  }

  componentDidMount = () => {
    this.refs.pin1ref.focus();
    // alert(JSON.stringify(storse.getState().currentFlow));
    store.getState().currentFlow;
  };
  render() {
    // console.log(store.getState().CurrentFlow);
    const params = this.props.route.params;
    // const {params} = useRoute();
    // alert(JSON.stringify(params));
    const {pin1, pin2, pin3, pin4} = this.state;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.primary,
          // justifyContent: 'center',
        }}>
        <Statusbar
          barStyle={'light-content'}
          backgroundColor={theme.colors.primary}
        />
        <Header navigation={this.props.navigation} />

        <LoadingSpinner
          size={60}
          visible={this.state.spinnerVisible}
          color={theme.colors.accent}
        />

        <Statusbar
          backgroundColor={theme.colors.primary}
          barStyle="dark-content"
        />
        {/* <Spinner
          size={70}
          visible={this.state.spinnerVisible}
          color="#CCFDF6"
        /> */}
        {/* 
        <View
          style={{
            // flex: 0.6,
            backgroundColor: theme.colors.background,
            alignItems: 'center',
            // justifyContent: 'center',
          }}> */}
        {/* <Image
          source={require('../../Assets/Componentpassword.png')}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').width - 100,
            resizeMode: 'cover',
            // backgroundColor: 'red',
          }}
        /> */}
        {/* </View> */}

        <View
          style={{
            // flex: 1.5,
            backgroundColor: theme.colors.primary,
            alignItems: 'center',
          }}>
          <View style={{marginTop: 40}}>
            <TextFormatted
              style={{
                color: theme.colors.Black,
                fontSize: 20,
                fontWeight: '700',
              }}>
              OTP Verification
            </TextFormatted>
          </View>

          <View
            style={{
              alignSelf: 'flex-start',
              marginHorizontal: 30,
              alignSelf: 'center',
            }}>
            <TextFormatted
              style={{
                color: theme.colors.text,
                fontSize: 15,
                textAlign: 'center',
                marginTop: 15,
              }}>
              Enter the verification code we just sent on your email address.
            </TextFormatted>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '70%',
              marginTop: 40,
            }}>
            <TextInput
              paddingHorizontal={15}
              autoFocus={true}
              value={pin1}
              ref={'pin1ref'}
              keyboardType="number-pad"
              onChangeText={pin1 => {
                this.setState({pin1: pin1});
                if (pin1 != '') {
                  this.refs.pin2ref.focus();
                }
              }}
              maxLength={1}
              style={Styles.input}
            />
            <TextInput
              paddingHorizontal={15}
              ref={'pin2ref'}
              value={pin2}
              keyboardType="number-pad"
              onChangeText={pin2 => {
                this.setState({pin2: pin2});
                if (pin2 != '') {
                  this.refs.pin3ref.focus();
                }
              }}
              maxLength={1}
              style={Styles.input}
            />
            <TextInput
              paddingHorizontal={15}
              ref={'pin3ref'}
              keyboardType="number-pad"
              value={pin3}
              onChangeText={pin3 => {
                this.setState({pin3: pin3});
                if (pin3 != '') {
                  this.refs.pin4ref.focus();
                }
              }}
              maxLength={1}
              style={Styles.input}
            />
            <TextInput
              paddingHorizontal={15}
              ref={'pin4ref'}
              keyboardType="number-pad"
              value={pin4}
              onChangeText={pin4 => {
                this.setState({pin4: pin4}, () => {
                  if (pin4 != '') {
                    // this.Verification();
                    // if (store.getState().currentFlow == 'USER') {
                    //   this.props.navigation.navigate('HomeNavigation');
                    // } else {
                    //   this.props.navigation.navigate('HomeNavigation', {
                    //     screen: 'OrganizerNavigation',
                    //   });
                    // }
                    // store.dispatch({
                    //   type: LOGIN,
                    //   payload: params.data,
                    // });
                  }
                });
              }}
              maxLength={1}
              style={Styles.input}
            />
          </View>
          {/* <View style={{marginTop: 50}}>
            <Button
            buttontext="Verify"
            onPress={() => this.props.navigation.navigate('otpVerify')}
            />
          </View> */}
        </View>
        <View style={{marginHorizontal: 20}}>
          <Button
            onPress={() => {
              if (!pin1) {
                ShowToast('Please enter otp.', 'error');
                return;
              }
              if (!pin2) {
                ShowToast('Please enter otp.', 'error');
                return;
              }
              if (!pin3) {
                ShowToast('Please enter otp.', 'error');
                return;
              }
              if (!pin4) {
                ShowToast('Please enter otp.', 'error');
                return;
              }
              ShowToast('OTP verify successful.');
              this.props.navigation.replace('CreateNewPassword', params);
            }}
            ButtonText={'VERIFY'}
            paddingVertical={15}
            borderRadius={30}
            marginTop={30}
          />
        </View>
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  input: {
    textAlign: 'center',
    fontSize: 25,
    textAlignVertical: 'center',
    includeFontPadding: false,
    height: 55,
    width: 55,
    padding: 0,
    borderRadius: 12,
    // borderWidth: 1,
    // borderColor: '#37393E',
    color: theme.colors.Black,
    backgroundColor: theme.colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
