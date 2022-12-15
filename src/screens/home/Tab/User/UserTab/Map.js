// import {View, Text, Dimensions} from 'react-native';
// import React from 'react';

// export default function Map() {
//   return (
// <View
//   style={{
//     backgroundColor: '#fff',
//     height: 500,
//     width: Dimensions.get('window').width,
//     alignItems: 'center',
//     justifyContent: 'center',
//   }}>
//       <Text style={{fontSize: 24, fontWeight: '600'}}>Map</Text>
//     </View>
//   );
// }

import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import MapView, {Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';
import Statusbar from '../../../../../components/Statusbar';
import TextFormated from '../../../../../components/TextFormated';
import CustomTextInput from '../../../../../components/TextInput';
import {baseUrl} from '../../../../../utils/constance';
import {theme} from '../../../../../utils/theme';
import {ShowToast} from '../../../../../utils/ToastFunction';
import LoadingSpinner from '../../../../../components/LoadingSpinner';

const MARKERS = [
  {latitude: 22.761794329667982, longitude: 75.88739432394505},
  {latitude: 22.761794329667982, longitude: 75.89292671531439},
  {latitude: 22.757228500578126, longitude: 75.89016135782003},
  {latitude: 22.75746563806522, longitude: 75.88488578796387},
  {latitude: 22.752597898978536, longitude: 75.88765282183886},
  {latitude: 22.753667060297012, longitude: 75.8931852132082},
  {latitude: 22.718897408101107, longitude: 75.87684486061335},
  {latitude: 22.721981027815573, longitude: 75.87356217205524},
  {latitude: 22.71557217938178, longitude: 75.87382100522517},
  {latitude: 22.711539550780383, longitude: 75.87684486061335},
  {latitude: 22.71842299890038, longitude: 75.86970280855894},
  {latitude: 22.712013983840972, longitude: 75.87053831666708},
];

export default function MapSearch({navigation}) {
  const [Add, setAdd] = useState(false);
  const [selectedLat, setSelectedLat] = useState();
  const [selectedLon, setSelectedLon] = useState();
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [Modal_2, setModal_2] = useState(false);
  const [Modal_3, setModal_3] = useState(false);
  const [openTime, setOpenTime] = useState();
  const [openTime_1, setOpenTime_1] = useState(false);
  const [closeTime, setCloseTime] = useState();
  const [closeTime_2, setCloseTime_2] = useState(false);
  const auth = useSelector(state => state.auth);
  const [setSinglemarketdata, setSetSinglemarketdata] = useState();
  const [market_name, setMarket_name] = useState('');
  const [isFocused, setIsFocused] = useState(true);
  const [joined, setJoined] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [Leave, setLeave] = useState(false);

  const [data, setData] = useState();
  // alert(JSON.stringify(Modal_2));

  async function GetMarkets(silent = false) {
    try {
      setLoading(true);
      const url = baseUrl + 'get_all_market';
      console.log(url);

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      // console.log(res);
      const rslt = await res.json();
      // console.log(rslt);

      if (rslt.success == '1') {
        setData(rslt.market_data);
        setLoading(false);
      } else {
        setLoading(false);
        // ShowToast(rslt.message || 'Unknown error', 'error');
      }
    } catch (e) {
      setLoading(false);
      // alert('An error occured.');
      ShowToast('An error occured.', 'error');
      console.log(e);
    }
  }

  async function DeleteMarket(id) {
    try {
      setLoading(true);
      const url = baseUrl + 'delete_market';

      const body = new FormData();
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
        setDeleted(true);
        GetMarkets();
        setTimeout(() => {
          setDeleted(false);
          setModal_2(false);
        }, 1800);
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

  async function JoinMarket(id) {
    try {
      setLoading(true);
      const url = baseUrl + 'join_market';

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
        setJoined(true);
        setTimeout(() => {
          setJoined(false);
          setModal_2(false);
          GetMarkets();
        }, 1800);
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

  async function LeaveMarket(id) {
    try {
      setLoading(true);
      const url = baseUrl + 'leave_market';

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
        setLeave(true);
        setDeleted(true);
        setTimeout(() => {
          setLeave(false);
          setDeleted(false);
          setModal_2(false);
          GetMarkets();
        }, 1800);
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
    GetMarkets();
  }, []);

  useEffect(() => {
    const int = setInterval(() => {
      if (isFocused) GetMarkets(true);
    }, 5000);
    return () => clearInterval(int);
  }, [isFocused]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setAdd(false);
    });
    return unsubscribe;
  }, [navigation]);

  // alert(openTime);

  return (
    <View
      style={{
        backgroundColor: '#fff',
        height: 650,
        width: Dimensions.get('window').width,
      }}>
      <Statusbar
        barStyle={'dark-content'}
        backgroundColor={theme.colors.primary}
      />
      <LoadingSpinner
        textContent="Loading..."
        size={60}
        visible={loading}
        color={theme.colors.yellow}
      />

      <DatePicker
        modal
        open={open}
        date={date || new Date()}
        mode={'date'}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <DatePicker
        modal
        open={openTime_1}
        date={openTime || new Date()}
        mode={'time'}
        onConfirm={openTime => {
          setOpenTime_1(false);
          setOpenTime(openTime);
        }}
        onCancel={() => {
          setOpenTime_1(false);
        }}
      />
      <DatePicker
        modal
        open={closeTime_2}
        date={closeTime || new Date()}
        mode={'time'}
        onConfirm={closeTime => {
          setCloseTime_2(false);
          setCloseTime(closeTime);
        }}
        onCancel={() => {
          setCloseTime_2(false);
        }}
      />

      <MapView
        initialRegion={{
          latitude: MARKERS[0].latitude || 0,
          longitude: MARKERS[0].longitude || 0,
          latitudeDelta: 0.1222,
          longitudeDelta: 0.0621,
        }}
        style={{flex: 1}}>
        {Add == false ? (
          data?.map((item, index) => (
            <Marker
              onPress={() => {
                setModal_2(true);
                setSetSinglemarketdata(item);
              }}
              draggable={true}
              key={index}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
              image={
                item?.attendees.find(v => v?.id == auth?.id)
                  ? require('../../../../../assets/Joined.png')
                  : require('../../../../../assets/Deal.png')
              }
              coordinate={{
                latitude: item.lat || 0,
                longitude: item.long || 0,
              }}
            />
          ))
        ) : (
          <Marker
            coordinate={{
              latitude: MARKERS[0].latitude || 0,
              longitude: MARKERS[0].longitude || 0,
            }}
            onDragEnd={v => {
              setSelectedLat(v?.nativeEvent?.coordinate?.latitude);
              setSelectedLon(v?.nativeEvent?.coordinate?.longitude);
              setTimeout(() => {
                setModal(true);
              }, 600);
              //   console.log(auth.id);
              //   console.log(new Date());
              console.log(v?.nativeEvent?.coordinate?.latitude);
              console.log(v?.nativeEvent?.coordinate?.longitude);
            }}
            draggable
            // onDragStart={v => console.log('onDragStart', v)}
            // onSelect={v => console.log('onSelect', v)}
            // onDrag={v => console.log('onDrag', v)}
          />
        )}
      </MapView>

      <TouchableOpacity
        onPress={() => {
          setAdd(true);
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
            height: 80,
            width: 80,
            resizeMode: 'cover',
            // tintColor: theme.colors.primary,
            borderRadius: 150,
          }}
          source={require('../../../../../assets/gif/add.gif')}
        />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        visible={modal}
        onDismiss={() => {
          setModal(false);
          setSetSinglemarketdata();
        }}
        transparent
        style={{}}>
        <TouchableOpacity
          onPress={() => {
            setModal(false);
            setAdd(false);
            setSetSinglemarketdata();
          }}
          activeOpacity={1}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            backgroundColor: theme.colors.Black + '33',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: theme.colors.primary,
              width: Dimensions.get('window').width / 1.8,
              height: Dimensions.get('window').width - 120,
              alignItems: 'center',
              borderRadius: 20,
              // borderWidth: 0.4,
              borderColor: theme.colors.Light_Gray,
              // marginBottom: 45,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                borderRadius: 20,
                overflow: 'hidden',
                alignItems: 'flex-start',
              }}>
              <ScrollView style={{paddingVertical: 15}}>
                <CustomTextInput
                  View_marginTop={0}
                  paddingTop={8}
                  paddingBottom={8}
                  paddingHorizontal={0.1}
                  marginTop={0}
                  width={Dimensions.get('window').width / 2}
                  placeholder="Market Name"
                  value={market_name}
                  onChangeText={setMarket_name}
                  autoFocus={true}
                  borderWidth={1}
                  borderRadius={6}
                />
                <TouchableOpacity
                  onPress={() => setOpen(true)}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      backgroundColor: theme.colors.inputBG,
                      borderRadius: 6,
                      alignItems: 'flex-start',
                      width: Dimensions.get('window').width / 2,
                      borderWidth: 1,
                      borderColor: 'red',
                      marginTop: 10,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,

                      elevation: 2,
                      borderColor: theme.colors.C4C4C4,
                    }}>
                    {!date ? (
                      <TextFormated
                        style={{
                          fontWeight: '500',
                          paddingVertical: 10,
                          color: theme.colors.Gray,
                          flex: 1,
                          paddingHorizontal: 15,
                        }}>
                        Date
                      </TextFormated>
                    ) : (
                      <TextFormated
                        style={{
                          fontWeight: '500',
                          paddingVertical: 10,
                          color: theme.colors.Black,
                          flex: 1,
                          paddingHorizontal: 15,
                        }}>
                        {moment(date).format('ll')}
                      </TextFormated>
                    )}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setOpenTime_1(true)}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      backgroundColor: theme.colors.inputBG,
                      borderRadius: 6,
                      alignItems: 'flex-start',
                      width: Dimensions.get('window').width / 2,
                      borderWidth: 1,
                      borderColor: 'red',
                      marginTop: 10,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,

                      elevation: 2,
                      borderColor: theme.colors.C4C4C4,
                    }}>
                    {!openTime ? (
                      <TextFormated
                        style={{
                          fontWeight: '500',
                          paddingVertical: 10,
                          color: theme.colors.Gray,
                          flex: 1,
                          paddingHorizontal: 15,
                        }}>
                        Market Open Time
                      </TextFormated>
                    ) : (
                      <TextFormated
                        style={{
                          fontWeight: '500',
                          paddingVertical: 10,
                          color: theme.colors.Black,
                          flex: 1,
                          paddingHorizontal: 15,
                        }}>
                        {moment(openTime).format('LT')}
                      </TextFormated>
                    )}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setCloseTime_2(true)}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      backgroundColor: theme.colors.inputBG,
                      borderRadius: 6,
                      alignItems: 'flex-start',
                      width: Dimensions.get('window').width / 2,
                      borderWidth: 1,
                      borderColor: 'red',
                      marginTop: 10,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,

                      elevation: 2,
                      borderColor: theme.colors.C4C4C4,
                    }}>
                    {!closeTime ? (
                      <TextFormated
                        style={{
                          fontWeight: '500',
                          paddingVertical: 10,
                          color: theme.colors.Gray,
                          flex: 1,
                          paddingHorizontal: 15,
                        }}>
                        Market Close Time
                      </TextFormated>
                    ) : (
                      <TextFormated
                        style={{
                          fontWeight: '500',
                          paddingVertical: 10,
                          color: theme.colors.Black,
                          flex: 1,
                          paddingHorizontal: 15,
                        }}>
                        {moment(closeTime).format('LT')}
                      </TextFormated>
                    )}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    if (!market_name) {
                      ShowToast('Please enter your market name.', 'error');
                      return;
                    }
                    if (!date) {
                      ShowToast(
                        'Please select your market opening date.',
                        'error',
                      );
                      return;
                    }
                    if (!openTime) {
                      ShowToast(
                        'Please select your market open time.',
                        'error',
                      );
                      return;
                    }
                    if (!closeTime) {
                      ShowToast(
                        'Please select your market close time.',
                        'error',
                      );
                      return;
                    }
                    navigation.navigate('SelectProduct', {
                      market_name: market_name,
                      date: date,
                      openTime: openTime,
                      closeTime: closeTime,
                      selectedLat: selectedLat,
                      selectedLon: selectedLon,
                    });
                    setTimeout(() => {
                      setModal(false);
                      setSelectedLat();
                      setSelectedLon();
                      setDate();
                      setOpenTime();
                      setCloseTime();
                      setMarket_name();
                    }, 100);
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 10,
                    flexDirection: 'row',
                    borderRadius: 6,
                    backgroundColor: theme.colors.green,
                    // flex: 1,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                    marginVertical: 20,
                  }}>
                  <TextFormated
                    style={{
                      fontWeight: '700',
                      color: theme.colors.primary,
                      fontSize: 16,
                    }}>
                    NEXT
                  </TextFormated>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={() => {
                    AddMarket();
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 10,
                    flexDirection: 'row',
                    borderRadius: 6,
                    backgroundColor: theme.colors.green,
                    // flex: 1,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                    marginVertical: 20,
                  }}>
                  {loading ? (
                    <ActivityIndicator
                      size={'small'}
                      style={{margin: 2}}
                      color="#fff"
                    />
                  ) : (
                    <TextFormated
                      style={{
                        fontWeight: '700',
                        color: theme.colors.primary,
                        fontSize: 16,
                      }}>
                      SUBMIT
                    </TextFormated>
                  )}
                </TouchableOpacity> */}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={Modal_2}
        animationType="none"
        onDismiss={() => {
          setModal_2(false);
        }}
        transparent
        style={{}}>
        <TouchableOpacity
          onPress={() => {
            setModal_2(false);
          }}
          activeOpacity={1}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            backgroundColor: theme.colors.Black + '33',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: theme.colors.primary,
              width: Dimensions.get('window').width / 1.8,
              height: Dimensions.get('window').width - 140,
              alignItems: 'center',
              borderRadius: 20,
              borderColor: theme.colors.Light_Gray,
              // justifyContent: 'center',
              // borderWidth: 0.4,
              // marginBottom: 45,
            }}>
            {joined == false && deleted == false ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  borderRadius: 20,
                  overflow: 'hidden',
                  alignItems: 'flex-start',
                }}>
                <ScrollView style={{paddingVertical: 15}}>
                  <View
                    style={{
                      backgroundColor: theme.colors.inputBG,
                      borderRadius: 6,
                      alignItems: 'center',
                      borderColor: 'red',
                    }}>
                    <TextFormated
                      style={{
                        fontWeight: '700',
                        color: theme.colors.Black,
                        fontSize: 18,
                      }}>
                      {setSinglemarketdata?.attendees?.length}
                    </TextFormated>
                    <TextFormated
                      style={{
                        color: theme.colors.Black,
                        fontSize: 10,
                      }}>
                      Attendees
                    </TextFormated>
                  </View>
                  <CustomTextInput
                    View_marginTop={0}
                    paddingTop={8}
                    paddingBottom={8}
                    paddingHorizontal={0.1}
                    marginTop={0}
                    width={Dimensions.get('window').width / 2}
                    placeholder="Market Name"
                    value={setSinglemarketdata?.market_name}
                    // onChangeText={setPrice}
                    autoFocus={true}
                    borderWidth={1}
                    borderRadius={6}
                    editable={false}
                  />

                  <View
                    style={{
                      backgroundColor: theme.colors.inputBG,
                      borderRadius: 6,
                      alignItems: 'flex-start',
                      width: Dimensions.get('window').width / 2,
                      borderWidth: 1,
                      borderColor: 'red',
                      marginTop: 10,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,

                      elevation: 2,
                      borderColor: theme.colors.C4C4C4,
                    }}>
                    <TextFormated
                      style={{
                        fontWeight: '500',
                        paddingVertical: 10,
                        color: theme.colors.Black,
                        flex: 1,
                        paddingHorizontal: 15,
                      }}>
                      {moment(setSinglemarketdata?.date_time).format('ll')}
                    </TextFormated>
                  </View>
                  <CustomTextInput
                    View_marginTop={0}
                    paddingTop={8}
                    paddingBottom={8}
                    paddingHorizontal={0.1}
                    marginTop={0}
                    width={Dimensions.get('window').width / 2}
                    placeholder="Duration"
                    value={setSinglemarketdata?.duration}
                    autoFocus={true}
                    borderWidth={1}
                    borderRadius={6}
                    editable={false}
                  />
                  {setSinglemarketdata?.attendees.find(
                    v => v?.id == auth?.id,
                  ) ? (
                    <TouchableOpacity
                      onPress={() => {
                        LeaveMarket(setSinglemarketdata?.id);
                      }}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 10,
                        flexDirection: 'row',
                        borderRadius: 6,
                        backgroundColor: theme.colors.red,
                        // flex: 1,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                        marginVertical: 20,
                      }}>
                      {loading ? (
                        <ActivityIndicator
                          size={'small'}
                          style={{margin: 2}}
                          color="#fff"
                        />
                      ) : (
                        <TextFormated
                          style={{
                            fontWeight: '700',
                            color: theme.colors.primary,
                          }}>
                          LEAVE
                        </TextFormated>
                      )}
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        if (setSinglemarketdata?.creator_user_id != auth?.id) {
                          setLoading(true);
                          setTimeout(() => {
                            JoinMarket(setSinglemarketdata?.id);
                          }, 500);
                        } else {
                          setLoading(true);
                          setTimeout(() => {
                            DeleteMarket(setSinglemarketdata?.id);
                          }, 500);
                        }
                      }}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 10,
                        flexDirection: 'row',
                        borderRadius: 6,
                        backgroundColor:
                          setSinglemarketdata?.creator_user_id == auth?.id
                            ? theme.colors.red
                            : theme.colors.green,
                        // flex: 1,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                        marginVertical: 20,
                      }}>
                      {loading ? (
                        <ActivityIndicator
                          size={'small'}
                          style={{margin: 2}}
                          color="#fff"
                        />
                      ) : (
                        <TextFormated
                          style={{
                            fontWeight: '700',
                            color: theme.colors.primary,
                          }}>
                          {setSinglemarketdata?.creator_user_id == auth?.id
                            ? 'DELETE'
                            : 'JOIN'}
                        </TextFormated>
                      )}
                    </TouchableOpacity>
                  )}
                </ScrollView>
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  backgroundColor: theme.colors.primary,
                  width: Dimensions.get('window').width / 1.8,
                  height: Dimensions.get('window').width - 140,
                  alignItems: 'center',
                  borderRadius: 20,
                  borderColor: theme.colors.Light_Gray,
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setAdd(true);
                  }}
                  style={{
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{
                      width: Dimensions.get('window').width / 2.8,
                      height: Dimensions.get('window').width / 2.8,
                      resizeMode: 'cover',
                      // tintColor: theme.colors.primary,
                      borderRadius: 150,
                    }}
                    // source={require('../../../../../assets/gif/delete.gif')}
                    source={
                      deleted == true
                        ? require('../../../../../assets/gif/delete.gif')
                        : require('../../../../../assets/gif/Success.gif')
                    }
                  />
                  {Leave == false ? (
                    <TextFormated
                      style={{
                        fontWeight: '700',
                        color:
                          deleted == true
                            ? theme.colors.red
                            : theme.colors.green,
                        alignSelf: 'center',
                        fontSize: 20,
                        textAlign: 'center',
                      }}>
                      {deleted == true
                        ? 'Market Deleted Successfully'
                        : 'Market Joined Successfully'}
                    </TextFormated>
                  ) : (
                    <TextFormated
                      style={{
                        fontWeight: '700',
                        color:
                          deleted == true
                            ? theme.colors.red
                            : theme.colors.green,
                        alignSelf: 'center',
                        fontSize: 20,
                        textAlign: 'center',
                      }}>
                      Market Leaved Successfully
                    </TextFormated>
                  )}
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
