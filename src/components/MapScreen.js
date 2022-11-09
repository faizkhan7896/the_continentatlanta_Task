import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Platform, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {theme} from '../utils/theme';
import Header from './Header';
import Statusbar from './Statusbar';

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
  const {params} = useRoute();
  // alert(JSON.stringify(params.lat));
  const mapStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#212121',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#212121',
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'administrative.country',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#181818',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#1b1b1b',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#2c2c2c',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#8a8a8a',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          color: '#373737',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#3c3c3c',
        },
      ],
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [
        {
          color: '#4e4e4e',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#000000',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#3d3d3d',
        },
      ],
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.primary}}>
      <Statusbar
        barStyle={'dark-content'}
        backgroundColor={theme.colors.primary}
      />
      <Header
        navigation={navigation}
        color={theme.colors.primary}
        // Headertext={'Image'}
      />

      <MapView
        // customMapStyle={mapStyle}
        initialRegion={{
          latitude: params?.lat || MARKERS[0].latitude,
          longitude: params?.lon || MARKERS[0].longitude,
          latitudeDelta: 0.1222,
          longitudeDelta: 0.0621,
        }}
        style={{flex: 1}}>
        <Marker
          draggable={true}
          coordinate={{
            latitude: params?.lat || MARKERS[0].latitude,
            longitude: params?.lon || MARKERS[0].longitude,
          }}
        />
      </MapView>
    </View>
  );
}
