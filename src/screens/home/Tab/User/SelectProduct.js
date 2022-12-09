import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {default as TextFormated} from '../../../../components/TextFormated';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import {baseUrl} from '../../../../utils/constance';
import {theme} from '../../../../utils/theme';
import {ShowToast} from '../../../../utils/ToastFunction';
import {RefreshControl} from 'react-native-web-refresh-control';
import {useSelector} from 'react-redux';
import Statusbar from '../../../../components/Statusbar';
import Header from '../../../../components/Header';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';

export default function ShowCase({navigation, setGet_followed_event}) {
  const dimensions = useWindowDimensions();
  const auth = useSelector(state => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isFocused, setIsFocused] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const {params} = useRoute();
  // alert(JSON.stringify(params.market_name));

  async function LikeUnlike(id) {
    try {
      const url = baseUrl + 'like_post?id=' + id + '&user_id=' + auth.id;
      console.log(url);

      const res = await fetch(url, {
        method: 'GET',
        headers: {'Cache-Control': 'no-cache'},
      });
      console.log(res);
      const rslt = await res.json();
      console.log(rslt);

      if (rslt.success == '1') {
        GetProduct(true);
      } else {
        ShowToast(rslt.message || 'Unknown error', 'error');
      }
    } catch (e) {
      // alert('An error occured.');
      ShowToast('An error occured.', 'error');
      console.log(e);
    }
  }
  async function GetProduct(silent = false) {
    try {
      if (!silent) {
        setLoading(true);
      }
      const url = baseUrl + 'get_post_product';
      const body = new FormData();
      body.append('user_id', auth.id);
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

      if (rslt.success == '1') {
        setData(rslt.post_data.reverse());
        if (!silent) {
          setLoading(false);
        }
        setRefreshing(false);
      } else {
        // ShowToast(rslt.message || 'Unknown error', 'error');
        if (!silent) {
          setLoading(false);
        }
        setRefreshing(false);
      }
    } catch (e) {
      // alert('An error occured.');
      ShowToast('An error occured.', 'error');
      if (!silent) {
        setLoading(false);
      }
      setRefreshing(false);

      console.log(e);
    }
  }

  async function AddMarket() {
    if (selectedProduct.length == 0) {
      ShowToast('You have to add at least one product', 'error');
      return;
    }
    try {
      setLoading(true);
      const url = baseUrl + 'create_market';

      // const token = await firebase.messaging().getToken();
      // alert(token);
      const body = new FormData();
      body.append('creator_user_id', auth.id);
      body.append('market_name', params?.market_name);
      body.append('date', params?.date);
      body.append(
        'duration',
        moment(params?.openTime).format('LT') +
          '-' +
          moment(params?.closeTime).format('LT'),
      );
      body.append('lat', params?.selectedLat);
      body.append('long', params?.selectedLon);
      body.append('date_time', params?.date);
      body.append('selected_products', selectedProduct.join(','));

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

      if (rslt.success == '1') {
        ShowToast('Market created successfully.');
        navigation.goBack();
      } else {
        ShowToast(rslt.message || 'Unknown error', 'error');
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      // alert('An error occured.');
      ShowToast('An error occured.', 'error');

      console.log(e);
    }
  }

  const Removeval = () => {
    const selectedProduct = [...passcode];
    selectedProduct.pop();
    setPasscode(selectedProduct);
    console.log('selectedProduct', selectedProduct);
  };

  useEffect(() => {
    GetProduct();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      GetProduct(true);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <LoadingSpinner size={60} visible={loading} color={theme.colors.yellow} />

      <Statusbar
        barStyle="dark-content"
        backgroundColor={theme.colors.primary}
      />
      <Header navigation={navigation} Headertext={'Select Product'} />
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
        }}>
        <FlatList
          data={data}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          ListEmptyComponent={
            <View
              style={{
                // alignItems: 'center',
                flex: 1,
                backgroundColor: '#fff',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../../../assets/DataNotFound.png')}
                style={{
                  height: dimensions.width / 2,
                  width: dimensions.width / 2,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  // borderWidth: 1,
                }}
              />
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  color: theme.colors.Black,
                  marginVertical: 15,
                  textAlign: 'center',
                }}>
                Data Not Found
              </Text>
            </View>
          }
          numColumns={2}
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
          contentContainerStyle={
            {
              // flexDirection: 'row',
              // flexWrap: 'wrap',
            }
          }
          // horizontal
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          // contentContainerStyle={{marginVertical: 15}}
          ItemSeparatorComponent={() => <View style={{width: 20}} />}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                // if (selectedProduct.filter(i => i == item.id)) {
                //   setSelectedProduct(v => [...v, item.id]);
                // }
                setSelectedProduct(prevState =>
                  prevState.find(v => item.id == v)
                    ? prevState.filter(v => item.id != v)
                    : [...prevState, item.id],
                );
              }}
              style={{
                backgroundColor: theme.colors.primary,
                marginHorizontal: 4,
                marginVertical: 4,
                borderWidth: 3,
                borderColor: selectedProduct.find(v => v == item.id)
                  ? theme.colors.green
                  : theme.colors.primary,
              }}>
              <View
                style={{
                  backgroundColor: 'transparent',
                  width: dimensions.width / 2.15,
                  height: dimensions.width / 2,
                  // borderRadius: 12,
                  overflow: 'hidden',
                }}>
                <ImageBackground
                  source={{uri: item.image}}
                  style={{
                    width: dimensions.width / 2.15,
                    height: dimensions.width / 2,
                    backgroundColor: theme.colors.Tabbg,
                  }}
                  imageStyle={{
                    resizeMode: 'cover',
                    // borderRadius: 12,
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      right: 13,
                      top: 5,
                    }}></View>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      // onPress={() => LikeUnlike(item.id)}
                      style={{flex: 1}}>
                      <LinearGradient
                        colors={[
                          theme.colors.Linear_first,
                          theme.colors.Linear_second,
                          theme.colors.Linear_third,
                        ]}
                        start={{x: 0.3, y: 0}}
                        end={{x: 0.5, y: 3.5}}
                        style={{
                          // width: Dimensions.get('window').width / 6.9,
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingVertical: 4,
                        }}>
                        <TextFormated
                          style={{
                            fontWeight: '500',
                            color: theme.colors.primary,
                            fontSize: 8,
                          }}>
                          LIKE {item?.like}
                        </TextFormated>
                      </LinearGradient>
                    </TouchableOpacity>
                    {item.ask_status == 'YES' && (
                      <TouchableOpacity
                        onPress={() => {}}
                        style={{
                          // width: Dimensions.get('window').width / 6.9,
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingVertical: 4,
                          backgroundColor: theme.colors.red,
                          flex: 1,
                        }}>
                        <TextFormated
                          style={{
                            fontWeight: '500',
                            color: theme.colors.primary,
                            fontSize: 8,
                          }}>
                          ASK
                        </TextFormated>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      onPress={() => {}}
                      style={{
                        // width: Dimensions.get('window').width / 6.9,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 4,
                        backgroundColor: theme.colors.purple,
                        flex: 1,
                      }}>
                      <TextFormated
                        style={{
                          fontWeight: '500',
                          color: theme.colors.primary,
                          fontSize: 8,
                        }}>
                        ORDER {item?.order}
                      </TextFormated>
                    </TouchableOpacity>

                    {item.rent_status == 'YES' && (
                      <TouchableOpacity
                        onPress={() => {}}
                        style={{
                          // width: Dimensions.get('window').width / 6.9,
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingVertical: 6,
                          backgroundColor: theme.colors.Chat_container,
                          flex: 1,
                        }}>
                        <TextFormated
                          style={{
                            fontWeight: '500',
                            color: theme.colors.primary,
                            fontSize: 10,
                          }}>
                          RENT
                        </TextFormated>
                      </TouchableOpacity>
                    )}
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          AddMarket();
        }}
        style={{
          // paddingVertical: 15,
          // paddingHorizontal: 15,
          // backgroundColor: theme.colors.green,
          borderRadius: 120,
          position: 'absolute',
          bottom: 40,
          right: 20,
        }}>
        <Image
          style={{
            height: 55,
            width: 55,
            resizeMode: 'contain',
          }}
          source={require('../../../../assets/gif/next.gif')}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
    fontWeight: '700',
    width: '60%',
    color: theme.colors.Black,
  },
  header_image: {
    height: 33,
    width: 33,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    width: '80%',
    color: theme.colors.Black,
  },
  ViewAll: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.Linear_second,
    textDecorationLine: 'underline',
  },
  graph_image: {
    height: Dimensions.get('window').width / 2,
    width: Dimensions.get('window').width / 1,
    resizeMode: 'cover',
  },
});
