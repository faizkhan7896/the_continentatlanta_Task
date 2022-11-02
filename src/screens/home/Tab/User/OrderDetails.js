import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import {default as React, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Video from 'react-native-video';
import {useSelector} from 'react-redux';
import Header from '../../../../components/Header';
import SolidButton from '../../../../components/SolidButton';
import Statusbar from '../../../../components/Statusbar';
import TextFormatted, {
  default as TextFormated,
} from '../../../../components/TextFormated';
import {baseUrl} from '../../../../utils/constance';
import {theme} from '../../../../utils/theme';
import {ShowToast} from '../../../../utils/ToastFunction';

const data = [
  {
    id: '1',
    title: 'AT STORE',
  },
  {
    id: '2',
    title: 'TAKE OUT',
  },
  {
    id: '3',
    title: 'RENT',
  },
];

export default function Orders({navigation}) {
  const dimensions = useWindowDimensions();
  const {params} = useRoute();
  const auth = useSelector(state => state.auth);

  const [modalTwo, setModalTwo] = useState(false);
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [Step3, setStep3] = useState(false);

  // alert(JSON.stringify(params?.video_1));

  const videoRef = useRef(null);
  const onBuffer = e => {
    console.log('buffering ....', e);
    // alert('buttering ....', e);
  };
  const onError = e => {
    // console.log('error raised', e);
    // alert('error raised ....', e);
  };

  async function AcceptOrder(id) {
    try {
      setLoading(true);
      const url =
        baseUrl +
        'accept_cancel_status_parent_orders?status=ACCEPT&order_id=' +
        id;

      const res = await fetch(url, {
        method: 'GET',
        headers: {'Cache-Control': 'no-cache'},
      });
      console.log(res);
      const rslt = await res.json();
      console.log(rslt);

      if (rslt.success == '1') {
        // setData(rslt.post_data.reverse());
        ShowToast('Order Submitted Successfully');
        navigation.goBack();
      } else {
        ShowToast(rslt.message || 'Unknown error', 'error');
      }
    } catch (e) {
      // alert('An error occured.');
      ShowToast('An error occured.', 'error');

      console.log(e);
    }
  }

  async function CancelOrder(id) {
    try {
      setLoading(true);
      // return;
      const url =
        baseUrl + 'order_delete_by_user?user_id=' + auth.id + '&order_id=' + id;

      const res = await fetch(url, {
        method: 'GET',
        headers: {'Cache-Control': 'no-cache'},
      });
      console.log(res);
      const rslt = await res.json();
      console.log(rslt);

      if (rslt.success == '1') {
        // setData(rslt.post_data.reverse());
        ShowToast('Order Deleted Successfully');
        navigation.goBack();
      } else {
        ShowToast(rslt.message || 'Unknown error', 'error');
      }
    } catch (e) {
      // alert('An error occured.');
      ShowToast('An error occured.', 'error');

      console.log(e);
    }
  }
  const SubItem = ({onPress, text, amount}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 5,
          borderTopWidth: 0.5,
          borderColor: theme.colors.Gray,
          paddingHorizontal: 5,
        }}>
        <TextFormatted
          style={{
            fontWeight: '600',
            color: theme.colors.Black,
            fontSize: 18,
            marginTop: 10,
          }}>
          {text}
        </TextFormatted>
        <TextFormatted
          style={{
            marginTop: 10,
            fontWeight: '600',
            color: theme.colors.Black,
            fontSize: 18,
          }}>
          {amount}
        </TextFormatted>
      </View>
    );
  };

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
      <Header navigation={navigation} Headertext={'Order Details'} />
      <ScrollView>
        <View
          // onPress={() => navigation.navigate('OrderDetails')}
          style={{
            borderRadius: 12,
            backgroundColor: theme.colors.primary,
            marginHorizontal: 13,
            // flexDirection: 'row',
          }}>
          <TouchableOpacity
            // onPress={() => navigation.navigate('OrderDetails')}
            style={{
              borderRadius: 12,
              backgroundColor: theme.colors.Black,
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: theme.colors.green,
            }}>
            <View
              style={{
                backgroundColor: 'transparent',
                width: dimensions.width / 3.5,
                height: dimensions.width / 3.05,
                borderRadius: 10,
                overflow: 'hidden',
              }}>
              <ImageBackground
                source={{uri: params?.post?.image}}
                style={{
                  width: dimensions.width / 3.5,
                  height: dimensions.width / 3.05,
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
                  // flexDirection: 'row',
                  alignItems: 'flex-start',
                  // justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 19,
                    fontWeight: '600',
                    color: theme.colors.primary,
                  }}>
                  {params?.id}
                </Text>
                <View
                  style={{
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {}}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 7,
                      flexDirection: 'row',
                      borderRadius: 6,
                      backgroundColor:
                        params?.status == 'PENDING'
                          ? theme.colors.yellow
                          : params?.status == 'ACCEPT'
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
                      {params?.status}
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
                  {moment(params?.post?.date_time).format('lll')}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    paddingVertical: 7,
                    borderRadius: 6,
                    backgroundColor: 'transparent',
                    // flex: 1,
                    paddingHorizontal: 10,
                  }}></View>
                <TouchableOpacity
                  // onPress={() => CancelOrder(params?.id)}
                  activeOpacity={0.7}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 7,
                    flexDirection: 'row',
                    borderRadius: 6,
                    backgroundColor: theme.colors.red,
                    // flex: 1,
                    paddingHorizontal: 10,
                  }}>
                  {loading ? (
                    <ActivityIndicator
                      size={'small'}
                      style={{paddingHorizontal: 12}}
                      color="#fff"
                    />
                  ) : (
                    <TextFormated
                      style={{
                        fontWeight: '700',
                        color: theme.colors.primary,
                        fontSize: 10,
                        paddingVertical: 3,
                      }}>
                      CANCEL
                    </TextFormated>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
          <View style={{height: 20}} />
          {/* <SubItem text="Total" amount={'$' + } /> */}

          <View style={{marginVertical: 20}}>
            <SolidButton
              source={require('../../../../assets/ScrollDown.png')}
              backgroundColor={theme.colors.ScrollDown}
              onPress={() => {
                // if (params?.status != 'PENDING') {
                //   setStep3(!Step3);
                // } else {
                setVisible(!visible);
                // }
              }}
              marginHorizontal={0.1}
            />
          </View>
        </View>
        {visible == true && (
          <View style={{marginHorizontal: 15}}>
            {/* {params?.status == 'PENDING' && ( */}
            <View>
              {params?.sub_orders?.map((v, i) => (
                <View>
                  <View
                    style={{
                      borderRadius: 12,
                      backgroundColor: theme.colors.primary,
                      // marginHorizontal: 13,
                      marginTop: 15,
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: theme.colors.green,
                    }}>
                    {/* {alert(JSON.stringify(v.id))} */}
                    <View
                      style={{
                        backgroundColor: 'transparent',
                        width: dimensions.width / 3.5,
                        borderRadius: 10,
                        overflow: 'hidden',
                      }}>
                      <ImageBackground
                        source={{uri: params?.post?.image}}
                        style={{
                          width: dimensions.width / 3.5,
                          height: dimensions.width / 3.5,
                          backgroundColor: theme.colors.Tabbg,
                        }}
                        // imageStyle={{
                        //   borderRadius: 10,
                        //   resizeMode: 'stretch',
                        //   width:
                        //     (1 * 80) /
                        //     (parseFloat(v.image_coordinates?.position[2]) -
                        //       parseFloat(v.image_coordinates?.position[0])),
                        //   height:
                        //     (1 * 60) /
                        //     (parseFloat(v.image_coordinates?.position[3]) -
                        //       parseFloat(v.image_coordinates?.position[1])),
                        //   borderWidth: 1,
                        //   top:
                        //     -(
                        //       (dimensions.height /
                        //         15 /
                        //         (parseFloat(
                        //           v.image_coordinates?.position[3],
                        //         ) -
                        //           parseFloat(
                        //             v.image_coordinates?.position[1],
                        //           ))) *
                        //       parseFloat(v.image_coordinates?.position[1])
                        //     ) / 1,
                        //   left:
                        //     -(
                        //       ((1 * 80) /
                        //         (parseFloat(
                        //           v.image_coordinates?.position[2],
                        //         ) -
                        //           parseFloat(
                        //             v.image_coordinates?.position[0],
                        //           ))) *
                        //       parseFloat(v.image_coordinates?.position[0])
                        //     ) / 1,
                        // }}
                        imageStyle={{
                          resizeMode: 'cover',
                          borderRadius: 10,
                        }}
                      />
                    </View>
                    <View style={{paddingVertical: 10}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: dimensions.width / 1.6,
                          justifyContent: 'space-between',
                          paddingHorizontal: 15,
                        }}>
                        <View style={{}}>
                          <View style={{marginTop: 5}}>
                            <Text
                              style={{
                                fontWeight: '600',
                                color: theme.colors.Black,
                              }}>
                              Selling Price
                            </Text>
                            <View
                              style={{
                                backgroundColor: theme.colors.green + '99',
                                paddingVertical: 5,
                                borderRadius: 6,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 5,
                              }}>
                              <Text
                                style={{
                                  fontWeight: '600',
                                  color: theme.colors.Black,
                                }}>
                                {v?.price}
                              </Text>
                            </View>
                          </View>
                        </View>

                        {v.status == 'PENDING' ? (
                          <View style={{flexDirection: 'row'}}>
                            <View style={{}}>
                              <View
                              // onPress={() => UpdateOrder(v.id, 'ACCEPT')}
                              >
                                <Image
                                  source={require('../../../../assets/righticon.png')}
                                  style={{
                                    width: 30,
                                    height: 30,
                                    resizeMode: 'contain',
                                    marginTop: 15,
                                  }}
                                />
                              </View>
                            </View>
                            <View style={{width: 30}} />
                            <View style={{}}>
                              <View
                              // onPress={() => UpdateOrder(v.id, 'CANCEL')}
                              >
                                <Image
                                  source={require('../../../../assets/wrongicon.png')}
                                  style={{
                                    width: 30,
                                    height: 30,
                                    resizeMode: 'contain',
                                    marginTop: 15,
                                  }}
                                />
                              </View>
                            </View>
                          </View>
                        ) : (
                          <View
                            style={{
                              backgroundColor:
                                v?.status == 'PENDING'
                                  ? theme.colors.yellow
                                  : v?.status == 'ACCEPT'
                                  ? theme.colors.green + '99'
                                  : theme.colors.red,
                              paddingVertical: 16,
                              borderRadius: 6,
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginTop: 5,
                              paddingHorizontal: 16,
                            }}>
                            <Text
                              style={{
                                fontWeight: '600',
                                color: theme.colors.primary,
                              }}>
                              {v.status}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              ))}
              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {params?.status == 'PENDING' && (
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                      <SolidButton
                        text="Cancel all"
                        backgroundColor={theme.colors.red}
                        onPress={() => {
                          // alert(JSON.stringify(params?.item?.post_position[0].position));
                          CancelOrder(params?.id);
                        }}
                        marginHorizontal={1}
                        // loading={loading}
                      />
                    </View>
                    <View style={{flex: 0.12}} />
                    <View style={{flex: 1}}>
                      <SolidButton
                        text="SUBMIT"
                        backgroundColor={theme.colors.green}
                        onPress={() => {
                          // alert(JSON.stringify(params?.item?.post_position[0].position));
                          AcceptOrder(params?.id);
                        }}
                        marginHorizontal={1}
                        // loading={loading}
                      />
                    </View>
                  </View>
                )}
              </View>
            </View>
            <View style={{height: 20}} />
            {params?.status == 'ACCEPT' && (
              <View
                style={{
                  flex: 1,
                  backgroundColor: theme.colors.primary,
                  // marginHorizontal: 15,
                }}>
                <View
                  style={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    paddingHorizontal: 40,
                    borderRadius: 25,
                    marginBottom: 20,
                    paddingVertical: 10,
                    borderColor: theme.colors.C4C4C4,
                    marginHorizontal: 20,
                  }}>
                  <TextFormatted style={{fontSize: 18, fontWeight: '700'}}>
                    Pick Code: {params?.order_otp}
                  </TextFormatted>
                </View>
                <View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      marginVertical: 20,
                      paddingVertical: 10,
                      borderColor: theme.colors.C4C4C4,
                      backgroundColor: theme.colors.Black,
                      // marginHorizontal: 2/0,
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
                      <TextFormatted
                        style={{fontWeight: '500', paddingHorizontal: 80}}>
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
                        {params?.last_update}
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
                      <TouchableOpacity
                        onPress={() => {
                          if (
                            params?.image_1 !=
                            'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                          ) {
                            navigation.navigate('ImageZoom', {
                              image: params?.image_1,
                            });
                          }
                        }}>
                        <Image
                          // source={{uri: uri.uri}}
                          source={
                            params?.image_1 ==
                            'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                              ? require('../../../../assets/bi_camera.png')
                              : {uri: params?.image_1}
                          }
                          style={{
                            height: 30,
                            width: 30,
                            resizeMode: 'cover',
                            borderRadius: 3,
                          }}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          if (
                            params?.image_2 !=
                            'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                          ) {
                            navigation.navigate('ImageZoom', {
                              image: params?.image_2,
                            });
                          }
                        }}>
                        <Image
                          source={
                            params?.image_2 ==
                            'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                              ? require('../../../../assets/bi_camera.png')
                              : {uri: params?.image_2}
                          }
                          style={{
                            height: 30,
                            width: 30,
                            resizeMode: 'cover',
                            borderRadius: 3,
                          }}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          if (
                            params?.image_3 !=
                            'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                          ) {
                            navigation.navigate('ImageZoom', {
                              image: params?.image_3,
                            });
                          }
                        }}>
                        <Image
                          source={
                            params?.image_3 ==
                            'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                              ? require('../../../../assets/bi_camera.png')
                              : {uri: params?.image_3}
                          }
                          style={{
                            height: 30,
                            width: 30,
                            resizeMode: 'cover',
                            borderRadius: 3,
                          }}
                        />
                      </TouchableOpacity>

                      {params?.video_1 ==
                      'https://pickpic4u.com/app.pickpic4u.com/uploads/NO' ? (
                        <Image
                          source={require('../../../../assets/video.png')}
                          style={{
                            height: 30,
                            width: 30,
                            resizeMode: 'contain',
                          }}
                        />
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('FullVideo', {
                              uri: params?.video_1,
                            });
                          }}
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 3,
                          }}>
                          <Video
                            source={{uri: params?.video_1}}
                            ref={ref => (videoRef.current = ref)}
                            onBuffer={onBuffer}
                            onError={onError}
                            style={{
                              height: 40,
                              width: 40,
                              borderRadius: 3,
                            }}
                            resizeMode="cover"
                            // controls={true}
                            audioOnly={true}
                          />
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity>
                        <Image
                          source={require('../../../../assets/mic.png')}
                          style={{height: 30, width: 30, resizeMode: 'contain'}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}
            {/* )} */}
          </View>
        )}
        {/* {params?.status == 'ACCEPT' && (
          <View
            style={{
              flex: 1,
              backgroundColor: theme.colors.primary,
              marginHorizontal: 15,
            }}>
            {params?.order_otp != 'PENDING' && (
              <View
                style={{
                  alignSelf: 'center',
                  borderWidth: 1,
                  paddingHorizontal: 40,
                  borderRadius: 25,
                  marginBottom: 20,
                  paddingVertical: 10,
                  borderColor: theme.colors.C4C4C4,
                  marginHorizontal: 20,
                }}>
                <TextFormatted style={{fontSize: 18, fontWeight: '700'}}>
                  Pick Code: {params?.order_otp}
                </TextFormatted>
              </View>
            )}
            <View>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  marginVertical: 20,
                  paddingVertical: 10,
                  borderColor: theme.colors.C4C4C4,
                  backgroundColor: theme.colors.Black,
                  // marginHorizontal: 2/0,
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
                  <TextFormatted
                    style={{fontWeight: '500', paddingHorizontal: 80}}>
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
                    {params?.last_update}
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
                  <TouchableOpacity
                    onPress={() => {
                      if (
                        params?.image_1 !=
                        'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                      ) {
                        navigation.navigate('ImageZoom', {
                          image: params?.image_1,
                        });
                      }
                    }}>
                    <Image
                      // source={{uri: uri.uri}}
                      source={
                        params?.image_1 ==
                        'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                          ? require('../../../../assets/bi_camera.png')
                          : {uri: params?.image_1}
                      }
                      style={{
                        height: 30,
                        width: 30,
                        resizeMode: 'cover',
                        borderRadius: 3,
                      }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      if (
                        params?.image_2 !=
                        'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                      ) {
                        navigation.navigate('ImageZoom', {
                          image: params?.image_2,
                        });
                      }
                    }}>
                    <Image
                      source={
                        params?.image_2 ==
                        'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                          ? require('../../../../assets/bi_camera.png')
                          : {uri: params?.image_2}
                      }
                      style={{
                        height: 30,
                        width: 30,
                        resizeMode: 'cover',
                        borderRadius: 3,
                      }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      if (
                        params?.image_3 !=
                        'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                      ) {
                        navigation.navigate('ImageZoom', {
                          image: params?.image_3,
                        });
                      }
                    }}>
                    <Image
                      source={
                        params?.image_3 ==
                        'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                          ? require('../../../../assets/bi_camera.png')
                          : {uri: params?.image_3}
                      }
                      style={{
                        height: 30,
                        width: 30,
                        resizeMode: 'cover',
                        borderRadius: 3,
                      }}
                    />
                  </TouchableOpacity>

                  {params?.video_1 ==
                  'https://pickpic4u.com/app.pickpic4u.com/uploads/NO' ? (
                    <Image
                      source={require('../../../../assets/video.png')}
                      style={{
                        height: 30,
                        width: 30,
                        resizeMode: 'contain',
                      }}
                    />
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('FullVideo', {
                          uri: params?.video_1,
                        });
                      }}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 3,
                      }}>
                      <Video
                        source={{uri: params?.video_1}}
                        ref={ref => (videoRef.current = ref)}
                        onBuffer={onBuffer}
                        onError={onError}
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 3,
                        }}
                        resizeMode="cover"
                        // controls={true}
                        audioOnly={true}
                      />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity>
                    <Image
                      source={require('../../../../assets/mic.png')}
                      style={{height: 30, width: 30, resizeMode: 'contain'}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )} */}
      </ScrollView>
      <Modal
        animationType="fade"
        visible={modalTwo}
        onDismiss={() => setModalTwo(false)}
        transparent
        style={{}}>
        <TouchableOpacity
          onPress={() => setModalTwo(false)}
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
              width: Dimensions.get('window').width - 80,
              height: Dimensions.get('window').width - 200,
              alignItems: 'center',
              borderRadius: 20,
              // borderWidth: 0.4,
              // borderColor: theme.colors.Light_Gray,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                borderRadius: 20,
                overflow: 'hidden',
                alignItems: 'center',
              }}>
              <View
                style={{
                  marginHorizontal: 20,
                  // borderWidth: 1,
                  alignItems: 'center',
                }}>
                <TextFormated
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    paddingVertical: 20,
                  }}>
                  Pick Style
                </TextFormated>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  {params.post.avaibility_atstor == 'AT STORE' && (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setSelected(params.post.avaibility_atstor)}
                      style={{
                        // width: Dimensions.get('window').width / 6.9,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 10,
                        backgroundColor:
                          selected == params.post.avaibility_atstor
                            ? theme.colors.yellow
                            : theme.colors.SelectAvailablity,
                        flex: 1,
                        marginHorizontal: 15,
                      }}>
                      <TextFormated
                        style={{
                          fontWeight: '500',
                          color: theme.colors.primary,
                          fontSize: 10,
                        }}>
                        {params.post.avaibility_atstor}
                      </TextFormated>
                    </TouchableOpacity>
                  )}
                  {params.post.avaibility_tackout == 'TAKE OUT' && (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() =>
                        setSelected(params.post.avaibility_tackout)
                      }
                      style={{
                        // width: Dimensions.get('window').width / 6.9,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 10,
                        backgroundColor:
                          selected == params.post.avaibility_tackout
                            ? theme.colors.yellow
                            : theme.colors.SelectAvailablity,
                        flex: 1,
                        marginHorizontal: 15,
                      }}>
                      <TextFormated
                        style={{
                          fontWeight: '500',
                          color: theme.colors.primary,
                          fontSize: 10,
                        }}>
                        {params.post.avaibility_tackout}
                      </TextFormated>
                    </TouchableOpacity>
                  )}

                  {params.post.avaibility_delivery == 'DELIVERY' && (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() =>
                        setSelected(params.post.avaibility_delivery)
                      }
                      style={{
                        // width: Dimensions.get('window').width / 6.9,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 10,
                        backgroundColor:
                          selected == params.post.avaibility_delivery
                            ? theme.colors.yellow
                            : theme.colors.SelectAvailablity,
                        flex: 1,
                        marginHorizontal: 15,
                      }}>
                      <TextFormated
                        style={{
                          fontWeight: '500',
                          color: theme.colors.primary,
                          fontSize: 10,
                        }}>
                        {params.post.avaibility_delivery}
                      </TextFormated>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  // AddProduct();
                  setModalTwo(false);
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 15,
                  borderRadius: 6,
                  backgroundColor: theme.colors.green,
                  flex: 1,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                  marginHorizontal: 15,
                }}>
                {loading ? (
                  <ActivityIndicator
                    size={'small'}
                    style={{margin: 2}}
                    color="#fff"
                  />
                ) : (
                  <TextFormated
                    style={{fontWeight: '700', color: theme.colors.primary}}>
                    OK
                  </TextFormated>
                )}
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
