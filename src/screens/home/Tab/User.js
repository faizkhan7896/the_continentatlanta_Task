import React, {useState} from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../../../utils/theme';
import History from './User/UserTab/History';
import Map from './User/UserTab/Map';
import ShowCase from './User/UserTab/ShowCase';

export default function TabScreen({navigation}) {
  const [currentPage, setCurrentPage] = useState(2);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  // alert(isKeyboardVisible);

  return (
    <View style={{flex: 1}}>
      {/* <View style={{marginBottom: -90, marginTop: 60}}> */}
      <StatusBar backgroundColor="#fff" barStyle="light-content" />

      <View style={styles.maincontainer}>
        <TouchableOpacity
          onPress={() => setCurrentPage(1)}
          style={[
            styles.container,
            {
              backgroundColor:
                currentPage == 1 ? theme.colors.yellow : theme.colors.red,
            },
          ]}>
          <Text
            style={{
              fontWeight: currentPage == 1 ? 'bold' : '500',
              color: theme.colors.primary,
            }}>
            STATUS
          </Text>
        </TouchableOpacity>
        <View style={{width: 10}} />
        <TouchableOpacity
          onPress={() => setCurrentPage(2)}
          style={[
            styles.container,
            {
              backgroundColor:
                currentPage == 2 ? theme.colors.yellow : theme.colors.red,
            },
          ]}>
          <Text
            style={{
              fontWeight: currentPage == 1 ? 'bold' : '500',
              color: theme.colors.primary,
            }}>
            SHOWCASE
          </Text>
        </TouchableOpacity>
        <View style={{width: 10}} />

        <TouchableOpacity
          onPress={() => setCurrentPage(3)}
          style={[
            styles.container,
            {
              backgroundColor:
                currentPage == 3 ? theme.colors.yellow : theme.colors.red,
            },
          ]}>
          <Text
            style={{
              fontWeight: currentPage == 1 ? 'bold' : '500',
              color: theme.colors.primary,
            }}>
            MAP
          </Text>
        </TouchableOpacity>
      </View>
      {currentPage == 1 ? (
        <History navigation={navigation} />
      ) : currentPage == 2 ? (
        <ShowCase navigation={navigation} />
      ) : (
        <Map navigation={navigation} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 7,
    alignItems: 'center',
    paddingBottom: 15,
  },
  container: {
    width: Dimensions.get('window').width / 3.2,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    paddingVertical: 16,
    // borderRadius: 8,
    flex: 1,
  },
});
