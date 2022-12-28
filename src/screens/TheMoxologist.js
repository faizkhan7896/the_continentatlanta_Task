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
  TextInput,
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
          // paddingBottom: 50,
        }}>
        <Image
          source={require('../assets/img11.png')}
          style={{
            width: Dimensions.get('window').width,
            height:
              Dimensions.get('window').height +
              Dimensions.get('window').height / 2.6,
            resizeMode: 'contain',
            marginTop: 50,
            alignSelf: 'center',
          }}
        />
      </View>

      <View
        style={{
          alignItems: 'flex-start',
          // width: Dimensions.get('window').width - 40,
          marginVertical: 20,
          paddingHorizontal: 20,
          backgroundColor: '#f7f3ed',
          paddingVertical: 25,
        }}>
        <Text
          style={{
            fontFamily: 'Lora-Bold',
            fontSize: 28,
            fontWeight: '600',
            width: Dimensions.get('window').width - 20,
            color: theme.colors.Black,
          }}>
          Hand-Crafted Cocktails, Rare Spirits & Fine Cigars.
        </Text>
        <View
          style={{
            height: 4,
            borderColor: '#221f61',
            width: Dimensions.get('window').width / 6,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            marginTop: 5,
          }}
        />

        <Text
          style={{
            fontFamily: 'Lora-Medium',
            color: '#5d5d5d',
            fontSize: 18,
            marginTop: 15,
            fontWeight: '500',
          }}>
          The fusion inspired menu is in collaboration with the distinguished
          Chef Scotley Innis and Master Mixologist, Mike Haze. The two have
          paired eclectic menus that speak both to their culinary techniques and
          craft cocktail delights. Expect the cuisine to be dishes made
          from-scratch, with comfort food and fresh cocktail favorites that rely
          heavily on local produce, fresh juice and herbs. Tableside drink
          options are available and made to order. Enjoy crafted cocktail
          fountains, modern twists to classic cocktails made with expert
          precision.
        </Text>
      </View>

      <View
        style={{
          alignItems: 'center',
          // width: Dimensions.get('window').width - 40,
          marginVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: '#fff',
          paddingVertical: 10,
        }}>
        <Text
          style={{
            fontFamily: 'Lora-Bold',
            fontSize: 20,
            fontWeight: '600',
            color: theme.colors.Black,
          }}>
          CNN TRAVEL
        </Text>

        <Text
          style={{
            fontFamily: 'Lora-Medium',
            color: '#5d5d5d',
            fontSize: 12,
            marginTop: 8,
            fontWeight: '500',
            textAlign: 'center',
            lineHeight: 20,
            fontStyle: 'italic',
          }}>
          "Join Mike Haze, the creative director behind Red Phone Booth on a
          tour with CNN's Signature Sips."
        </Text>
      </View>

      <View
        style={{
          alignItems: 'center',
          // width: Dimensions.get('window').width - 40,
          marginVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: '#fff',
          paddingVertical: 10,
        }}>
        <Text
          style={{
            fontFamily: 'Lora-Bold',
            fontSize: 20,
            fontWeight: '600',
            color: theme.colors.Black,
          }}>
          ATLANTA Magazine
        </Text>

        <Text
          style={{
            fontFamily: 'Lora-Medium',
            color: '#5d5d5d',
            fontSize: 12,
            marginTop: 8,
            fontWeight: '500',
            textAlign: 'center',
            lineHeight: 20,
            fontStyle: 'italic',
          }}>
          "Mike Haze, of the Red Phone Booth, will be slinging cocktails crafted
          with fresh produce and herbs, and there’s a cigar lounge, too."
        </Text>
      </View>

      <View
        style={{
          alignItems: 'center',
          backgroundColor: theme.colors.primary,
        }}>
        <Image
          source={require('../assets/img9.png')}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height / 1.55,
            resizeMode: 'contain',
            marginTop: 50,
            alignSelf: 'center',
          }}
        />
      </View>

      <View
        style={{
          backgroundColor: '#f7f3ed',
          paddingBottom: 50,
          marginVertical: 50,
        }}>
        <Image
          source={require('../assets/img10.png')}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height / 1.6,
            resizeMode: 'contain',
            marginVertical: 50,
            marginTop: 50,
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            fontFamily: 'Lora-Bold',
            fontSize: 28,
            fontWeight: '600',
            color: theme.colors.Black,
            alignSelf: 'center',
          }}>
          Book a reservation
        </Text>
        <View
          style={{
            marginHorizontal: 25,
            marginTop: 50,
          }}>
          <TextInput
            placeholder={'Name'}
            style={{
              fontFamily: 'Lora-Medium',
              paddingHorizontal: 15,
              backgroundColor: '#fff',
              paddingTop: 4,
              paddingBottom: 4,
            }}
          />
          <TextInput
            placeholder={'Email'}
            style={{
              fontFamily: 'Lora-Medium',
              paddingHorizontal: 15,
              backgroundColor: '#fff',
              paddingTop: 4,
              paddingBottom: 4,
              marginTop: 25,
            }}
          />
          <TextInput
            placeholder={'Party Size'}
            style={{
              fontFamily: 'Lora-Medium',
              paddingHorizontal: 15,
              backgroundColor: '#fff',
              paddingTop: 4,
              paddingBottom: 4,
              marginTop: 25,
            }}
          />
          <TextInput
            placeholder={'Message'}
            style={{
              fontFamily: 'Lora-Medium',
              paddingHorizontal: 15,
              backgroundColor: '#fff',
              paddingTop: 4,
              paddingBottom: 4,
              marginTop: 25,
            }}
          />

          <TouchableOpacity
            // onPress={onPress}
            // activeOpacity={activeOpacity}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 15,
              flexDirection: 'row',
              borderRadius: 6,
              backgroundColor: '#000',
              // flex: 1,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
              marginVertical: 30,
            }}>
            <Text
              style={{
                fontFamily: 'Lora-Medium',
                color: theme.colors.primary,
                fontSize: 16,
                paddingHorizontal: 20,
              }}>
              BOOK NOW
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          // width: Dimensions.get('window').width - 40,
          paddingHorizontal: 20,
          backgroundColor: '#fff',
          paddingVertical: 20,
        }}>
        <Text
          style={{
            fontFamily: 'Lora-Bold',
            fontSize: 28,
            fontWeight: '600',
            color: theme.colors.Black,
            textAlign: 'center',
          }}>
          Follow The Continent Online
        </Text>

        <Text
          style={{
            fontFamily: 'Lora-Medium',
            color: '#5d5d5d',
            marginTop: 20,
            textAlign: 'center',
            lineHeight: 20,
            marginHorizontal: 40,
          }}>
          A International Restaurant With a Flare for Fine Dining
        </Text>
      </View>
      <View
        style={{
          paddingVertical: 22,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity>
            <Image
              style={{
                height: 18,
                width: 18,
                resizeMode: 'contain',
                tintColor: theme.colors.Black,
              }}
              source={require('../assets/fb.png')}
            />
          </TouchableOpacity>
          <View style={{width: 20}} />
          <TouchableOpacity>
            <Image
              style={{
                height: 18,
                width: 18,
                resizeMode: 'contain',
                tintColor: theme.colors.Black,
              }}
              source={require('../assets/twitter.png')}
            />
          </TouchableOpacity>
          <View style={{width: 20}} />
          <TouchableOpacity>
            <Image
              style={{
                height: 18,
                width: 18,
                resizeMode: 'contain',
                tintColor: theme.colors.Black,
              }}
              source={require('../assets/instagram.png')}
            />
          </TouchableOpacity>
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
