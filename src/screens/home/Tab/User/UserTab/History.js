import moment from 'moment';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Video from 'react-native-video';
import {useSelector} from 'react-redux';
import Button from '../../../../../components/Button';
import LoadingSpinner from '../../../../../components/LoadingSpinner';
import SolidButton from '../../../../../components/SolidButton';
import {
  default as TextFormated,
  default as TextFormatted,
} from '../../../../../components/TextFormated';
import {baseUrl} from '../../../../../utils/constance';
import {theme} from '../../../../../utils/theme';
import {ShowToast} from '../../../../../utils/ToastFunction';
var RNFS = require('react-native-fs');
import DocumentPicker, {types} from 'react-native-document-picker';
import {ActivityIndicator} from 'react-native-paper';
const Sound = require('react-native-sound');
import RNLocation from 'react-native-location';
import Geolocation from '@react-native-community/geolocation';
import ImagePicker from 'react-native-image-picker';
import {RefreshControl} from 'react-native-web-refresh-control';

export default function History({navigation, setGet_followed_event}) {
  const dimensions = useWindowDimensions();

  const auth = useSelector(state => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [uri, setUri] = useState('');
  const [modalThree, setModalThree] = useState(false);
  const [currentID, setCurrentID] = useState(0);
  const [Package_currentID, setPackage_CurrentID] = useState();
  const [orderID, setOrderID] = useState(0);
  const [video, setVideo] = useState('');
  const videoRef = useRef(null);
  const [thumb, setThumb] = useState();
  const [productstatus, setproductstatus] = useState([]);
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  // alert(JSON.stringify(latitude));
  const [Accept_loading, setAccept_Loading] = useState(false);
  const [isFocused, setIsFocused] = useState(true);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    GetProduct(true);
  }, []);

  async function GetProduct(silent = false) {
    try {
      if (!silent) {
        setLoading(true);
      }
      const url = baseUrl + 'get_post_order?user_id=' + auth.id;
      // console.log(url);

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

      // ShowToast(JSON.stringify(info.coords));
      const url =
        'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
        info.coords.latitude +
        ',' +
        info.coords.longitude +
        '&key=AIzaSyCj_8-SZsoxYxZwN_Wi_7hU8kDSeQx_YVQ';
      try {
        // setLoading(true);
        const res = await fetch(url);
        // console.log(res);

        const json = await res.json();
        // console.log(json);
        setLocation(json.results[0]?.formatted_address);
      } catch (e) {
        // setLoading(false);
        ShowToast(e.toString());
      }
    }, console.warn);
  };

  useEffect(() => {
    GetProduct();
    currentLocation();
  }, []);

  async function UpdateOrder(id, type, ParentID) {
    try {
      setLoading(true);
      const url =
        baseUrl +
        'update_status_post_by_owner?id=' +
        id +
        '&type=' +
        type +
        '&parent_id=' +
        ParentID;
      console.log('update_status_post_by_owner', url);

      const res = await fetch(url, {
        method: 'GET',
        headers: {'Cache-Control': 'no-cache'},
      });
      console.log(res);
      const rslt = await res.json();
      console.log(rslt);

      if (rslt.success == '1') {
        setLoading(false);
        GetProduct(true);
        // UpdateOrder(ParentID, 'ACCEPT');
      } else {
        ShowToast(rslt.message || 'Unknown error', 'error');
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      ShowToast('An error occured.', 'error');

      console.log(e);
    }
  }
  async function SubmitAvailablity(order_id, status) {
    try {
      setLoading(true);
      const url =
        baseUrl +
        'accept_cancel_status_sub_orders?order_id=' +
        order_id +
        '&status=' +
        status;
      console.log('accept_cancel_status_sub_orders', url);
      // return;

      const res = await fetch(url, {
        method: 'GET',
        headers: {'Cache-Control': 'no-cache'},
      });
      console.log(res);
      const rslt = await res.json();
      console.log(rslt);

      if (rslt.success == '1') {
        setLoading(false);
        GetProduct(true);
        // UpdateOrder(ParentID, 'ACCEPT');
      } else {
        ShowToast(rslt.message || 'Unknown error', 'error');
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      ShowToast('An error occured.', 'error');

      console.log(e);
    }
  }

  async function AddPackage_Audio(orderID, name, uri, type) {
    try {
      const url = baseUrl + 'package_update_order_audio1';
      console.log(url);

      const body = new FormData();

      body.append('order_id', orderID);
      body.append('package_address', location);
      body.append('package_lat', latitude);
      body.append('package_lon', longitude);
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

  async function UpdateSubOrder(order_id, status) {
    try {
      setLoading(true);
      const url =
        baseUrl +
        'accept_cancel_status_sub_orders?order_id=' +
        order_id +
        '&status=CANCEL';
      console.log('accept_cancel_status_sub_orders', url);
      // return;

      const res = await fetch(url, {
        method: 'GET',
        headers: {'Cache-Control': 'no-cache'},
      });
      console.log(res);
      const rslt = await res.json();
      console.log(rslt);

      if (rslt.success == '1') {
        setLoading(false);
        GetProduct(true);
        // UpdateOrder(ParentID, 'ACCEPT');
      } else {
        ShowToast(rslt.message || 'Unknown error', 'error');
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      ShowToast('An error occured.', 'error');

      console.log(e);
    }
  }

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
        setAccept_Loading(false);
        onRefresh();
      } else {
        onRefresh();
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
        onRefresh();
      } else {
        onRefresh();
        ShowToast(rslt.message || 'Unknown error', 'error');
      }
    } catch (e) {
      // alert('An error occured.');
      ShowToast('An error occured.', 'error');

      console.log(e);
    }
  }

  useEffect(() => {
    const int = setInterval(() => {
      if (isFocused) GetProduct(true);
    }, 5000);
    return () => clearInterval(int);
  }, [isFocused]);

  var now = '02:00:00';
  var then = '01:50:00';

  var ms = moment(now, 'HH:mm:ss').diff(moment(then, 'HH:mm:ss'));
  var d = moment.duration(ms);
  var s = moment(d).minutes('hh:mm:ss');

  // console.log(s);

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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginVertical: 0}}
        // style={{flex: 1}}
        renderItem={({item, index}) => (
          <OrderItem
            item={item}
            UpdateOrder={UpdateOrder}
            uri={uri}
            setModalThree={setModalThree}
            setCurrentID={setCurrentID}
            currentID={currentID}
            setOrderID={setOrderID}
            video={video}
            videoRef={videoRef}
            setproductstatus={setproductstatus}
            SubmitAvailablity={SubmitAvailablity}
            GetProduct={GetProduct}
            AddPackage_Audio={AddPackage_Audio}
            UpdateSubOrder={UpdateSubOrder}
            AcceptOrder={AcceptOrder}
            CancelOrder={CancelOrder}
            Accept_loading={Accept_loading}
            loading={loading}
            location={location}
            latitude={latitude}
            longitude={longitude}
            setUri={setUri}
            navigation={navigation}
            auth={auth}
          />
        )}
      />

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
            setOrderID(0);
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
                    source={require('../../../../../assets/Open_Camera.png')}
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
                    source={require('../../../../../assets/gallery.png')}
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
                  setOrderID(0);
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

