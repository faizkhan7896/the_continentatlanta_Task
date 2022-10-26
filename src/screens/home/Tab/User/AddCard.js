// import {View, Text, useWindowDimensions} from 'react-native';
// import React from 'react';
// import {theme} from '../../../../utils/theme';
// import Statusbar from '../../../../components/Statusbar';
// import Header from '../../../../components/Header';
// import {useNavigation} from '@react-navigation/native';

// export default function AddCard() {
//   const navigation = useNavigation();
//   const dimensions = useWindowDimensions();
//   return (
// <View style={{flex: 1, backgroundColor: theme.colors.primary}}>
//   <Statusbar
//     barStyle="dark-content"
//     backgroundColor={theme.colors.primaryg}
//   />
//   <Header navigation={navigation} Headertext={'Add Card'} />
// </View>
//   );
// }

import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import MaskInput from 'react-native-mask-input';
import {useSelector} from 'react-redux';
import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import Statusbar from '../../../../components/Statusbar';
import TextFormatted from '../../../../components/TextFormated';
// import {PAID} from '../../../../redux/actionTypes';
// import store from '../../../../redux/store';
import {baseUrl} from '../../../../utils/constance';
import {theme} from '../../../../utils/theme';
import {ShowToast} from '../../../../utils/ToastFunction';
// import {ShowToast} from '../../../../utils/utilFuncs';
// import TextFormatted from '../../Components/TextFormated';
// import {baseUrl} from '../../Utils/constance';
// import {theme} from '../../Utils/theme';
// import {ShowToast} from '../../Utils/utilFuncs';
// import {textStyles} from '../../utils/styles';

