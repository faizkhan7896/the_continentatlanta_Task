import {useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
// import {StatusBar} from 'expo-status-bar';
import {
  BackHandler,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import WebView from 'react-native-webview';
import {useSelector} from 'react-redux';
import Statusbar from '../../../../components/Statusbar';
import TextFormatted from '../../../../components/TextFormated';
import {theme} from '../../../../utils/theme';
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
  const auth = useSelector(state => state.auth);

  const [response, setResponsee] = useState('');

  // alert(JSON.stringify(params.url));
  console.log(response?.title);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (!splash_loading) {
  //       setsplash_loading(true);
  //     }
  //   }, 12000);
  //   backhandler = BackHandler.addEventListener('hardwareBackPress', () => {
  //     console.log('this.wvRef', wvRef.current);
  //     if (navState.canGoBack && wvRef.current) {
  //       // console.log(wvRef)
  //       wvRef.current.goBack();
  //       return true;
  //     }

  //     // alert
  //     return false;
  //   });
  // }, []);

  // useEffect(() => {
  //   backhandler.remove();
  // }, []);

  const onNavigationStateChange = navState => {
    console.log(navState);
    // setResponsee(navState);
    setTimeout(() => {
      if (
        navState?.title ==
        'https://pickpic4u.com/web/view/create-account?user_id=' +
          auth?.id +
          '&api_key=hdbjdbgjfdgbjbfddjkdbvkdsfbfjbnksdhisnksjvbjdsbvjvbk'
      ) {
        navigation.goBack();
      }
    }, 4000);
    // setTimeout(() => {
    //   if (navState?.title == 'https://pickpic4u.com/web/view/payment-cancel') {
    //     navigation.goBack();
    //   }
    // }, 4000);
  };

  function DefaultScreen() {
    return (
      <View
        style={{
          // alignItems: 'center',
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
        }}>
        <Statusbar backgroundColor={'#fff'} barStyle="dark-content" />
        <Image
          source={require('../../../../assets/No_connection.png')}
          style={{
            height: 250,
            width: 250,
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
          Oops, No Internet Connection
        </Text>
        <Text
          style={{
            fontSize: 13,
            // fontWeight: '700',
            color: 'gray',
            textAlign: 'center',
            marginHorizontal: 60,
          }}>
          Make sure wifi or cellular data is turned on and then try again.
        </Text>

        <TouchableOpacity
          onPress={() => {
            //  this.setState({ failed: false, splash_loading: true });
            setfailed(false);
            setsplash_loading(true);
          }}
          style={{
            marginTop: 70,
            borderRadius: 50,
            marginHorizontal: 20,
            // paddingVertical: 20,
            backgroundColor: '#d71921',
          }}>
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
            TRY AGAIN
          </TextFormatted>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.primary}}>
      <Statusbar barStyle="dark-content" backgroundColor={'#fff'} />
      {failed ? (
        <DefaultScreen />
      ) : (
        <WebView
          source={{
            uri:
              'https://pickpic4u.com/web/view/activate-account?user_id=' +
              auth?.id +
              '&api_key=hdbjdbgjfdgbjbfddjkdbvkdsfbfjbnksdhisnksjvbjdsbvjvbk',
          }}
          onNavigationStateChange={onNavigationStateChange}
          javaScriptEnabled
          setSupportMultipleWindows={false}
          ref={ref => {
            wvRef.current = ref;
          }}
          onLoadStart={() => setvisible(true)}
          onLoadEnd={() => {
            // alert();
            // this.setState({visible: false, splash_loading: true});
            setvisible(false);
            setsplash_loading(true);
          }}
          style={{flex: 1}}
          allowsFullscreenVideo
          pullToRefreshEnabled
          onError={e => {
            // alert('An error occured while loading.');
            console.warn(e.nativeEvent);
            // this.setState({failed: true});
            setfailed(true);
          }}
          geolocationEnabled={true}
          scalesPageToFit={false}
          injectedJavaScriptBeforeContentLoaded={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);`}
          injectedJavaScript={`
          document.getElementsByClassName("elementor-search-form__container")[0].style="padding:10px 10px";

`}
        />
      )}

      {visible && (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: theme.colors.primary,
            height: '100%',
            width: '100%',
          }}>
          <ActivityIndicator color={theme.colors.yellow} size="large" />
        </View>
      )}
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

// import React, {useState, useRef, useEffect} from 'react';
// import {
//   ActivityIndicator,
//   Linking,
//   SafeAreaView,
//   StyleSheet,
//   BackHandler,
// } from 'react-native';
// import {WebView} from 'react-native-webview';

// export default function App() {
//   const webViewRef = useRef();
//   const [isLoadong, setLoading] = useState(false);

//   const handleBackButtonPress = () => {
//     try {
//       webViewRef.current?.goBack();
//     } catch (err) {
//       console.log('[handleBackButtonPress] Error : ', err.message);
//     }
//   };

//   useEffect(() => {
//     BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);
//     return () => {
//       BackHandler.removeEventListener(
//         'hardwareBackPress',
//         handleBackButtonPress,
//       );
//     };
//   }, []);

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <WebView
//         originWhiteList={['*']}
//         source={{
//           uri: 'https://pickpic4u.com/web/view/create-checkout-session?user_id=41&owner_id=41&order_id=3&quantity=1',
//         }}
//         style={styles.container}
//         ref={webViewRef}
//         onLoadStart={syntheticEvent => {
//           setLoading(true);
//         }}
//         onShouldStartLoadWithRequest={event => {
//           if (event.navigationType === 'click') {
//             if (!event.url.match(/(google\.com\/*)/)) {
//               Linking.openURL(event.url);
//               return false;
//             }
//             return true;
//           } else {
//             return true;
//           }
//         }}
//         onLoadEnd={syntheticEvent => {
//           setLoading(false);
//         }}
//       />
//       {isLoadong && (
//         <ActivityIndicator
//           color="#234356"
//           size="large"
//           style={styles.loading}
//         />
//       )}
//     </SafeAreaView>
//   );
// }
// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#234356',
//   },
//   loading: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
