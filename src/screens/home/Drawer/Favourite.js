import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../../components/Header';
import Statusbar from '../../../components/Statusbar';
import {
  default as TextFormated,
  default as TextFormatted,
} from '../../../components/TextFormated';
import {theme} from '../../../utils/theme';

const data = [
  {
    id: '17',
    user_id: '1',
    event_cat: '0',
    event_name: 'jumva',
    address: 'test',
    image:
      'https://images.pexels.com/photos/592815/pexels-photo-592815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date_time_event: '2022-02-07',
    description: 'test',
    like: '0',
    type: '',
    like_count: '',
    amount: '100',
    event_start_time: '',
    event_end_time: '',
    event_attend: '',
    lat: '76',
    lon: '34',
    status: '0',
    date_time: '2022-05-10 06:50:51',
    event_gallery: [
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220225125932_93038.png',
      },
    ],
  },
  {
    id: '20',
    user_id: '1',
    event_cat: '0',
    event_name: 'jumva',
    address: 'test',
    image:
      'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS6gKerQH05sHf3VOJp7Iv29fLN05Vqu956ouRL5UnYFXd8YM6Z',
    date_time_event: '2022-02-07',
    description: 'test',
    like: '0',
    type: '',
    like_count: '',
    amount: '100',
    event_start_time: '32:00',
    event_end_time: '21:00',
    event_attend: 'tff',
    lat: '76',
    lon: '34',
    status: '0',
    date_time: '2022-03-21 07:39:42',
    event_gallery: [
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220225165320_96550.png',
      },
    ],
  },
  {
    id: '22',
    user_id: '1',
    event_cat: '0',
    event_name: 'yoga',
    address: 'test',
    image: 'https://m.media-amazon.com/images/I/31+gh23GqSL._SX342_SY445_.jpg',
    date_time_event: '2022-02-07 ',
    description: 'test',
    like: '0',
    type: '',
    like_count: '',
    amount: '0',
    event_start_time: '12 : 00 am',
    event_end_time: '03 : 00 am',
    event_attend: '100',
    lat: '23',
    lon: '76',
    status: '0',
    date_time: '2022-02-25 11:29:53',
    event_gallery: [
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220225165953_537.png',
      },
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220225165953_87735.png',
      },
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220225165953_33957.png',
      },
    ],
  },
  {
    id: '36',
    user_id: '13',
    event_cat: '0',
    event_name: 'yoga event',
    address: 'Vijay Nagar',
    image:
      'https://cdn.shopify.com/s/files/1/0752/6435/products/IMG_0261_0a9def94-ba02-4933-b37d-cfb505fcc546_765x.jpg?v=1632894950',
    date_time_event: '2022-03-023',
    description: 'test',
    like: '0',
    type: '',
    like_count: '',
    amount: '0',
    event_start_time: '12 : 00 am',
    event_end_time: '03 : 00 am',
    event_attend: '100',
    lat: '23',
    lon: '76',
    status: '0',
    date_time: '2022-03-21 09:39:44',
    event_gallery: [
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220321150944_63065.png',
      },
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220321150944_35362.jpeg',
      },
    ],
  },
  {
    id: '37',
    user_id: '13',
    event_cat: '0',
    event_name: 'yoga event',
    address: 'Vijay Nagar',
    image:
      'https://www.dayscab.com/tequ/uploads/event/USER_IMG_20220419155548.jpg',
    date_time_event: '2022-03-23',
    description: 'test',
    like: '0',
    type: '',
    like_count: '',
    amount: '0',
    event_start_time: '12 : 00 am',
    event_end_time: '03 : 00 am',
    event_attend: '100',
    lat: '23',
    lon: '76',
    status: '0',
    date_time: '2022-03-21 09:42:18',
    event_gallery: [
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220321151218_32581.png',
      },
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220321151218_42215.jpeg',
      },
    ],
  },
  {
    id: '38',
    user_id: '2',
    event_cat: '0',
    event_name: 'yoga event',
    address: 'Vijay Nagar',
    image:
      'https://cdn.shopify.com/s/files/1/0752/6435/products/KNETOOYELLOW_765x.jpg?v=1638642838',
    date_time_event: '2022-03-23',
    description: 'test',
    like: '0',
    type: '',
    like_count: '',
    amount: '0',
    event_start_time: '12 : 00 am',
    event_end_time: '03 : 00 am',
    event_attend: '100',
    lat: '23',
    lon: '76',
    status: '0',
    date_time: '2022-03-21 09:43:29',
    event_gallery: [
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220321151329_48645.png',
      },
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220321151329_80596.jpeg',
      },
    ],
  },
  {
    id: '39',
    user_id: '2',
    event_cat: '0',
    event_name: 'yoga event',
    address: 'Vijay Nagar',
    image:
      'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220416125616_37173.png',
    date_time_event: '2022-03-24',
    description: 'test',
    like: '0',
    type: '',
    like_count: '',
    amount: '0',
    event_start_time: '12 : 00 am',
    event_end_time: '03 : 00 am',
    event_attend: '100',
    lat: '23',
    lon: '76',
    status: '0',
    date_time: '2022-03-21 09:48:40',
    event_gallery: [
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220321151840_20041.png',
      },
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220321151840_13152.jpeg',
      },
    ],
  },
  {
    id: '49',
    user_id: '2',
    event_cat: '0',
    event_name: 'yoga event',
    address: 'Vijay Nagar',
    image:
      'https://www.dayscab.com/tequ/uploads/event/USER_IMG_20220419155548.jpg',
    date_time_event: '2022-03-24',
    description: 'test',
    like: '0',
    type: '',
    like_count: '',
    amount: '0',
    event_start_time: '12 : 00 am',
    event_end_time: '03 : 00 am',
    event_attend: '100',
    lat: '23',
    lon: '76',
    status: '0',
    date_time: '2022-03-28 05:39:53',
    event_gallery: [
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220328110953_78249.png',
      },
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220328110953_58112.jpeg',
      },
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220328110953_97330.png',
      },
    ],
  },
  {
    id: '50',
    user_id: '2',
    event_cat: '0',
    event_name: 'yoga eventyoga eventyoga eventyoga eventyoga event',
    address: 'Vijay Nagar',
    image:
      'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220416125616_37173.png',
    date_time_event: '2022-03-24',
    description: 'test',
    like: '0',
    type: '',
    like_count: '',
    amount: '0',
    event_start_time: '12 : 00 am',
    event_end_time: '03 : 00 am',
    event_attend: '100',
    lat: '23',
    lon: '76',
    status: '0',
    date_time: '2022-03-28 05:40:24',
    event_gallery: [
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220328111024_41097.png',
      },
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220328111024_23156.jpeg',
      },
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220328111024_46540.png',
      },
    ],
  },
  {
    id: '51',
    user_id: '2',
    event_cat: '0',
    event_name: 'yoga eventyoga',
    address: 'Vijay Nagar',
    image:
      'https://www.dayscab.com/tequ/uploads/event/USER_IMG_20220328111331.jpeg',
    date_time_event: '2022-03-29',
    description: 'test',
    like: '0',
    type: '',
    like_count: '',
    amount: '0',
    event_start_time: '12 : 00 am',
    event_end_time: '03 : 00 am',
    event_attend: '100',
    lat: '23',
    lon: '76',
    status: '0',
    date_time: '2022-03-28 05:43:31',
    event_gallery: [
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220328111331_32334.png',
      },
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220328111331_60749.jpeg',
      },
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220328111331_55356.png',
      },
    ],
  },
  {
    id: '58',
    user_id: '2',
    event_cat: '0',
    event_name: 'yoga eventyoga',
    address: 'Vijay Nagar',
    image:
      'https://www.dayscab.com/tequ/uploads/event/USER_IMG_20220328131104.jpeg',
    date_time_event: '2022-03-29',
    description: 'test',
    like: '0',
    type: '',
    like_count: '',
    amount: '0',
    event_start_time: '12 : 00 am',
    event_end_time: '03 : 00 am',
    event_attend: '100',
    lat: '23',
    lon: '76',
    status: '0',
    date_time: '2022-03-28 07:41:04',
    event_gallery: [
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220328131104_51281.jpeg',
      },
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220328131104_65473.png',
      },
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220328131104_74081.png',
      },
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220328131104_10590.png',
      },
    ],
  },
  {
    id: '68',
    user_id: '2',
    event_cat: 'cd',
    event_name: 'yoga eventyoga',
    address: 'Vijay Nagar',
    image: 'https://www.dayscab.com/tequ/uploads/event/',
    date_time_event: '2022-03-29',
    description: 'test',
    like: '0',
    type: '',
    like_count: '',
    amount: '0',
    event_start_time: '12 : 00 am',
    event_end_time: '03 : 00 am',
    event_attend: '100',
    lat: '23',
    lon: '76',
    status: '0',
    date_time: '2022-04-16 07:25:21',
    event_gallery: [
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220416125521_42613.jpeg',
      },
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220416125521_55171.png',
      },
    ],
  },
  {
    id: '69',
    user_id: '16',
    event_cat: 'cd',
    event_name: 'yoga eventyoga',
    address: 'Vijay Nagar',
    image: 'https://www.dayscab.com/tequ/uploads/event/',
    date_time_event: '2022-03-29',
    description: 'test',
    like: '0',
    type: '',
    like_count: '',
    amount: '0',
    event_start_time: '12 : 00 am',
    event_end_time: '03 : 00 am',
    event_attend: '100',
    lat: '23',
    lon: '76',
    status: '0',
    date_time: '2022-04-16 07:25:29',
    event_gallery: [
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220416125529_31823.jpeg',
      },
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220416125529_37364.png',
      },
    ],
  },
  {
    id: '70',
    user_id: '16',
    event_cat: 'Music Concert',
    event_name: 'Vfdfdv',
    address: 'Vfv',
    image:
      'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220416125616_42676.png',
    date_time_event: '2022-04-16T07:25:46.073Z',
    description: 'Cdsc',
    like: '0',
    type: '',
    like_count: '',
    amount: 'Vfv',
    event_start_time: '2022-04-16T07:25:46.073Z',
    event_end_time: '2022-04-16T07:25:46.073Z',
    event_attend: 'Vfv',
    lat: '23',
    lon: '76',
    status: '0',
    date_time: '2022-04-16 07:26:16',
    event_gallery: [
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220416125616_42676.png',
      },
    ],
  },
  {
    id: '71',
    user_id: '17',
    event_cat: 'Workshops',
    event_name: 'Bddbdb',
    address: 'Infore',
    image:
      'https://www.dayscab.com/tequ/uploads/event/USER_IMG_20220419155548.jpg',
    date_time_event: '2022-04-19T10:25:19.230Z',
    description: 'Bdbdbd',
    like: '0',
    type: '',
    like_count: '',
    amount: '0',
    event_start_time: '2022-04-19T10:25:19.230Z',
    event_end_time: '2022-04-19T10:25:19.231Z',
    event_attend: '100',
    lat: '',
    lon: '',
    status: '0',
    date_time: '2022-04-19 10:25:48',
    event_gallery: [
      {
        image_file:
          'https://www.dayscab.com/tequ/uploads/event_gallery/sho_20220419155548_76832.jpg',
      },
    ],
  },
];

