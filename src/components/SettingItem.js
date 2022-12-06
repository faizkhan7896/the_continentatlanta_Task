import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import TextFormatted from './TextFormated';
import {theme} from '../utils/theme';
import {Switch} from 'react-native-paper';

export default function SettingItem({
  text,
  toggle,
  onPress,
  source,
  onValueChange,
  value,
  height,
  width,
  marginLeft,
}) {
  const dimensions = useWindowDimensions();

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: dimensions.width - 40,
          marginVertical: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: height || 40,
              width: width || 40,
              resizeMode: 'contain',
              marginRight: 10,
              marginLeft: marginLeft,
              tintColor: theme.colors.yellow,
            }}
            source={source}
          />
          <TextFormatted style={{fontSize: 16}}>{text}</TextFormatted>
        </View>

        {toggle ? (
          <Switch
            color={theme.colors.yellow}
            value={value}
            onValueChange={onValueChange}
          />
        ) : (
          <Image
            style={{
              height: 18,
              width: 18,
              resizeMode: 'contain',
              marginRight: 10,
            }}
            source={require('../assets/Next.png')}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
