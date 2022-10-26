// import {formatDateTime} from '../utils/utilFunc';
// import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {theme} from '../utils/theme';
import TextFormatted from './TextFormated';

function EventSmallItem({
  item,
  onPress,
  time,
  title,
  location,
  statuss,
  image,
  amount,
  status_color,
}) {
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();

  //   alert(JSON.stringify(item));

  return (
    <TouchableOpacity
      // onPress={() => navigation.navigate('EventDetails', {eventDetails: item})}
      onPress={onPress}
      style={{
        borderRadius: 12,
        backgroundColor: theme.colors.primary,
        width: dimensions.width - 40,
        flexDirection: 'row',
        marginVertical: 12,
        // borderWidth: 1,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}>
      <View
        style={{
          backgroundColor: theme.colors.primary,
          width: dimensions.width / 3,
          height: dimensions.width / 3.2,
          borderBottomLeftRadius: 12,
          borderTopLeftRadius: 12,
        }}>
        <Image
          source={{uri: image}}
          style={{
            borderBottomLeftRadius: 12,
            borderTopLeftRadius: 12,
            width: dimensions.width / 3.2,
            height: dimensions.width / 3.2,
            resizeMode: 'stretch',
            backgroundColor: theme.colors.C4C4C4,
          }}
        />
      </View>

      <View style={{paddingRight: 7, paddingTop: 15}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: dimensions.width / 2,
          }}>
          <TextFormatted style={styles.title}>{title}</TextFormatted>
          <TextFormatted style={styles.rate}>
            {amount == 0 ? 'FREE' : 'Rs. ' + amount}
          </TextFormatted>
        </View>
        <View style={{height: 7}} />

        <TextFormatted style={styles.time}>{time}</TextFormatted>
        <View style={{height: 7}} />
        <TextFormatted style={styles.location}>{location}</TextFormatted>
        <View style={{height: 7}} />

        <TextFormatted
          style={{
            color: status_color,
            fontSize: 12,
            fontWeight: '700',
          }}>
          {statuss}
        </TextFormatted>
      </View>

      <View />
    </TouchableOpacity>
  );
}

export default EventSmallItem;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: theme.colors.Black,
    fontWeight: '700',
  },
  location: {
    fontSize: 13,
    color: theme.colors.Black,
    fontWeight: '600',
  },

  time: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8C8FA5',
  },
  rate: {
    fontSize: 12,
    color: theme.colors.Linear_second,
    fontWeight: '700',
  },
});
