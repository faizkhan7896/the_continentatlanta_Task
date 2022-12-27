import {default as React, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import Statusbar from '../../../components/Statusbar';
import TextFormatted from '../../../components/TextFormated';
import {data} from '../../../utils/data';
import {theme} from '../../../utils/theme';

export default function Orders({navigation}) {
  const dimensions = useWindowDimensions();
  const [count, setCount] = useState(1);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <Statusbar
        barStyle="dark-content"
        backgroundColor={theme.colors.primary}
      />
      <Header navigation={navigation} Headertext={'Subcart'} />
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginVertical: 15}}
        // style={{flex: 1}}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('OrderDetails', {
                item,
              })
            }
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
                    item.image != 'https://www.dayscab.com/tequ/uploads/event/'
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
                <View
                  style={{
                    alignItems: 'flex-start',
                  }}>
                  <TextFormatted
                    style={{
                      fontSize: 18,
                      fontWeight: '500',
                      fontStyle: 'italic',
                      color: theme.colors.Gray,
                    }}>
                    Henely Shirts
                  </TextFormatted>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: theme.colors.Pluscontainer,
                      paddingHorizontal: 15,
                      borderRadius: 12,
                      marginTop: 10,
                    }}>
                    <TouchableOpacity
                      activeOpacity={count <= 0 ? 1 : null}
                      // disabled={count <= 0 && true}
                      onPress={() => {
                        if (count <= 0) {
                        } else {
                          setCount(count - 1);
                        }
                      }}>
                      <TextFormatted
                        style={{
                          fontSize: 18,
                          fontWeight: '500',
                          color: theme.colors.Gray,
                        }}>
                        -
                      </TextFormatted>
                    </TouchableOpacity>
                    <TextFormatted
                      style={{
                        fontSize: 18,
                        fontWeight: '500',
                        color: theme.colors.Gray,
                        paddingHorizontal: 10,
                      }}>
                      {count}
                    </TextFormatted>
                    <TouchableOpacity onPress={() => setCount(count + 1)}>
                      <TextFormatted
                        style={{
                          fontSize: 18,
                          fontWeight: '500',
                          color: theme.colors.Gray,
                        }}>
                        +
                      </TextFormatted>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                  <TouchableOpacity>
                    <Image
                      source={require('../../../assets/Cross.png')}
                      style={{
                        width: 24,
                        height: 24,
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>
                  <TextFormatted
                    style={{
                      fontWeight: '500',
                      fontStyle: 'italic',
                      color: theme.colors.Black,
                      marginTop: 25,
                    }}>
                    $250.00
                  </TextFormatted>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={{marginHorizontal: 20}}>
        <Button
          marginBottom={20}
          ButtonText={'GO TO CART'}
          onPress={() => navigation.navigate('Cart')}
        />
      </View>
    </View>
  );
}
