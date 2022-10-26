import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
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

export default function App() {
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
