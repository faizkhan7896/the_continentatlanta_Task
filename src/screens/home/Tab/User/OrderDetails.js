import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import {
  default as React,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import {
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
// import Sound from 'react-native-sound';
import {createThumbnail} from 'react-native-create-thumbnail';
import Button from '../../../../components/Button';
import {launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker, {types} from 'react-native-document-picker';
import {ActivityIndicator} from 'react-native-paper';
import RNLocation from 'react-native-location';
import Geolocation from '@react-native-community/geolocation';
const Sound = require('react-native-sound');

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
  const [Accept_loading, setAccept_Loading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [Step3, setStep3] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [playing_2, setPlaying_2] = useState(false);
  const [playing_3, setPlaying_3] = useState(false);
  const [audioloading, setAudioloading] = useState(false);
  const [audioloading_2, setAudioloading_2] = useState(false);
  const [audioloading_3, setAudioloading_3] = useState(false);
  const [thumb, setThumb] = useState();
  const soundPlaying = useRef();
  const soundPlaying_2 = useRef();
  const soundPlaying_3 = useRef();
  const videoRef = useRef(null);
  const [delay, setDelay] = useState(+'600');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [modalThree, setModalThree] = useState(false);
  const [currentID, setCurrentID] = useState(0);
  const [uri, setUri] = useState('');
  const [data, setData] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [location, setLocation] = useState('');

  // console.log(location);
  // alert(JSON.stringify(location));

  const currentLocation = async () => {
    await RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
      },
    });
    Geolocation.getCurrentPosition(async info => {
      setLongitude(info.coords.longitude);
      setLatitude(info.coords.latitude);
      const url =
        'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
        info.coords.latitude +
        ',' +
        info.coords.longitude +
        '&key=AIzaSyCj_8-SZsoxYxZwN_Wi_7hU8kDSeQx_YVQ';
      try {
        const res = await fetch(url);

        const json = await res.json();
        setLocation(json.results[0]?.formatted_address);
      } catch (e) {
        ShowToast(e.toString());
      }
    }, console.warn);
  };

  useEffect(() => {
    currentLocation();
    const timer = setInterval(() => {
      startTransition(() => {
        setDelay(delay - 1);
        setMinutes(Math.floor(delay / 60));
        setSeconds(Math.floor(delay % 60));
      });
    }, 1000);

    if (delay === 0) {
      clearInterval(timer);
      // alert('first');
    }

    return () => {
      clearInterval(timer);
    };
  });
  async function GetProduct(silent = false) {
    try {
      if (!silent) {
        setLoading(true);
      }
      const url = baseUrl + 'get_post_order?id=' + params?.id;
      console.log(url);

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      console.log(res);
      const rslt = await res.json();
      console.log(rslt);

      if (rslt.success == '1') {
        setData(rslt.order_data.reverse());
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

  const play = () => {
    if (!params?.audio_1) {
      return;
    }
    setAudioloading(true);

    soundPlaying.current = new Sound(
      {
        uri: params?.audio_1,
      },
      error => {
        if (error)
          ShowToast('failed to load the sound ' + params?.audio_1, 'error');
        console.log(error, params?.audio_1);
        setAudioloading(false);
        setPlaying(true);
        soundPlaying.current.play(() => setPlaying(false));
      },
    );
  };
  const pause = () => {
    soundPlaying.current.pause();
    setPlaying(false);
  };

  const play_2 = () => {
    if (!params?.package_audio_1) {
      return;
    }
    setAudioloading_2(true);

    soundPlaying_2.current = new Sound(
      {
        uri: params?.package_audio_1,
      },
      error => {
        if (error)
          ShowToast(
            'failed to load the sound ' + params?.package_audio_1,
            'error',
          );
        console.log(error, params?.package_audio_1);
        setAudioloading_2(false);
        setPlaying_2(true);
        soundPlaying_2.current.play(() => setPlaying_2(false));
      },
    );
  };
  const pause_2 = () => {
    soundPlaying_2.current.pause();
    setPlaying_2(false);
  };

  const play_3 = () => {
    if (!data[0]?.received_paid_audio_1) {
      return;
    }
    setAudioloading_3(true);

    soundPlaying_3.current = new Sound(
      {
        uri: data[0]?.received_paid_audio_1,
      },
      error => {
        if (error)
          ShowToast(
            'failed to load the sound ' + data[0]?.received_paid_audio_1,
            'error',
          );
        console.log(error, data[0]?.received_paid_audio_1);
        setAudioloading_3(false);
        setPlaying_3(true);
        soundPlaying_3.current.play(() => setPlaying_3(false));
      },
    );
  };
  const pause_3 = () => {
    soundPlaying_3.current.pause();
    setPlaying_3(false);
  };

  async function generateThumbnail() {
    try {
      const response = await createThumbnail({
        url: params?.video_1,
      });
      setThumb(response.path);
      console.log('response', response.path);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    {
      params?.video_1 != '' ||
        ('https://pickpic4u.com/app.pickpic4u.com/uploads/NO' &&
          generateThumbnail());
    }
    GetProduct();
  }, []);

  async function AcceptOrder(id) {
    try {
      setAccept_Loading(true);
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
        setAccept_Loading(false);
      } else {
        setAccept_Loading(false);
        ShowToast(rslt.message || 'Unknown error', 'error');
      }
    } catch (e) {
      setAccept_Loading(false);
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

  async function Add_Recieved_Image_1(uri) {
    try {
      const url = baseUrl + 'received_paid_update_order_image1';

      const body = new FormData();

      body.append('order_id', params?.id);
      body.append('received_paid_lat', latitude);
      body.append('received_paid_lon', longitude);
      body.append('received_paid_address', location);
      body.append('image_1', {
        uri: uri.uri,
        type: uri.type,
        name: uri.fileName,
      });
      console.log(body);

      console.log('JSON.stringify(body)', JSON.stringify(body));
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
        setCurrentID(0);
        setUri('');
        GetProduct(true);
        ShowToast('Image added successfully');
      } else {
        ShowToast(rslt.message || 'Unknown error', 'error');
      }
    } catch (e) {
      // alert('An error occured.');
      ShowToast('An error occured.', 'error');

      console.log(e);
    }
  }

  async function Add_Recieved_Image_2(uri) {
    try {
      const url = baseUrl + 'received_paid_update_order_image2';

      console.log(url);
      const body = new FormData();

      body.append('order_id', params?.id);
      body.append('received_paid_lat', latitude);
      body.append('received_paid_lon', longitude);
      body.append('received_paid_address', location);
      body.append('image_2', {
        uri: uri.uri,
        type: uri.type,
        name: uri.fileName,
      });
      // return;

      console.log('JSON.stringify(body)', JSON.stringify(body));
      // console.log(body);
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
        setCurrentID(0);
        setUri('');
        GetProduct(true);
        ShowToast('Image added successfully');
      } else {
        ShowToast(rslt.message || 'Unknown error', 'error');
      }
    } catch (e) {
      // alert('An error occured.');
      ShowToast('An error occured.', 'error');

      console.log(e);
    }
  }

  async function Add_Recieved_Image_3(uri) {
    try {
      const url = baseUrl + 'received_paid_update_order_image3';
      console.log(url);

      const body = new FormData();

      body.append('order_id', params?.id);
      body.append('received_paid_lat', latitude);
      body.append('received_paid_lon', longitude);
      body.append('received_paid_address', location);
      body.append('image_3', {
        uri: uri.uri,
        type: uri.type,
        name: uri.fileName,
      });
      // console.log(body);

      console.log('JSON.stringify(body)', JSON.stringify(body));
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
        setCurrentID(0);
        setUri('');
        GetProduct(true);
        ShowToast('Image added successfully');
      } else {
        ShowToast(rslt.message || 'Unknown error', 'error');
      }
    } catch (e) {
      // alert('An error occured.');
      ShowToast('An error occured.', 'error');

      console.log(e);
    }
  }

  async function Add_Recieved_Video(video) {
    try {
      const url = baseUrl + 'received_paid_video_1';
      console.log(url);
      console.log(Package_currentID);

      const body = new FormData();

      body.append('order_id', Package_currentID);
      body.append('received_paid_lat', latitude);
      body.append('received_paid_lon', longitude);
      body.append('received_paid_address', location);
      const urlComponents = video?.uri.split('/');
      const fileNameAndExtension = urlComponents[urlComponents?.length - 1];
      const destPath = `${RNFS?.TemporaryDirectoryPath}/${fileNameAndExtension}`;
      await RNFS.copyFile(video?.uri, destPath);
      // alert('file://' + destPath);

      console.log('file://' + destPath);

      body.append('video_1', {
        name: 'video.mp4',
        uri: 'file://' + destPath,
        type: video.type,
      });

      console.log('JSON.stringify(body)', JSON.stringify(body));
      return;
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
        setCurrentID(0);
        setUri('');
        setVideo('');
        GetProduct(true);
        ShowToast('Video added successfully');
      } else {
        ShowToast(rslt.message || 'Unknown error', 'error');
      }
    } catch (e) {
      // alert('An error occured.');
      // ShowToast('An error occured, Upload video again ', 'error');

      console.log(e);
    }
  }

  async function Add_Recieved_Audio(orderID, name, uri, type) {
    try {
      const url = baseUrl + 'received_paid_update_order_audio1';
      console.log(url);

      const body = new FormData();

      body.append('order_id', orderID);
      body.append('received_paid_lat', latitude);
      body.append('received_paid_lon', longitude);
      body.append('received_paid_address', location);
      body.append('audio_1', {
        name: name,
        uri: uri,
        type: type,
      });

      console.log('JSON.stringify(body)', JSON.stringify(body));
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
        ShowToast('Audio uploaded successfully');
      } else {
        ShowToast(rslt.message || 'Unknown error', 'error');
      }
    } catch (e) {
      // alert('An error occured.');
      // ShowToast('An error occured, Upload video again ', 'error');

      console.log(e);
    }
  }

  const pickImage = () => {
    launchImageLibrary({quality: 1, mediaType: 'photo'}, response => {
      if (!response.didCancel) {
        setUri(response.assets[0]);
        console.log('Product', uri);
        setModalThree(false);
        if (currentID == 1) {
          setTimeout(() => {
            Add_Recieved_Image_1(response.assets[0]);
          }, 500);
        }
        if (currentID == 2) {
          setTimeout(() => {
            Add_Recieved_Image_2(response.assets[0]);
          }, 500);
        }
        if (currentID == 3) {
          setTimeout(() => {
            Add_Recieved_Image_3(response.assets[0]);
          }, 500);
        }
      }
    });
  };

  const picCamera = () => {
    launchCamera({quality: 1, mediaType: 'photo'}, response => {
      if (!response.didCancel) {
        setUri(response.assets[0]);
        console.log('Product', uri);
        setModalThree(false);
        if (currentID == 1) {
          setTimeout(() => {
            Add_Recieved_Image_1(response.assets[0]);
          }, 500);
        }
        if (currentID == 2) {
          setTimeout(() => {
            Add_Recieved_Image_2(response.assets[0]);
          }, 500);
        }
        if (currentID == 3) {
          setTimeout(() => {
            Add_Recieved_Image_3(response.assets[0]);
          }, 500);
        }
      }
    });
  };

  const Add_Package_Audio = useCallback(async () => {
    try {
      if (data[0]?.received_paid_audio_1 == '') {
        const response = await DocumentPicker.pick({
          presentationStyle: 'fullScreen',
          type: [types.audio],
        });

        // setFileResponse(response);
        Add_Recieved_Audio(
          data[0]?.id,
          response[0]?.name,
          response[0]?.uri,
          response[0]?.type,
        );
        GetProduct(true);
      } else {
        ShowToast('An error occurred', 'error');
      }
    } catch (err) {
      console.warn(err);
    }
  }, []);

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
                  backgroundColor: theme.colors.Tabbg + '33',
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
              </View>
            </View>
          </TouchableOpacity>
          <View style={{height: 20}} />

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
                        imageStyle={{
                          borderRadius: 10,
                          resizeMode: 'contain',
                          width:
                            (1 * 80) /
                            (parseFloat(v.image_coordinates?.position[2]) -
                              parseFloat(v.image_coordinates?.position[0])),
                          height:
                            (1 * 110) /
                            (parseFloat(v.image_coordinates?.position[3]) -
                              parseFloat(v.image_coordinates?.position[1])),
                          borderWidth: 1,
                          top:
                            -(
                              (dimensions.height /
                                15 /
                                (parseFloat(v.image_coordinates?.position[3]) -
                                  parseFloat(
                                    v.image_coordinates?.position[1],
                                  ))) *
                              parseFloat(v.image_coordinates?.position[1])
                            ) / 1,
                          left:
                            -(
                              ((1 * 60) /
                                (parseFloat(v.image_coordinates?.position[2]) -
                                  parseFloat(
                                    v.image_coordinates?.position[0],
                                  ))) *
                              parseFloat(v.image_coordinates?.position[0])
                            ) / 1,
                        }}
                        // imageStyle={{
                        //   resizeMode: 'cover',
                        //   borderRadius: 10,
                        // }}
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

                        {/* {v.status == 'PENDING' ? ( */}
                        <View style={{flexDirection: 'row'}}>
                          <View style={{}}>
                            <View
                            // onPress={() => UpdateOrder(v.id, 'ACCEPT')}
                            >
                              <Image
                                source={require('../../../../assets/righticon.png')}
                                style={{
                                  width: 33,
                                  height: 33,
                                  resizeMode: 'contain',
                                  marginTop: 15,
                                  tintColor:
                                    v?.status == 'ACCEPT'
                                      ? theme.colors.green
                                      : theme.colors.Black,
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
                                  tintColor:
                                    v?.status == 'CANCEL'
                                      ? theme.colors.red
                                      : theme.colors.Black,
                                }}
                              />
                            </View>
                          </View>
                        </View>
                        {/* ) : (
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
                        )} */}
                      </View>
                    </View>
                  </View>
                </View>
              ))}
              <SubItem text="Total" amount={'$' + params?.total_price} />

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
                        loading={loading}
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
                        loading={Accept_loading}
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

                {params?.contains_status == 'contains' && (
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
                          source={{uri: params?.post?.image}}
                          style={{
                            height: 60,
                            width: 60,
                            resizeMode: 'cover',
                            backgroundColor: theme.colors.Tabbg + '33',
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
                              backgroundColor:
                                params?.image_1 ==
                                'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                                  ? theme.colors.Black
                                  : theme.colors.Tabbg + '33',
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
                              backgroundColor:
                                params?.image_2 ==
                                'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                                  ? theme.colors.Black
                                  : theme.colors.Tabbg + '33',
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
                              backgroundColor:
                                params?.image_3 ==
                                'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                                  ? theme.colors.Black
                                  : theme.colors.Tabbg + '33',
                            }}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            if (
                              params?.video_1 !=
                              'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                            ) {
                              navigation.navigate('FullVideo', {
                                uri: params?.video_1,
                              });
                            }
                          }}
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor:
                              params?.video_1 ==
                              'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                                ? theme.colors.Black
                                : theme.colors.Tabbg + '33',
                            height: 30,
                            width: 30,
                            borderRadius: 5,
                          }}>
                          <Image
                            source={
                              params?.video_1 ==
                              'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                                ? require('../../../../assets/video.png')
                                : {uri: thumb}
                            }
                            style={{
                              height: 30,
                              width: 30,
                              resizeMode: 'cover',
                              borderRadius: 3,
                            }}
                          />
                        </TouchableOpacity>

                        {audioloading ? (
                          <ActivityIndicator
                            size={'small'}
                            style={{}}
                            color="#fff"
                          />
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              playing ? pause() : play();
                            }}>
                            <Image
                              source={
                                params?.audio_1 ==
                                'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                                  ? require('../../../../assets/mic.png')
                                  : playing
                                  ? require('../../../../assets/pause.png')
                                  : require('../../../../assets/play.png')
                              }
                              style={{
                                height: 30,
                                width: 30,
                                resizeMode: 'cover',
                                borderRadius: 3,
                              }}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </View>
                )}
                {params?.package_status == 'package' && (
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      marginTop: 20,
                      marginBottom: 40,
                      paddingVertical: 10,
                      borderColor: theme.colors.C4C4C4,
                      backgroundColor: theme.colors.Black,
                      flex: 1,
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
                        backgroundColor: theme.colors.red,
                      }}>
                      <TextFormatted
                        style={{fontWeight: '500', paddingHorizontal: 80}}>
                        Package Ready
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
                        source={{uri: params?.post?.image}}
                        style={{
                          height: 60,
                          width: 60,
                          resizeMode: 'cover',
                          borderRadius: 50,
                          backgroundColor: theme.colors.Tabbg + '33',
                          marginRight: 20,
                        }}
                      />
                      <View
                        style={{
                          alignItems: 'center',
                          width: dimensions.width / 2.5,
                          marginRight: dimensions.width / 8,
                        }}>
                        <TextFormatted
                          style={{
                            fontSize: 16,
                            fontWeight: '700',
                            color: theme.colors.primary,
                          }}>
                          {params?.package_time}
                        </TextFormatted>
                        <TouchableOpacity
                          onPress={() => {
                            if (
                              data[0]?.package_lat == '' &&
                              data[0]?.package_lon == ''
                            ) {
                              ShowToast('Location not available', 'error');
                              return;
                            } else {
                              navigation.navigate('MapScreen', {
                                lat: data[0]?.package_lat,
                                log: data[0]?.package_lon,
                              });
                            }
                          }}>
                          <Image
                            source={require('../../../../assets/gps.png')}
                            style={{
                              height: 60,
                              width: 90,
                              resizeMode: 'contain',
                              // marginRight: 20,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={{alignItems: 'center'}}>
                        <Image
                          source={require('../../../../assets/clock.png')}
                          style={{
                            height: 40,
                            width: 40,
                            resizeMode: 'contain',
                            borderRadius: 50,
                            // marginHorizontal: 20,
                          }}
                        />
                        {params?.received_paid_status == '' && (
                          <TextFormatted
                            style={{
                              fontWeight: '700',
                              color: theme.colors.primary,
                            }}>
                            {minutes < 10 ? '0' + minutes : minutes}:
                            {seconds < 10
                              ? '0' + (delay == 0 ? '0' : seconds)
                              : delay == 0
                              ? '00'
                              : seconds}
                          </TextFormatted>
                        )}
                      </View>
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
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor:
                            params?.package_image_1 == ''
                              ? theme.colors.Black
                              : theme.colors.Tabbg + '33',
                          height: 30,
                          width: 30,
                          borderRadius: 5,
                        }}
                        onPress={() => {
                          if (params?.package_image_1 != '') {
                            navigation.navigate('ImageZoom', {
                              image: params?.package_image_1,
                            });
                          }
                        }}>
                        <Image
                          // source={{uri: uri.uri}}
                          source={
                            params?.package_image_1 == ''
                              ? require('../../../../assets/bi_camera.png')
                              : {uri: params?.package_image_1}
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
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor:
                            params?.package_image_2 == ''
                              ? theme.colors.Black
                              : theme.colors.Tabbg + '33',
                          height: 30,
                          width: 30,
                          borderRadius: 5,
                        }}
                        onPress={() => {
                          if (params?.package_image_2 != '') {
                            navigation.navigate('ImageZoom', {
                              image: params?.package_image_2,
                            });
                          }
                        }}>
                        <Image
                          source={
                            params?.package_image_2 == ''
                              ? require('../../../../assets/bi_camera.png')
                              : {uri: params?.package_image_2}
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
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor:
                            params?.package_image_3 == ''
                              ? theme.colors.Black
                              : theme.colors.Tabbg + '33',
                          height: 30,
                          width: 30,
                          borderRadius: 5,
                        }}
                        onPress={() => {
                          if (params?.package_image_3 != '') {
                            navigation.navigate('ImageZoom', {
                              image: params?.package_image_3,
                            });
                          }
                        }}>
                        <Image
                          source={
                            params?.package_image_3 == ''
                              ? require('../../../../assets/bi_camera.png')
                              : {uri: params?.package_image_3}
                          }
                          style={{
                            height: 30,
                            width: 30,
                            resizeMode: 'cover',
                            borderRadius: 3,
                          }}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => {}}>
                        {params?.package_video_1 == '' ? (
                          <Image
                            source={require('../../../../assets/video.png')}
                            style={{
                              height: 30,
                              width: 30,
                              resizeMode: 'contain',
                            }}
                          />
                        ) : (
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: theme.colors.Tabbg + '33',
                              height: 30,
                              width: 30,
                              borderRadius: 5,
                            }}>
                            {/* <Video
                              paused={true}
                              source={
                                params?.package_video_1 ==
                                'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                                  ? {uri: video?.uri}
                                  : {uri: params?.package_video_1}
                              }
                              ref={ref => (videoRef.current = ref)}
                              onBuffer={onBuffer}
                              onError={onError}
                              style={{
                                height: 30,
                                width: 30,
                                borderRadius: 3,
                              }}
                              resizeMode="cover"
                              // play
                            /> */}
                          </View>
                        )}
                      </TouchableOpacity>

                      {audioloading_2 ? (
                        <ActivityIndicator
                          size={'small'}
                          style={{paddingHorizontal: 5}}
                          color="#fff"
                        />
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            if (params?.package_audio_1 != '') {
                              playing_2 ? pause_2() : play_2();
                            }
                          }}>
                          <Image
                            // source={require('../../../../assets/mic.png')}
                            source={
                              params?.package_audio_1 == ''
                                ? require('../../../../assets/mic.png')
                                : playing_2
                                ? require('../../../../assets/pause.png')
                                : require('../../../../assets/play.png')
                            }
                            style={{
                              height: 30,
                              width: 30,
                              resizeMode: 'contain',
                            }}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                )}
                {params?.received_paid_status == 'received_paid' && (
                  <View>
                    <View
                      style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        marginVertical: 20,
                        paddingVertical: 10,
                        borderColor: theme.colors.C4C4C4,
                        backgroundColor: theme.colors.Black,
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
                          backgroundColor: theme.colors.red,
                        }}>
                        <TextFormatted
                          style={{fontWeight: '500', paddingHorizontal: 80}}>
                          Recieved & Paid
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
                          source={{uri: params?.post?.image}}
                          style={{
                            height: 60,
                            width: 60,
                            resizeMode: 'cover',
                            borderRadius: 50,
                            marginRight: 20,
                            backgroundColor: theme.colors.Tabbg + '33',
                          }}
                        />
                        <View style={{alignItems: 'center'}}>
                          <TextFormatted
                            style={{
                              fontSize: 16,
                              fontWeight: '700',
                              color: theme.colors.primary,
                            }}>
                            {data[0]?.received_and_paid_time == 'NO'
                              ? 'Details will add its time'
                              : data[0]?.received_and_paid_time}
                          </TextFormatted>
                          <TouchableOpacity
                            onPress={() => {
                              if (
                                data[0]?.received_paid_lat == '' &&
                                data[0]?.received_paid_lon == ''
                              ) {
                                ShowToast('Location not available', 'error');
                                return;
                              } else {
                                navigation.navigate('MapScreen', {
                                  lat: data[0]?.received_paid_lat,
                                  log: data[0]?.received_paid_lon,
                                });
                              }
                            }}>
                            <Image
                              source={require('../../../../assets/gps.png')}
                              style={{
                                height: 60,
                                width: 90,
                                resizeMode: 'contain',
                                marginRight: 20,
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                        <Image
                          source={require('../../../../assets/clock.png')}
                          style={{
                            height: 40,
                            width: 40,
                            resizeMode: 'contain',
                            borderRadius: 50,
                            marginLeft: 20,
                            opacity: 0,
                          }}
                        />
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
                          // onPress={() => Add_Recieved_Image_1()}
                          onPress={() => {
                            if (data[0]?.received_paid_image_1 == '') {
                              setModalThree(true);
                              setCurrentID(1);
                            } else {
                              navigation.navigate('ImageZoom', {
                                image: data[0]?.received_paid_image_1,
                              });
                            }
                          }}>
                          <Image
                            source={
                              data[0]?.received_paid_image_1 == ''
                                ? require('../../../../assets/bi_camera.png')
                                : {uri: data[0]?.received_paid_image_1}
                            }
                            style={{
                              height: 30,
                              width: 30,
                              resizeMode: 'cover',
                              backgroundColor:
                                data[0]?.received_paid_image_1 == ''
                                  ? theme.colors.Black
                                  : theme.colors.Tabbg + '33',
                              borderRadius: 5,
                            }}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          // onPress={() => Add_Recieved_Image_2()}
                          onPress={() => {
                            if (data[0]?.received_paid_image_2 == '') {
                              setModalThree(true);
                              setCurrentID(2);
                            } else {
                              navigation.navigate('ImageZoom', {
                                image: data[0]?.received_paid_image_2,
                              });
                            }
                          }}>
                          <Image
                            source={
                              data[0]?.received_paid_image_2 == ''
                                ? require('../../../../assets/bi_camera.png')
                                : {uri: data[0]?.received_paid_image_2}
                            }
                            style={{
                              height: 30,
                              width: 30,
                              resizeMode: 'cover',
                              backgroundColor:
                                data[0]?.received_paid_image_2 == ''
                                  ? theme.colors.Black
                                  : theme.colors.Tabbg + '33',
                              borderRadius: 5,
                            }}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          // onPress={() => Add_Recieved_Image_3()}
                          onPress={() => {
                            if (data[0]?.received_paid_image_3 == '') {
                              setModalThree(true);
                              setCurrentID(3);
                            } else {
                              navigation.navigate('ImageZoom', {
                                image: data[0]?.received_paid_image_3,
                              });
                            }
                          }}>
                          <Image
                            source={
                              data[0]?.received_paid_image_3 == ''
                                ? require('../../../../assets/bi_camera.png')
                                : {uri: data[0]?.received_paid_image_3}
                            }
                            style={{
                              height: 30,
                              width: 30,
                              resizeMode: 'cover',
                              backgroundColor:
                                data[0]?.received_paid_image_3 == ''
                                  ? theme.colors.Black
                                  : theme.colors.Tabbg + '33',
                              borderRadius: 5,
                            }}
                          />
                        </TouchableOpacity>
                        <Image
                          source={require('../../../../assets/video.png')}
                          style={{height: 30, width: 30, resizeMode: 'contain'}}
                        />
                        {audioloading_3 ? (
                          <ActivityIndicator
                            size={'small'}
                            style={{paddingHorizontal: 5}}
                            color="#fff"
                          />
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              if (data[0]?.received_paid_audio_1 == '') {
                                Add_Package_Audio();
                              } else {
                                playing_3 ? pause_3() : play_3();
                              }
                            }}>
                            <Image
                              // source={require('../../../../../assets/mic.png')}
                              source={
                                data[0]?.received_paid_audio_1 == ''
                                  ? require('../../../../assets/mic.png')
                                  : playing_3
                                  ? require('../../../../assets/pause.png')
                                  : require('../../../../assets/play.png')
                              }
                              style={{
                                height: 30,
                                width: 30,
                                resizeMode: 'contain',
                              }}
                            />
                          </TouchableOpacity>
                        )}
                      </View>

                      <View style={{alignItems: 'center', marginTop: 20}}>
                        <TextFormatted
                          style={{
                            fontWeight: '500',
                            color: theme.colors.primary,
                          }}>
                          Total Cost:{' '}
                          <TextFormatted
                            style={{
                              fontSize: 16,
                              fontWeight: '700',
                              color: theme.colors.primary,
                            }}>
                            ¥ {params?.total_price}
                          </TextFormatted>
                        </TextFormatted>
                        <TouchableOpacity
                          onPress={() => navigation.navigate('Payment')}
                          activeOpacity={0.7}>
                          <Image
                            source={require('../../../../assets/qr.png')}
                            style={{
                              height: 110,
                              width: 110,
                              resizeMode: 'contain',
                              marginTop: 10,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Payment')}
                        activeOpacity={0.7}
                        style={{
                          backgroundColor: theme.colors.Tabbg,
                          alignSelf: 'center',
                          paddingHorizontal: 15,
                          paddingVertical: 8,
                          borderRadius: 10,
                          marginTop: 10,
                        }}>
                        <TextFormatted
                          style={{fontSize: 16, fontWeight: '700'}}>
                          Pay By Code
                        </TextFormatted>
                      </TouchableOpacity>
                      <View
                        style={{
                          backgroundColor: theme.colors.C4C4C4,
                          height: 1,
                          marginHorizontal: 20,
                          marginTop: 20,
                        }}
                      />
                      <View style={{alignItems: 'center', marginTop: 20}}>
                        <Image
                          source={require('../../../../assets/qr.png')}
                          style={{
                            height: 110,
                            width: 110,
                            resizeMode: 'contain',
                            marginTop: 10,
                          }}
                        />
                      </View>
                      {/* <View
                        style={{
                          backgroundColor: theme.colors.Tabbg,
                          alignSelf: 'center',
                          paddingHorizontal: 15,
                          paddingVertical: 8,
                          borderRadius: 10,
                          marginTop: 10,
                        }}>
                        <TextFormatted
                          style={{fontSize: 16, fontWeight: '700'}}>
                          Pay By Code
                        </TextFormatted>
                      </View> */}
                      <View style={{height: 30}} />
                      <SolidButton
                        borderRadius={50}
                        text={'Payment Completed'}
                        backgroundColor={theme.colors.green}
                        marginHorizontal={40}
                      />
                      <View style={{height: 30}} />
                    </View>

                    <View
                      style={{
                        marginTop: 20,
                        marginBottom: 50,
                      }}>
                      <SolidButton
                        borderRadius={50}
                        text={'Order Completed'}
                        backgroundColor={theme.colors.green}
                      />
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>
        )}
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

      <Modal
        animationType="slide"
        visible={modalThree}
        onDismiss={() => setModalThree(false)}
        transparent
        style={{}}>
        <TouchableOpacity
          onPress={() => {
            setModalThree(false);
            setCurrentID(0);
          }}
          activeOpacity={1}
          style={{
            justifyContent: 'flex-end',
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
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').width - 200,
              // alignItems: 'center',
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
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: Dimensions.get('window').width / 2,
                }}>
                <TouchableOpacity
                  onPress={() => picCamera()}
                  style={{alignItems: 'center'}}>
                  <Image
                    style={{height: 50, width: 50, resizeMode: 'contain'}}
                    source={require('../../../../assets/Open_Camera.png')}
                  />
                  <TextFormated
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      paddingVertical: 8,
                    }}>
                    Camera
                  </TextFormated>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => pickImage()}
                  style={{alignItems: 'center'}}>
                  <Image
                    style={{height: 50, width: 50, resizeMode: 'contain'}}
                    source={require('../../../../assets/gallery.png')}
                  />
                  <TextFormated
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      paddingVertical: 8,
                    }}>
                    Liabrary
                  </TextFormated>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginHorizontal: 20, marginBottom: 15}}>
              <Button
                onPress={() => {
                  setCurrentID(0);
                  setModalThree(false);
                }}
                ButtonText={'CANCEL'}
                paddingVertical={15}
              />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
