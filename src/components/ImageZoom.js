import {View, Text, Image, Dimensions} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import ImageZoom from 'react-native-image-pan-zoom';
import Statusbar from './Statusbar';
import {theme} from '../utils/theme';
import Header from './Header';

export default function Image_Zoom({navigation}) {
  const params = useRoute();
  // alert(JSON.stringify(params));

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.Black,
        // alignItems: 'center',
        // justifyContent: 'center',
      }}>
      <Statusbar
        barStyle={'dark-content'}
        backgroundColor={theme.colors.Black}
      />
      <Header
        navigation={navigation}
        color={theme.colors.primary}
        // Headertext={'Image'}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.Black,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ImageZoom
          // enableSwipeDown={true}
          // onSwipeDown={() => alert()}
          // swipeDownThreshold={10}
          style={{flex: 1, backgroundColor: theme.colors.Black}}
          cropWidth={Dimensions.get('window').width - 30}
          cropHeight={Dimensions.get('window').height}
          imageWidth={Dimensions.get('window').width - 30}
          imageHeight={Dimensions.get('window').height}>
          {/* {Array(4)
          .fill('')
          .map((v, i) => ( */}
          <Image
            style={{
              width: Dimensions.get('window').width - 30,
              height: Dimensions.get('window').height / 1.2,
              resizeMode: 'stretch',
              // borderWidth: 1,
              borderColor: theme.colors.primary,
              backgroundColor: theme.colors.Tabbg + '33',
            }}
            source={{uri: params?.params?.image}}
          />
          {/* ))} */}
        </ImageZoom>
      </View>
    </View>
  );
}
