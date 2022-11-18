import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import LoadingSpinner from '../../../../../components/LoadingSpinner';
import {default as TextFormated} from '../../../../../components/TextFormated';
import {baseUrl} from '../../../../../utils/constance';
import {theme} from '../../../../../utils/theme';
import {ShowToast} from '../../../../../utils/ToastFunction';

export default function History({navigation}) {
  const dimensions = useWindowDimensions();
  const auth = useSelector(state => state.auth);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function GetProduct(silent = false) {
    try {
      if (!silent) {
        setLoading(true);
      }
      const url = baseUrl + 'get_post_order?user_id=' + auth.id;

      const res = await fetch(url, {
        method: 'GET',
        headers: {'Cache-Control': 'no-cache'},
      });
      console.log(res);
      const rslt = await res.json();
      console.log(rslt);

      if (rslt.success == '1') {
        setData(rslt.order_data.reverse());
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

  return (
    <View style={{flex: 1}}>
      <LoadingSpinner size={60} visible={loading} color={theme.colors.yellow} />

      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            size={'small'}
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.yellow}
            colors={theme.colors.yellow}
          />
        }
        contentContainerStyle={{marginVertical: 15}}
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
            <TextFormated
              style={{
                fontSize: 24,
                fontWeight: '700',
                color: theme.colors.Black,
                marginVertical: 15,
                textAlign: 'center',
              }}>
              Data Not Found
            </TextFormated>
          </View>
        }
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('OrderDetails', item)}
            style={{
              borderRadius: 12,
              backgroundColor: theme.colors.Black,
              marginHorizontal: 13,
              marginVertical: 15,
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: theme.colors.green,
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'transparent',
                width: dimensions.width / 3.5,
                height: dimensions.width / 3,
                borderRadius: 10,
                overflow: 'hidden',
              }}>
              <ImageBackground
                source={{uri: item?.post?.image}}
                style={{
                  width: dimensions.width / 3.5,
                  height: dimensions.width / 3,
                  backgroundColor: theme.colors.Tabbg,
                }}
                imageStyle={{
                  resizeMode: 'cover',
                  borderRadius: 10,
                }}></ImageBackground>
            </View>
            <View
              style={{
                width: dimensions.width / 1.6,
                paddingHorizontal: 15,
                paddingTop: 10,
              }}>
              <View style={{alignItems: 'flex-start'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 19,
                      fontWeight: '600',
                      color: theme.colors.primary,
                    }}>
                    {item.id}
                  </Text>
                  <View style={{width: 20}} />

                  <TouchableOpacity
                    onPress={() => {}}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 7,
                      flexDirection: 'row',
                      borderRadius: 6,
                      backgroundColor:
                        item?.status == 'PENDING'
                          ? theme.colors.yellow
                          : item?.status == 'ACCEPT'
                          ? theme.colors.green
                          : theme.colors.red,
                      paddingHorizontal: 10,
                    }}>
                    <TextFormated
                      style={{
                        fontWeight: '700',
                        color: theme.colors.primary,
                        fontSize: 10,
                      }}>
                      {item?.status}
                    </TextFormated>
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    fontWeight: '600',
                    color: theme.colors.primary,
                    fontSize: 12,
                    marginTop: 10,
                  }}>
                  {moment(item.date_time).format('lll')}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 15,
                }}>
                <View
                  onPress={() => {}}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 7,
                    flexDirection: 'row',
                    borderRadius: 6,
                    backgroundColor: theme.colors.yellow,
                    flex: 1,
                  }}>
                  <TextFormated
                    style={{
                      fontWeight: '500',
                      color: theme.colors.Black,
                      fontSize: 10,
                    }}>
                    LIKE {item.post.like || '0'}
                  </TextFormated>
                </View>
                <View style={{width: 7}} />
                <View
                  onPress={() => {}}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 7,
                    flexDirection: 'row',
                    borderRadius: 6,
                    backgroundColor:
                      item.post.ask_status == 'YES'
                        ? theme.colors.yellow
                        : theme.colors.primary,
                    flex: 1,
                  }}>
                  <TextFormated
                    style={{
                      fontWeight: '500',
                      color: theme.colors.Black,
                      fontSize: 10,
                    }}>
                    ASK {item.post.ask || '0'}
                  </TextFormated>
                </View>
                <View style={{width: 7}} />
                <View
                  onPress={() => {}}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 7,
                    flexDirection: 'row',
                    borderRadius: 6,
                    backgroundColor: theme.colors.yellow,
                    flex: 1,
                  }}>
                  <TextFormated
                    style={{
                      fontWeight: '500',
                      color: theme.colors.Black,
                      fontSize: 10,
                    }}>
                    ORDER {item.post.ask || '0'}
                  </TextFormated>
                </View>
                <View style={{width: 7}} />
                <View
                  onPress={() => {}}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 7,
                    flexDirection: 'row',
                    borderRadius: 6,
                    backgroundColor:
                      item.post.rent_status == 'YES'
                        ? theme.colors.yellow
                        : theme.colors.primary,
                    flex: 1,
                  }}>
                  <TextFormated
                    style={{
                      fontWeight: '500',
                      color: theme.colors.Black,
                      fontSize: 10,
                    }}>
                    RENT {item.post.ask || '0'}
                  </TextFormated>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
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
