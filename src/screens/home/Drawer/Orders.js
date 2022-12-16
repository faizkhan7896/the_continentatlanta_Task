import React, {useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Completed from '../Tab/User/OrderTab/Completed';
import Cancelled from '../Tab/User/OrderTab/Cancelled';
import {theme} from '../../../utils/theme';
import Statusbar from '../../../components/Statusbar';
import Header from '../../../components/Header';

export default function TabScreen({navigation}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  // alert(isKeyboardVisible);

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.primary}}>
      <Statusbar
        backgroundColor={theme.colors.primary}
        barStyle={'dark-content'}
      />
      <Header navigation={navigation} Headertext={'Orders'} />

      <View style={styles.maincontainer}>
        <TouchableOpacity
          onPress={() => setCurrentPage(1)}
          style={[
            styles.container,
            {
              borderColor:
                currentPage == 1 ? theme.colors.yellow : theme.colors.HomeBg,
            },
          ]}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: currentPage == 1 ? 'bold' : '500',
              color: currentPage == 1 ? theme.colors.yellow : theme.colors.Gray,
              fontStyle: currentPage == 2 ? 'italic' : null,
            }}>
            Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCurrentPage(2)}
          style={[
            styles.container,
            {
              borderColor:
                currentPage == 2 ? theme.colors.yellow : theme.colors.HomeBg,
            },
          ]}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: currentPage == 2 ? 'bold' : '500',
              color: currentPage == 2 ? theme.colors.yellow : theme.colors.Gray,
              fontStyle: currentPage == 1 ? 'italic' : null,
            }}>
            Cancelled
          </Text>
        </TouchableOpacity>
      </View>
      {currentPage == 1 ? (
        <Completed navigation={navigation} />
      ) : (
        <Cancelled navigation={navigation} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
    paddingBottom: 10,
    flex: 1,
  },
});
