import {default as React} from 'react';
import {Dimensions, Image, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {theme} from '../utils/theme';

export default function PickerInput({
  setSelected,
  selected,
  data,
  placeholder,
  title,
  backgroundColor,
  View_marginTop,
  width,
}) {
  return (
    <View>
      <View
        style={{
          backgroundColor: backgroundColor || theme.colors.inputBG,
          borderRadius: 5,
          marginTop: View_marginTop || 10,
          width: width || Dimensions.get('window').width - 60,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          paddingHorizontal: 7,
          borderColor: theme.colors.C4C4C4,
        }}>
        <View style={{flex: 1}}>
          <RNPickerSelect
            placeholder={{label: placeholder}}
            onValueChange={value => setSelected(value)}
            value={selected}
            style={{
              placeholder: {
                color: '#33196B',
                fontWeight: '600',
                paddingVertical: 15,
                paddingTop: 8,
                paddingBottom: 8,
                fontSize: 10,
              },
              inputIOS: {
                color: '#33196B',
                fontWeight: '600',
                paddingVertical: 15,
                paddingTop: 8,
                paddingBottom: 8,
                fontSize: 10,
              },
              inputAndroid: {
                fontSize: 10,
                color: '#33196B',
                fontWeight: '600',
                paddingVertical: 15,
                paddingTop: 8,
                paddingBottom: 8,
              },
            }}
            items={data}
          />
        </View>
        <Image
          style={{
            height: 10,
            width: 10,
            resizeMode: 'contain',
          }}
          source={require('../assets/Dropdownn.png')}
        />
      </View>
    </View>
  );
}
