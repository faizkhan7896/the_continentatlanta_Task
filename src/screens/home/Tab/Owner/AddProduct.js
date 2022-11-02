import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import Statusbar from '../../../../components/Statusbar';
import TextFormated from '../../../../components/TextFormated';
import TextInput from '../../../../components/TextInput';
import {baseUrl} from '../../../../utils/constance';
import {theme} from '../../../../utils/theme';
import {ShowToast} from '../../../../utils/ToastFunction';
import PickerInput from '../../../../components/PickerInput';
import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

const Availablity = [
  {
    id: '1',
    title: 'AT STORE',
    time: 'Minutes',
  },
  // {
  //   id: '2',
  //   title: 'TAKE OUT',
  //   time: 'Houre',
  // },
  // {
  //   id: '3',
  //   title: 'DELIVERY',
  //   time: 'Day',
  // },
];
const data = [
  {
    id: '1',
    title: 'AT STORE',
    time: 'Minutes',
  },
  {
    id: '2',
    title: 'TAKE OUT',
    time: 'Houre',
  },
  {
    id: '3',
    title: 'DELIVERY',
    time: 'Day',
  },
  {
    id: '5',
    title: 'DELIVERY',
    time: 'Week',
  },
  {
    id: '6',
    title: 'DELIVERY',
    time: 'Month',
  },
  {
    id: '7',
    title: 'DELIVERY',
    time: 'Year',
  },
];
const Minute = [
  {
    id: '10',
    title: 'AT STORE',
    time: '10 minutes',
  },
  {
    id: '30',
    title: 'TAKE OUT',
    time: '30 minutes',
  },
  {
    id: '59',
    title: 'DELIVERY',
    time: '59 minutes',
  },
];
const hour = [
  {
    id: '1',
    title: 'AT STORE',
    time: '1 houre',
  },
  {
    id: '2',
    title: 'TAKE OUT',
    time: '2 houre',
  },
  {
    id: '3',
    title: 'DELIVERY',
    time: '3 houre',
  },
  {
    id: '4',
    title: 'DELIVERY',
    time: '4 houre',
  },
  {
    id: '5',
    title: 'DELIVERY',
    time: '5 houre',
  },
  {
    id: '6',
    title: 'DELIVERY',
    time: '6 houre',
  },
  {
    id: '7',
    title: 'DELIVERY',
    time: '7 houre',
  },
  {
    id: '8',
    title: 'DELIVERY',
    time: '8 houre',
  },
  {
    id: '9',
    title: 'DELIVERY',
    time: '9 houre',
  },
  {
    id: '10',
    title: 'DELIVERY',
    time: '10 houre',
  },
  {
    id: '11',
    title: 'AT STORE',
    time: '11 houre',
  },
  {
    id: '12',
    title: 'TAKE OUT',
    time: '12 houre',
  },
  {
    id: '13',
    title: 'DELIVERY',
    time: '13 houre',
  },
  {
    id: '14',
    title: 'DELIVERY',
    time: '14 houre',
  },
  {
    id: '15',
    title: 'DELIVERY',
    time: '15 houre',
  },
  {
    id: '16',
    title: 'DELIVERY',
    time: '16 houre',
  },
  {
    id: '17',
    title: 'DELIVERY',
    time: '17 houre',
  },
  {
    id: '18',
    title: 'DELIVERY',
    time: '18 houre',
  },
  {
    id: '19',
    title: 'DELIVERY',
    time: '19 houre',
  },
  {
    id: '20',
    title: 'DELIVERY',
    time: '20 houre',
  },
  {
    id: '21',
    title: 'DELIVERY',
    time: '21 houre',
  },
  {
    id: '22',
    title: 'DELIVERY',
    time: '22 houre',
  },
  {
    id: '23',
    title: 'DELIVERY',
    time: '23 houre',
  },
];
const Day = [
  {
    id: '1',
    title: 'AT STORE',
    time: '1 day',
  },
  {
    id: '2',
    title: 'TAKE OUT',
    time: '2 day',
  },
  {
    id: '3',
    title: 'DELIVERY',
    time: '3 day',
  },
  {
    id: '4',
    title: 'DELIVERY',
    time: '4 day',
  },
  {
    id: '5',
    title: 'DELIVERY',
    time: '5 day',
  },
  {
    id: '6',
    title: 'DELIVERY',
    time: '6 day',
  },
];
const Week = [
  {
    id: '1',
    title: 'AT STORE',
    time: '1 week',
  },
  {
    id: '2',
    title: 'TAKE OUT',
    time: '2 week',
  },
  {
    id: '3',
    title: 'DELIVERY',
    time: '3 week',
  },
  {
    id: '4',
    title: 'DELIVERY',
    time: '4 week',
  },
];
const month = [
  {
    id: '1',
    title: 'AT STORE',
    time: '1 month',
  },
  {
    id: '2',
    title: 'TAKE OUT',
    time: '2 month',
  },
  {
    id: '3',
    title: 'DELIVERY',
    time: '3 month',
  },
  {
    id: '4',
    title: 'DELIVERY',
    time: '4 month',
  },
  {
    id: '5',
    title: 'DELIVERY',
    time: '5 month',
  },
  {
    id: '6',
    title: 'DELIVERY',
    time: '6 month',
  },
  {
    id: '7',
    title: 'DELIVERY',
    time: '7 month',
  },
  {
    id: '8',
    title: 'DELIVERY',
    time: '8 month',
  },
  {
    id: '9',
    title: 'DELIVERY',
    time: '9 month',
  },
  {
    id: '10',
    title: 'DELIVERY',
    time: '10 month',
  },
  {
    id: '11',
    title: 'DELIVERY',
    time: '11 month',
  },
];
const year = [
  {
    id: '1',
    title: 'AT STORE',
    time: '1 year',
  },
  {
    id: '2',
    title: 'TAKE OUT',
    time: '2 year',
  },
  {
    id: '3',
    title: 'DELIVERY',
    time: '3 year',
  },
  {
    id: '4',
    title: 'DELIVERY',
    time: '4 year',
  },
  {
    id: '5',
    title: 'DELIVERY',
    time: '5 year',
  },
  {
    id: '6',
    title: 'DELIVERY',
    time: '6 year',
  },
  {
    id: '7',
    title: 'DELIVERY',
    time: '7 year',
  },
];