export default function ShowCase({navigation, setGet_followed_event}) {
  const dimensions = useWindowDimensions();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.primary,
      }}>
      <Statusbar
        barStyle="dark-content"
        backgroundColor={theme.colors.primaryg}
      />
      <Header
        navigation={navigation}
        // sourcetwo={require('../../../assets/Cart.png')}
        Headertext={'Favorite'}
      />
      <FlatList
        data={data}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        contentContainerStyle={{marginVertical: 15}}
        // ItemSeparatorComponent={() => <View style={{width: 20}} />}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductDetail')}
            style={{
              borderRadius: 12,
              backgroundColor: theme.colors.primary,
              justifyContent: 'space-between',
              marginHorizontal: 13,
              marginVertical: 20,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
            }}>
            <View
              style={{
                backgroundColor: 'transparent',
                width: dimensions.width / 2.3,
                height: dimensions.width / 1.8,
                borderRadius: 12,
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
                  width: dimensions.width / 2.3,
                  height: dimensions.width / 2.3,
                }}
                imageStyle={{
                  resizeMode: 'cover',
                  borderRadius: 25,
                  borderWidth: 10,
                  borderColor: theme.colors.primary,
                }}>
                <View style={{position: 'absolute', right: 13, top: 5}}>
                  <TouchableOpacity
                    onPress={() => {}}
                    style={{
                      marginTop: 10,
                      backgroundColor: theme.colors.primary,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,

                      elevation: 5,
                      borderRadius: 120,
                    }}>
                    <Image
                      style={{height: 30, width: 30, resizeMode: 'contain'}}
                      source={require('../../../assets/Heart.png')}
                    />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
              <View style={{alignItems: 'center'}}>
                <TextFormatted style={{fontSize: 16, fontWeight: '600'}}>
                  Long Sleeve Shirts
                </TextFormatted>
                <TextFormatted style={{fontWeight: '600'}}>$165</TextFormatted>
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
