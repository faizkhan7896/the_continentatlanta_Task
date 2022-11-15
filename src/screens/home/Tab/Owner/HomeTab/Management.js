import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
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
import {useSelector} from 'react-redux';
import LoadingSpinner from '../../../../../components/LoadingSpinner';
import {default as TextFormated} from '../../../../../components/TextFormated';
import {baseUrl} from '../../../../../utils/constance';
import {theme} from '../../../../../utils/theme';
import {ShowToast} from '../../../../../utils/ToastFunction';
import {SwipeListView} from 'react-native-swipe-list-view';

export default function History({navigation, setGet_followed_event}) {
  const dimensions = useWindowDimensions();
  const auth = useSelector(state => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [askStatus, setAskStatus] = useState(true);
  const [rentStatus, setRentStatus] = useState(true);
  const [productstatus, setProductstatus] = useState(false);

  const [profileData, setProfileData] = useState('');
  // alert(JSON.stringify(profileData.signup_status));

  // const ask = askStatus == false ? 'NO' : 'YES';
  // const rent = rentStatus == false ? 'NO' : 'YES';

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
      } else {
        // ShowToast(rslt.message || 'Unknown error', 'error');
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

  const a = productstatus == true ? 'open' : 'close';
  useEffect(() => {
    GetProduct();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      GetProduct(true);
    });
    return unsubscribe;
  }, [navigation]);

  async function StatusUpdate(
    id,
    name,
    rent,
    name1,
    name1value,
    name2,
    name2value,
    name3,
    name3value,
  ) {
    try {
      const url =
        baseUrl +
        'update_status_rent_ask?id=' +
        id +
        '&' +
        name +
        '=' +
        rent +
        '&' +
        name1 +
        '=' +
        name1value +
        '&' +
        name2 +
        '=' +
        name2value +
        '&' +
        name3 +
        '=' +
        name3value;
      console.log(url);
      // return;

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
  async function AvailablityUpdate(
    id,
    name,
    rent,
    name2,
    name2value,
    name3,
    name3value,
  ) {
    try {
      const url =
        baseUrl +
        'update_status_rent_ask?id=' +
        id +
        '&' +
        name +
        '=' +
        rent +
        '&' +
        name2 +
        '=' +
        name2value +
        '&' +
        name3 +
        '=' +
        name3value;
      console.log(url);
      // return;

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
  async function DeleteProduct(id) {
    try {
      const url = baseUrl + 'post_delete?post_id=' + id + '&status=DELETED';

      console.log(url);
      // return;

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
  async function UpdateProduct_status(id, a) {
    try {
      const url = baseUrl + 'post_status?post_id=' + id + '&status=' + a;

      console.log(url);
      // return;

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
  async function GetProfile() {
    try {
      const url = baseUrl + 'get_profile?user_id=' + auth.id;

      console.log(url);
      // return;

      const res = await fetch(url, {
        method: 'GET',
        headers: {'Cache-Control': 'no-cache'},
      });
      console.log(res);
      const rslt = await res.json();
      console.log(rslt);

      if (rslt.success == '1') {
        setProfileData(rslt.user_data);
      } else {
        ShowToast(rslt.message || 'Unknown error', 'error');
      }
    } catch (e) {
      // alert('An error occured.');
      ShowToast('An error occured.', 'error');
      console.log(e);
    }
  }

  useEffect(() => {
    GetProfile();
  }, []);

  return (
    <View style={{flex: 1}}>
      <LoadingSpinner size={60} visible={loading} color={theme.colors.yellow} />

      <SwipeListView
        data={data}
        leftOpenValue={75}
        rightOpenValue={-85}
        // onRightAction={() => alert()}
        stopLeftSwipe
        renderHiddenItem={(data, rowMap) => (
          <TouchableOpacity
            onPress={() => DeleteProduct(data.item.id)}
            activeOpacity={0.7}
            style={{
              backgroundColor: 'red',
              position: 'absolute',
              right: 20,
              top: 17,
              paddingRight: 13,
              paddingVertical: 45,
              paddingLeft: 55,
              borderTopRightRadius: 12,
              borderBottomRightRadius: 12,
            }}>
            <TextFormated
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: theme.colors.primary,
              }}>
              DELETE
            </TextFormated>
          </TouchableOpacity>
        )}
        renderItem={({item, index}) => (
          <View
            // onPress={() =>
            //   navigation.navigate('HomeScreensNavigation', {
            //     screen: 'EventDetail',
            //     item,
            //   })
            // }
            style={{
              borderRadius: 12,
              // backgroundColor: theme.colors.Black,
              marginHorizontal: 13,
              marginVertical: 15,
            }}>
            {/* {alert(JSON.stringify(item))} */}
            <TouchableOpacity
              activeOpacity={1}
              style={{
                borderRadius: 12,
                backgroundColor: theme.colors.Black,
                borderWidth: 1,
                borderColor: theme.colors.green,
                flexDirection: 'row',
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
                  source={{uri: item?.image}}
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
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: dimensions.width / 1.6,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{}}>
                    <TextFormated
                      style={{
                        fontSize: 19,
                        fontWeight: '600',
                        color: theme.colors.primary,
                      }}>
                      {item.id}
                    </TextFormated>
                    <TextFormated
                      style={{
                        fontWeight: '600',
                        color: theme.colors.primary,
                        fontSize: 12,
                        marginTop: 5,
                      }}>
                      {moment(item.date_time).format('lll')}
                    </TextFormated>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setProductstatus(!productstatus);
                      if (item?.product_status == 'open') {
                        UpdateProduct_status(item.id, 'close');
                      } else {
                        UpdateProduct_status(item.id, 'open');
                      }
                    }}
                    style={{
                      backgroundColor:
                        item?.product_status == 'open'
                          ? theme.colors.green
                          : theme.colors.red,

                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 10,
                      borderRadius: 5,
                      paddingVertical: 8,
                      marginRight: 15,
                    }}>
                    <Text
                      style={{
                        fontWeight: '600',
                        color: theme.colors.primary,
                        fontSize: 12,
                      }}>
                      {item?.product_status}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 15,
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {}}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 10,
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
                      LIKE {item.like}
                    </TextFormated>
                  </TouchableOpacity>

                  <View style={{width: 7}} />

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      if (item.ask_status == 'NO') {
                        StatusUpdate(
                          item.id,
                          'ask_status',
                          'YES',
                          'avaibility_tackout',
                          item.avaibility_tackout,
                          'avaibility_delivery',
                          item.avaibility_delivery,
                          'avaibility_atstor',
                          item.avaibility_atstor,
                        );
                      } else {
                        StatusUpdate(
                          item.id,
                          'ask_status',
                          'NO',
                          'avaibility_tackout',
                          item.avaibility_tackout,
                          'avaibility_delivery',
                          item.avaibility_delivery,
                          'avaibility_atstor',
                          item.avaibility_atstor,
                        );
                      }
                    }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 10,
                      flexDirection: 'row',
                      borderRadius: 6,
                      backgroundColor:
                        item.ask_status == 'YES'
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
                      ASK {item.ask}
                    </TextFormated>
                  </TouchableOpacity>

                  <View style={{width: 7}} />

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {}}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 10,
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
                      ORDER {item.order}
                    </TextFormated>
                  </TouchableOpacity>

                  <View style={{width: 7}} />

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      if (item.rent_status == 'NO') {
                        StatusUpdate(
                          item.id,
                          'rent_status',
                          'YES',
                          'avaibility_tackout',
                          item.avaibility_tackout,
                          'avaibility_delivery',
                          item.avaibility_delivery,
                          'avaibility_atstor',
                          item.avaibility_atstor,
                        );
                      } else {
                        StatusUpdate(
                          item.id,
                          'rent_status',
                          'NO',
                          'avaibility_tackout',
                          item.avaibility_tackout,
                          'avaibility_delivery',
                          item.avaibility_delivery,
                          'avaibility_atstor',
                          item.avaibility_atstor,
                        );
                      }
                    }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 10,
                      flexDirection: 'row',
                      borderRadius: 6,
                      backgroundColor:
                        item.rent_status == 'YES'
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
                      RENT
                    </TextFormated>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  if (item.avaibility_atstor == '') {
                    AvailablityUpdate(
                      item.id,
                      'avaibility_atstor',
                      'AT STORE',
                      'avaibility_tackout',
                      item.avaibility_tackout,
                      'avaibility_delivery',
                      item.avaibility_delivery,
                    );
                  } else {
                    AvailablityUpdate(
                      item.id,
                      'avaibility_atstor',
                      '',
                      'avaibility_tackout',
                      item.avaibility_tackout,
                      'avaibility_delivery',
                      item.avaibility_delivery,
                    );
                  }
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                  flexDirection: 'row',
                  borderRadius: 6,
                  backgroundColor:
                    item.avaibility_atstor == 'AT STORE'
                      ? theme.colors.yellow
                      : theme.colors.primary,
                  flex: 1,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                }}>
                <TextFormated
                  style={{
                    fontWeight: '500',
                    color: theme.colors.Black,
                  }}>
                  At Store
                </TextFormated>
              </TouchableOpacity>

              <View style={{width: 10}} />

              <TouchableOpacity
                onPress={() => {
                  ShowToast('This feature will come in future update');
                }}
                activeOpacity={0.7}
                // onPress={() => {
                //   if (item.avaibility_tackout == '') {
                //     AvailablityUpdate(
                //       item.id,
                //       'avaibility_tackout',
                //       'TAKE OUT',
                //       'avaibility_atstor',
                //       item.avaibility_atstor,
                //       'avaibility_delivery',
                //       item.avaibility_delivery,
                //     );
                //   } else {
                //     AvailablityUpdate(
                //       item.id,
                //       'avaibility_tackout',
                //       '',
                //       'avaibility_atstor',
                //       item.avaibility_atstor,
                //       'avaibility_delivery',
                //       item.avaibility_delivery,
                //     );
                //   }
                // }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                  flexDirection: 'row',
                  borderRadius: 6,
                  backgroundColor:
                    item.avaibility_tackout == 'TAKE OUT'
                      ? theme.colors.yellow
                      : theme.colors.primary,
                  flex: 1,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                }}>
                <TextFormated
                  style={{
                    fontWeight: '500',
                    color: theme.colors.Black,
                  }}>
                  Take Out
                </TextFormated>
              </TouchableOpacity>

              <View style={{width: 10}} />

              <TouchableOpacity
                onPress={() => {
                  ShowToast('This feature will come in future update');
                }}
                activeOpacity={0.7}
                // onPress={() => {
                //   if (item.avaibility_delivery == '') {
                //     AvailablityUpdate(
                //       item.id,
                //       'avaibility_delivery',
                //       'DELIVERY',
                //       'avaibility_atstor',
                //       item.avaibility_atstor,
                //       'avaibility_tackout',
                //       item.avaibility_tackout,
                //     );
                //   } else {
                //     AvailablityUpdate(
                //       item.id,
                //       'avaibility_delivery',
                //       '',
                //       'avaibility_atstor',
                //       item.avaibility_atstor,
                //       'avaibility_tackout',
                //       item.avaibility_tackout,
                //     );
                //   }
                // }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                  flexDirection: 'row',
                  borderRadius: 6,
                  backgroundColor:
                    item.avaibility_delivery == 'DELIVERY'
                      ? theme.colors.yellow
                      : theme.colors.primary,
                  flex: 1,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                }}>
                <TextFormated
                  style={{
                    fontWeight: '500',
                    color: theme.colors.Black,
                  }}>
                  Delivery
                </TextFormated>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={() => {
          if (profileData?.signup_status == 'Owner Account Not Activated') {
            navigation.navigate('OwnerSignup');
            return;
          }
          navigation.navigate('AddProduct');
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
        <Image
          source={require('../../../../../assets/Add.png')}
          style={{height: 24, width: 24, resizeMode: 'contain'}}
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
