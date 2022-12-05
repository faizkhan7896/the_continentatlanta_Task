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
import React, {useState} from 'react';
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
import Statusbar from '../../../../../components/Statusbar';
import TextFormated from '../../../../../components/TextFormated';
import CustomTextInput from '../../../../../components/TextInput';
import {theme} from '../../../../../utils/theme';

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
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(false);
  const [Modal_2, setModal_2] = useState(false);
  const [openTime, setOpenTime] = useState();
  const [openTime_1, setOpenTime_1] = useState(false);
  const [closeTime, setCloseTime] = useState();
  const [closeTime_2, setCloseTime_2] = useState(false);

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
          MARKERS.map((item, index) => (
            <Marker
              onPress={() => setModal_2(true)}
              draggable={true}
              key={index}
              image={require('../../../../../assets/Deal.png')}
              coordinate={{
                latitude: item.latitude || 0,
                longitude: item.longitude || 0,
              }}
            />
          ))
        ) : (
          <Marker
            // image={require('../../../../../assets/Deal.png')}
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

      <Modal
        animationType="slide"
        visible={modal}
        onDismiss={() => {
          setModal(false);
        }}
        transparent
        style={{}}>
        <TouchableOpacity
          onPress={() => {
            setModal(false);
            setAdd(false);
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
                  // value={price}
                  // onChangeText={setPrice}
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
                    // AddProduct();
                    setModal(false);
                    setTimeout(() => {
                      setAdd(false);
                    }, 300);
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
                </TouchableOpacity>
              </ScrollView>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="none"
        visible={Modal_2}
        onDismiss={() => {
          setModal_2(false);
        }}
        transparent
        style={{}}>
        <TouchableOpacity
          onPress={() => {
            setModal_2(false);
            // setAdd(false);
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
              // borderWidth: 0.4,
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
                <View
                  style={{
                    backgroundColor: theme.colors.inputBG,
                    borderRadius: 6,
                    alignItems: 'center',
                    // borderWidth: 1,
                    borderColor: 'red',
                  }}>
                  <TextFormated
                    style={{
                      fontWeight: '700',
                      color: theme.colors.Black,
                      fontSize: 18,
                    }}>
                    17
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
                  value={'Christmas Party'}
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
                    {moment(new Date()).format('ll')}
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
                  value={'10:00 Am - 11:00 PM'}
                  autoFocus={true}
                  borderWidth={1}
                  borderRadius={6}
                  editable={false}
                />
                <TouchableOpacity
                  onPress={() => {
                    // AddProduct();
                    setModal_2(false);
                    // setTimeout(() => {
                    //   setAdd(false);
                    // }, 300);
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
                      JOIN
                    </TextFormated>
                  )}
                </TouchableOpacity>
              </ScrollView>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