export default function LogOut({navigation}) {
  const {params} = useRoute();
  const [image, setImage] = useState('');
  const [uri, setUri] = useState('');
  const [price, setPrice] = useState('');
  const [allPrices, setAllPrices] = useState([]);
  const [all_Rent_Prices, setAll_Rent_Prices] = useState([]);
  const [all_Rent_timing, setAll_Rent_timing] = useState([]);
  const [all_Rent_Period, setAll_Rent_Period] = useState([]);
  const [Rentprice, setRentPrice] = useState('');
  const [modal, setModal] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);
  const [modalThree, setModalThree] = useState(false);
  const dimensionsss = useWindowDimensions();
  const [selected, setSelected] = useState([]);
  const [takeout, setTakeout] = useState('');
  const [delivery, setDelivery] = useState('');

  const auth = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);
  const [cropImg, setCropImg] = useState('');
  const [onpress_In, setOnpress_In] = useState([]);
  const [onpress_Out, setOnpress_Out] = useState([]);
  const [Product, setProduct] = useState([]);
  const [time, setTime] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  // alert(JSON.stringify(all_Rent_Prices));
  // alert(JSON.stringify(Rentprice));
  console.log('Product', Product);

  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [dimensions, setDimensions] = useState();

  const pickImage = () => {
    launchImageLibrary({quality: 1, mediaType: 'photo'}, response => {
      if (!response.didCancel) {
        setUri(response.assets[0]);
        setCropImg('');
        setModalThree(false);
      }
    });
  };
  const picCamera = () => {
    launchCamera({quality: 1, mediaType: 'photo'}, response => {
      if (!response.didCancel) {
        setCropImg('');
        setUri(response.assets[0]);
        setModalThree(false);
      }
    });
  };
  const Crop_img = () => {
    ImagePicker.openCropper({
      path: uri.uri,
      width: dimensionsss.width - 30,
      height: dimensionsss.height / 3.5,
      maxFiles: 1,
      cropperRotateButtonsHidden: false,
      showCropFrame: false,
    }).then(image => {
      console.log(image.path);
      setUri({uri: image.path});
      setProduct([]);
      setAllPrices([]);
      setAll_Rent_Prices([]);
      setAll_Rent_timing([]);
      setAll_Rent_Period([]);
    });
  };
  async function AddProduct() {
    try {
      setLoading(true);
      const url = baseUrl + 'post_product';

      const body = new FormData();

      body.append('user_id', auth.id);
      body.append('avaibility_atstor', selected[0]);
      body.append('tackout', '');
      body.append('avaibility_test', 'TAKE OUT');
      body.append('avaibility_delivery', '');
      body.append('price', allPrices.join(','));
      body.append('rent_price', all_Rent_Prices.join(','));
      body.append('rent_type', all_Rent_timing.join(','));
      body.append('rent_timing', all_Rent_Period.join(','));
      console.log(
        Product.map((v, i) =>
          v.map((v, i) =>
            i % 2 == 0
              ? v / (dimensionsss.width - 30)
              : v / (dimensionsss.height / 3),
          ),
        ).join(','),
      );
      body.append(
        'post_position',
        Product.map((v, i) =>
          v.map((v, i) =>
            i % 2 == 0
              ? v / (dimensionsss.width - 30)
              : v / (dimensionsss.height / 3),
          ),
        ).join(','),
      );
      body.append('image', {
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
        // alert(JSON.stringify(!rslt.post_data.price));
        if (allPrices.length == 0) {
          AskUpdate(rslt?.post_data[0]?.id);
        }
        if (all_Rent_Prices.length != 0) {
          RentUpdate(rslt?.post_data[0]?.id);
        }
        // setLoading(false);
        // return;
        setModalTwo(false);
        navigation.goBack();
        ShowToast('Product added successfully');
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

  async function RentUpdate(id) {
    try {
      const url =
        baseUrl +
        'update_status_rent_ask?id=' +
        id +
        '&rent_status=YES&avaibility_atstor=' +
        selected[0] +
        '&avaibility_tackout=' +
        selected[1];
      '&avaibility_delivery=' + selected[2];
      console.log('ask_status', url);
      // return;

      const res = await fetch(url, {
        method: 'GET',
        headers: {'Cache-Control': 'no-cache'},
      });
      console.log(res);
      const rslt = await res.json();
      console.log(rslt);

      if (rslt.success == '1') {
      } else {
        ShowToast(rslt.message || 'Unknown error', 'error');
      }
    } catch (e) {
      // alert('An error occured.');
      ShowToast('An error occured.', 'error');
      console.log(e);
    }
  }
  async function AskUpdate(id) {
    try {
      const url =
        baseUrl +
        'update_status_rent_ask?id=' +
        id +
        '&ask_status=YES&avaibility_atstor=' +
        selected[0] +
        '&avaibility_tackout=' +
        selected[1];
      '&avaibility_delivery=' + selected[2];
      console.log('ask_status', url);
      // return;

      const res = await fetch(url, {
        method: 'GET',
        headers: {'Cache-Control': 'no-cache'},
      });
      console.log(res);
      const rslt = await res.json();
      console.log(rslt);

      if (rslt.success == '1') {
      } else {
        ShowToast(rslt.message || 'Unknown error', 'error');
      }
    } catch (e) {
      // alert('An error occured.');
      ShowToast('An error occured.', 'error');
      console.log(e);
    }
  }
  console.log(onpress_In, onpress_Out);

  const onPress = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
    if (!uri) return;
    const {x, y, translationX, translationY} = event.nativeEvent;
    if (!start) setStart({x: y, y: x});
    setDimensions({w: translationX, h: translationY});
  };

  const onEnd = () => {
    if (!start) return;

    setEnd(start);
    setStart(null);
  };
  // console.log('product', Product);
  // alert(JSON.stringify(start.length));
  // console.log(start);

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.primary}}>
      <Statusbar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView
        // scrollEnabled={false}
        contentContainerStyle={{justifyContent: 'space-between'}}>
        <View>
          <Header navigation={navigation} Headertext={'Shop'} />
          <View>
            <TouchableOpacity
              activeOpacity={1}
              disabled={uri == '' ? true : false}
              onPressIn={e => {
                const X = e.nativeEvent.locationX;
                const Y = e.nativeEvent.locationY;

                setOnpress_In([X, Y]);

                // setOnpress_Out([]);
              }}
              onPressOut={e => {
                const X = e.nativeEvent.locationX;
                const Y = e.nativeEvent.locationY;
                if (onpress_In[0] == X || onpress_In[1] == Y) {
                  ShowToast(
                    'What are you selecting so small? you 🤬 ?',
                    'error',
                  );
                  setOnpress_In([]);
                  setOnpress_Out([]);
                  return;
                }

                // setOnpress_Out([X, Y]);
                setProduct(v => [
                  ...v,
                  [
                    Math.min(onpress_In[0], X),
                    Math.min(onpress_In[1], Y),
                    Math.max(onpress_In[0], X),
                    Math.max(onpress_In[1], Y),
                  ],
                ]);
                setOnpress_In([
                  Math.min(onpress_In[0], X),
                  Math.min(onpress_In[1], Y),
                ]);
                setOnpress_Out([
                  Math.max(onpress_In[0], X),
                  Math.max(onpress_In[1], Y),
                ]);
                setModal(true);
                // setOnpress_In([]);
              }}>
              <PanGestureHandler onGestureEvent={onPress} onEnded={onEnd}>
                <View
                  style={{
                    width: dimensionsss.width - 30,
                    height: dimensionsss.height / 3,
                    alignSelf: 'center',
                  }}>
                  <ImageBackground
                    source={{uri: cropImg != '' ? cropImg : uri.uri}}
                    style={{
                      width: dimensionsss.width - 30,
                      height: dimensionsss.height / 3,
                      alignSelf: 'center',
                      backgroundColor: theme.colors.Tabbg,
                    }}
                    imageStyle={{resizeMode: 'cover'}}>
                    {start != undefined && (
                      <View
                        style={{
                          position: 'absolute',
                          borderColor: 'red',
                          top: (start?.x ?? end?.x) - 15,
                          left: (start?.y ?? end?.y) - 30,
                          width: (dimensions?.w ?? 0) + 15,
                          height: (dimensions?.h ?? 0) + 15,
                          borderWidth: 2,
                        }}
                      />
                    )}
                  </ImageBackground>
                </View>
              </PanGestureHandler>
            </TouchableOpacity>

            {Product.map(item => (
              <View
                style={{
                  position: 'absolute',
                  borderWidth: 2,
                  borderColor: theme.colors.red,
                  left: item[0],
                  top: item[1],
                  width: item[2] - item[0],
                  height: item[3] - item[1],
                  backgroundColor: theme.colors.inputBG + '73',
                }}>
                {/* <TextFormated
                  style={{
                    fontSize: 12,
                    marginTop: 5,
                    fontWeight: '600',
                    color: 'black',
                  }}>
                  ${allPrices.reduce((a, b) => a + (parseInt(b) || 0), 0)}
                </TextFormated> */}
              </View>
            ))}
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 30,
              marginHorizontal: 15,
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={allPrices.length != 0 ? true : false}
              onPress={() => {
                if (uri == '') {
                  setModalThree(true);
                } else {
                  Crop_img();
                }
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 15,
                flexDirection: 'row',
                borderRadius: 50,
                backgroundColor: theme.colors.yellow,
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
                  fontWeight: '700',
                  color: theme.colors.primary,
                  fontSize: 16,
                }}>
                {uri == '' ? ' SELECT IMAGE' : 'CROP'}
              </TextFormated>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 15,
              marginVertical: 40,
              backgroundColor: theme.colors.primary,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
              paddingVertical: 12,
              borderRadius: 20,
            }}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../../../assets/shoppingcart.png')}
                style={{
                  width: 45,
                  height: 45,
                  resizeMode: 'contain',
                  marginHorizontal: 15,
                }}
              />
              {allPrices.reduce((a, b) => a + (parseInt(b) || 0), 0) >= 1 && (
                <TextFormated
                  style={{
                    fontSize: 12,
                    marginTop: 5,
                    fontWeight: '600',
                    color: 'black',
                  }}>
                  ${allPrices.reduce((a, b) => a + (parseInt(b) || 0), 0)}
                </TextFormated>
              )}
            </View>
            <FlatList
              data={Product}
              // data={Product.slice(0, cropImg.length != '' && 1)}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginVertical: 0}}
              // style={{flex: 1}}
              horizontal={true}
              renderItem={({item, index}) => (
                <View style={{alignItems: 'center', marginHorizontal: 10}}>
                  <ImageBackground
                    source={{uri: uri?.uri}}
                    style={{
                      width: 80,
                      borderWidth: 1,
                      height: 60,
                      borderRadius: 10,
                      overflow: 'hidden',
                    }}
                    imageStyle={{
                      borderRadius: 10,
                      resizeMode: 'stretch',
                      width:
                        ((dimensionsss.width - 30) * 80) / (item[2] - item[0]),
                      height:
                        ((dimensionsss.height / 3.5) * 60) /
                        (item[3] - item[1]),
                      borderWidth: 1,
                      top:
                        -(
                          (((dimensionsss.height / 3.5) * 60) /
                            (item[3] - item[1])) *
                          item[1]
                        ) /
                        (dimensionsss.height / 3.5),
                      left:
                        -(
                          (((dimensionsss.width - 30) * 80) /
                            (item[2] - item[0])) *
                          item[0]
                        ) /
                        (dimensionsss.width - 30),
                      // height: dimensionsss.height / 3.5,
                    }}>
                    <View style={{position: 'absolute', right: 7, top: 5}}>
                      <TouchableOpacity
                        onPress={() => {
                          setAllPrices(v => [
                            ...v.slice(0, index),
                            ...v.slice(index + 1),
                          ]);
                          setAll_Rent_Prices(v => [
                            ...v.slice(0, index),
                            ...v.slice(index + 1),
                          ]);
                          setAll_Rent_timing(v => [
                            ...v.slice(0, index),
                            ...v.slice(index + 1),
                          ]);
                          setAll_Rent_Period(v => [
                            ...v.slice(0, index),
                            ...v.slice(index + 1),
                          ]);
                          setProduct(v => [
                            ...v.slice(0, index),
                            ...v.slice(index + 1),
                          ]);
                        }}>
                        <Image
                          source={require('../../../../assets/Close.png')}
                          style={{
                            width: 14,
                            height: 14,
                            resizeMode: 'contain',
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </ImageBackground>

                  {!!allPrices[index] && (
                    <TextFormated
                      style={{
                        fontSize: 16,
                        marginTop: 5,
                        fontWeight: '600',
                        color: 'black',
                      }}>
                      ${allPrices[index]}
                    </TextFormated>
                  )}
                </View>
              )}
            />
          </View>

          <View style={{marginVertical: 20, marginHorizontal: 15}}>
            <FlatList
              data={Availablity}
              numColumns={4}
              contentContainerStyle={{}}
              scrollEnabled={false}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    // setSelected([]);
                    setSelected(prevState =>
                      prevState.find(v => item.title == v)
                        ? prevState.filter(v => item.title != v)
                        : [...prevState, item.title],
                    );
                  }}
                  style={{
                    backgroundColor: selected.find(v => v == item.title)
                      ? theme.colors.yellow
                      : theme.colors.SelectAvailablity,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 18,
                    flexDirection: 'row',
                    borderRadius: 5,
                    // width: Dimensions.get('window').width / 3.65,
                    flex: 1,
                  }}>
                  <TextFormated
                    style={{
                      fontWeight: '700',
                      color: theme.colors.primary,
                      fontSize: 10,
                    }}>
                    {item.title}
                  </TextFormated>
                </TouchableOpacity>
              )}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (uri == '') {
                ShowToast('Please select image', 'error');
                return;
              }
              AddProduct();
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 15,
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
              marginHorizontal: 15,
              marginTop: 20,
            }}>
            {/* {loading ? (
              <ActivityIndicator
                size={'small'}
                style={{margin: 2}}
                color="#fff"
              />
            ) : ( */}

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
            {/* )} */}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        visible={modal}
        onDismiss={() => {
          setModal(false);
        }}
        transparent
        style={{}}>
        <TouchableOpacity
          // onPress={() => {
          //   if (price == '') {
          //     ShowToast('Please enter selected product price', 'error');
          //     return;
          //   }
          //   if (price < 1) {
          //     ShowToast('Please enter selected product price', 'error');
          //     return;
          //   }
          //   if (Rentprice != '') {
          //     setAll_Rent_Prices(v => v.concat(Rentprice));
          //   }
          //   if (all_Rent_Prices == null) {
          //     setAll_Rent_Prices([]);
          //   }
          //   setModal(false);
          // }}
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
              width: Dimensions.get('window').width - 40,
              height: Dimensions.get('window').width - 200,
              // height: Dimensions.get('window').width - 100,
              alignItems: 'center',
              borderRadius: 20,
              borderWidth: 0.4,
              borderColor: theme.colors.Light_Gray,
              marginBottom: 45,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                borderRadius: 20,
                overflow: 'hidden',
                alignItems: 'flex-start',
              }}>
              <TextFormated
                style={{fontSize: 16, fontWeight: '600', alignSelf: 'center'}}>
                Enter Price
              </TextFormated>
              <View
                style={{
                  marginVertical: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 6,
                    backgroundColor: theme.colors.purple,
                    flex: 0.5,
                    paddingHorizontal: 5,
                    marginRight: 10,
                    paddingVertical: 10,
                    marginTop: 9,
                  }}>
                  <TextFormated
                    style={{
                      fontWeight: '700',
                      color: theme.colors.primary,
                      fontSize: 12,
                    }}>
                    Order
                  </TextFormated>
                </TouchableOpacity>
                <TextInput
                  View_marginTop={0}
                  paddingTop={8}
                  paddingBottom={8}
                  paddingHorizontal={0.1}
                  marginTop={0}
                  width={Dimensions.get('window').width / 3.4}
                  placeholder="Enter Price"
                  value={price}
                  onChangeText={setPrice}
                  autoFocus={true}
                  keyboardType="number-pad"
                />
                <View style={{width: 10}} />
                <TextInput
                  View_marginTop={0}
                  paddingHorizontal={0.1}
                  marginTop={0}
                  paddingTop={8}
                  paddingBottom={8}
                  width={Dimensions.get('window').width / 5.4}
                  placeholder="JPY"
                  editable={false}
                />
              </View>
              {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 6,
                    backgroundColor: theme.colors.Chat_container,
                    flex: 0.5,
                    paddingHorizontal: 5,
                    marginRight: 10,
                    paddingVertical: 10,
                    marginTop: 9,
                  }}>
                  <TextFormated
                    style={{
                      fontWeight: '700',
                      color: theme.colors.primary,
                      fontSize: 12,
                    }}>
                    Rent
                  </TextFormated>
                </TouchableOpacity>
                <TextInput
                  paddingHorizontal={0.1}
                  View_marginTop={0}
                  paddingTop={8}
                  paddingBottom={8}
                  marginTop={0}
                  width={Dimensions.get('window').width / 3.4}
                  placeholder="Enter Price"
                  value={Rentprice}
                  onChangeText={v => setRentPrice(v)}
                  // autoFocus={true}
                  keyboardType="number-pad"
                />
                <View style={{width: 10}} />
                <PickerInput
                  width={Dimensions.get('window').width / 6.5}
                  data={data.map(v => ({label: v.time, value: v.time}))}
                  selected={time}
                  setSelected={setTime}
                  placeholder={'Time'}
                />
                <View style={{width: 10}} />
                <PickerInput
                  width={Dimensions.get('window').width / 6.5}
                  data={
                    time == 'Minutes'
                      ? Minute.map(v => ({label: v.time, value: v.time}))
                      : time == 'Houre'
                      ? hour.map(v => ({label: v.time, value: v.time}))
                      : time == 'Day'
                      ? Day.map(v => ({label: v.time, value: v.time}))
                      : time == 'Week'
                      ? Week.map(v => ({label: v.time, value: v.time}))
                      : time == 'Month'
                      ? month.map(v => ({label: v.time, value: v.time}))
                      : time == 'Year' &&
                        year.map(v => ({label: v.time, value: v.time}))
                  }
                  selected={timePeriod}
                  setSelected={setTimePeriod}
                  placeholder={time}
                />
              </View> */}
              <TouchableOpacity
                onPress={() => {
                  if (price == '') {
                    ShowToast('Please enter selected product price', 'error');
                    return;
                  }
                  if (price < 1) {
                    ShowToast('Please enter selected product price', 'error');
                    return;
                  }
                  if (Rentprice != '') {
                    setAll_Rent_Prices(v => v.concat(Rentprice));
                  }
                  if (all_Rent_Prices == null) {
                    setAll_Rent_Prices([]);
                  }
                  setAllPrices(v => v.concat(price));
                  setAll_Rent_timing(v => v.concat(time));
                  setAll_Rent_Period(v => v.concat(timePeriod));
                  setPrice('');
                  setTimePeriod('');
                  setRentPrice('');
                  setTime('');
                  setOnpress_In([]);
                  setOnpress_Out([]);
                  setModal(false);
                }}
                style={{
                  alignItems: 'center',
                  width: Dimensions.get('window').width - 80,
                  marginTop: 10,
                  alignSelf: 'center',
                  borderWidth: 0.5,
                  paddingVertical: 10,
                  borderColor: theme.colors.SubItem,
                  borderRadius: 5,
                }}>
                <TextFormated style={{fontSize: 16, fontWeight: '600'}}>
                  OK
                </TextFormated>
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
          onPress={() => setModalThree(false)}
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
              height: Dimensions.get('window').width - 150,
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
                onPress={() => setModalThree(false)}
                ButtonText={'CANCEL'}
                paddingVertical={15}
              />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

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
              width: Dimensions.get('window').width - 60,
              height: Dimensions.get('window').width - 130,
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
                <FlatList
                  data={Availablity}
                  numColumns={4}
                  contentContainerStyle={{}}
                  scrollEnabled={false}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      onPress={() => {
                        // setSelected([]);
                        setSelected(prevState =>
                          prevState.find(v => item.title == v)
                            ? prevState.filter(v => item.title != v)
                            : [...prevState, item.title],
                        );
                      }}
                      style={{
                        backgroundColor: selected.find(v => v == item.title)
                          ? theme.colors.yellow
                          : theme.colors.SelectAvailablity,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                        marginRight: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 12,
                        flexDirection: 'row',
                        borderRadius: 5,
                        width: Dimensions.get('window').width / 5,
                      }}>
                      <TextFormated
                        style={{
                          fontWeight: '700',
                          color: theme.colors.primary,
                          fontSize: 10,
                        }}>
                        {item.title}
                      </TextFormated>
                    </TouchableOpacity>
                  )}
                />
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
                  AddProduct();
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
