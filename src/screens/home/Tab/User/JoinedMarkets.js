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
import {default as TextFormated} from '../../../../components/TextFormated';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import Statusbar from '../../../../components/Statusbar';
import Header from '../../../../components/Header';
import {baseUrl} from '../../../../utils/constance';
import {theme} from '../../../../utils/theme';
import {ShowToast} from '../../../../utils/ToastFunction';
import {RefreshControl} from 'react-native-web-refresh-control';
import {useSelector} from 'react-redux';
import moment from 'moment';

export default function ShowCase({navigation, setGet_followed_event}) {
  const dimensions = useWindowDimensions();
  const auth = useSelector(state => state.auth);
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isFocused, setIsFocused] = useState(true);
  // alert(JSON.stringify(data[0].selected_products[0].post_data[0]));
  // alert(JSON.stringify(products));
  // alert(JSON.stringify(data));

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
        setData(rslt.market_data.reverse());
        // setProducts(rslt.market_data.data[0].selected_products[0].reverse());
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
        setData([]);
        GetProduct();
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

  useEffect(() => {
    GetProduct();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.primary}}>
      <Statusbar backgroundColor="#fff" barStyle="dark-content" />
      <Header navigation={navigation} Headertext={'Markets'} />
      <LoadingSpinner size={60} visible={loading} color={theme.colors.yellow} />
      <ScrollView>
        {data.length == 0 && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#fff',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../../../assets/gif/DataNotFound.gif')}
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
        )}
        {data.map((v, i) => (
          <View style={{}}>
            <View
              style={{
                alignItems: 'center',
                // flex: 1,
                backgroundColor: '#fff',
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginHorizontal: 20,
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
              data={data[i].selected_products?.slice(0, 9)}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={true}
              contentContainerStyle={{
                marginVertical: 15,
                // paddingHorizontal: 20,
                alignItems: 'center',
              }}
              style={{marginHorizontal: 20}}
              horizontal
              // ItemSeparatorComponent={() => <View style={{width: 20}} />}
              ListFooterComponent={
                <View>
                  {data[i].selected_products?.length > 9 && (
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
                      width: dimensions.width / 3,
                      height: dimensions.width / 3,
                      // borderRadius: 12,
                      overflow: 'hidden',
                    }}>
                    <ImageBackground
                      source={{uri: item.image}}
                      style={{
                        width: dimensions.width / 3,
                        height: dimensions.width / 3,
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
      </ScrollView>
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
