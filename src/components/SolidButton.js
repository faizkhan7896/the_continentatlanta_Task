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
  fontSize,
  paddingHorizontal,
  paddingVertical,
  activeOpacity,
  img_height,
  img_width,
  rotate,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: paddingVertical || 15,
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
      {text ? (
        loading ? (
          <ActivityIndicator size={'small'} style={{margin: 2}} color="#fff" />
        ) : (
          <TextFormated
            style={{
              fontWeight: '700',
              color: theme.colors.primary,
              fontSize: fontSize || 16,
              paddingHorizontal: paddingHorizontal || 20,
            }}>
            {text}
          </TextFormated>
        )
      ) : (
        <Image
          style={{
            height: img_height || 12,
            width: img_width || 12,
            resizeMode: 'contain',
            transform: [{rotate: rotate || '0deg'}],
          }}
          source={source}
        />
      )}
      {/* )} */}
    </TouchableOpacity>
  );
}
