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
import {default as TextFormated} from '../../../../../components/TextFormated';
import LoadingSpinner from '../../../../../components/LoadingSpinner';
import {baseUrl} from '../../../../../utils/constance';
import {theme} from '../../../../../utils/theme';
import {ShowToast} from '../../../../../utils/ToastFunction';
import {RefreshControl} from 'react-native-web-refresh-control';
import {useSelector} from 'react-redux';

export default function ShowCase({navigation, setGet_followed_event}) {
  const dimensions = useWindowDimensions();
  const auth = useSelector(state => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isFocused, setIsFocused] = useState(true);

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    GetProduct(true);
  }, []);

  useEffect(() => {
    GetProduct();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      GetProduct(true);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const int = setInterval(() => {
      if (isFocused) GetProduct(true);
    }, 5000);
    return () => clearInterval(int);
  }, [isFocused]);

  // const fadeAnim = new Animated.Value(0);

  // // const fadeout = () => {
  // Animated.timing(fadeAnim, {
  //   toValue: 1,
  //   duration: 3000,
  //   useNativeDriver: true,
  // }).start();

  // const position = new Animated.ValueXY({x: 0, y: 100});
  // Animated.spring(position, {
  //   toValue: {x: -30, y: -10},
  //   speed: 10,
  //   bounciness: 40,
  //   useNativeDriver: true,
  // }).start();

  // const post = new Animated.ValueXY({x: 0, y: 0});
  // Animated.spring(post, {
  //   toValue: {x: 10, y: -130},
  //   speed: 10,
  //   bounciness: 20,
  //   useNativeDriver: true,
  // }).start();

  return (
    <View style={{flex: 1}}>
      <LoadingSpinner size={60} visible={loading} color={theme.colors.yellow} />

      <FlatList
        data={data}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View
            style={{
              // alignItems: 'center',
              flex: 1,
              backgroundColor: '#fff',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../../../../assets/DataNotFound.png')}
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
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        contentContainerStyle={{marginVertical: 15}}
        // ItemSeparatorComponent={() => <View style={{width: 20}} />}
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
                source={{uri: item.image}}
                style={{
                  width: dimensions.width / 2.1,
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

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('JoinedMarkets');
        }}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 15,
          backgroundColor: theme.colors.green,
          borderRadius: 120,
          position: 'absolute',
          bottom: 40,
          right: 20,
        }}>
        {/* <Animated.View
          style={[
            styles.fade,
            {
              opacity: fadeAnim,
            },
          ]}> */}
        {/* <Image source={require('../../assets/icons/using/Logo.png')} /> */}
        <Image
          style={{
            height: 45,
            width: 45,
            resizeMode: 'contain',
            // tintColor: theme.colors.primary,
          }}
          // source={require('../../../../../assets/Shop.png')}
          source={require('../../../../../assets/gif/shop.gif')}
        />
        {/* </Animated.View> */}
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
