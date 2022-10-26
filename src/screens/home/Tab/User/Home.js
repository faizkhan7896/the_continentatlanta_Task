import {useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import SearchBar from '../../../../components/SearchBar';
import Statusbar from '../../../../components/Statusbar';
import TopTabs from './TopTabs';
import {theme} from '../../../../utils/theme';
import {SELECTEDTAB, SIGNOUT} from '../../../../redux/ActionTypes';
import store from '../../../../redux/store';

export default function Login({navigation}) {
  const {params} = useRoute();
  const dimensions = useWindowDimensions();
  const SelectedTab = useSelector(state => state.SelectedTab);
  // alert(JSON.stringify(SelectedTab));
  // useEffect(() => {
  //   store.dispatch({
  //     type: SELECTEDTAB,
  //     payload: {selected: 'USER'},
  //   });
  // }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* <LoadingSpinner size={60} visible={loading} color={'#0091E7'} /> */}
      <Statusbar
        barStyle={'light-content'}
        backgroundColor={theme.colors.primary}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          backgroundColor: theme.colors.primary,
          paddingVertical: 13,
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              style={{
                height: 30,
                width: 30,
                resizeMode: 'contain',
                marginRight: 20,
              }}
              source={require('../../../../assets/Sidebar.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: theme.colors.Black,
              fontSize: 18,
              fontWeight: '700',
            }}>
            PikPic
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            // store.dispatch({
            //   type: SIGNOUT,
            // });
          }}>
          <Image
            style={{
              height: 40,
              width: 40,
              resizeMode: 'contain',
              borderRadius: 50,
            }}
            source={{uri: 'https://picsum.photos/500'}}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.primary,
            // height: 1000,
            // borderTopLeftRadius: 25,
            // borderTopRightRadius: 25,
          }}>
          <TopTabs navigation={navigation} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    height: Dimensions.get('window').width - 153,
    width: Dimensions.get('window').width,
    resizeMode: 'contain',
    // borderWidth: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    height: Dimensions.get('window').width / 2,
    width: Dimensions.get('window').width / 1.2,
    resizeMode: 'contain',
    marginTop: 50,
    alignSelf: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    marginTop: 7,
  },
  subtitle: {
    textAlign: 'left',
    fontSize: 16,
  },
  forgot: {
    color: '#ADA4A5',
    fontWeight: '600',
    alignSelf: 'center',
    textDecorationLine: 'underline',
    marginTop: 10,
    // flexDirection:"row"
  },
  lines: {
    height: 2,
    backgroundColor: '#DDDADA',
    marginTop: 5,
    width: Dimensions.get('window').width / 2.6,
  },
  socialbutton: {
    height: Dimensions.get('window').width / 5,
    width: Dimensions.get('window').width / 3.4,
    resizeMode: 'contain',
    // borderWidth: 1,
  },
});
