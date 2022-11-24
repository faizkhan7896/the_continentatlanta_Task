import {View, Text, Image, Dimensions} from 'react-native';
import React, {useRef} from 'react';
import {useRoute} from '@react-navigation/native';
import ImageZoom from 'react-native-image-pan-zoom';
import Statusbar from './Statusbar';
import {theme} from '../utils/theme';
import Header from './Header';
import Video from 'react-native-video';

export default function Image_Zoom({navigation}) {
  const params = useRoute();
  // alert(JSON.stringify(params.params.image));
  const videoRef = useRef(null);

  const onBuffer = e => {
    console.log('buffering ....', e);
  };
  const onError = e => {};
  console.log('URI', params?.params?.uri);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.Black,
        // alignItems: 'center',
        // justifyContent: 'center',
      }}>
      <Statusbar
        barStyle={'light-content'}
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
        <Video
          source={{uri: params?.params?.uri}}
          ref={ref => (videoRef.current = ref)}
          onBuffer={onBuffer}
          onError={onError}
          style={{
            height: Dimensions.get('window').height / 1.5,
            width: Dimensions.get('window').width,
            borderRadius: 3,
          }}
          resizeMode="contain"
          controls={true}
          audioOnly={true}
        />
      </View>
    </View>
  );
}
