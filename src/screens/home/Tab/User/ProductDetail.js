import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import Header from '../../../../components/Header';
import SolidButton from '../../../../components/SolidButton';
import Statusbar from '../../../../components/Statusbar';
import TextFormated from '../../../../components/TextFormated';
import TextInput from '../../../../components/TextInput';
import {baseUrl} from '../../../../utils/constance';
import {theme} from '../../../../utils/theme';
import {ShowToast} from '../../../../utils/ToastFunction';

const Availablity = [
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
];

export default function LogOut({navigation}) {
  const {params} = useRoute();
  const auth = useSelector(state => state.auth);
  const [modal, setModal] = useState(false);
  const [extradetailentered, setExtradetailentered] = useState(false);
  const [details, setDetails] = useState('');
  const dimensions = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(1);
  const [loading, setLoading] = useState(false);
  const dimensionsss = useWindowDimensions();

  const [allLikes, setAllLikes] = useState([]);
  const [allAsk, setAllAsk] = useState([]);
  const [allOrder, setAllOrder] = useState([]);
  const [allRent, setAllRent] = useState([]);
  const [selected_2, setSelected_2] = useState('');

  const [selectedProduct, setSelectedProduct] = useState([]);

  const scrollRef = useRef();
  // alert(JSON.stringify(selectedProduct));
  // alert(JSON.stringify(params.item.avaibility_atstor));
  // console.log('params', params);

  async function getProduct_Like(type) {
    try {
      const url =
        baseUrl +
        'get_user_list_by_product_id_like_order_ask_rent?post_id=' +
        params.item.id +
        '&type=' +
        type;

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
        if (type == 'like') {
          setAllLikes(rslt.users);
        }
        if (type == 'ask') {
          setAllAsk(rslt.users);
        }
        if (type == 'order') {
          setAllOrder(rslt.users);
        }
        if (type == 'rent') {
          setAllRent(rslt.users);
        }
      } else {
        // ShowToast(rslt.message || 'Unknown error', 'error');
      }
    } catch (e) {
      // alert('An error occured.');
      ShowToast('An error occured.', 'error');
      console.log(e);
    }
  }

  useEffect(() => {
    getProduct_Like('like');
    getProduct_Like('ask');
    getProduct_Like('order');
    getProduct_Like('rent');
  }, []);

  async function CreateOrder() {
    // if (extradetailentered == false) {
    //   ShowToast('Please add product in your cart.', 'error');
    //   return;
    // }
    try {
      setLoading(true);
      const url = baseUrl + 'create_post_order';

      const body = new FormData();
      body.append('user_id', auth.id);
      body.append('post_id', params.item.id);
      body.append('extra_details', details);
      body.append('availability', selected);

      console.log('create_post_order_body', body);

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
        ShowToast('Order created successfully.');
        navigation.goBack();
      } else {
        ShowToast(rslt.message || 'Unknown error', 'error');
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      ShowToast('An error occured.', 'error');

      console.log(e);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.primary}}>
      <Statusbar backgroundColor="#fff" barStyle="dark-content" />
      <View style={{flex: 1}}>
        <ScrollView
          style={{flex: 1}}
          ref={scrollRef}
          contentContainerStyle={{justifyContent: 'space-between'}}>
          <View>
            <Header navigation={navigation} Headertext={'Details'} />
            <View>
              <ImageBackground
                source={{uri: params.item.image}}
                style={{
                  width: dimensions.width - 30,
                  height: dimensions.height / 3,
                  alignSelf: 'center',
                  backgroundColor: theme.colors.Tabbg,
                }}
                imageStyle={{resizeMode: 'cover'}}>
                {!!visible &&
                  params?.item?.post_position?.map(item => (
                    <TouchableOpacity
                      onPress={() => {
                        // setSelectedProduct(item);
                        setSelectedProduct(v => [
                          ...v,
                          [
                            item?.position[0],
                            item?.position[1],
                            item?.position[2],
                            item?.position[3],
                          ],
                        ]);
                        setModal(true);
                      }}
                      style={{
                        position: 'absolute',
                        borderWidth: 2,
                        borderColor: theme.colors.red,
                        left:
                          parseFloat(item?.position[0]) *
                            (dimensions.width - 30) || 0,
                        top:
                          (parseFloat(item?.position[1]) * dimensions.height) /
                            3 || 0,
                        width:
                          parseFloat(item?.position[2]) *
                            (dimensions.width - 30) -
                            parseFloat(item?.position[0]) *
                              (dimensions.width - 30) || 0,
                        height:
                          (parseFloat(item?.position[3]) * dimensions.height) /
                            3 -
                            (parseFloat(item?.position[1]) *
                              dimensions.height) /
                              3 || 0,
                        backgroundColor: '#F7F8F873',
                      }}>
                      <View></View>
                    </TouchableOpacity>
                  ))}
              </ImageBackground>
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
                onPress={() => {}}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 15,
                  flexDirection: 'row',
                  borderRadius: 6,
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
                  LIKE {params.item.like}
                </TextFormated>
              </TouchableOpacity>

              {params.item.ask_status == 'YES' && <View style={{width: 10}} />}

              {params.item.ask_status == 'YES' && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setModal(true)}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 15,
                    flexDirection: 'row',
                    borderRadius: 6,
                    backgroundColor: theme.colors.red,
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
                    ASK
                  </TextFormated>
                </TouchableOpacity>
              )}
              <View style={{width: 10}} />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setVisible(true);
                  // setModal(true);
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 15,
                  flexDirection: 'row',
                  borderRadius: 6,
                  backgroundColor: theme.colors.purple,
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
                  ORDER {params.item.order}
                </TextFormated>
              </TouchableOpacity>
              {params.item.rent_status == 'YES' && <View style={{width: 10}} />}
              {params.item.rent_status == 'YES' && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setModal(true)}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 15,
                    flexDirection: 'row',
                    borderRadius: 6,
                    backgroundColor: theme.colors.Chat_container,
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
                    RENT
                  </TextFormated>
                </TouchableOpacity>
              )}
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
                {extradetailentered == true && (
                  <TextFormated
                    style={{
                      fontSize: 16,
                      marginTop: 5,
                      fontWeight: '600',
                      color: 'black',
                    }}>
                    {/* ${params?.item.price} */}${details}
                  </TextFormated>
                )}
              </View>

              {/* {!!extradetailentered && ( */}
              <FlatList
                // data={params?.item?.post_position}
                data={selectedProduct}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{marginVertical: 0}}
                horizontal={true}
                renderItem={({item, index}) => (
                  <View style={{alignItems: 'center', marginHorizontal: 10}}>
                    <ImageBackground
                      source={{uri: params?.item?.image}}
                      style={{
                        width: 80,
                        borderWidth: 1,
                        height: 80,
                        borderRadius: 10,
                        overflow: 'hidden',
                      }}
                      imageStyle={{
                        borderRadius: 10,
                        resizeMode: 'cover',
                        width:
                          (1 * 80) /
                          (parseFloat(item[2]) - parseFloat(item[0])),
                        height:
                          (1 * 60) /
                          (parseFloat(item[3]) - parseFloat(item[1])),
                        borderWidth: 1,
                        top:
                          -(
                            (dimensionsss.height /
                              15 /
                              (parseFloat(item[3]) - parseFloat(item[1]))) *
                            parseFloat(item[1])
                          ) / 1,
                        left:
                          -(
                            ((1 * 80) /
                              (parseFloat(item[2]) - parseFloat(item[0]))) *
                            parseFloat(item[0])
                          ) / 1,
                      }}>
                      {/* {alert(JSON.stringify(item))} */}
                      <View style={{position: 'absolute', right: 7, top: 5}}>
                        <TouchableOpacity
                          onPress={() => {
                            setExtradetailentered(false);
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

                    {extradetailentered == true && (
                      <TextFormated
                        style={{
                          fontSize: 16,
                          marginTop: 5,
                          fontWeight: '600',
                          color: 'black',
                        }}>
                        {/* ${params?.item.price} */}${details || '0'}
                      </TextFormated>
                    )}
                  </View>
                )}
              />
            </View>

            <View
              style={{
                marginVertical: 20,
                marginHorizontal: 15,
                flexDirection: 'row',
                alignItems: 'center',
                // justifyContent: 'space-between',
              }}>
              {params?.item?.avaibility_atstor == 'AT STORE' && (
                <TouchableOpacity
                  onPress={() => {
                    setSelected_2(params?.item?.avaibility_atstor);
                  }}
                  style={{
                    backgroundColor:
                      selected_2 == params?.item?.avaibility_atstor
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
                    // marginRight: 15,
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
                    {params?.item?.avaibility_atstor}
                  </TextFormated>
                </TouchableOpacity>
              )}

              {params?.item?.avaibility_delivery == 'DELIVERY' && (
                <TouchableOpacity
                  onPress={() => {
                    setSelected_2(params?.item?.avaibility_delivery);
                  }}
                  style={{
                    backgroundColor:
                      selected_2 == params?.item?.avaibility_delivery
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
                    {params?.item?.avaibility_delivery}
                  </TextFormated>
                </TouchableOpacity>
              )}
              {params?.item?.avaibility_tackout == 'TAKE OUT' && (
                <TouchableOpacity
                  onPress={() => {
                    setSelected_2(params?.item?.avaibility_tackout);
                  }}
                  style={{
                    backgroundColor:
                      selected_2 == params?.item?.avaibility_tackout
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
                    {params?.item?.avaibility_tackout}
                  </TextFormated>
                </TouchableOpacity>
              )}
            </View>

            <SolidButton
              text="SUBMIT"
              backgroundColor={theme.colors.green}
              onPress={() => {
                // alert(JSON.stringify(params?.item?.post_position[0].position));
                CreateOrder();
              }}
              loading={loading}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 30,
                marginHorizontal: 15,
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setSelected(1);
                  scrollRef.current.scrollTo({
                    x: 0, // Required
                    y: 0, // Required
                    animated: true,
                  });
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 15,
                  flexDirection: 'row',
                  borderRadius: 6,
                  backgroundColor:
                    selected == 1 ? theme.colors.yellow : theme.colors.C4C4C4,
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
                  LIKE {params.item.like}
                </TextFormated>
              </TouchableOpacity>

              {params.item.ask_status == 'YES' && <View style={{width: 10}} />}

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setSelected(2);
                  scrollRef.current.scrollTo({
                    x: 0,
                    y: 0,
                    animated: true,
                  });
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 15,
                  flexDirection: 'row',
                  borderRadius: 6,
                  backgroundColor:
                    selected == 2 ? theme.colors.yellow : theme.colors.C4C4C4,
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
                  ASK
                </TextFormated>
              </TouchableOpacity>
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
                onPress={() => {
                  setSelected(3);
                  scrollRef.current.scrollTo({
                    x: 0, // Required
                    y: 0, // Required
                    animated: true,
                  });
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 15,
                  flexDirection: 'row',
                  borderRadius: 6,
                  backgroundColor:
                    selected == 3 ? theme.colors.yellow : theme.colors.C4C4C4,
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
                  ORDER {params.item.like}
                </TextFormated>
              </TouchableOpacity>

              {params.item.ask_status == 'YES' && <View style={{width: 10}} />}

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setSelected(4);
                  scrollRef.current.scrollTo({
                    x: 0, // Required
                    y: 0, // Required
                    animated: true,
                  });
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 15,
                  flexDirection: 'row',
                  borderRadius: 6,
                  backgroundColor:
                    selected == 4 ? theme.colors.yellow : theme.colors.C4C4C4,
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
                  RENT
                </TextFormated>
              </TouchableOpacity>
            </View>

            <FlatList
              data={
                selected == 1
                  ? allLikes
                  : selected == 2
                  ? allAsk
                  : selected == 3
                  ? allOrder
                  : allRent
              }
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginTop: 30}}
              scrollEnabled={false}
              renderItem={({item, index}) => (
                <View style={{marginHorizontal: 20, marginVertical: 10}}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Image
                      style={{
                        height: 45,
                        width: 45,
                        resizeMode: 'contain',
                        borderRadius: 100,
                        marginRight: 10,
                      }}
                      source={{uri: 'https://picsum.photos/500'}}
                    />
                    <View>
                      <TextFormated style={{fontSize: 16, fontWeight: '700'}}>
                        {item?.name}
                      </TextFormated>
                      <TextFormated style={{fontSize: 12, fontWeight: '500'}}>
                        {moment(item?.date_create).startOf('hour').fromNow()}
                      </TextFormated>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </ScrollView>
      </View>

      <Modal
        animationType="fade"
        visible={modal}
        onDismiss={() => setModal(false)}
        transparent
        style={{}}>
        <TouchableOpacity
          onPress={() => setModal(false)}
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
              height: Dimensions.get('window').width - 130,
              alignItems: 'center',
              borderRadius: 20,
              borderWidth: 0.4,
              borderColor: theme.colors.Light_Gray,
              marginBottom: 45,
              // flex: 1,
            }}>
            <View
              style={{
                flex: 1,
                // width: Dimensions.get('window').width - 80,
                justifyContent: 'center',
                borderRadius: 20,
                overflow: 'hidden',
                // paddingHorizontal: 150,
                alignItems: 'center',
                // paddingVertical: 20,
              }}>
              <TextFormated style={{fontSize: 16, fontWeight: '600'}}>
                Enter Details
              </TextFormated>
              <View style={{marginVertical: 20}}>
                <TextInput
                  paddingHorizontal={15}
                  width={Dimensions.get('window').width / 1.4}
                  placeholder="Enter Extra Details"
                  value={details}
                  onChangeText={setDetails}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: Dimensions.get('window').width / 2,
                  marginTop: 10,
                }}>
                <TextFormated
                  onPress={() => {
                    setModal(false);
                    setExtradetailentered(true);
                  }}
                  style={{fontSize: 16, fontWeight: '600'}}>
                  ok
                </TextFormated>
                <TextFormated
                  onPress={() => setModal(false)}
                  style={{fontSize: 16, fontWeight: '600'}}>
                  Cancel
                </TextFormated>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}