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
  useWindowDimensions,
  View,
} from 'react-native';
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
          source={require('../../../assets/No_connection.png')}
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
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <Statusbar
        barStyle="dark-content"
        backgroundColor={theme.colors.primary}
      />
      <Header navigation={navigation} Headertext={'About us'} />

      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          backgroundColor: theme.colors.primary,
          paddingVertical: 13,
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            style={{
              height: 30,
              width: 30,
              resizeMode: 'contain',
              marginRight: 20,
            }}
            source={require('../../../assets/Sidebar.png')}
          />
        </TouchableOpacity>
        <TextFormatted
          style={{
            color: theme.colors.Black,
            fontSize: 18,
            fontWeight: '700',
          }}>
          About us
        </TextFormatted>

        <Image
          style={{
            height: 40,
            width: 40,
            resizeMode: 'contain',
            borderRadius: 50,
            opacity: 0,
          }}
          source={{uri: 'https://picsum.photos/500'}}
        />
      </View> */}
      {/* <Image
        style={{
          height: dimensions.height / 3,
          width: dimensions.width,
          resizeMode: 'contain',
        }}
        source={require('../../../assets/Privacy_policy.png')}
      /> */}
      {failed ? (
        <DefaultScreen />
      ) : (
        <WebView
          source={{
            uri: 'https://pickpic4u.com/web/view/about_us.php',
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
      <View style={{marginHorizontal: 20}}>
        <Button
          onPress={() => navigation.goBack()}
          ButtonText={'Go BAck'}
          // paddingVertical={10}
          borderRadius={10}
          marginBottom={25}
        />
      </View>

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
