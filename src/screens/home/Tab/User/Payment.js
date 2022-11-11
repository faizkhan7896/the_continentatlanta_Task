import React from 'react';
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
import Statusbar from '../../../../components/Statusbar';
import TextFormatted from '../../../../components/TextFormated';
import {theme} from '../../../../utils/theme';
// import Statusbar from '../Components/Statusbar';
// import TextFormatted from '../Components/TextFormated';
// import * as Permission from 'expo-permissions'

export default class App extends React.Component {
  state = {
    navState: {},
    visible: true,
    splash_loading: false,
    failed: false,
  };

  componentDidMount() {
    setTimeout(() => {
      if (!this.state.splash_loading) {
        this.setState({splash_loading: true});
      }
    }, 12000);
    this.backhandler = BackHandler.addEventListener('hardwareBackPress', () => {
      console.log('this.wvRef', this.wvRef);
      if (this.state.navState.canGoBack && this.wvRef) {
        // console.log(this.wvRef)
        this.wvRef.goBack();
        return true;
      }
      // this.alert()

      return false;
    });
  }

  onNavigationStateChange = navState => {
    this.setState({
      navState,
      // visible: navState.url != 'https://nutrainixorganic.com/',
    });
  };

  componentWillUnmount() {
    this.backhandler.remove();
  }

  render() {
    if (this.state.failed) {
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

          {/* <TouchableOpacity
          // onPress={() => this.setState({failed: false, splash_loading: true})}
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
        </TouchableOpacity> */}
        </View>
      );
    }
    return (
      <>
        <Statusbar
          barStyle={'dark-content'}
          backgroundColor={this.state.visible == true ? '#0005' : '#fff'}
        />
        <WebView
          source={{
            uri: 'https://stripe.com/en-in',
          }}
          onNavigationStateChange={this.onNavigationStateChange}
          javaScriptEnabled
          ref={ref => {
            this.wvRef = ref;
          }}
          onLoadStart={() => this.setState({visible: true})}
          onLoadEnd={() => {
            // alert();
            this.setState({visible: false, splash_loading: true});
          }}
          style={{flex: 1}}
          allowsFullscreenVideo
          pullToRefreshEnabled
          onError={e => {
            // alert('An error occured while loading.');
            console.warn(e.nativeEvent);
            this.setState({failed: true});
          }}
          geolocationEnabled={true}
          scalesPageToFit={false}
          injectedJavaScriptBeforeContentLoaded={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);`}
          injectedJavaScript={`
          document.getElementsByClassName("elementor-search-form__container")[0].style="padding:10px 10px";
          
`}
        />

        {this.state.visible && (
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
        {/* {this.state.visible && !this.state.splash_loading && (
          <ImageBackground
            source={require('../assets/Splash.jpeg')}
            style={styles.container1}
            imageStyle={{flex: 1, resizeMode: 'cover'}}>
            <Statusbar hidden={true} />
          </ImageBackground>
        )} */}
      </>
    );
  }
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
