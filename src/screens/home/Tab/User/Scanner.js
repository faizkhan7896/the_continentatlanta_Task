import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useSelector} from 'react-redux';
import Header from '../../../../components/Header';
import Statusbar from '../../../../components/Statusbar';
import TextFormatted from '../../../../components/TextFormated';
import {theme} from '../../../../utils/theme';

export default function Scanner({navigation}) {
  const [result, setResult] = useState('');
  const auth = useSelector(state => state.auth);
  const {params} = useRoute();

  // alert(JSON.stringify(params));
  console.log(params);

  const onSuccess = e => {
    // setResult(e);
    // navigation.navigate('TransferTo', result);
    console.log('Data', e);
    navigation.navigate('Payment', {
      url:
        'https://pickpic4u.com/web/view/create-checkout-session?quantity=1&user_id=' +
        auth?.id +
        '&owner_id=' +
        params?.post?.user_id +
        '&order_id=' +
        params?.id,
    });
  };

  // onSuccess = (e) => {
  //   Linking.openURL(e.data).catch((err) => console.error('An error occured', err));
  // };
  // alert(JSON.stringify(params.id));
  console.log(result);
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.Black}}>
      <Statusbar
        backgroundColor={theme.colors.Black}
        barStyle={'dark-content'}
      />
      <Header
        navigation={navigation}
        color={theme.colors.primary}
        Headertext={'Scan QR Code'}
      />

      <ScrollView contentContainerStyle={{justifyContent: 'center', flex: 1}}>
        <QRCodeScanner
          reactivateTimeout={1000}
          onRead={onSuccess}
          reactivate={true}
          showMarker={true}
          // flashMode={RNCamera.Constants.FlashMode.torch}
          customMarker={
            <View>
              <Image
                style={{
                  height: Dimensions.get('window').width / 1.1,
                  width: Dimensions.get('window').width,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
                source={{
                  uri: 'https://thumbs.gfycat.com/SimplisticThirstyAntelopegroundsquirrel-max-1mb.gif',
                }}
              />
            </View>
          }
          cameraContainerStyle={{height: Dimensions.get('window').width / 1.1}}
          topContent={
            <View style={{position: 'absolute', top: 1}}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: Dimensions.get('window').width - 40,
                  // borderWidth: 1,
                  //
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    textAlign: 'center',
                    color: theme.colors.primary,
                  }}>
                  Place the QR code inside the are
                </Text>
                <Text
                  style={{
                    fontWeight: '500',
                    marginTop: 5,
                    textAlign: 'center',
                    color: theme.colors.primary,
                  }}>
                  Scanning will start automatically
                </Text>
              </View>
            </View>
          }
          bottomContent={<View />}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

// import {View, Text} from 'react-native';
// import React from 'react';

// export default function Scanner() {
//   return (
//     <View>
//       <Text>Scanner</Text>
//     </View>
//   );
// }
