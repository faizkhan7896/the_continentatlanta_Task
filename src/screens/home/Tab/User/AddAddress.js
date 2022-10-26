import {View, Text, useWindowDimensions, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../../../utils/theme';
import Statusbar from '../../../../components/Statusbar';
import Header from '../../../../components/Header';
import PickerSelect from '../../../../components/PickerSelect';
import {useNavigation} from '@react-navigation/native';
import TextFormatted from '../../../../components/TextFormated';
import TextInput from '../../../../components/TextInput';
import Button from '../../../../components/Button';
import {ShowToast} from '../../../../utils/ToastFunction';

export default function AddAddress() {
  const navigation = useNavigation();
  const dimensions = useWindowDimensions();
  const [selected, setSelected] = useState('India');
  const [city, setCity] = useState('Indore');
  const [state, setState] = useState('Madhya Pradesh');

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.primary}}>
      <Statusbar
        barStyle="dark-content"
        backgroundColor={theme.colors.primaryg}
      />
      <Header navigation={navigation} Headertext={'Add Address'} />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <View
            style={{
              alignItems: 'flex-start',
              marginHorizontal: 20,
              marginTop: 20,
              borderWidth: 0.5,
              borderColor: theme.colors.Tabbg,
              backgroundColor: theme.colors.primary,
              paddingVertical: 10,
              paddingRight: 10,
              borderRadius: 12,
            }}>
            {/* <View style={{}}> */}
            <TextFormatted
              style={{marginLeft: 10, fontSize: 9, color: theme.colors.Gray}}>
              Country or region
            </TextFormatted>
            <PickerSelect
              placeholder={{label: 'Select your country'}}
              style={{
                placeholder: {
                  color: theme.colors.Black,
                  fontFamily: 'Poppins-Regular',
                },
                inputAndroid: {
                  color: '#000',
                  fontFamily: 'Poppins-SemiBold',
                  padding: 0,
                  color: theme.colors.Black,
                  fontWeight: '600',
                },
                inputIOS: {
                  color: '#000',
                  fontFamily: 'Poppins-SemiBold',
                  color: theme.colors.Black,
                  fontWeight: '600',
                },
              }}
              items={[
                {label: 'India', value: 'India', color: '#000'},
                {label: 'Japan', value: 'Japan', color: '#000'},
              ]}
              onValueChange={val => setSelected(val)}
              value={selected}
              pickerProps={{mode: 'dropdown'}}
            />
            {/* </View> */}
          </View>
          <View
            style={{
              alignItems: 'flex-start',
              marginHorizontal: 20,
              marginTop: 20,
              backgroundColor: theme.colors.primary,
              paddingVertical: 10,
              paddingRight: 10,
              borderRadius: 12,
              borderWidth: 0.5,
              borderColor: theme.colors.Tabbg,
            }}>
            {/* <View style={{}}> */}
            <TextFormatted
              style={{marginLeft: 15, fontSize: 9, color: theme.colors.Gray}}>
              Street Address
            </TextFormatted>
            <TextInput
              paddingHorizontal={15}
              backgroundColor={theme.colors.primary}
              placeholder={'Enter Here'}
              paddingHorizontal={-1}
              paddingTop={0}
              paddingBottom={0}
            />
            {/* </View> */}
          </View>
          <View
            style={{
              alignItems: 'flex-start',
              marginHorizontal: 20,
              marginTop: 20,
              backgroundColor: theme.colors.primary,
              paddingVertical: 10,
              paddingRight: 10,
              borderRadius: 12,
              borderWidth: 0.5,
              borderColor: theme.colors.Tabbg,
            }}>
            {/* <View style={{}}> */}
            <TextFormatted
              style={{marginLeft: 15, fontSize: 9, color: theme.colors.Gray}}>
              Street Address 2
            </TextFormatted>
            <TextInput
              paddingHorizontal={15}
              backgroundColor={theme.colors.primary}
              placeholder={'Enter Here'}
              paddingHorizontal={-1}
              paddingTop={0}
              paddingBottom={0}
            />
            {/* </View> */}
          </View>
          <View
            style={{
              alignItems: 'flex-start',
              marginHorizontal: 20,
              marginTop: 20,
              borderWidth: 0.5,
              borderColor: theme.colors.Tabbg,
              backgroundColor: theme.colors.primary,
              paddingVertical: 10,
              paddingRight: 10,
              borderRadius: 12,
            }}>
            {/* <View style={{}}> */}
            <TextFormatted
              style={{marginLeft: 10, fontSize: 9, color: theme.colors.Gray}}>
              City
            </TextFormatted>
            <PickerSelect
              placeholder={{label: 'Select your country'}}
              style={{
                placeholder: {
                  color: theme.colors.Black,
                  fontFamily: 'Poppins-Regular',
                },
                inputAndroid: {
                  color: '#000',
                  fontFamily: 'Poppins-SemiBold',
                  padding: 0,
                  color: theme.colors.Black,
                  fontWeight: '600',
                },
                inputIOS: {
                  color: '#000',
                  fontFamily: 'Poppins-SemiBold',
                  color: theme.colors.Black,
                  fontWeight: '600',
                },
              }}
              items={[
                {label: 'Indore', value: 'Indore', color: '#000'},
                {label: 'Bhopal', value: 'Bhopal', color: '#000'},
              ]}
              onValueChange={val => setCity(val)}
              value={city}
              pickerProps={{mode: 'dropdown'}}
            />
            {/* </View> */}
          </View>
          <View
            style={{
              alignItems: 'flex-start',
              marginHorizontal: 20,
              marginTop: 20,
              borderWidth: 0.5,
              borderColor: theme.colors.Tabbg,
              backgroundColor: theme.colors.primary,
              paddingVertical: 10,
              paddingRight: 10,
              borderRadius: 12,
            }}>
            {/* <View style={{}}> */}
            <TextFormatted
              style={{marginLeft: 10, fontSize: 9, color: theme.colors.Gray}}>
              State/ Province/ Region
            </TextFormatted>
            <PickerSelect
              placeholder={{label: 'Select your country'}}
              style={{
                placeholder: {
                  color: theme.colors.Black,
                  fontFamily: 'Poppins-Regular',
                },
                inputAndroid: {
                  color: '#000',
                  fontFamily: 'Poppins-SemiBold',
                  padding: 0,
                  color: theme.colors.Black,
                  fontWeight: '600',
                },
                inputIOS: {
                  color: '#000',
                  fontFamily: 'Poppins-SemiBold',
                  color: theme.colors.Black,
                  fontWeight: '600',
                },
              }}
              items={[
                {
                  label: 'Madhya Pradesh',
                  value: 'Madhya Pradesh',
                  color: '#000',
                },
                {
                  label: 'Madhya Pradesh',
                  value: 'Madhya Pradesh',
                  color: '#000',
                },
              ]}
              onValueChange={val => setState(val)}
              value={state}
              pickerProps={{mode: 'dropdown'}}
            />
            {/* </View> */}
          </View>
          <View
            style={{
              alignItems: 'flex-start',
              marginHorizontal: 20,
              marginTop: 20,
              backgroundColor: theme.colors.primary,
              paddingVertical: 10,
              paddingRight: 10,
              borderRadius: 12,
              borderWidth: 0.5,
              borderColor: theme.colors.Tabbg,
            }}>
            {/* <View style={{}}> */}
            <TextFormatted
              style={{marginLeft: 15, fontSize: 9, color: theme.colors.Gray}}>
              Zip Code
            </TextFormatted>
            <TextInput
              paddingHorizontal={15}
              backgroundColor={theme.colors.primary}
              placeholder={'Enter Here'}
              paddingHorizontal={-1}
              paddingTop={0}
              paddingBottom={0}
            />
            {/* </View> */}
          </View>
        </View>
        <View style={{marginHorizontal: 20}}>
          <Button
            marginBottom={20}
            ButtonText={'SAVE ADDRESS'}
            onPress={() => {
              navigation.goBack();
              ShowToast('Address saved successfully.');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
