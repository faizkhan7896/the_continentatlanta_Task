// import {View, Text, Dimensions} from 'react-native';
// import React from 'react';

// export default function Map() {
//   return (
// <View
//   style={{
//     backgroundColor: '#fff',
//     height: 500,
//     width: Dimensions.get('window').width,
//     alignItems: 'center',
//     justifyContent: 'center',
//   }}>
//       <Text style={{fontSize: 24, fontWeight: '600'}}>Map</Text>
//     </View>
//   );
// }

import React from 'react';
import {Dimensions, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Statusbar from '../../../../../components/Statusbar';
import {theme} from '../../../../../utils/theme';

const MARKERS = [
  {latitude: 22.761794329667982, longitude: 75.88739432394505},
  {latitude: 22.761794329667982, longitude: 75.89292671531439},
  {latitude: 22.757228500578126, longitude: 75.89016135782003},
  {latitude: 22.75746563806522, longitude: 75.88488578796387},
  {latitude: 22.752597898978536, longitude: 75.88765282183886},
  {latitude: 22.753667060297012, longitude: 75.8931852132082},
  {latitude: 22.718897408101107, longitude: 75.87684486061335},
  {latitude: 22.721981027815573, longitude: 75.87356217205524},
  {latitude: 22.71557217938178, longitude: 75.87382100522517},
  {latitude: 22.711539550780383, longitude: 75.87684486061335},
  {latitude: 22.71842299890038, longitude: 75.86970280855894},
  {latitude: 22.712013983840972, longitude: 75.87053831666708},
];

export default function MapSearch({navigation}) {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        height: 650,
        width: Dimensions.get('window').width,
      }}>
      <Statusbar
        barStyle={'dark-content'}
        backgroundColor={theme.colors.primary}
      />

      <MapView
        initialRegion={{
          latitude: MARKERS[0].latitude || 0,
          longitude: MARKERS[0].longitude || 0,
          latitudeDelta: 0.1222,
          longitudeDelta: 0.0621,
        }}
        style={{flex: 1}}>
        {MARKERS.map((item, index) => (
          <Marker
            draggable={true}
            key={index}
            coordinate={{
              latitude: item.latitude || 0,
              longitude: item.longitude || 0,
            }}
          />
        ))}
      </MapView>
    </View>
  );
}
