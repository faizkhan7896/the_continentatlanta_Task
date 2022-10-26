import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
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
import {useSelector} from 'react-redux';

export default function ShowCase({navigation, setGet_followed_event}) {
  const dimensions = useWindowDimensions();
  const auth = useSelector(state => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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
      } else {
        ShowToast(rslt.message || 'Unknown error', 'error');
        if (!silent) {
          setLoading(false);
        }
      }
    } catch (e) {
      // alert('An error occured.');
      ShowToast('An error occured.', 'error');
      if (!silent) {
        setLoading(false);
      }

      console.log(e);
    }
  }

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
        ListEmptyComponent={
          <View style={{alignItems: 'center', marginTop: 20}}>
            <TextFormated style={{fontSize: 16, fontWeight: '600'}}>
              Data Not Found
            </TextFormated>
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
                    activeOpacity={0.7}
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
                      activeOpacity={0.7}
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
                    activeOpacity={0.7}
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
                      activeOpacity={0.7}
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
