import {useRoute} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {theme} from '../utils/theme';
import Carousel, {Pagination} from 'react-native-snap-carousel-v4';

const data = [
  {img1: require('../assets/img2.jpeg')},
  {img1: require('../assets/img1.jpeg')},
  {img1: require('../assets/img3.jpeg')},
];

export default function MemberShip({navigation}) {
  const {params} = useRoute();
  const dimensions = useWindowDimensions();
  const SelectedTab = useSelector(state => state.SelectedTab);
  const [carouselPaginationIndex, setCarouselPaginationIndex] = useState(0);
  const CarouselRef = useRef();

  const List = ({title, disc, price, width, color}) => {
    return (
      <View
        style={{
          alignItems: 'center',
          width: Dimensions.get('window').width - 40,
          marginVertical: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: Dimensions.get('window').width - 40,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: color || theme.colors.Black,
            }}>
            {title}
          </Text>
          {price && (
            <View
              style={{
                height: 0.5,
                width: Dimensions.get('window').width / 8,
                backgroundColor: '#e8e5df',
              }}
            />
          )}
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: theme.colors.Black,
            }}>
            {price}
          </Text>
        </View>
        {disc && (
          <Text
            style={{
              color: '#5d5d5d',
              marginTop: 5,
              width: Dimensions.get('window').width - 40,
              paddingRight: 20,
            }}>
            {disc}
          </Text>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: theme.colors.primary}}>
      <StatusBar hidden={true} />

      <View style={{position: 'absolute', left: 25, top: 30, zIndex: 100}}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            style={{
              height: 22,
              width: 22,
              resizeMode: 'contain',
              tintColor: theme.colors.primary,
            }}
            source={require('../assets/menu.png')}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          height: Dimensions.get('window').height + StatusBar.currentHeight,
        }}>
        <Carousel
          sliderHeight={Dimensions.get('window').height}
          ref={CarouselRef}
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              disabled={!item.url}
              onPress={() => Linking.openURL(item.url)}
              style={{}}
              // key={`${item.image}${item.url}`}
            >
              <Image
                source={item.img1}
                style={{
                  width: Dimensions.get('window').width,
                  height:
                    Dimensions.get('window').height + StatusBar.currentHeight,
                }}
              />
            </TouchableOpacity>
          )}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          onSnapToItem={setCarouselPaginationIndex}
          decelerationRate={0.9}
        />
        <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
          <Pagination
            dotsLength={3}
            activeDotIndex={carouselPaginationIndex}
            containerStyle={{}}
            dotStyle={{
              width: 12,
              height: 12,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: theme.colors.primary,
              backgroundColor: theme.colors.primary,
            }}
            inactiveDotStyle={{
              width: 12,
              height: 12,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: theme.colors.primary,
              backgroundColor: 'transparent',
            }}
            inactiveDotOpacity={1}
            inactiveDotScale={1}
          />
        </View>
      </View>

      <View
        style={{
          paddingVertical: 22,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2e2f2f',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity>
            <Image
              style={{
                height: 18,
                width: 18,
                resizeMode: 'contain',
                tintColor: theme.colors.primary,
              }}
              source={require('../assets/fb.png')}
            />
          </TouchableOpacity>
          <View style={{width: 15}} />
          <TouchableOpacity>
            <Image
              style={{
                height: 18,
                width: 18,
                resizeMode: 'contain',
                tintColor: theme.colors.primary,
              }}
              source={require('../assets/twitter.png')}
            />
          </TouchableOpacity>
          <View style={{width: 15}} />
          <TouchableOpacity>
            <Image
              style={{
                height: 18,
                width: 18,
                resizeMode: 'contain',
                tintColor: theme.colors.primary,
              }}
              source={require('../assets/instagram.png')}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          alignItems: 'center',
          backgroundColor: theme.colors.Black,
          paddingBottom: 50,
        }}>
        <View
          style={{alignItems: 'center', paddingTop: 50, paddingHorizontal: 5}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              color: '#8f8b8b',
              textAlign: 'center',
              letterSpacing: 2,
              lineHeight: 25,
            }}>
            Generally identified by convention rather that any strict criteria,
            seven regions are commonly regarded as continents and then there is
            us. We are not a set of agreed, specific, or generally accepted
            standards, we do not take the form of a custom. We are a personal
            experience anytime the day anytime of the year. Whether enjoying
            dishes from the full dinner menu in our dining room or sipping a
            neat scotch in our cigar lounge, while sitting in the comfort and
            aroma of leather and cigars, we are the somewhere to be for anyone.
            With our Ultra-chic ambience and adaptable vibrations, The Continent
            caters to patrons alike and yet significantly different.
          </Text>

          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              color: '#8f8b8b',
              textAlign: 'center',
              letterSpacing: 2,
              lineHeight: 25,
              marginTop: 40,
            }}>
            Chef Scotley Innis brings origins to surface to celebrate the
            generations in the making and the ones who’ve made it. The menu
            brings elemental, ingredient-driven cooking to the forefront,
            evoking the greatness of the past while remaining modern in its
            execution. Dishes that put taste buds pleasure over spectacle,
            taking inspiration from Africa, Asia and The Caribbean.
          </Text>

          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              color: '#8f8b8b',
              textAlign: 'center',
              letterSpacing: 2,
              lineHeight: 25,
              marginTop: 40,
            }}>
            We invite you to share in our story, allowing us to treat you in
            flavors of our roots at a seat at our table, where all are friends
            and a member of our family.
          </Text>

          <Image
            source={require('../assets/img4.png')}
            style={{
              width: Dimensions.get('window').width - 10,
              height: Dimensions.get('window').height / 1.4,
              resizeMode: 'cover',
              marginTop: 50,
            }}
          />
          <Image
            source={require('../assets/img5.png')}
            style={{
              width: Dimensions.get('window').width - 10,
              height: Dimensions.get('window').height / 1.4,
              resizeMode: 'cover',
              marginTop: 20,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    height: Dimensions.get('window').width - 153,
    width: Dimensions.get('window').width,
    resizeMode: 'contain',
    // borderWidth: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    height: Dimensions.get('window').width / 2,
    width: Dimensions.get('window').width / 1.2,
    resizeMode: 'contain',
    marginTop: 50,
    alignSelf: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    marginTop: 7,
  },
  subtitle: {
    textAlign: 'left',
    fontSize: 16,
  },
  forgot: {
    color: '#ADA4A5',
    fontWeight: '600',
    alignSelf: 'center',
    textDecorationLine: 'underline',
    marginTop: 10,
    // flexDirection:"row"
  },
  lines: {
    height: 2,
    backgroundColor: '#DDDADA',
    marginTop: 5,
    width: Dimensions.get('window').width / 2.6,
  },
  socialbutton: {
    height: Dimensions.get('window').width / 5,
    width: Dimensions.get('window').width / 3.4,
    resizeMode: 'contain',
    // borderWidth: 1,
  },
});
