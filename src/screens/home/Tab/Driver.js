import React, {useState} from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {theme} from '../../../utils/theme';
import Map from './Driver/MapTab/Map';
import Timeline from './Driver/MapTab/Timeline';
// import Map from '../Tab/Driver/MapTab/Map';
// import Timeline from '../Tab/Driver/MapTab/Timeline';

export default function TabScreen({navigation}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  // alert(isKeyboardVisible);

  const dimensions = useWindowDimensions();

  return (
    <View style={{flex: 1}}>
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
            PICK STATUS
          </Text>
        </TouchableOpacity>
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
            MAP
          </Text>
        </TouchableOpacity>
      </View>
      {currentPage == 1 ? (
        <Timeline navigation={navigation} />
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
    width: Dimensions.get('window').width / 2.2,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    paddingVertical: 16,
    // borderRadius: 8,
  },
});
