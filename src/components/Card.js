// import {formatDateTime} from '../utils/utilFunc';
// import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {theme} from '../utils/theme';
import TextFormatted from './TextFormated';

function EventSmallItem({
  marginHorizontal,
  redFavorites,
  caption,
  title,
  location,
  marginVertical,
  type,
  onPress,
  ProfileonPress,
  MaponPress,
  source,
  price,
  item,
  favpress,
  fav,
  followed,
}) {
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();

  // alert(JSON.stringify(item));

  return (
    <View
      //   onPress={() => navigation.navigate('EventDetails', {eventDetails: item})}
      onPress={onPress}
      style={{
        borderRadius: 12,
        backgroundColor: theme.colors.primary,
        justifyContent: 'space-between',
        // width: dimensions.width / 2.5 - 2,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginHorizontal: marginHorizontal,
        marginVertical: marginVertical,
        paddingBottom: 10,
      }}>
      <View
        style={{
          backgroundColor: theme.colors.primary,
          width: dimensions.width / 2.5,
          height: dimensions.width / 2.8,
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12,
        }}>
        <ImageBackground
          source={source}
          style={{
            width: dimensions.width / 2.5,
            height: dimensions.width / 2.8,
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
            backgroundColor: theme.colors.C4C4C4,
          }}
          imageStyle={{
            resizeMode: 'cover',
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
          }}>
          <View
            style={{
              position: 'absolute',
              right: 10,
              top: 5,
            }}>
            {!!fav && (
              <TouchableOpacity onPress={favpress}>
                <Image
                  source={
                    redFavorites == true
                      ? require('../Assets/redFavorites.png')
                      : require('../Assets/IconFavorites.png')
                  }
                  style={{height: 24, width: 24, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            )}
            {!!followed && (
              <TouchableOpacity onPress={favpress}>
                <Image
                  source={require('../Assets/redFavorites.png')}
                  style={{height: 24, width: 24, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      </View>
      {type == 'followed' ? (
        <View style={{paddingHorizontal: 7, paddingTop: 18}}>
          <TextFormatted
            numberOfLines={1}
            style={{
              fontSize: 16,
              color: theme.colors.Linear_second,
              fontWeight: '700',
            }}>
            {caption}
          </TextFormatted>

          <View style={{height: 8}} />

          <TouchableOpacity onPress={ProfileonPress}>
            <TextFormatted
              style={{
                fontSize: 12,
                color: '#8FD4FF',
                fontWeight: '700',
                textDecorationLine: 'underline',
              }}>
              VIEW PROFILE
            </TextFormatted>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{paddingHorizontal: 7, paddingTop: 5}}>
          <TextFormatted
            style={{
              fontSize: 16,
              color: theme.colors.Linear_second,
              fontWeight: '700',
            }}>
            {title}
          </TextFormatted>
          <View style={{height: 2}} />
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../Assets/IconPin.png')}
              style={{height: 15, width: 15, resizeMode: 'contain'}}
            />
            <TextFormatted
              style={{
                fontSize: 13,
                color: theme.colors.Black,
              }}>
              {' '}
              {location}
            </TextFormatted>
          </View>
          <View style={{height: 8}} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={MaponPress}>
              <TextFormatted
                style={{
                  fontSize: 12,
                  color: '#8FD4FF',
                  fontWeight: '700',
                  textDecorationLine: 'underline',
                }}>
                VIEW ON MAP
              </TextFormatted>
            </TouchableOpacity>
            <TextFormatted
              style={{
                fontSize: 10,
                fontWeight: '700',
                color: theme.colors.Black,
              }}>
              {price == '0' ? 'FREE' : price}
            </TextFormatted>
          </View>
        </View>
      )}
      <View />
    </View>
  );
}

export default EventSmallItem;
