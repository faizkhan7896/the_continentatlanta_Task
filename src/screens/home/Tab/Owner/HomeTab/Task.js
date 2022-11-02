import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
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

export default function History({navigation, setGet_followed_event}) {
  const dimensions = useWindowDimensions();

  const auth = useSelector(state => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [uri, setUri] = useState('');
  const [modalThree, setModalThree] = useState(false);
  const [currentID, setCurrentID] = useState(0);
  const [orderID, setOrderID] = useState(0);
  const [video, setVideo] = useState('');
  // alert(JSON.stringify(video.uri));
  const videoRef = useRef(null);

  const [productstatus, setproductstatus] = useState([]);
  // alert(JSON.stringify(productstatus));

  async function GetProduct(silent = false) {
    try {
      if (!silent) {
        setLoading(true);
      }
      const url = baseUrl + 'get_post_order?user_id=' + auth.id;
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

  useEffect(() => {
    GetProduct();
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
  // alert(JSON.stringify(auth.id));
  // alert(JSON.stringify(currentID));

  async function AddImage_1(uri) {
    try {
      const url = baseUrl + 'update_order_image1';

      const body = new FormData();

      body.append('order_id', orderID);
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

  async function AddImage_2(uri) {
    try {
      const url = baseUrl + 'update_order_image2';

      console.log(url);
      const body = new FormData();

      body.append('order_id', orderID);
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

  async function AddImage_3(uri) {
    try {
      const url = baseUrl + 'update_order_image3';
      console.log(url);

      const body = new FormData();

      body.append('order_id', orderID);
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
  async function AddVideo(video) {
    try {
      const url = baseUrl + 'update_order_video1';
      console.log(url);

      const body = new FormData();

      body.append('order_id', orderID);
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

  const pickImage = () => {
    launchImageLibrary({quality: 1, mediaType: 'photo'}, response => {
      if (!response.didCancel) {
        setUri(response.assets[0]);
        console.log('Product', uri);
        setModalThree(false);
        if (currentID == 1) {
          setTimeout(() => {
            AddImage_1(response.assets[0]);
          }, 500);
        }
        if (currentID == 2) {
          setTimeout(() => {
            AddImage_2(response.assets[0]);
          }, 500);
        }
        if (currentID == 3) {
          setTimeout(() => {
            AddImage_3(response.assets[0]);
          }, 500);
        }
      }
    });
  };

  const picCamera = () => {
    launchCamera({quality: 1, mediaType: 'photo'}, response => {
      if (!response.didCancel) {
        setUri(response.assets[0]);
        setModalThree(false);
        if (currentID == 1) {
          AddImage_1();
        }
        if (currentID == 2) {
          AddImage_2();
        }
        if (currentID == 3) {
          AddImage_3();
        }
      }
    });
  };

  const pickVideo = () => {
    launchImageLibrary({quality: 1, mediaType: 'video'}, response => {
      if (!response.didCancel) {
        setVideo(response.assets[0]);
        // console.log('response.assets[0]', video);
        // console.log('response.assets[0]', response.assets[0]);
        AddVideo(response.assets[0]);
        // setTimeout(() => {}, 3000);
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
  // useEffect(() => {
  //   setLoading(false);
  // }, []);

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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginVertical: 0}}
        // style={{flex: 1}}
        renderItem={({item, index}) => (
          <OrderItem
            item={item}
            UpdateOrder={UpdateOrder}
            pickVideo={pickVideo}
            AddVideo={AddVideo}
            uri={uri}
            setModalThree={setModalThree}
            setCurrentID={setCurrentID}
            setOrderID={setOrderID}
            video={video}
            videoRef={videoRef}
            onBuffer={onBuffer}
            onError={onError}
            setproductstatus={setproductstatus}
            SubmitAvailablity={SubmitAvailablity}
            navigation={navigation}
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

function OrderItem({
  item,
  UpdateOrder,
  pickVideo,
  AddVideo,
  uri,
  setModalThree,
  setCurrentID,
  setOrderID,
  video,
  navigation,
  videoRef,
  onBuffer,
  onError,
  setproductstatus,
  SubmitAvailablity,
}) {
  const dimensions = useWindowDimensions();

  const [visible, setVisible] = useState(false);
  const [Step3, setStep3] = useState(false);
  const [status, setStatus] = useState({});

  // alert(JSON.stringify(Object.name(status)));
  // alert(JSON.stringify(Object.keys(status)));
  return (
    <View
      style={{
        borderRadius: 12,
        backgroundColor: theme.colors.primary,
        marginHorizontal: 13,
        marginVertical: 15,
      }}>
      <TouchableOpacity
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
                LIKE {item.post?.like || '0'}
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
                ORDER {item.post?.order || '0'}
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
            At Store
          </TextFormated>
        </TouchableOpacity>

        <View style={{width: 10}} />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {}}
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
          activeOpacity={0.7}
          onPress={() => {}}
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
          source={require('../../../../../assets/ScrollDown.png')}
          backgroundColor={theme.colors.ScrollDown}
          onPress={() => {
            setVisible(!visible);
          }}
          marginHorizontal={0.1}
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
                    backgroundColor: theme.colors.primary,
                    // marginHorizontal: 13,
                    marginTop: 15,
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: theme.colors.green,
                  }}>
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
                          (1 * 60) /
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
                            ((1 * 80) /
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
                            Order Price
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
                                paddingHorizontal: 10,
                              }}>
                              {v?.price}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* {v.status == 'PENDING' ? ( */}
                      <View style={{flexDirection: 'row'}}>
                        <View style={{}}>
                          <TouchableOpacity
                            onPress={() => {
                              // UpdateOrder(v.id, 'ACCEPT', item.id);
                              // setproductstatus(I => [...I, v?.id]);
                              setStatus(i => ({...i, [v.id]: 'ACCEPT'}));
                            }}>
                            <Image
                              source={require('../../../../../assets/righticon.png')}
                              style={{
                                width: 30,
                                height: 30,
                                resizeMode: 'contain',
                                marginTop: 15,
                                tintColor:
                                  v.status == 'ACCEPT' ||
                                  Object.keys(status) == v?.id
                                    ? theme.colors.green
                                    : theme.colors.Black,
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={{width: 30}} />
                        <View style={{}}>
                          <TouchableOpacity
                            onPress={() => {
                              // UpdateOrder(v.id, 'CANCEL', v.id)
                              // setproductstatus(I => [...I, v?.id])
                              setStatus(i => ({...i, [v.id]: 'CANCEL'}));
                            }}>
                            <Image
                              source={require('../../../../../assets/wrongicon.png')}
                              style={{
                                width: 30,
                                height: 30,
                                resizeMode: 'contain',
                                marginTop: 15,
                                tintColor:
                                  v.status == 'CANCEL'
                                    ? theme.colors.red
                                    : theme.colors.Black,
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View style={{marginTop: 20}}>
            <SolidButton
              text="SUBMIT"
              backgroundColor={theme.colors.green}
              onPress={() => {
                // alert(JSON.stringify(params?.item?.post_position[0].position));
                SubmitAvailablity(
                  Object.keys(status).join(','),
                  Object.values(status).join(','),
                );
              }}
              marginHorizontal={1}
              // loading={loading}
            />
          </View>
          <View style={{marginVertical: 20}}>
            <SolidButton
              source={require('../../../../../assets/ScrollDown.png')}
              backgroundColor={theme.colors.ScrollDown}
              onPress={() => {
                // if (item?.status == 'ACCEPT') {
                //   setStep3(!Step3);
                //   console.log('ACCEPT');
                // }
                // if (item?.status == 'PENDING') {
                //   setVisible(!visible);
                //   console.log('PENDING');
                // }
                setStep3(!Step3);
              }}
              marginHorizontal={0.1}
            />
          </View>
        </View>
      )}
      {Step3 == true && (
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.primary,
          }}>
          {/* {item?.sub_orders?.map((v, i) => (
            <View style={{marginBottom: 0}}>
              <View
                style={{
                  borderRadius: 12,
                  backgroundColor: theme.colors.primary,
                  marginTop: 15,
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: theme.colors.green,
                }}>
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
                        (1 * 60) /
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
                          ((1 * 80) /
                            (parseFloat(v.image_coordinates?.position[2]) -
                              parseFloat(v.image_coordinates?.position[0]))) *
                          parseFloat(v.image_coordinates?.position[0])
                        ) / 1,
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
                            {item?.post?.price}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {v.status == 'PENDING' ? (
                      <View style={{flexDirection: 'row'}}>
                        <View style={{}}>
                          <TouchableOpacity
                            onPress={() =>
                              UpdateOrder(v.id, 'ACCEPT', item.id)
                            }>
                            <Image
                              source={require('../../../../../assets/righticon.png')}
                              style={{
                                width: 30,
                                height: 30,
                                resizeMode: 'contain',
                                marginTop: 15,
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={{width: 30}} />
                        <View style={{}}>
                          <TouchableOpacity
                            onPress={() =>
                              UpdateOrder(v.id, 'CANCEL', item.id)
                            }>
                            <Image
                              source={require('../../../../../assets/wrongicon.png')}
                              style={{
                                width: 30,
                                height: 30,
                                resizeMode: 'contain',
                                marginTop: 15,
                              }}
                            />
                          </TouchableOpacity>
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
          ))} */}
          {/* <View style={{height: 20}} /> */}

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
                  {item?.last_update}
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
                      item?.image_1 ==
                      'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                    ) {
                      setModalThree(true);
                      setCurrentID(1);
                      setOrderID(item?.id);
                    } else {
                      navigation.navigate('ImageZoom', {
                        image: item?.image_1,
                      });
                    }
                  }}>
                  <Image
                    // source={{uri: uri.uri}}
                    source={
                      item?.image_1 ==
                      'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                        ? uri == ''
                          ? require('../../../../../assets/bi_camera.png')
                          : {uri: uri.uri}
                        : {uri: item?.image_1}
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
                      item?.image_2 ==
                      'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                    ) {
                      setModalThree(true);
                      setCurrentID(2);
                      setOrderID(item?.id);
                    } else {
                      navigation.navigate('ImageZoom', {
                        image: item?.image_2,
                      });
                    }
                  }}>
                  <Image
                    source={
                      item?.image_2 ==
                      'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                        ? uri == ''
                          ? require('../../../../../assets/bi_camera.png')
                          : {uri: uri.uri}
                        : {uri: item?.image_2}
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
                      item?.image_3 ==
                      'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                    ) {
                      setModalThree(true);
                      setCurrentID(3);
                      setOrderID(item?.id);
                    } else {
                      navigation.navigate('ImageZoom', {
                        image: item?.image_3,
                      });
                    }
                  }}>
                  <Image
                    source={
                      item?.image_3 ==
                      'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                        ? uri == ''
                          ? require('../../../../../assets/bi_camera.png')
                          : {uri: uri.uri}
                        : {uri: item?.image_3}
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
                      item?.video_1 ==
                      'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                    ) {
                      pickVideo();
                      setOrderID(item?.id);
                      AddVideo();
                    } else {
                      navigation.navigate('FullVideo', {
                        uri: item?.video_1,
                      });
                    }
                  }}>
                  {item?.video_1 ==
                    'https://pickpic4u.com/app.pickpic4u.com/uploads/NO' &&
                  video == '' ? (
                    <Image
                      source={require('../../../../../assets/video.png')}
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
                        borderRadius: 3,
                      }}>
                      <Video
                        paused={true}
                        source={
                          item?.video_1 ==
                          'https://pickpic4u.com/app.pickpic4u.com/uploads/NO'
                            ? {uri: video?.uri}
                            : {uri: item?.video_1}
                        }
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
                        // audioOnly={false}
                        play
                      />
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require('../../../../../assets/mic.png')}
                    style={{height: 30, width: 30, resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
                {/* <TouchableOpacity>
              <Image
                source={require('../../../../../assets/plus_white.png')}
                style={{height: 30, width: 30, resizeMode: 'contain'}}
              />
            </TouchableOpacity> */}
              </View>
            </View>

            {/* STEP 2 */}

            {/* <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            marginVertical: 20,
            paddingVertical: 10,
            borderColor: theme.colors.C4C4C4,
            backgroundColor: theme.colors.Black,
            marginHorizontal: 20,
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
              source={{uri: 'https://picsum.photos/500'}}
              style={{
                height: 60,
                width: 60,
                resizeMode: 'contain',
                borderRadius: 50,
                marginRight: 20,
              }}
            />
            <View style={{alignItems: 'center'}}>
              <TextFormatted
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: theme.colors.primary,
                }}>
                04:30 PM 11/04/2022
              </TextFormatted>
              <Image
                source={require('../../../../../assets/gps.png')}
                style={{
                  height: 60,
                  width: 90,
                  resizeMode: 'contain',
                  marginRight: 20,
                }}
              />
            </View>
            <Image
              source={require('../../../../../assets/clock.png')}
              style={{
                height: 40,
                width: 40,
                resizeMode: 'contain',
                borderRadius: 50,
                marginLeft: 20,
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
            <Image
              source={require('../../../../../assets/bi_camera.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Image
              source={require('../../../../../assets/bi_camera.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Image
              source={require('../../../../../assets/bi_camera.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Image
              source={require('../../../../../assets/video.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Image
              source={require('../../../../../assets/mic.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Image
              source={require('../../../../../assets/plus_white.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
          </View>
        </View> */}

            {/* STEP 3 */}

            {/* <View
          style={{
            alignSelf: 'center',
            borderWidth: 1,
            paddingHorizontal: 40,
            borderRadius: 25,
            marginVertical: 20,
            paddingVertical: 10,
            borderColor: theme.colors.C4C4C4,
            marginHorizontal: 20,
          }}>
          <TextFormatted style={{fontSize: 18, fontWeight: '700'}}>
            Pick Code: 9999
          </TextFormatted>
        </View> */}

            {/* <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            marginVertical: 20,
            paddingVertical: 10,
            borderColor: theme.colors.C4C4C4,
            backgroundColor: theme.colors.Black,
            marginHorizontal: 20,
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
              source={{uri: 'https://picsum.photos/500'}}
              style={{
                height: 60,
                width: 60,
                resizeMode: 'contain',
                borderRadius: 50,
                marginRight: 20,
              }}
            />
            <View style={{alignItems: 'center'}}>
              <TextFormatted
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: theme.colors.primary,
                }}>
                04:30 PM 11/04/2022
              </TextFormatted>
              <Image
                source={require('../../../../../assets/gps.png')}
                style={{
                  height: 60,
                  width: 90,
                  resizeMode: 'contain',
                  marginRight: 20,
                }}
              />
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
            <Image
              source={require('../../../../../assets/bi_camera.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Image
              source={require('../../../../../assets/bi_camera.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Image
              source={require('../../../../../assets/bi_camera.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Image
              source={require('../../../../../assets/video.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Image
              source={require('../../../../../assets/mic.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Image
              source={require('../../../../../assets/plus_white.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
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
                $36.00
              </TextFormatted>
            </TextFormatted>
            <Image
              source={require('../../../../../assets/qr.png')}
              style={{
                height: 110,
                width: 110,
                resizeMode: 'contain',
                marginTop: 10,
              }}
            />
          </View>
          <TouchableOpacity
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
              source={require('../../../../../assets/qr.png')}
              style={{
                height: 110,
                width: 110,
                resizeMode: 'contain',
                marginTop: 10,
              }}
            />
          </View>
          <TouchableOpacity
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
          <View style={{height: 30}} />
          <SolidButton
            borderRadius={50}
            text={'Payment Completed'}
            backgroundColor={theme.colors.green}
          />
          <View style={{height: 30}} />
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            marginBottom: 50,
          }}>
          <SolidButton
            borderRadius={50}
            text={'Order Completed'}
            backgroundColor={theme.colors.green}
          />
        </View> */}
          </View>
        </View>
      )}
    </View>
  );
}
