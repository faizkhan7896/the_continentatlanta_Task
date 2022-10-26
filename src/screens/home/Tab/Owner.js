import React, {useState} from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme} from '../../../utils/theme';
import Task from './Owner/HomeTab/Task';
import Management from './Owner/HomeTab/Management';

export default function TabScreen({navigation}) {
  const [currentPage, setCurrentPage] = useState(1);
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
            EDITOR
          </Text>
        </TouchableOpacity>
      </View>
      {currentPage == 1 ? (
        <Task navigation={navigation} />
      ) : (
        <Management navigation={navigation} />
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
    width: Dimensions.get('window').width / 2.15,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    paddingVertical: 16,
    // borderRadius: 8,
  },
});
