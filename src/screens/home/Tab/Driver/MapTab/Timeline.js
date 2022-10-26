import moment from 'moment';
import React from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {default as TextFormated} from '../../../../../components/TextFormated';
import {data} from '../../../../../utils/data';
import {theme} from '../../../../../utils/theme';

export default function History({navigation, setGet_followed_event}) {
  const dimensions = useWindowDimensions();

  return (
    <View style={{flex: 1}}>
      {/* <LoadingSpinner size={60} visible={loading} color={theme.colors.Linear_second} /> */}

      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginVertical: 15}}
        // style={{flex: 1}}
        renderItem={({item, index}) => (
          <TouchableOpacity
            // onPress={() => navigation.navigate('OrderDetails')}
            style={{
              borderRadius: 12,
              backgroundColor: theme.colors.Black,
              marginHorizontal: 13,
              marginVertical: 15,
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: theme.colors.green,
            }}>
            <View
              style={{
                backgroundColor: 'transparent',
                width: dimensions.width / 3.5,
                height: dimensions.width / 3.5,
                borderRadius: 10,
                overflow: 'hidden',
              }}>
              <ImageBackground
                source={{
                  uri:
                    item.image != 'https://www.dayscab.com/tequ/uploads/event/'
                      ? item.image
                      : 'https://picsum.photos/500',
                }}
                style={{
                  width: dimensions.width / 3.5,
                  height: dimensions.width / 3.5,
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
                  Adidas
                </Text>
                <Text
                  style={{
                    fontSize: 19,
                    fontWeight: '600',
                    color: theme.colors.primary,
                    marginTop: 5,
                  }}>
                  $20,000
                </Text>
              </View>
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
                    paddingVertical: 7,
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
                    A
                  </TextFormated>
                </TouchableOpacity>
                <View style={{width: 15}} />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {}}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 7,
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
                    R
                  </TextFormated>
                </TouchableOpacity>
                <View style={{width: 15}} />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {}}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 7,
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
                    C
                  </TextFormated>
                </TouchableOpacity>
                <View style={{width: 15}} />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {}}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 7,
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
                    U
                  </TextFormated>
                </TouchableOpacity>
                <View style={{width: 15}} />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {}}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 7,
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
                    A
                  </TextFormated>
                </TouchableOpacity>
              </View>
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
