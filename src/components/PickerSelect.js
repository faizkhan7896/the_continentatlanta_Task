import React from 'react';
import {Image, Platform, StyleSheet} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';

export default function PickerSelect(props) {
  return (
    <RNPickerSelect
      {...props}
      Icon={() => (
        <Image
          source={require('../assets/Dropdownn.png')}
          style={{
            width: 18,
            height: 18,
            resizeMode: 'cover',
            borderRadius: 12,
          }}
        />
      )}
      useNativeAndroidPickerStyle={false}
      style={pickerInput}
    />
  );
}

const pickerInput = StyleSheet.create({
  inputAndroid: {
    paddingVertical: 5,
    paddingLeft: 10,
    paddingRight: 30,
    color: 'black',
    borderRadius: 3,
  },
  inputIOSContainer: {
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 30,
    color: 'black',
    borderRadius: 3,
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 5,
    marginTop: 2,
  },
});
