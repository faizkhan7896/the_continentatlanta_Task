import {useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
// import {StatusBar} from 'expo-status-bar';
import {
  BackHandler,
  Dimensions,
  Image,
  Linking,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ActivityIndicator} from 'react-native-paper';
import WebView from 'react-native-webview';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import Statusbar from '../../../components/Statusbar';
import TextFormatted from '../../../components/TextFormated';
import {theme} from '../../../utils/theme';
// import Statusbar from '../Components/Statusbar';
// import TextFormatted from '../Components/TextFormated';
// import * as Permission from 'expo-permissions'

export default function Payments({navigation}) {
  const [splash_loading, setsplash_loading] = useState(false);
  const [failed, setfailed] = useState(false);
  const [visible, setvisible] = useState(true);
  const [navState, setnavState] = useState({});
  const wvRef = useRef();
  const {params} = useRoute();
  const dimensions = useWindowDimensions();

  const [response, setResponsee] = useState('');

  // alert(JSON.stringify(params.url));
  // console.log(params.url);

  useEffect(() => {
    setTimeout(() => {
      if (!splash_loading) {
        setsplash_loading(true);
      }
    }, 12000);
    backhandler = BackHandler.addEventListener('hardwareBackPress', () => {
      console.log('this.wvRef', wvRef.current);
      if (navState.canGoBack && wvRef.current) {
        // console.log(wvRef)
        wvRef.current.goBack();
        return true;
      }

      // alert
      return false;
    });
  }, []);

  useEffect(() => {
    backhandler.remove();
  }, []);

  const onNavigationStateChange = navState => {
    console.log(navState);
    // setResponsee(navState);
  };

  const onPressMobileNumberClick = number => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }

    Linking.openURL(phoneNumber);
  };

  return (
    <View
      style={{
        // alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff',
        // justifyContent: 'center',
      }}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle="dark-content"
        translucent
      />
      <Image
        source={require('../../../assets/support.png')}
        style={{
          height: dimensions.width,
          width: dimensions.width,
          resizeMode: 'contain',
          alignSelf: 'center',
        }}
      />
      <Text
        style={{
          fontSize: 24,
          fontWeight: '700',
          color: theme.colors.Black,
          marginVertical: 15,
          // alignSelf: 'center',
          // marginHorizontal: 40,
          textAlign: 'center',
        }}>
        How can we help you?
      </Text>
      <Text
        style={{
          fontWeight: '500',
          color: theme.colors.Black,
          textAlign: 'center',
          marginHorizontal: 40,
        }}>
        it looks like you are experiencing a problems with our app. we are here
        to help so please get in touch with us{' '}
      </Text>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('mailto:taptack8@gmail.com');
          }}
          style={{
            borderRadius: 20,
            marginHorizontal: 20,
            height: dimensions.width / 3,
            // backgroundColor: theme.colors.yellow,
            flex: 1,
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}>
          <LinearGradient
            colors={[
              theme.colors.Linear_first,
              theme.colors.Linear_second,
              theme.colors.Linear_third,
            ]}
            start={{x: 0.3, y: 0}}
            end={{x: 0.5, y: 5}}
            style={{
              paddingVertical: 15,
              alignItems: 'center',
              borderRadius: 12,
              height: dimensions.width / 2.5,
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../../assets/Email.png')}
              style={{
                height: dimensions.width / 9,
                width: dimensions.width / 9,
                resizeMode: 'contain',
                tintColor: theme.colors.primary,
                alignSelf: 'center',
              }}
            />
            <TextFormatted
              style={{
                textAlign: 'center',
                margin: 5,
                color: '#ffffff',
                backgroundColor: 'transparent',
                fontWeight: '700',
                paddingVertical: 12,
              }}>
              taptack8@gmail.com
            </TextFormatted>
          </LinearGradient>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => {
            onPressMobileNumberClick('+81 80 6634 5512');
          }}
          style={{
            borderRadius: 20,
            marginHorizontal: 20,
            height: dimensions.width / 2.5,
            backgroundColor: '#d71921',
            flex: 1,
            justifyContent: 'center',
          }}>
          <LinearGradient
            colors={[
              theme.colors.Linear_first,
              theme.colors.Linear_second,
              theme.colors.Linear_third,
            ]}
            start={{x: 0.3, y: 0}}
            end={{x: 0.5, y: 5}}
            style={{
              paddingVertical: 15,
              alignItems: 'center',
              borderRadius: 12,
              height: dimensions.width / 2.5,
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../../assets/Number.png')}
              style={{
                height: dimensions.width / 9,
                width: dimensions.width / 9,
                resizeMode: 'contain',
                alignSelf: 'center',
                tintColor: theme.colors.primary,
              }}
            />
            <TextFormatted
              style={{
                fontSize: 16,
                textAlign: 'center',
                margin: 5,
                color: '#ffffff',
                backgroundColor: 'transparent',
                fontWeight: '700',
                paddingVertical: 12,
              }}>
              +81 80 6634 5512
            </TextFormatted>
          </LinearGradient>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'contain',
    width: Dimensions.get('window').width / 1.2,
    height: Dimensions.get('window').width / 1.2,
    // borderWidth: 1,
  },
  container1: {
    // flex: 1,
    // backgroundColor: '#fff',
    // borderBottomRightRadius: 30,
    // alignItems: 'center',
    // justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
});