export default function AddCard() {
  const navigation = useNavigation();
  const dimensions = useWindowDimensions();
  const [card_number, setCard_number] = useState('4242424242424242');
  const [expiry, setExpiry] = useState('12/25');
  const [cvv, setCvv] = useState('888');
  const [loading, setLoading] = useState(false);
  const auth = useSelector(state => state.auth);
  const {params} = useRoute();
  // alert(JSON.stringify(card_number.length));

  async function get_token() {
    try {
      setLoading(true);
      const url = baseUrl + 'get_token';
      const body = new FormData();

      body.append('card_number', card_number);
      body.append('expiry_month', expiry.split('/')[0]);
      body.append('expiry_year', expiry.split('/')[1]);
      body.append('cvc_code', cvv);
      console.log(body);
      // return;
      const res = await fetch(url, {
        method: 'POST',
        body: body,
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      console.log(res);
      const rslt = await res.json();
      console.log(rslt);

      if (rslt.status == '1') {
        return rslt.result;
      } else {
        ShowToast(rslt.result || rslt.message || 'Unknown error', 'error');
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      // alert('An error occured.');
      ShowToast('An error occured.', 'error');

      console.log(e);
    }
  }
  async function Payment_access(token) {
    setLoading(true);
    const url = baseUrl + 'stripe_payment';

    const body = new FormData();
    body.append('payment_method', 'card');
    body.append('user_id', auth.id);
    body.append('currency', 'usd');
    body.append('amount', params.amount);
    body.append('token', token);
    body.append('description', 'description');
    console.log(body);
    // alert();
    // return;

    const res = await fetch(url, {
      method: 'POST',
      body: body,
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    console.log(res);
    const rslt = await res.json();
    console.log(rslt);

    if (rslt.status == '1') {
      return rslt.result;
    } else {
      ShowToast(rslt.result || rslt.message || 'Unknown error', 'error');
    }
    setLoading(false);
  }

  const payment = async item => {
    if (!card_number) {
      ShowToast('Please enter the card number', 'error');
      return;
    }
    if (card_number.length < 16) {
      ShowToast('Card number must be a 16 digit', 'error');
      return;
    }
    if (!expiry) {
      ShowToast('Please enter your card expiry date', 'error');
      return;
    }
    if (!cvv) {
      ShowToast('Please enter your card cvv', 'error');
      return;
    }
    if (cvv.length < 3) {
      ShowToast('Card cvv must be a 3 digit', 'error');
      return;
    }
    try {
      setLoading(true);
      const token = await get_token();
      if (!token) {
        ShowToast('invalid card details', 'error');
        setLoading(false);
        return;
      }
      // alert(JSON.stringify("bef∂ore data"));
      const data = await Payment_access(token);
      // alert(JSON.stringify("data"));
      console.log(data);
      setLoading(false);
      if (data != undefined) {
        // Linking.openURL(data.receipt_url);
        ShowToast('Payment successfully.');
        store.dispatch({
          type: PAID,
          payload: {paid: true, data: data},
        });
        navigation.replace('BottomTabs');
      } else {
        ShowToast('Something went wrong.', 'error');
      }
      // navigation.navigate("Successeful", data);
    } catch (error) {
      setLoading(false);
      console.log(error);
      ShowToast(error.message.toString(), 'error');
      // params.button(3);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.primary}}>
      <Statusbar
        barStyle="dark-content"
        backgroundColor={theme.colors.primaryg}
      />
      <Header navigation={navigation} Headertext={'Add Card'} />
      <LoadingSpinner
        size={60}
        visible={loading}
        color={theme.colors.primary}
      />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'space-between',
          paddingBottom: 40,
        }}>
        <View>
          <View style={{height: 8}} />
          <View
            style={{
              backgroundColor: theme.colors.primary,
              paddingHorizontal: 10,
              paddingTop: 6,
              marginHorizontal: 20,
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
              backgroundColor: theme.colors.primary,
              marginTop: 15,
            }}>
            <TextFormatted style={{marginBottom: 7, textAlign: 'left'}}>
              Card number
            </TextFormatted>

            <MaskInput
              style={{
                padding: 0,
                paddingBottom: 5,
                fontSize: 16,
                fontWeight: '500',
              }}
              value={card_number}
              onChangeText={(masked, unmasked) => {
                setCard_number(unmasked);
              }}
              // editable={false}
              mask={[
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                ' ',
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                ' ',
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                ' ',
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                ' ',
              ]}
            />
          </View>

          <View style={{height: 8}} />

          <View
            style={{
              backgroundColor: theme.colors.primary,
              paddingHorizontal: 10,
              paddingTop: 6,
              marginHorizontal: 20,
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
              backgroundColor: theme.colors.primary,
              marginTop: 15,
            }}>
            <TextFormatted style={{marginBottom: 7, textAlign: 'left'}}>
              Expiry date
            </TextFormatted>
            <MaskInput
              style={{
                padding: 0,
                paddingBottom: 5,
                fontSize: 16,
                fontWeight: '500',
              }}
              value={expiry}
              onChangeText={(masked, unmasked) => {
                setExpiry(masked);
              }}
              mask={[/\d/, /\d/, '/', /\d/, /\d/]}
            />
          </View>

          <View style={{height: 8}} />

          <View
            style={{
              backgroundColor: theme.colors.primary,
              paddingHorizontal: 10,
              paddingTop: 6,
              marginHorizontal: 20,
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
              backgroundColor: theme.colors.primary,
              marginTop: 15,
            }}>
            <TextFormatted style={{marginBottom: 7, textAlign: 'left'}}>
              cvv
            </TextFormatted>
            <MaskInput
              style={{
                padding: 0,
                paddingBottom: 5,
                fontSize: 16,
                fontWeight: '500',
              }}
              value={cvv}
              onChangeText={(masked, unmasked) => {
                setCvv(masked);
              }}
              mask={[/\d/, /\d/, /\d/]}
            />
          </View>
          <View style={{height: 8}} />
          <View
            style={{
              backgroundColor: theme.colors.primary,
              paddingHorizontal: 24,
              paddingVertical: 12,
            }}>
            <TextFormatted style={{textAlign: 'left'}}>Result</TextFormatted>
            <View style={{height: 12}} />
            {!!card_number && !!expiry && !!cvv && (
              <View style={{alignItems: 'center'}}>
                <ImageBackground
                  style={{
                    width: Dimensions.get('window').width / 1.1,
                    height: Dimensions.get('window').height / 4,
                    resizeMode: 'contain',
                    borderRadius: 20,
                    overflow: 'hidden',
                  }}
                  // source={data.item.image}
                  source={require('../../../../assets/debit.png')}>
                  <MaskInput
                    value={card_number}
                    onChangeText={(masked, unmasked) => {
                      setCard_number(unmasked);
                    }}
                    editable={false}
                    style={{
                      fontSize: 22,
                      paddingHorizontal: 15,
                      color: theme.colors.primary,
                      fontWeight: '600',
                      // borderWidth: 1,
                      paddingTop: 12,
                      padding: 0,
                    }}
                    mask={[
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      ' ',
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      ' ',
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      ' ',
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      ' ',
                    ]}
                  />
                  <MaskInput
                    editable={false}
                    style={{
                      fontSize: 16,
                      paddingHorizontal: 15,
                      color: theme.colors.primary,
                      fontWeight: '600',
                      // borderWidth: 1,
                      padding: 0,
                      marginVertical: 5,
                    }}
                    value={expiry}
                    onChangeText={(masked, unmasked) => {
                      setExpiry(masked);
                    }}
                    mask={[/\d/, /\d/, '/', /\d/, /\d/]}
                  />
                  <MaskInput
                    editable={false}
                    style={{
                      fontSize: 16,
                      paddingHorizontal: 15,
                      color: theme.colors.primary,
                      fontWeight: '600',
                      // borderWidth: 1,
                      padding: 0,
                    }}
                    value={cvv}
                    onChangeText={(masked, unmasked) => {
                      setCvv(masked);
                    }}
                    mask={[/\d/, /\d/, /\d/]}
                  />
                </ImageBackground>
              </View>
            )}
          </View>
        </View>
        <View>
          <View style={{height: 24}} />
          <View style={{marginHorizontal: 20}}>
            <Button
              onPress={() => {
                navigation.goBack();
                ShowToast('Card has been added successfully');
              }}
              borderRadius={30}
              ButtonText={'ADD'}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
