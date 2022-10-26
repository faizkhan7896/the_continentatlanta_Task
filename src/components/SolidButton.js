import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import React from 'react';
import TextFormated from './TextFormated';
import {theme} from '../utils/theme';

export default function SolidButton({
  onPress,
  borderRadius,
  backgroundColor,
  text,
  loading,
  marginHorizontal,
  source,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        flexDirection: 'row',
        borderRadius: borderRadius || 6,
        backgroundColor: backgroundColor,
        // flex: 1,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginHorizontal: marginHorizontal || 15,
      }}>
      {/* {loading ? (
        <ActivityIndicator size={'small'} style={{margin: 2}} color="#fff" />
      ) : ( */}
      {text ? (
        loading ? (
          <ActivityIndicator size={'small'} style={{margin: 2}} color="#fff" />
        ) : (
          <TextFormated
            style={{
              fontWeight: '700',
              color: theme.colors.primary,
              fontSize: 16,
            }}>
            {text}
          </TextFormated>
        )
      ) : (
        <Image
          style={{
            height: 12,
            width: 12,
            resizeMode: 'contain',
          }}
          source={source}
        />
      )}
      {/* )} */}
    </TouchableOpacity>
  );
}
