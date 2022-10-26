import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../../../utils/theme';
import Statusbar from '../../../../components/Statusbar';
import Header from '../../../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {data} from '../../../../utils/data';
import TextFormatted from '../../../../components/TextFormated';
import Button from '../../../../components/Button';

export default function Cart() {
  const navigation = useNavigation();
  const dimensions = useWindowDimensions();
  const [selected, setSelected] = useState(0);
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.primary}}>
      <Statusbar
        barStyle="dark-content"
        backgroundColor={theme.colors.primaryg}
      />
      <Header
        navigation={navigation}
        Headertext={'Select Address'}
        sourcetwo={require('../../../../assets/plus.png')}
        onPressTwo={() => navigation.navigate('AddAddress')}
      />

      <View>
        <FlatList
          data={data.slice(0, 2)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}
          // style={{flex: 1}}
          scrollEnabled={false}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                //  navigation.goBack();
                setSelected(index);
              }}
              style={{
                borderRadius: 12,
                backgroundColor: theme.colors.primary,
                marginHorizontal: 13,
                flexDirection: 'row',
                paddingHorizontal: 10,
                alignItems: 'center',
                marginVertical: 15,
              }}>
              <Image
                source={require('../../../../assets/map.png')}
                style={{
                  width: dimensions.width / 8,
                  height: dimensions.width / 8,
                  resizeMode: 'cover',
                  borderRadius: 12,
                  marginRight: 15,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: dimensions.width - 110,
                }}>
                <View style={{alignItems: 'flex-start'}}>
                  <TextFormatted
                    style={{fontWeight: '500', color: theme.colors.Black}}>
                    Chhatak, Sunamgonj 12/8AB
                  </TextFormatted>
                  <TextFormatted
                    style={{
                      fontSize: 10,
                      color: theme.colors.Gray,
                      marginTop: 7,
                    }}>
                    Sylhet
                  </TextFormatted>
                </View>
                {selected == index && (
                  <Image
                    source={require('../../../../assets/Check.png')}
                    style={{
                      width: 24,
                      height: 24,
                      resizeMode: 'cover',
                      borderRadius: 12,
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
