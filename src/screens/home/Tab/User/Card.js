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
import {ShowToast} from '../../../../utils/ToastFunction';

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
        Headertext={'Select Card'}
        sourcetwo={require('../../../../assets/plus.png')}
        onPressTwo={() => navigation.navigate('AddCard')}
      />

      <View style={{flex: 1}}>
        <FlatList
          data={data.slice(0, 5)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}
          // style={{flex: 1}}
          scrollEnabled={true}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                ShowToast('Card has been selected');
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
                source={require('../../../../assets/Card.png')}
                style={{
                  width: dimensions.width - 40,
                  height: dimensions.width / 1.6,
                  resizeMode: 'contain',
                  borderRadius: 12,
                  marginRight: 15,
                  // borderWidth: 1,
                }}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
