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
      <Statusbar barStyle={'light-content'} backgroundColor={'#0091E7'} />

      <Image style={styles.btn} source={require('../../assets/Logo.png')} />
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
