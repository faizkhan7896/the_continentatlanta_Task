import moment from 'moment';
import {default as React} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TextFormatted, {
  default as TextFormated,
} from '../../../../../components/TextFormated';
import {theme} from '../../../../../utils/theme';
import {data} from '../../../../../utils/data';

export default function Orders({navigation}) {
  const dimensions = useWindowDimensions();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginVertical: 15}}
        // style={{flex: 1}}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('OrderDetails', {
                item,
              })
            }
            style={{
              borderRadius: 12,
              backgroundColor: theme.colors.primary,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
              marginHorizontal: 13,
              marginVertical: 15,
              flexDirection: 'row',
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}>
            <View
              style={{
                backgroundColor: 'transparent',
                width: dimensions.width / 4,
                height: dimensions.width / 5,
                borderRadius: 12,
                overflow: 'hidden',
                justifyContent: 'center',
              }}>
              <ImageBackground
                source={{
                  uri:
                    item.image != 'https://www.dayscab.com/tequ/uploads/event/'
                      ? item.image
                      : 'https://picsum.photos/500',
                }}
                style={{
                  width: dimensions.width / 4,
                  height: dimensions.width / 5,
                }}
                imageStyle={{
                  resizeMode: 'cover',
                  borderRadius: 12,
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
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    alignItems: 'flex-start',
                  }}>
                  <TextFormatted
                    style={{
                      fontSize: 18,
                      fontWeight: '500',
                      fontStyle: 'italic',
                      color: theme.colors.Gray,
                    }}>
                    Henely Shirts
                  </TextFormatted>
                  <TextFormatted
                    style={{
                      fontSize: 18,
                      fontWeight: '500',
                      fontStyle: 'italic',
                      color: theme.colors.Black,
                      marginTop: 5,
                    }}>
                    $ 250
                  </TextFormatted>
                </View>
                <Text style={{color: theme.colors.Gray, fontSize: 12}}>
                  {moment(item.date_time_event).format('MMM Do YY')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
