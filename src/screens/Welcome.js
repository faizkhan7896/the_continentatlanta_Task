import {useRoute} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
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
          paddingVertical: 50,
        }}>
        <Text
          style={{
            fontFamily: 'Lora-Bold',
            fontSize: 24,
            color: theme.colors.primary,
            marginHorizontal: 40,
            textAlign: 'center',
            alignSelf: 'center',
          }}>
          Continent Restaurant & Cigar Lounge
        </Text>
        <View
          style={{
            borderColor: '#fff',
            width: Dimensions.get('window').width / 6,
            borderTopWidth: 3,
            marginTop: 10,
          }}
        />

        <Text
          style={{
            fontFamily: 'Lora-Medium',
            fontSize: 18,
            color: theme.colors.primary,
            marginHorizontal: 20,
            textAlign: 'center',
            alignSelf: 'center',
            marginTop: 50,
          }}>
          International Fine Dining, Craft Cocktails, Rare Spirits, Premium Wine
          & Hand-rolled Cigars
        </Text>

        <TouchableOpacity
          // onPress={onPress}
          // activeOpacity={activeOpacity}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            flexDirection: 'row',
            borderRadius: 4,
            backgroundColor: '#393838',
            // flex: 1,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            marginTop: 30,
          }}>
          <Text
            style={{
              fontFamily: 'Lora-Medium',
              color: theme.colors.primary,
              fontSize: 16,
              paddingHorizontal: 20,
            }}>
            OUR MENU
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={onPress}
          // activeOpacity={activeOpacity}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            flexDirection: 'row',
            borderRadius: 4,
            backgroundColor: '#810a0a',
            // flex: 1,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            marginVertical: 25,
          }}>
          <Text
            style={{
              fontFamily: 'Lora-Medium',
              color: theme.colors.primary,
              fontSize: 16,
              paddingHorizontal: 35,
            }}>
            RESERVATION
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={onPress}
          // activeOpacity={activeOpacity}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            flexDirection: 'row',
            borderRadius: 4,
            backgroundColor: '#393838',
            // flex: 1,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}>
          <Text
            style={{
              fontFamily: 'Lora-Medium',
              color: theme.colors.primary,
              fontSize: 16,
              paddingHorizontal: 20,
            }}>
            EVENTS
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={onPress}
          // activeOpacity={activeOpacity}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            flexDirection: 'row',
            borderRadius: 4,
            backgroundColor: '#810a0a',
            // flex: 1,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            marginVertical: 25,
          }}>
          <Text
            style={{
              fontFamily: 'Lora-Medium',
              color: theme.colors.primary,
              fontSize: 16,
              paddingHorizontal: 35,
            }}>
            DOORDASH
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={onPress}
          // activeOpacity={activeOpacity}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            flexDirection: 'row',
            borderRadius: 4,
            backgroundColor: '#393838',
            // flex: 1,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}>
          <Text
            style={{
              fontFamily: 'Lora-Medium',
              color: theme.colors.primary,
              fontSize: 16,
              paddingHorizontal: 20,
            }}>
            YELP
          </Text>
        </TouchableOpacity>

        <FlatList
          data={Array(6).fill('')}
          numColumns={4}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginVertical: 35,
            // borderWidth: 1,
            // borderColor: '#fff',
          }}
          scrollEnabled={false}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                // borderRadius: 12,
                marginHorizontal: 4,
                marginVertical: 9,
                // borderWidth: 1,
                borderColor: theme.colors.green,
              }}>
              <Image
                source={require('../assets/img2.jpeg')}
                style={{
                  width: Dimensions.get('window').width / 4.5,
                  height: Dimensions.get('window').width / 3,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          )}
        />

        <Image
          source={require('../assets/img12.png')}
          style={{
            marginTop: Dimensions.get('window').width / 2,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height + 80,
            resizeMode: 'contain',
            alignSelf: 'center',
            // borderWidth: 1,
            // borderColor: '#fff',
          }}
        />
        <View
          style={{
            alignItems: 'center',
            backgroundColor: theme.colors.primary,
            paddingHorizontal: 25,
            paddingVertical: 50,
          }}>
          <Text
            style={{
              fontFamily: 'Lora-Bold',
              fontSize: 24,
              color: theme.colors.Black,
              marginHorizontal: 30,
              textAlign: 'center',
              alignSelf: 'center',
            }}>
            Continent Restaurant & Cigar Lounge
          </Text>

          <View
            style={{
              borderColor: '#ebebeb',
              width: Dimensions.get('window').width / 6,
              borderTopWidth: 3,
              marginTop: 15,
            }}
          />

          <Text
            style={{
              fontFamily: 'Lora-Medium',
              fontSize: 20,
              color: '#b4b4b4',
              textAlign: 'center',
              marginTop: 40,
            }}>
            International Fine Dining, Craft Cocktails, Rare Spirits, Premium
            Wine & Hand-rolled Cigars
          </Text>

          <Image
            source={require('../assets/img13.png')}
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height / 1.61,
              resizeMode: 'contain',
              marginTop: 30,
            }}
          />

          <Text
            style={{
              fontFamily: 'Lora-Bold',
              fontSize: 24,
              color: theme.colors.Black,
              marginHorizontal: 30,
              textAlign: 'center',
              alignSelf: 'center',
              marginTop: 30,
            }}>
            Whiskey Tastings & Cigar Pairings
          </Text>

          <View
            style={{
              borderColor: '#ebebeb',
              width: Dimensions.get('window').width / 6,
              borderTopWidth: 3,
              marginTop: 15,
            }}
          />

          <Text
            style={{
              fontFamily: 'Lora-Medium',
              fontSize: 20,
              color: '#b4b4b4',
              textAlign: 'center',

              marginTop: 40,
            }}>
            Join us for our bi-weekly tasting events. Featuring aged spirits and
            hand-rolled cigars.
          </Text>

          <Image
            source={require('../assets/img14.png')}
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height / 1.61,
              resizeMode: 'contain',
              marginTop: 30,
            }}
          />

          <Text
            style={{
              fontFamily: 'Lora-Bold',
              fontSize: 24,
              color: theme.colors.Black,
              marginHorizontal: 10,
              textAlign: 'center',
              alignSelf: 'center',
              marginTop: 30,
            }}>
            Hand crafted cocktails & Premium Wines
          </Text>

          <View
            style={{
              borderColor: '#ebebeb',
              width: Dimensions.get('window').width / 6,
              borderTopWidth: 3,
              marginTop: 15,
            }}
          />

          <Text
            style={{
              fontFamily: 'Lora-Medium',
              fontSize: 20,
              color: '#b4b4b4',
              textAlign: 'center',

              marginTop: 40,
            }}>
            Our hand crafted cocktails are made to order with premium spirits,
            100% fresh squeezed juice and cut to order garnishes.
          </Text>
        </View>

        <Image
          source={require('../assets/img15.png')}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height + 100,
            resizeMode: 'contain',
            alignSelf: 'center',
            // borderWidth: 1,
          }}
        />
        <Text
          style={{
            fontFamily: 'Lora-Bold',
            fontSize: 24,
            color: theme.colors.primary,
            marginHorizontal: 30,
            textAlign: 'center',
            alignSelf: 'center',
            marginTop: 30,
          }}>
          VISIT US
        </Text>

        <View
          style={{
            borderColor: '#ebebeb',
            width: Dimensions.get('window').width / 6,
            borderTopWidth: 3,
            marginTop: 15,
          }}
        />

        <View
          style={{
            borderColor: '#ebebeb',
            width: Dimensions.get('window').width - 40,
            // borderWidth: 3,
            marginTop: 35,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <Image
            source={require('../assets/marker.png')}
            style={{
              width: 16,
              height: 16,
              resizeMode: 'contain',
              tintColor: '#9d9d9d',
              marginRight: 10,
            }}
          />
          <Text
            style={{
              fontFamily: 'Lora-Medium',
              fontSize: 12,
              color: '#9d9d9d',
              textAlign: 'left',
              width: Dimensions.get('window').width / 1.3,
            }}>
            4300 Buford Hwy NE #201-202, Atlanta, GA 30345
          </Text>
        </View>

        <View
          style={{
            borderColor: '#ebebeb',
            width: Dimensions.get('window').width - 40,
            // borderWidth: 3,
            marginTop: 15,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <Image
            source={require('../assets/Email.png')}
            style={{
              width: 16,
              height: 16,
              tintColor: '#9d9d9d',
              resizeMode: 'contain',
              marginRight: 10,
            }}
          />
          <Text
            style={{
              fontFamily: 'Lora-Medium',
              fontSize: 12,
              color: '#9d9d9d',
              textAlign: 'left',
              width: Dimensions.get('window').width / 1.3,
            }}>
            info@TheContinentAtlanta.com
          </Text>
        </View>

        <View
          style={{
            borderColor: '#ebebeb',
            width: Dimensions.get('window').width - 40,
            // borderWidth: 3,
            marginTop: 15,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <Image
            source={require('../assets/call.png')}
            style={{
              width: 16,
              height: 16,
              tintColor: '#9d9d9d',
              resizeMode: 'contain',
              marginRight: 10,
            }}
          />
          <Text
            style={{
              fontFamily: 'Lora-Medium',
              fontSize: 12,
              color: '#9d9d9d',
              textAlign: 'left',
              width: Dimensions.get('window').width / 1.3,
            }}>
            404-228-2027
          </Text>
        </View>

        <Image
          source={require('../assets/mapp.png')}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height / 2.3,
            resizeMode: 'contain',
            marginTop: 30,
          }}
        />

        <Text
          style={{
            fontFamily: 'Lora-Medium',
            fontSize: 20,
            color: '#8f8b8b',
            textAlign: 'center',
            letterSpacing: 2,
            lineHeight: 25,
            marginTop: 40,
          }}>
          DRESS CODE:
        </Text>
        <Text
          style={{
            fontFamily: 'Lora-Medium',
            fontSize: 18,
            color: '#8f8b8b',
            textAlign: 'center',
            letterSpacing: 0.5,
            lineHeight: 25,
            // marginTop: 40,
            paddingHorizontal: 15,
          }}>
          Business casual please. Comfortable but polished (no shorts,
          sweatpants or gym attire). No flip flops or ball caps. We are 21yrs
          and up from 9pm to close.
        </Text>

        <Text
          style={{
            fontFamily: 'Lora-Medium',
            fontSize: 20,
            color: '#8f8b8b',
            textAlign: 'center',
            letterSpacing: 2,
            lineHeight: 25,
            marginTop: 40,
          }}>
          PRESS:
        </Text>

        <Text
          style={{
            fontFamily: 'Lora-Medium',
            fontSize: 18,
            color: '#8f8b8b',
            textAlign: 'center',
            letterSpacing: 0.5,
            lineHeight: 25,
            // marginTop: 40,
            paddingHorizontal: 15,
          }}>
          For media inquiries, please contact:
        </Text>

        <Text
          style={{
            fontFamily: 'Lora-Medium',
            fontSize: 18,
            color: '#8f8b8b',
            textAlign: 'center',
            paddingHorizontal: 15,
            lineHeight: 25,
            marginTop: 10,
          }}>
          media@TheContinentAtlanta.com
        </Text>

        <Text
          style={{
            fontFamily: 'Lora-Medium',
            fontSize: 20,
            color: '#8f8b8b',
            textAlign: 'center',
            letterSpacing: 2,
            lineHeight: 25,
            marginTop: 40,
          }}>
          EMPLOYEMENT:
        </Text>

        <Text
          style={{
            fontFamily: 'Lora-Medium',
            fontSize: 18,
            color: '#8f8b8b',
            textAlign: 'center',
            letterSpacing: 0.5,
            lineHeight: 25,
            // marginTop: 40,
            paddingHorizontal: 15,
          }}>
          We are always looking for smart, hardworking and dependable employees.
        </Text>

        <Text
          style={{
            fontFamily: 'Lora-Medium',
            fontSize: 18,
            color: '#8f8b8b',
            textAlign: 'center',
            letterSpacing: 0.5,
            lineHeight: 25,
            // marginTop: 40,
            paddingHorizontal: 15,
          }}>
          Please send resume to info@TheContinentAtlanta.com or call
          404-228-2027
        </Text>

        <Text
          style={{
            fontFamily: 'Lora-Medium',
            fontSize: 18,
            color: '#8f8b8b',
            textAlign: 'center',
            letterSpacing: 0.5,
            lineHeight: 25,
            marginTop: 20,
            paddingHorizontal: 15,
          }}>
          Copyright 2022 @ Continent Restaurant & Cigar Lounge
        </Text>
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
    marginTop: 7,
  },
  subtitle: {
    textAlign: 'left',
    fontSize: 16,
  },
  forgot: {
    color: '#ADA4A5',
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
