import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {theme} from '../../../../utils/theme';
import Statusbar from '../../../../components/Statusbar';
import Header from '../../../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {data} from '../../../../utils/data';
import TextFormatted from '../../../../components/TextFormated';
import Button from '../../../../components/Button';
import {ShowToast} from '../../../../utils/ToastFunction';

export default function Cart() {
  const navigation = useNavigation();
  const dimensions = useWindowDimensions();
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.primary}}>
      <Statusbar
        barStyle="dark-content"
        backgroundColor={theme.colors.primaryg}
      />
      <Header navigation={navigation} Headertext={'Cart'} />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{justifyContent: 'space-between', flex: 1}}>
        <View>
          <FlatList
            data={data.slice(0, 2)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{}}
            // style={{flex: 1}}
            scrollEnabled={false}
            renderItem={({item, index}) => (
              <TouchableOpacity
                // onPress={() =>
                //   navigation.navigate('OrderDetails', {
                //     item,
                //   })
                // }
                style={{
                  borderRadius: 12,
                  backgroundColor: theme.colors.primary,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,

                  elevation: 2,
                  marginHorizontal: 13,
                  marginVertical: 15,
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                }}>
                <View
                  style={{
                    backgroundColor: 'transparent',
                    width: dimensions.width / 4,
                    height: dimensions.width / 5,
                    borderRadius: 12,
                    overflow: 'hidden',
                    justifyContent: 'center',
                  }}>
                  <ImageBackground
                    source={{
                      uri:
                        item.image !=
                        'https://www.dayscab.com/tequ/uploads/event/'
                          ? item.image
                          : 'https://picsum.photos/500',
                    }}
                    style={{
                      width: dimensions.width / 4,
                      height: dimensions.width / 5,
                    }}
                    imageStyle={{
                      resizeMode: 'cover',
                      borderRadius: 12,
                    }}></ImageBackground>
                </View>
                <View
                  style={{
                    width: dimensions.width / 1.6,
                    paddingHorizontal: 15,
                    paddingTop: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <TextFormatted
                      style={{fontWeight: '700', color: theme.colors.Black}}>
                      Henely Shirts
                    </TextFormatted>
                    <TextFormatted
                      style={{fontSize: 9, color: theme.colors.Gray}}>
                      7-30-2022 08:00AM
                    </TextFormatted>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 15,
                    }}>
                    <TextFormatted
                      style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: theme.colors.Black,
                      }}>
                      $ 250
                    </TextFormatted>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        backgroundColor: theme.colors.red,
                        borderRadius: 6,
                      }}>
                      <TextFormatted
                        style={{
                          fontWeight: '600',
                          color: theme.colors.primary,
                        }}>
                        CANCEL
                      </TextFormatted>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
          {/* DELIVERY ADDRESS */}
          <View style={{}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Address')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 20,
                marginVertical: 10,
              }}>
              <TextFormatted
                style={{
                  color: theme.colors.Black,
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                Delivery Address
              </TextFormatted>
              <Image
                style={{height: 18, width: 18, resizeMode: 'contain'}}
                source={require('../../../../assets/Next.png')}
              />
            </TouchableOpacity>
            <View
              // onPress={() =>
              //   navigation.navigate('OrderDetails', {
              //     item,
              //   })
              // }
              style={{
                borderRadius: 12,
                backgroundColor: theme.colors.primary,
                marginHorizontal: 13,
                flexDirection: 'row',
                paddingHorizontal: 10,
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../../assets/map.png')}
                style={{
                  width: dimensions.width / 8,
                  height: dimensions.width / 8,
                  resizeMode: 'cover',
                  borderRadius: 12,
                  marginRight: 15,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: dimensions.width - 110,
                }}>
                <View style={{alignItems: 'flex-start'}}>
                  <TextFormatted
                    style={{fontWeight: '500', color: theme.colors.Black}}>
                    Chhatak, Sunamgonj 12/8AB
                  </TextFormatted>
                  <TextFormatted
                    style={{
                      fontSize: 10,
                      color: theme.colors.Gray,
                      marginTop: 7,
                    }}>
                    Sylhet
                  </TextFormatted>
                </View>
                <Image
                  source={require('../../../../assets/Check.png')}
                  style={{
                    width: 24,
                    height: 24,
                    resizeMode: 'cover',
                    borderRadius: 12,
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{height: 15}} />
          {/* PAYMENT METHOD */}
          <View style={{}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Card')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 20,
                marginVertical: 10,
              }}>
              <TextFormatted
                style={{
                  color: theme.colors.Black,
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                Payment Method
              </TextFormatted>
              <Image
                style={{height: 18, width: 18, resizeMode: 'contain'}}
                source={require('../../../../assets/Next.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate('OrderDetails', {
              //     item,
              //   })
              // }
              style={{
                borderRadius: 12,
                backgroundColor: theme.colors.primary,
                marginHorizontal: 13,
                flexDirection: 'row',
                paddingHorizontal: 10,
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../../assets/visa.png')}
                style={{
                  width: dimensions.width / 8,
                  height: dimensions.width / 8,
                  resizeMode: 'cover',
                  borderRadius: 12,
                  marginRight: 15,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: dimensions.width - 110,
                }}>
                <View style={{alignItems: 'flex-start'}}>
                  <TextFormatted
                    style={{fontWeight: '500', color: theme.colors.Black}}>
                    Visa Classic
                  </TextFormatted>
                  <TextFormatted
                    style={{
                      fontSize: 10,
                      color: theme.colors.Gray,
                      marginTop: 7,
                    }}>
                    **** **** **** 7690
                  </TextFormatted>
                </View>
                <Image
                  source={require('../../../../assets/Check.png')}
                  style={{
                    width: 24,
                    height: 24,
                    resizeMode: 'cover',
                    borderRadius: 12,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{height: 15}} />
          {/* ORDER INFO */}
          <View style={{}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 20,
                marginVertical: 10,
              }}>
              <TextFormatted
                style={{
                  color: theme.colors.Black,
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                Order Info
              </TextFormatted>
              <Image
                style={{
                  height: 18,
                  width: 18,
                  resizeMode: 'contain',
                  opacity: 0,
                }}
                source={require('../../../../assets/Next.png')}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 20,
              }}>
              <TextFormatted
                style={{
                  color: theme.colors.Gray,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                Subtotal
              </TextFormatted>
              <TextFormatted
                style={{
                  color: theme.colors.Black,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                $500
              </TextFormatted>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 20,
                marginVertical: 10,
              }}>
              <TextFormatted
                style={{
                  color: theme.colors.Gray,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                Shipping cost
              </TextFormatted>
              <TextFormatted
                style={{
                  color: theme.colors.Black,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                $50
              </TextFormatted>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 20,
              }}>
              <TextFormatted
                style={{
                  color: theme.colors.Gray,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                Total
              </TextFormatted>
              <TextFormatted
                style={{
                  color: theme.colors.Black,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                $550
              </TextFormatted>
            </View>
          </View>
        </View>
        <View style={{marginTop: 50}}>
          <Button
            // marginBottom={20}
            ButtonText={'CHECKOUT'}
            onPress={() => {
              navigation.navigate('OrderConfirm');
              ShowToast('Your order placed successfully');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
