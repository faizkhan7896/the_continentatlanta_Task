import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Statusbar from '../../components/Statusbar';
import {theme} from '../../utils/theme';

export default function Splash({navigation}) {
  setTimeout(() => {
    navigation.replace('Login');
  }, 1000);
  return (
    <View style={styles.linearGradient}>
      <Statusbar barStyle={'dark-content'} backgroundColor={'#0091E7'} />

      <View
        style={{
          width: 100,
          height: 100,
          marginTop: 50,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          backgroundColor: theme.colors.primary,
          borderWidth: 1,
          borderColor: theme.colors.Black,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          borderRadius: 10,
        }}>
        <Image
          style={{
            borderRadius: 10,
            width: 100,
            height: 100,
            resizeMode: 'contain',
          }}
          source={require('../../assets/Logo.png')}
        />
      </View>
    </View>
  );
}

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
  },
  btn: {
    height: Dimensions.get('window').width - 250,
    width: Dimensions.get('window').width - 250,
    resizeMode: 'contain',
  },
});
