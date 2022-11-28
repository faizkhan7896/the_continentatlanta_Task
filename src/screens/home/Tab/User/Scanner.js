import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useSelector} from 'react-redux';
import Header from '../../../../components/Header';
import Statusbar from '../../../../components/Statusbar';
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
    <View style={{flex: 1, backgroundColor: theme.colors.primary}}>
      <Statusbar backgroundColor={theme.colors.white} barStyle="dark-content" />
      <Header navigation={navigation} Headertext={'Scan QR Code'} />

      <View style={{flex: 1}}>
        <QRCodeScanner
          reactivateTimeout={1000}
          onRead={onSuccess}
          reactivate={true}
          showMarker={true}
          // flashMode={RNCamera.Constants.FlashMode.torch}

          topContent={
            <View style={{position: 'absolute', top: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: Dimensions.get('window').width - 40,
                  // borderWidth: 1,
                  //
                }}>
                <Image
                  source={require('../../../../assets/qr.png')}
                  style={{height: 30, width: 30, resizeMode: 'contain'}}
                />
              </View>
              <Image
                // source={require('../../assets/icons/QR_Scan.png')}
                style={{
                  height: 60,
                  width: 60,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />
            </View>
          }
          bottomContent={<View />}
        />
      </View>
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