function OrderItem({
  item,
  setModalThree,
  setCurrentID,
  video,
  navigation,
  videoRef,
  AddAudio,
  GetProduct,
  AddPackage_Audio,
  auth,
  UpdateSubOrder,
  AcceptOrder,
  CancelOrder,
  Accept_loading,
  currentID,
  location,
  latitude,
  longitude,
  setUri,
}) {
  const dimensions = useWindowDimensions();

  const [visible, setVisible] = useState(false);
  const [Step3, setStep3] = useState(false);
  const [status, setStatus] = useState({});
  const [fileResponse, setFileResponse] = useState([]);
  const [thumb, setThumb] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [playing_2, setPlaying_2] = useState(false);
  const [playing_3, setPlaying_3] = useState(false);
  const [audioloading, setAudioloading] = useState(false);
  const [audioloading_2, setAudioloading_2] = useState(false);
  const [audioloading_3, setAudioloading_3] = useState(false);
  const soundPlaying = useRef();
  const soundPlaying_2 = useRef();
  const soundPlaying_3 = useRef();
  const [delay, setDelay] = useState(+600);

  const [minutes, setMinutes] = useState(0);
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [TimerStart, setTimerStart] = useState();
  // console.log('item?.video_1', TimerStart);
  // alert(JSON.stringify(item?.package_status));
  const [relode, setRelode] = useState({});

  useEffect(() => {
    // if (item?.package_status == 'package') {
    const timer = setInterval(() => {
      setTimerStart(true);
      startTransition(() => {
        setDelay(delay - 1);
        setMinutes(Math.floor(delay / 60));
        setSeconds(Math.floor(delay % 60));
      });
    }, 1000);

    if (delay === 0) {
      clearInterval(timer);
      // console.log('Completed');
      setTimerStart(false);
    }

    return () => {
      clearInterval(timer);
      // alert('Second');
    };
    // }
  }, [delay]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRelode({});
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  var now = new Date();
  var then = item?.package_timer;

  var ms = moment(now).diff(moment(then));

  const Timer = moment.utc(ms >= 0 ? 0 : Math.abs(ms)).format('mm:ss');

  async function UpdateOrderTracking(status) {
    try {
      const url =
        baseUrl +
        'update_proccess_status?id=' +
        item?.id +
        '&proccess_status=' +
        status;
      console.log('update_status_post_by_owner', url);

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
      ShowToast('An error occured.', 'error');

      console.log(e);
    }
  }

  const play = () => {
    if (!item?.audio_1) {
      return;
    }
    setAudioloading(true);

    soundPlaying.current = new Sound(
      {
        uri: item?.audio_1,
      },
      error => {
        if (error)
          ShowToast('failed to load the sound ' + item?.audio_1, 'error');
        console.log(error, item?.audio_1);
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
    if (!item?.package_audio_1) {
      return;
    }
    setAudioloading_2(true);

    soundPlaying_2.current = new Sound(
      {
        uri: item?.package_audio_1,
      },
      error => {
        if (error)
          ShowToast(
            'failed to load the sound ' + item?.package_audio_1,
            'error',
          );
        console.log(error, item?.package_audio_1);
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
    if (!item?.received_paid_audio_1) {
      return;
    }
    setAudioloading_3(true);

    soundPlaying_3.current = new Sound(
      {
        uri: item?.received_paid_audio_1,
      },
      error => {
        if (error)
          ShowToast(
            'failed to load the sound ' + item?.received_paid_audio_1,
            'error',
          );
        console.log(error, item?.received_paid_audio_1);
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
      console.log(url);
      const body = new FormData();

      body.append('order_id', item?.id);
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

      body.append('order_id', item?.id);
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

      body.append('order_id', item?.id);
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
      const url = baseUrl + 'received_paid_update_order_video1';
      console.log(url);
      // console.log(Package_currentID);

      const body = new FormData();

      body.append('order_id', item?.id);
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

  async function Upload_Recieved_Audio(uri) {
    try {
      const url = baseUrl + 'received_paid_update_order_audio1';
      console.log(url);

      const body = new FormData();

      body.append('order_id', item?.id);
      body.append('received_paid_lat', latitude);
      body.append('received_paid_lon', longitude);
      body.append('received_paid_address', location);
      body.append('audio_1', {
        name: uri?.name,
        uri: uri?.uri,
        type: uri?.type,
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
        GetProduct(true);
      } else {
        ShowToast(rslt.message || 'Unknown error', 'error');
      }
    } catch (e) {
      // alert('An error occured.');
      // ShowToast('An error occured, Upload video again ', 'error');

      console.log(e);
    }
  }

  const Add_Recieved_Audio = useCallback(async () => {
    try {
      if (item?.received_paid_audio_1 == '') {
        const response = await DocumentPicker.pick({
          presentationStyle: 'fullScreen',
          type: [types.audio],
        });
        Upload_Recieved_Audio(response[0]);

        // Upload_Recieved_Audio(
        //   item?.id,
        //   response[0]?.name,
        //   response[0]?.uri,
        //   response[0]?.type,
        // );
      } else {
        ShowToast('An error occurred', 'error');
      }
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const picRecievedCamera = () => {
    console.log('currentID', currentID);
    launchCamera({quality: 1, mediaType: 'photo'}, response => {
      if (!response?.didCancel) {
        // setUri(response.assets[0]);
        console.log('response?.assets[0]', response?.assets[0]);
        setModalThree(false);
        if (currentID == 1) {
          Add_Recieved_Image_1(response?.assets[0]);
        }
        if (currentID == 2) {
          Add_Recieved_Image_2(response?.assets[0]);
        }
        if (currentID == 3) {
          Add_Recieved_Image_3(response?.assets[0]);
        }
      }
    });
  };
  const requestCameraPermission_Two = async () => {
    if (Platform.OS === 'ios') {
      picRecievedCamera(id);
      return;
    }
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Tap Tak Camera Permission',
          message:
            'Truventorm needs access to your camera ' +
            'to set profile picture.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        console.log(currentID);

        picRecievedCamera(id);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const pickPackageVideo = () => {
    launchCamera({quality: 1, mediaType: 'video'}, response => {
      if (!response?.didCancel) {
        console.log(response?.assets[0]);
        Add_Recieved_Video(response?.assets[0]);
      }
    });
  };

  const onBuffer = e => {
    console.log('buffering ....', e);
    // alert('buttering ....', e);
  };

  const onError = e => {
    // console.log('error raised', e);
    // alert('error raised ....', e);
  };

  const requestCameraVideoPermission = async () => {
    if (Platform.OS === 'ios') {
      pickPackageVideo();
      return;
    }
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Truventorm Camera Permission',
          message:
            'Truventorm needs access to your camera ' +
            'to set profile picture.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        pickPackageVideo();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View
      style={{
        borderRadius: 12,
        backgroundColor: theme.colors.primary,
        marginHorizontal: 13,
        marginVertical: 15,
      }}>
      <View
        style={{
          borderRadius: 12,
          backgroundColor: theme.colors.Black,
          // marginHorizontal: 13,
          // marginVertical: 15,
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
              activeOpacity={1}
              style={{
                backgroundColor:
                  item?.status == 'PENDING'
                    ? theme.colors.yellow
                    : item?.status == 'ACCEPT'
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
                {item.status}
              </Text>
            </TouchableOpacity>
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
                LIKE {item.post?.like || '0'}
              </TextFormated>
            </View>

            <View style={{width: 7}} />

            <View
              onPress={() => {}}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 10,
                flexDirection: 'row',
                borderRadius: 6,
                backgroundColor: theme.colors.primary,
                flex: 1,
              }}>
              <TextFormated
                style={{
                  fontWeight: '500',
                  color: theme.colors.Black,
                  fontSize: 10,
                }}>
                ASK {item.post?.ask || '0'}
              </TextFormated>
            </View>

            <View style={{width: 7}} />

            <View
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
                ORDER {item.post?.order || '0'}
              </TextFormated>
            </View>

            <View style={{width: 7}} />

            <View
              onPress={() => {}}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 10,
                flexDirection: 'row',
                borderRadius: 6,
                backgroundColor: theme.colors.primary,
                flex: 1,
              }}>
              <TextFormated
                style={{
                  fontWeight: '500',
                  color: theme.colors.Black,
                  fontSize: 10,
                }}>
                RENT {item.post?.rent || '0'}
              </TextFormated>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 15,
        }}>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            flexDirection: 'row',
            borderRadius: 6,
            backgroundColor:
              item.post.avaibility_atstor == 'AT STORE'
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
            Hand To Hand
          </TextFormated>
        </TouchableOpacity>

        <View style={{width: 10}} />

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            // ShowToast('This feature will come in future update');
            // return;
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            flexDirection: 'row',
            borderRadius: 6,
            backgroundColor:
              item.post.avaibility_tackout == 'TAKE OUT'
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
          activeOpacity={1}
          onPress={() => {
            // ShowToast('This feature will come in future update');
            // return;
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            flexDirection: 'row',
            borderRadius: 6,
            backgroundColor:
              item.post.avaibility_delivery == 'DELIVERY'
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

      <View style={{marginVertical: 20}}>
        <SolidButton
          source={require('../../../../../assets/gif/down.gif')}
          rotate={visible == true && '180deg'}
          paddingVertical={7}
          backgroundColor={theme.colors.ScrollDown}
          onPress={() => {
            setVisible(!visible);
          }}
          marginHorizontal={0.1}
          img_height={24}
          img_width={24}
        />
      </View>
      {/* )} */}
      {visible == true && (
        <View>
          {/* {item?.status == 'PENDING' && ( */}
          <View>
            {item?.sub_orders?.map((v, i) => (
              <View>
                <View
                  style={{
                    borderRadius: 12,
                    backgroundColor:
                      v.status == 'CANCEL'
                        ? theme.colors.C4C4C4
                        : theme.colors.primary,
                    // marginHorizontal: 13,
                    // marginTop: 15,
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
                      source={{uri: item?.post?.image}}
                      style={{
                        width: dimensions.width / 3.5,
                        height: dimensions.width / 3.5,
                        backgroundColor: theme.colors.Tabbg,
                      }}
                      imageStyle={{
                        borderRadius: 10,
                        resizeMode: 'stretch',
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
                                parseFloat(v.image_coordinates?.position[1]))) *
                            parseFloat(v.image_coordinates?.position[1])
                          ) / 1,
                        left:
                          -(
                            ((1 * 60) /
                              (parseFloat(v.image_coordinates?.position[2]) -
                                parseFloat(v.image_coordinates?.position[0]))) *
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
                              source={require('../../../../../assets/righticon.png')}
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
                              source={require('../../../../../assets/wrongicon.png')}
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
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 7,
                    marginBottom: 15,
                  }}>
                  <View style={{flex: 1}} />
                  <SolidButton
                    text="Cancel"
                    backgroundColor={theme.colors.red}
                    onPress={() => {
                      UpdateSubOrder(v.id);
                    }}
                    marginHorizontal={1}
                    fontSize={10}
                    paddingHorizontal={10}
                    paddingVertical={10}
                  />
                </View>
              </View>
            ))}
          </View>
          <SubItem text="Total" amount={'¥' + item?.total_price} />

          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {item?.status == 'PENDING' && (
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <SolidButton
                    text="Cancel Order"
                    backgroundColor={theme.colors.red}
                    onPress={() => {
                      // alert(JSON.stringify(item?.item?.post_position[0].position));
                      CancelOrder(item?.id);
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
                      // alert(JSON.stringify(item?.item?.post_position[0].position));
                      AcceptOrder(item?.id);
                    }}
                    marginHorizontal={1}
                    loading={Accept_loading}
                  />
                </View>
              </View>
            )}
          </View>

          {/* {item?.status == 'PENDING' && (
            <View style={{marginTop: 20}}>
              <SolidButton
                text="SUBMIT"
                backgroundColor={
                  item?.status == 'PENDING'
                    ? theme.colors.green
                    : theme.colors.Gray
                }
                onPress={() => {
                  // alert(JSON.stringify(item?.item?.post_position[0].position));
                  SubmitAvailablity(
                    Object.keys(status).join(','),
                    Object.values(status).join(','),
                  );
                }}
                marginHorizontal={1}
                // loading={loading}
              />
            </View>
          )} */}
          {item?.order_otp != 'PENDING' && (
            <View style={{marginVertical: 20}}>
              <SolidButton
                source={require('../../../../../assets/gif/down.gif')}
                rotate={Step3 == true && '180deg'}
                paddingVertical={7}
                backgroundColor={theme.colors.ScrollDown}
                onPress={() => {
                  if (item?.video_1 != 'https://pickpic4u.com/uploads/NO') {
                    setStep3(!Step3);
                    item?.video_1;
                  } else {
                    setStep3(!Step3);
                  }
                }}
                marginHorizontal={0.1}
              />
            </View>
          )}
        </View>
      )}
      {Step3 == true && (
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.primary,
          }}>
          {item?.order_otp != 'PENDING' && (
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
                Pick Code: {item?.order_otp}
              </TextFormatted>
            </View>
          )}
          {item?.contains_status == 'contains' && (
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
                    backgroundColor:
                      item?.package_status == 'package'
                        ? theme.colors.green
                        : theme.colors.yellow,
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
                    source={{uri: item?.post?.image}}
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
                    numberOfLines={1}
                    style={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: theme.colors.primary,
                    }}>
                    {item?.contains_time == 'NO' ? '' : item?.contains_time}
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
                      if (item?.image_1 != 'https://pickpic4u.com/uploads/NO') {
                        navigation.navigate('ImageZoom', {
                          image: item?.image_1,
                        });
                      }
                    }}>
                    <Image
                      // source={{uri: uri.uri}}
                      source={
                        item?.image_1 == 'https://pickpic4u.com/uploads/NO'
                          ? require('../../../../../assets/bi_camera.png')
                          : {uri: item?.image_1}
                      }
                      style={{
                        height: 30,
                        width: 30,
                        resizeMode: 'cover',
                        borderRadius: 3,
                        backgroundColor:
                          item?.image_1 == 'https://pickpic4u.com/uploads/NO'
                            ? theme.colors.Black
                            : theme.colors.Tabbg + '33',
                      }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      if (item?.image_2 != 'https://pickpic4u.com/uploads/NO') {
                        navigation.navigate('ImageZoom', {
                          image: item?.image_2,
                        });
                      }
                    }}>
                    <Image
                      source={
                        item?.image_2 == 'https://pickpic4u.com/uploads/NO'
                          ? require('../../../../../assets/bi_camera.png')
                          : {uri: item?.image_2}
                      }
                      style={{
                        height: 30,
                        width: 30,
                        resizeMode: 'cover',
                        borderRadius: 3,
                        backgroundColor:
                          item?.image_2 == 'https://pickpic4u.com/uploads/NO'
                            ? theme.colors.Black
                            : theme.colors.Tabbg + '33',
                      }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      if (item?.image_3 != 'https://pickpic4u.com/uploads/NO') {
                        navigation.navigate('ImageZoom', {
                          image: item?.image_3,
                        });
                      }
                    }}>
                    <Image
                      source={
                        item?.image_3 == 'https://pickpic4u.com/uploads/NO'
                          ? require('../../../../../assets/bi_camera.png')
                          : {uri: item?.image_3}
                      }
                      style={{
                        height: 30,
                        width: 30,
                        resizeMode: 'cover',
                        borderRadius: 3,
                        backgroundColor:
                          item?.image_3 == 'https://pickpic4u.com/uploads/NO'
                            ? theme.colors.Black
                            : theme.colors.Tabbg + '33',
                      }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      if (item?.video_1 != 'https://pickpic4u.com/uploads/NO') {
                        navigation.navigate('FullVideo', {
                          uri: item?.video_1,
                        });
                      }
                    }}>
                    <Image
                      source={
                        item?.video_1 == 'https://pickpic4u.com/uploads/NO'
                          ? require('../../../../../assets/video.png')
                          : require('../../../../../assets/VideoDefault.png')
                      }
                      style={{
                        height: 30,
                        width: 30,
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>

                  {/* <TouchableOpacity
                    onPress={() => {
                      if (item?.video_1 != 'https://pickpic4u.com/uploads/NO') {
                        navigation.navigate('FullVideo', {
                          uri: item?.video_1,
                        });
                      }
                    }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        item?.video_1 == 'https://pickpic4u.com/uploads/NO'
                          ? theme.colors.Black
                          : theme.colors.Tabbg + '33',
                      height: 30,
                      width: 30,
                      borderRadius: 5,
                    }}>
                    <Image
                      source={
                        item?.video_1 == 'https://pickpic4u.com/uploads/NO'
                          ? require('../../../../../assets/video.png')
                          : {uri: thumb}
                      }
                      style={{
                        height: 30,
                        width: 30,
                        resizeMode: 'cover',
                        borderRadius: 3,
                      }}
                    />
                  </TouchableOpacity> */}

                  {audioloading ? (
                    <ActivityIndicator size={'small'} style={{}} color="#fff" />
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        playing ? pause() : play();
                      }}>
                      <Image
                        source={
                          item?.audio_1 == 'https://pickpic4u.com/uploads/NO'
                            ? require('../../../../../assets/mic.png')
                            : playing
                            ? require('../../../../../assets/pause.png')
                            : require('../../../../../assets/play.png')
                        }
                        style={{
                          height: 30,
                          width: 30,
                          resizeMode: 'contain',
                          borderRadius: 3,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          )}

          {item?.package_status == 'package' && (
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
                  backgroundColor:
                    item?.received_paid_status == 'received_paid'
                      ? theme.colors.green
                      : theme.colors.yellow,
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
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: item?.post?.image}}
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
                      // width: dimensions.width / 2,
                      // marginRight: dimensions.width / 8,
                    }}>
                    <TextFormatted
                      numberOfLines={1}
                      style={{
                        maxWidth: dimensions.width / 2,
                        fontSize: 16,
                        fontWeight: '700',
                        color: theme.colors.primary,
                        // backgroundColor: theme.colors.yellow,
                      }}>
                      {/* {item?.package_time} */}
                      {item?.package_time == 'NO' ? '' : item?.package_time}
                    </TextFormatted>
                    <TouchableOpacity
                      onPress={() => {
                        if (
                          item?.package_lat == '' &&
                          item?.package_lon == ''
                        ) {
                          ShowToast('Location not available', 'error');
                          return;
                        } else {
                          navigation.navigate('MapScreen', {
                            lat: item?.package_lat,
                            log: item?.package_lon,
                          });
                        }
                      }}>
                      <Image
                        source={require('../../../../../assets/gps.png')}
                        style={{
                          height: 40,
                          width: 60,
                          resizeMode: 'contain',
                          // marginRight: 20,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{alignItems: 'center'}}>
                  <Image
                    source={require('../../../../../assets/clock.png')}
                    style={{
                      height: 40,
                      width: 40,
                      resizeMode: 'contain',
                      borderRadius: 50,
                      // marginHorizontal: 20,
                    }}
                  />
                  {item?.received_paid_status == '' ? (
                    <TextFormatted
                      style={{
                        fontWeight: '700',
                        color: theme.colors.primary,
                      }}>
                      {Timer}
                    </TextFormatted>
                  ) : (
                    <TextFormatted
                      style={{
                        fontWeight: '700',
                        color: theme.colors.primary,
                      }}>
                      00:00
                    </TextFormatted>
                  )}
                  {/* {item?.received_paid_status == '' && (
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
                  )} */}
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
                      item?.package_image_1 == ''
                        ? theme.colors.Black
                        : theme.colors.Tabbg + '33',
                    height: 30,
                    width: 30,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    if (item?.package_image_1 != '') {
                      navigation.navigate('ImageZoom', {
                        image: item?.package_image_1,
                      });
                    }
                  }}>
                  <Image
                    // source={{uri: uri.uri}}
                    source={
                      item?.package_image_1 == ''
                        ? require('../../../../../assets/bi_camera.png')
                        : {uri: item?.package_image_1}
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
                      item?.package_image_2 == ''
                        ? theme.colors.Black
                        : theme.colors.Tabbg + '33',
                    height: 30,
                    width: 30,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    if (item?.package_image_2 != '') {
                      navigation.navigate('ImageZoom', {
                        image: item?.package_image_2,
                      });
                    }
                  }}>
                  <Image
                    source={
                      item?.package_image_2 == ''
                        ? require('../../../../../assets/bi_camera.png')
                        : {uri: item?.package_image_2}
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
                      item?.package_image_3 == ''
                        ? theme.colors.Black
                        : theme.colors.Tabbg + '33',
                    height: 30,
                    width: 30,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    if (item?.package_image_3 != '') {
                      navigation.navigate('ImageZoom', {
                        image: item?.package_image_3,
                      });
                    }
                  }}>
                  <Image
                    source={
                      item?.package_image_3 == ''
                        ? require('../../../../../assets/bi_camera.png')
                        : {uri: item?.package_image_3}
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
                    if (item?.package_video_1 != '') {
                      navigation.navigate('FullVideo', {
                        uri: item?.package_video_1,
                      });
                    }
                  }}>
                  <Image
                    source={
                      item?.package_video_1 == ''
                        ? require('../../../../../assets/video.png')
                        : require('../../../../../assets/VideoDefault.png')
                    }
                    style={{
                      height: 30,
                      width: 30,
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={() => {}}>
                  {item?.package_video_1 == '' ? (
                    <Image
                      source={  item?.received_paid_video_1 == ''
                          ? require('../../../../../assets/video.png')
                          : require('../../../../../assets/VideoDefault.png')
                      }
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
                     
                    </View>
                  )}
                </TouchableOpacity> */}

                {audioloading_2 ? (
                  <ActivityIndicator
                    size={'small'}
                    style={{paddingHorizontal: 5}}
                    color="#fff"
                  />
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      if (item?.package_audio_1 != '') {
                        playing_2 ? pause_2() : play_2();
                      }
                    }}>
                    <Image
                      // source={require('../../../../../assets/mic.png')}
                      source={
                        item?.package_audio_1 == ''
                          ? require('../../../../../assets/mic.png')
                          : playing_2
                          ? require('../../../../../assets/pause.png')
                          : require('../../../../../assets/play.png')
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
          {item?.received_paid_status == 'received_paid' && (
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
                    backgroundColor:
                      item?.payment_status == 'DONE'
                        ? theme.colors.green
                        : theme.colors.yellow,
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
                    source={{uri: item?.post?.image}}
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
                      numberOfLines={1}
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: theme.colors.primary,
                      }}>
                      {item?.received_and_paid_time == 'NO'
                        ? ''
                        : item?.received_and_paid_time}
                    </TextFormatted>
                    <TouchableOpacity
                      onPress={() => {
                        if (
                          item?.received_paid_lat == '' &&
                          item?.received_paid_lon == ''
                        ) {
                          ShowToast('Location not available', 'error');
                          return;
                        } else {
                          navigation.navigate('MapScreen', {
                            lat: item?.received_paid_lat,
                            log: item?.received_paid_lon,
                          });
                        }
                      }}>
                      <Image
                        source={require('../../../../../assets/gps.png')}
                        style={{
                          height: 40,
                          width: 60,
                          resizeMode: 'contain',
                          marginRight: 20,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <Image
                    source={require('../../../../../assets/clock.png')}
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
                      if (item?.received_paid_image_1 == '') {
                        // setModalThree(true);
                        requestCameraPermission_Two();
                        setCurrentID(1);
                      } else {
                        navigation.navigate('ImageZoom', {
                          image: item?.received_paid_image_1,
                        });
                      }
                    }}>
                    <Image
                      source={
                        item?.received_paid_image_1 == ''
                          ? require('../../../../../assets/bi_camera.png')
                          : {uri: item?.received_paid_image_1}
                      }
                      style={{
                        height: 30,
                        width: 30,
                        resizeMode: 'cover',
                        backgroundColor:
                          item?.received_paid_image_1 == ''
                            ? theme.colors.Black
                            : theme.colors.Tabbg + '33',
                        borderRadius: 5,
                      }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    // onPress={() => Add_Recieved_Image_2()}
                    onPress={() => {
                      if (item?.received_paid_image_2 == '') {
                        // setModalThree(true);
                        requestCameraPermission_Two();
                        setCurrentID(2);
                      } else {
                        navigation.navigate('ImageZoom', {
                          image: item?.received_paid_image_2,
                        });
                      }
                    }}>
                    <Image
                      source={
                        item?.received_paid_image_2 == ''
                          ? require('../../../../../assets/bi_camera.png')
                          : {uri: item?.received_paid_image_2}
                      }
                      style={{
                        height: 30,
                        width: 30,
                        resizeMode: 'cover',
                        backgroundColor:
                          item?.received_paid_image_2 == ''
                            ? theme.colors.Black
                            : theme.colors.Tabbg + '33',
                        borderRadius: 5,
                      }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    // onPress={() => Add_Recieved_Image_3()}
                    onPress={() => {
                      if (item?.received_paid_image_3 == '') {
                        // setModalThree(true);

                        requestCameraPermission_Two();
                        setCurrentID(3);
                      } else {
                        navigation.navigate('ImageZoom', {
                          image: item?.received_paid_image_3,
                        });
                      }
                    }}>
                    <Image
                      source={
                        item?.received_paid_image_3 == ''
                          ? require('../../../../../assets/bi_camera.png')
                          : {uri: item?.received_paid_image_3}
                      }
                      style={{
                        height: 30,
                        width: 30,
                        resizeMode: 'cover',
                        backgroundColor:
                          item?.received_paid_image_3 == ''
                            ? theme.colors.Black
                            : theme.colors.Tabbg + '33',
                        borderRadius: 5,
                      }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      if (item?.received_paid_video_1 == '') {
                        requestCameraVideoPermission();
                        // setPackage_CurrentID(item?.id);
                      } else {
                        navigation.navigate('FullVideo', {
                          uri: item?.received_paid_video_1,
                        });
                      }
                    }}>
                    <Image
                      source={
                        item?.received_paid_video_1 == ''
                          ? require('../../../../../assets/video.png')
                          : require('../../../../../assets/VideoDefault.png')
                      }
                      style={{
                        height: 30,
                        width: 30,
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>

                  {audioloading_3 ? (
                    <ActivityIndicator
                      size={'small'}
                      style={{paddingHorizontal: 5}}
                      color="#fff"
                    />
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        if (item?.received_paid_audio_1 == '') {
                          Add_Recieved_Audio();
                        } else {
                          playing_3 ? pause_3() : play_3();
                        }
                      }}>
                      <Image
                        // source={require('../../../../../assets/mic.png')}
                        source={
                          item?.received_paid_audio_1 == ''
                            ? require('../../../../../assets/mic.png')
                            : playing_3
                            ? require('../../../../../assets/pause.png')
                            : require('../../../../../assets/play.png')
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

                <View
                  style={{
                    alignItems: 'center',
                    marginTop: 20,
                    // backgroundColor: 'green',
                  }}>
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
                      ¥ {item?.total_price}
                    </TextFormatted>
                  </TextFormatted>
                </View>
                <View
                  style={{
                    backgroundColor: theme.colors.C4C4C4,
                    height: 1,
                    marginHorizontal: 20,
                    marginTop: 20,
                  }}
                />

                <TouchableOpacity
                  style={{alignItems: 'center'}}
                  onPress={() => {
                    if (item?.payment_status == 'WAIT') {
                      navigation.navigate('Scanner', item);
                    } else {
                      ShowToast('Payment Completed');
                    }
                  }}>
                  <Image
                    source={require('../../../../../assets/qr.png')}
                    style={{
                      height: 110,
                      width: 110,
                      resizeMode: 'contain',
                      marginTop: 10,
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  // onPress={() => navigation.navigate('Payment')}
                  onPress={() => {
                    if (item?.payment_status == 'WAIT') {
                      navigation.navigate('Scanner', item);
                    } else {
                      ShowToast('Payment Completed');
                    }
                  }}
                  style={{
                    backgroundColor: theme.colors.Tabbg,
                    alignSelf: 'center',
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    borderRadius: 10,
                    marginTop: 10,
                  }}>
                  <TextFormatted style={{fontSize: 16, fontWeight: '700'}}>
                    Pay By Code
                  </TextFormatted>
                </TouchableOpacity>

                {/* <View style={{alignItems: 'center', marginTop: 20}}>
                  <Image
                    source={
                      item?.qr_code
                        ? {uri: item?.qr_code}
                        : require('../../../../../assets/qr.png')
                    }
                    style={{
                      height: 110,
                      width: 110,
                      resizeMode: 'contain',
                      marginTop: 10,
                      borderRadius: 10,
                    }}
                  />
                </View> */}
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
                {item?.payment_status == 'DONE' && (
                  <View style={{height: 30}} />
                )}
                {item?.payment_status == 'DONE' && (
                  <SolidButton
                    borderRadius={50}
                    text={'Payment Completed'}
                    backgroundColor={theme.colors.green}
                    marginHorizontal={40}
                    activeOpacity={1}
                  />
                )}
                <View style={{height: 30}} />
              </View>

              {item?.payment_status == 'DONE' && (
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
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
}
