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
              fontFamily: 'Lora',
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
              fontFamily: 'Lora',
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
              fontFamily: 'Lora',
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

      <View style={{backgroundColor: theme.colors.Black}}>
        <ImageBackground
          source={require('../assets/img3.jpeg')}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}>
          <View
            style={{
              marginHorizontal: 25,
              marginTop: 50,
              backgroundColor: '#000000B3',
              paddingVertical: 20,
              paddingHorizontal: 25,
            }}>
            <Text
              style={{
                fontFamily: 'Lora-Medium',
                // fontSize: 12,
                fontWeight: '500',
                color: '#8f8b8b',
                textAlign: 'center',
                marginVertical: 40,
              }}>
              Thank you for your interest in becoming a member of our cigar
              lounge. Please complete the form below and someone from our team
              will contact you with an invite to tour our space and to complete
              our membership application. We look forward to the pleasure of
              meeting you and having you a part of our family.
            </Text>

            <TextInput
              placeholder={'Full Name'}
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
              placeholder={'Phone Number'}
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
                backgroundColor: '#A50A0A',
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
                SUBMIT REQUEST
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <Image
          source={require('../assets/img16.png')}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').width,
            resizeMode: 'cover',
          }}
        />
        <Text
          style={{
            fontFamily: 'Lora-Bold',
            fontSize: 20,
            fontWeight: '900',
            color: '#8f8b8b',
            textAlign: 'center',

            marginTop: 40,
          }}>
          MEMBERSHIP PROGRAM
        </Text>
        <Text
          style={{
            fontFamily: 'Lora-Medium',
            fontSize: 18,
            color: '#8f8b8b',
            textAlign: 'center',

            // marginTop: 40,
            paddingHorizontal: 15,
          }}>
          Continent Restaurant & Cigar Lounge is excited to announce the launch
          of its cigar membership program. The Continent Cigar Lounge is a chic
          haven furnished with rich d??cor. It???s the ultimate place to conduct
          business meetings, have a romantic date, or catch up during a night
          out with friends and family. Complete with a state-of-the-art
          ventilation system and walk-in humidor, it offers the perfect
          environment for smokers and non-smokers.
        </Text>
        <Text
          style={{
            fontFamily: 'Lora-Bold',
            fontSize: 20,
            fontWeight: '900',
            color: '#8f8b8b',
            textAlign: 'center',

            marginTop: 40,
          }}>
          At $350 a month, membership includes:
        </Text>
        <Text
          style={{
            fontFamily: 'Lora-Medium',
            fontSize: 18,
            color: '#8f8b8b',
            textAlign: 'center',

            // marginTop: 40,
            paddingHorizontal: 15,
          }}>
          ??? 20% discount on dining
        </Text>
        <Text
          style={{
            fontFamily: 'Lora-Medium',
            fontSize: 18,
            color: '#8f8b8b',
            textAlign: 'center',

            // marginTop: 40,
            paddingHorizontal: 15,
          }}>
          ??? Reserved Seating
        </Text>
        <Text
          style={{
            fontFamily: 'Lora-Medium',
            fontSize: 18,
            color: '#8f8b8b',
            textAlign: 'center',

            // marginTop: 40,
            paddingHorizontal: 15,
          }}>
          ??? Special welcome gift box
        </Text>
        <Text
          style={{
            fontFamily: 'Lora-Medium',
            fontSize: 18,
            color: '#8f8b8b',
            textAlign: 'center',

            marginTop: 20,
            paddingHorizontal: 15,
          }}>
          The Continent prides itself on consistently offering a welcoming
          atmosphere, attentive staff
        </Text>
        <Image
          source={require('../assets/img17.png')}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
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
