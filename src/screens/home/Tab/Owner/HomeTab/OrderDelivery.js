import {View, Text} from 'react-native';
import React from 'react';
import {theme} from '../../../../utils/theme';
import Statusbar from '../../../../components/Statusbar';
import Header from '../../../../components/Header';
import TextFormatted from '../../../../components/TextFormated';
import {Image} from 'react-native';
import {ScrollView} from 'react-native';
import Button from '../../../../components/Button';
import {TouchableOpacity} from 'react-native';
import SolidButton from '../../../../components/SolidButton';

export default function AddProduct({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.primary,
      }}>
      <Statusbar
        barStyle={'dark-content'}
        backgroundColor={theme.colors.Black}
      />
      <Header
        Headertext="Order Delivery"
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
              backgroundColor: theme.colors.green,
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
              backgroundColor: theme.colors.green,
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
            alignSelf: 'center',
            borderRadius: 25,
            marginVertical: 20,
            paddingVertical: 7,
            marginHorizontal: 20,
            backgroundColor: theme.colors.red,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Image
            source={require('../../../../assets/map_.png')}
            style={{height: 30, width: 30, resizeMode: 'contain'}}
          />
          <View style={{width: 20}} />
          <TextFormatted
            style={{
              fontWeight: '500',
              color: theme.colors.primary,
              fontSize: 16,
            }}>
            View Map
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
              backgroundColor: theme.colors.green,
            }}>
            <TextFormatted style={{fontWeight: '500', paddingHorizontal: 80}}>
              Recieved
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
              Delivered
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
              Recieved
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
