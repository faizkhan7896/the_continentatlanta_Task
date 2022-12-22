import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {default as TextFormated} from '../../../../../components/TextFormated';
import LoadingSpinner from '../../../../../components/LoadingSpinner';
import {baseUrl} from '../../../../../utils/constance';
import {theme} from '../../../../../utils/theme';
import {ShowToast} from '../../../../../utils/ToastFunction';
import {RefreshControl} from 'react-native-web-refresh-control';
import {useSelector} from 'react-redux';
import moment from 'moment';

export default function ShowCase({navigation, setGet_followed_event}) {
  const dimensions = useWindowDimensions();
  const auth = useSelector(state => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isFocused, setIsFocused] = useState(true);
  const [l, setL] = useState(true);
  const [markets, setMarkets] = useState([]);

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

      const res = await fetch(url, {
        method: 'GET',
        headers: {'Cache-Control': 'no-cache'},
      });
      // console.log(res);
      const rslt = await res.json();
      // console.log(rslt);

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    GetProduct(true);
  }, []);

  async function GetMarkets(silent = false) {
    try {
      if (!silent) {
        setLoading(true);
      }
      const url = baseUrl + 'get_all_market_of_user?user_id=' + auth?.id;
      console.log(url);

      const res = await fetch(url, {
        method: 'GET',
        headers: {'Cache-Control': 'no-cache'},
      });
      console.log(res);
      const rslt = await res.json();
      console.log(rslt);

      if (rslt.success == '1') {
        setMarkets(rslt.market_data.reverse());
        // setProducts(rslt.market_data.data[0].selected_products[0].reverse());
        if (!silent) {
          setLoading(false);
        }
        setRefreshing(false);
      } else {
        // ShowToast(rslt.message || 'Unknown error', 'error');
        // alert(rslt.message);

        if (!silent) {
          setLoading(false);
        }
        if (rslt.message == 'Market Not Found') {
          setMarkets([]);
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

  async function LeaveMarket(id) {
    try {
      setLoading(true);
      const url = baseUrl + 'leave_market';
      console.log(url);

      const body = new FormData();
      body.append('user_id', auth?.id);
      body.append('market_id', id);

      console.log(body);

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
        GetMarkets();
      } else {
        ShowToast(rslt.message || 'Unknown error', 'error');
        GetMarkets();
      }
      GetMarkets();
      setLoading(false);
    } catch (e) {
      GetMarkets();
      setLoading(false);
      // alert('An error occured.');
      ShowToast('An error occured.', 'error');

      console.log(e);
    }
  }

  useEffect(() => {
    GetProduct();
    GetMarkets();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      GetProduct(true);
      GetMarkets(true);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const int = setInterval(() => {
      if (isFocused) GetProduct(true);
    }, 5000);
    return () => clearInterval(int);
  }, [isFocused]);

  return (
    <View style={{flex: 1}}>
      <LoadingSpinner
        textContent="Loading..."
        size={60}
        visible={loading}
        color={theme.colors.yellow}
      />
      <ScrollView>
        {markets.map((v, i) => (
          <View style={{}}>
            <View
              style={{
                alignItems: 'center',
                // flex: 1,
                backgroundColor: '#fff',
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginHorizontal: 5,
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  alignItems: 'flex-start',
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    color: theme.colors.Black,
                    textAlign: 'center',
                  }}>
                  {v?.maekrt_data?.market_name +
                    ', ' +
                    moment(v?.maekrt_data?.date_time).format('ll')}
                </Text>

                <Text
                  style={{
                    fontWeight: '700',
                    color: theme.colors.Black,
                    textAlign: 'center',
                    marginTop: 5,
                  }}>
                  {v?.maekrt_data?.duration}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  LeaveMarket(v?.market_id);
                }}
                style={{
                  backgroundColor: theme.colors.red,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  paddingVertical: 15,
                  flex: 0.3,
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    color: theme.colors.primary,
                    fontSize: 12,
                  }}>
                  LEAVE
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={markets[i]?.selected_products?.slice(0, 9)}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={true}
              contentContainerStyle={{
                marginVertical: 15,
                // paddingHorizontal: 20,
                alignItems: 'center',
              }}
              // style={{marginHorizontal: 5}}
              horizontal
              // ItemSeparatorComponent={() => <View style={{width: 20}} />}
              ListFooterComponent={
                <View>
                  {markets[i]?.selected_products?.length > 9 && (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('AllMarketProduct')}
                      style={{
                        backgroundColor: theme.colors.primary,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        paddingVertical: 15,
                        width: dimensions.width / 4,
                        height: dimensions.width / 3,
                      }}>
                      <Text
                        style={{
                          fontWeight: '600',
                          color: theme.colors.Black,
                          fontSize: 12,
                          paddingHorizontal: 20,
                        }}>
                        VIEW ALL
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              }
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    return navigation.navigate('ProductDetail', {item});
                    // console.log(item);
                  }}
                  style={{
                    // borderRadius: 12,
                    backgroundColor: theme.colors.primary,
                    // justifyContent: 'space-between',
                    marginHorizontal: 4,
                    marginVertical: 4,
                    borderWidth: 1,
                    borderColor: theme.colors.green,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      width: dimensions.width / 3,
                      height: dimensions.width / 3,
                      // borderRadius: 12,
                      overflow: 'hidden',
                    }}>
                    <ImageBackground
                      source={{
                        uri: 'https://shopnguyenlieumypham.com/wp-content/uploads/no-image/product-456x456.jpg',
                      }}
                      // source={{uri: item.image}}
                      style={{
                        width: dimensions.width / 3,
                        height: dimensions.width / 3,
                        backgroundColor: theme.colors.Tabbg,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      imageStyle={{
                        width: dimensions.width / 4,
                        resizeMode: 'contain',
                        height: dimensions.width / 4,
                        marginHorizontal: 18,
                        marginTop: 8,
                      }}>
                      <ImageBackground
                        source={{uri: item.image}}
                        style={{
                          width: dimensions.width / 3,
                          height: dimensions.width / 3,
                        }}
                        imageStyle={{
                          resizeMode: 'cover',
                        }}></ImageBackground>
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
                          onPress={() => LikeUnlike(item.id)}
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
                              paddingVertical: 6,
                            }}>
                            <TextFormated
                              style={{
                                fontWeight: '500',
                                color: theme.colors.primary,
                                fontSize: 10,
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
                              paddingVertical: 6,
                              backgroundColor: theme.colors.red,
                              flex: 1,
                            }}>
                            <TextFormated
                              style={{
                                fontWeight: '500',
                                color: theme.colors.primary,
                                fontSize: 10,
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
                            paddingVertical: 6,
                            backgroundColor: theme.colors.purple,
                            flex: 1,
                          }}>
                          <TextFormated
                            style={{
                              fontWeight: '500',
                              color: theme.colors.primary,
                              fontSize: 10,
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
        ))}

        <FlatList
          data={data}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: '#fff',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../../../../assets/gif/DataNotFound.gif')}
                style={{
                  height: dimensions.width / 1.5,
                  width: dimensions.width / 1.5,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  borderWidth: 3,
                  borderColor: theme.colors.primary,
                }}
              />
            </View>
          }
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginVertical: 15}}
          // ItemSeparatorComponent={() => <View style={{width: 20}} />}
          scrollEnabled={false}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProductDetail', {item})}
              style={{
                // borderRadius: 12,
                backgroundColor: theme.colors.primary,
                // justifyContent: 'space-between',
                marginHorizontal: 4,
                marginVertical: 4,
                borderWidth: 1,
                borderColor: theme.colors.green,
              }}>
              <View
                style={{
                  backgroundColor: 'transparent',
                  width: dimensions.width / 2.1,
                  height: dimensions.width / 2,
                  // borderRadius: 12,
                  overflow: 'hidden',
                }}>
                <ImageBackground
                  source={{
                    uri: 'https://shopnguyenlieumypham.com/wp-content/uploads/no-image/product-456x456.jpg',
                  }}
                  // source={{uri: item.image}}
                  style={{
                    width: dimensions.width / 2.1,
                    height: dimensions.width / 2,
                    backgroundColor: theme.colors.Tabbg,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  imageStyle={{
                    width: dimensions.width / 3,
                    resizeMode: 'contain',
                    height: dimensions.width / 3,
                    marginHorizontal: 30,
                    marginTop: 30,
                  }}>
                  <ImageBackground
                    source={{uri: item.image}}
                    style={{
                      width: dimensions.width / 2.1,
                      height: dimensions.width / 2,
                    }}
                    imageStyle={{
                      resizeMode: 'cover',
                    }}></ImageBackground>
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
                      onPress={() => LikeUnlike(item.id)}
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
                          paddingVertical: 6,
                        }}>
                        <TextFormated
                          style={{
                            fontWeight: '500',
                            color: theme.colors.primary,
                            fontSize: 10,
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
                          paddingVertical: 6,
                          backgroundColor: theme.colors.red,
                          flex: 1,
                        }}>
                        <TextFormated
                          style={{
                            fontWeight: '500',
                            color: theme.colors.primary,
                            fontSize: 10,
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
                        paddingVertical: 6,
                        backgroundColor: theme.colors.purple,
                        flex: 1,
                      }}>
                      <TextFormated
                        style={{
                          fontWeight: '500',
                          color: theme.colors.primary,
                          fontSize: 10,
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
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('JoinedMarkets');
        }}
        style={{
          // paddingVertical: 7,
          paddingHorizontal: 7,
          backgroundColor: theme.colors.green,
          borderRadius: 120,
          position: 'absolute',
          bottom: 40,
          right: 30,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
        <Image
          style={{
            borderRadius: 120,
            height: 70,
            width: 55,
            resizeMode: 'cover',
          }}
          source={require('../../../../../assets/gif/market.gif')}
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
