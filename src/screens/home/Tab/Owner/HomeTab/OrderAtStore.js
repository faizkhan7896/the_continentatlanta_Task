import React from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import Header from '../../../../components/Header';
import SolidButton from '../../../../components/SolidButton';
import Statusbar from '../../../../components/Statusbar';
import TextFormatted from '../../../../components/TextFormated';
import {theme} from '../../../../utils/theme';

export default function AddProduct({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.primary,
      }}>
      <Statusbar
        barStyle={'light-content'}
        backgroundColor={theme.colors.Black}
      />
      <Header
        //  {/* ONLY FRONTEND ME AT STORE KO CHANGE KARKE HAND TO HAND KIYA HE BAAKI PURE APP ME AT STORE KE HI CHECKS LAGE HUE HE   */}
        Headertext="Order Hand To Hand"
        navigation={navigation}
        backgroundColor={theme.colors.Black}
        color={theme.colors.primary}
      />
      <ScrollView>
        <View
          style={{
            alignSelf: 'center',
            borderWidth: 1,
            paddingHorizontal: 40,
            borderRadius: 25,
            marginVertical: 20,
            paddingVertical: 10,
            borderColor: theme.colors.C4C4C4,
            marginHorizontal: 20,
          }}>
          <TextFormatted style={{fontSize: 18, fontWeight: '700'}}>
            Pick Code: 9999
          </TextFormatted>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            marginVertical: 20,
            paddingVertical: 10,
            borderColor: theme.colors.C4C4C4,
            backgroundColor: theme.colors.Black,
            marginHorizontal: 20,
          }}>
          <View
            style={{
              alignSelf: 'center',
              borderRadius: 25,
              marginVertical: 20,
              paddingVertical: 7,
              marginHorizontal: 20,
              position: 'absolute',
              top: -40,
              backgroundColor: theme.colors.yellow,
            }}>
            <TextFormatted style={{fontWeight: '500', paddingHorizontal: 80}}>
              Contains
            </TextFormatted>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 30,
              marginTop: 10,
            }}>
            <Image
              source={{uri: 'https://picsum.photos/500'}}
              style={{
                height: 60,
                width: 60,
                resizeMode: 'contain',
                borderRadius: 50,
                marginRight: 20,
              }}
            />
            <TextFormatted
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: theme.colors.primary,
              }}>
              04:30 PM 11/04/2022
            </TextFormatted>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 30,
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <Image
              source={require('../../../../assets/bi_camera.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Image
              source={require('../../../../assets/bi_camera.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Image
              source={require('../../../../assets/bi_camera.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Image
              source={require('../../../../assets/video.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Image
              source={require('../../../../assets/mic.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Image
              source={require('../../../../assets/plus_white.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
          </View>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            marginVertical: 20,
            paddingVertical: 10,
            borderColor: theme.colors.C4C4C4,
            backgroundColor: theme.colors.Black,
            marginHorizontal: 20,
          }}>
          <View
            style={{
              alignSelf: 'center',
              borderRadius: 25,
              marginVertical: 20,
              paddingVertical: 7,
              marginHorizontal: 20,
              position: 'absolute',
              top: -40,
              backgroundColor: theme.colors.red,
            }}>
            <TextFormatted style={{fontWeight: '500', paddingHorizontal: 80}}>
              Package Ready
            </TextFormatted>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 30,
              marginTop: 10,
            }}>
            <Image
              source={{uri: 'https://picsum.photos/500'}}
              style={{
                height: 60,
                width: 60,
                resizeMode: 'contain',
                borderRadius: 50,
                marginRight: 20,
              }}
            />
            <View style={{alignItems: 'center'}}>
              <TextFormatted
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: theme.colors.primary,
                }}>
                04:30 PM 11/04/2022
              </TextFormatted>
              <Image
                source={require('../../../../assets/gps.png')}
                style={{
                  height: 60,
                  width: 90,
                  resizeMode: 'contain',
                  marginRight: 20,
                }}
              />
            </View>
            <Image
              source={require('../../../../assets/clock.png')}
              style={{
                height: 40,
                width: 40,
                resizeMode: 'contain',
                borderRadius: 50,
                marginLeft: 20,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 30,
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <Image
              source={require('../../../../assets/bi_camera.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Image
              source={require('../../../../assets/bi_camera.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Image
              source={require('../../../../assets/bi_camera.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Image
              source={require('../../../../assets/video.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Image
              source={require('../../../../assets/mic.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Image
              source={require('../../../../assets/plus_white.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
          </View>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            marginVertical: 20,
            paddingVertical: 10,
            borderColor: theme.colors.C4C4C4,
            backgroundColor: theme.colors.Black,
            marginHorizontal: 20,
          }}>
          <View
            style={{
              alignSelf: 'center',
              borderRadius: 25,
              marginVertical: 20,
              paddingVertical: 7,
              marginHorizontal: 20,
              position: 'absolute',
              top: -40,
              backgroundColor: theme.colors.red,
            }}>
            <TextFormatted style={{fontWeight: '500', paddingHorizontal: 80}}>
              Recieved & Paid
            </TextFormatted>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 30,
              marginTop: 10,
            }}>
            <Image
              source={{uri: 'https://picsum.photos/500'}}
              style={{
                height: 60,
                width: 60,
                resizeMode: 'contain',
                borderRadius: 50,
                marginRight: 20,
              }}
            />
            <View style={{alignItems: 'center'}}>
              <TextFormatted
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: theme.colors.primary,
                }}>
                04:30 PM 11/04/2022
              </TextFormatted>
              <Image
                source={require('../../../../assets/gps.png')}
                style={{
                  height: 60,
                  width: 90,
                  resizeMode: 'contain',
                  marginRight: 20,
                }}
              />
            </View>
            <Image
              source={require('../../../../assets/clock.png')}
              style={{
                height: 40,
                width: 40,
                resizeMode: 'contain',
                borderRadius: 50,
                marginLeft: 20,
                opacity: 0,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 30,
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <Image
              source={require('../../../../assets/bi_camera.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Image
              source={require('../../../../assets/bi_camera.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Image
              source={require('../../../../assets/bi_camera.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Image
              source={require('../../../../assets/video.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Image
              source={require('../../../../assets/mic.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Image
              source={require('../../../../assets/plus_white.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
          </View>

          <View style={{alignItems: 'center', marginTop: 20}}>
            <TextFormatted
              style={{
                fontWeight: '500',
                color: theme.colors.primary,
              }}>
              Total Cost:{' '}
              <TextFormatted
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: theme.colors.primary,
                }}>
                ¥36.00
              </TextFormatted>
            </TextFormatted>
            <Image
              source={require('../../../../assets/qr.png')}
              style={{
                height: 110,
                width: 110,
                resizeMode: 'contain',
                marginTop: 10,
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.Tabbg,
              alignSelf: 'center',
              paddingHorizontal: 15,
              paddingVertical: 8,
              borderRadius: 10,
              marginTop: 10,
            }}>
            <TextFormatted style={{fontSize: 16, fontWeight: '700'}}>
              Pay By Code
            </TextFormatted>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: theme.colors.C4C4C4,
              height: 1,
              marginHorizontal: 20,
              marginTop: 20,
            }}
          />
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Image
              source={require('../../../../assets/qr.png')}
              style={{
                height: 110,
                width: 110,
                resizeMode: 'contain',
                marginTop: 10,
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.Tabbg,
              alignSelf: 'center',
              paddingHorizontal: 15,
              paddingVertical: 8,
              borderRadius: 10,
              marginTop: 10,
            }}>
            <TextFormatted style={{fontSize: 16, fontWeight: '700'}}>
              Pay By Code
            </TextFormatted>
          </TouchableOpacity>
          <View style={{height: 30}} />
          <SolidButton
            borderRadius={50}
            text={'Payment Completed'}
            backgroundColor={theme.colors.green}
          />
          <View style={{height: 30}} />
        </View>
        <View style={{marginTop: 20, marginHorizontal: 20, marginBottom: 50}}>
          <SolidButton
            borderRadius={50}
            text={'Order Completed'}
            backgroundColor={theme.colors.green}
          />
        </View>
      </ScrollView>
    </View>
  );
}
