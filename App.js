import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import TextFormatted from './src/components/TextFormated';
import AuthNavigation from './src/navigation/AppNavigator';
import store, {persistor} from './src/redux/store';
import {theme} from './src/utils/theme';
import OneSignal from 'react-native-onesignal';

export default function App() {
  useEffect(() => {
    //OneSignal Init Code

    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId('6948b1a9-ba95-4262-9e02-ba9460100332');
    //END OneSignal Init Code
    OneSignal.setExternalUserId('1');

    // OneSignal.getDeviceState().then(v => {
    //   alert(v.pushToken);
    //   console.log(v.pushToken);
    // });
    // OneSignal.setExternalUserId('1');
    //Prompt for push on iOS
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
      console.log('Prompt response:', response);
    });
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <View style={{flex: 1}}>
          {Platform.OS == 'android' ? (
            <AuthNavigation />
          ) : (
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
              <AuthNavigation />
            </KeyboardAvoidingView>
          )}
        </View>
        <Toast
          visibilityTime={1500}
          autoHide={true}
          config={{
            success: props => (
              <View
                style={[
                  styles.toastContainer,
                  {backgroundColor: theme.colors.yellow},
                ]}>
                <TextFormatted style={styles.toastText}>
                  {props.text1}
                </TextFormatted>
              </View>
            ),
            error: props => (
              <View
                style={[styles.toastContainer, {backgroundColor: '#F36566'}]}>
                <TextFormatted style={styles.toastText}>
                  {props.text1}
                </TextFormatted>
              </View>
            ),
          }}
        />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    width: Dimensions.get('window').width - 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  toastText: {color: 'white', fontWeight: '500', textAlign: 'left'},
});
