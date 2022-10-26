import React, {useState} from 'react';
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import User from '../User';
import Owner from '../Owner';
import Driver from '../Driver';
import {theme} from '../../../../utils/theme';
import store from '../../../../redux/store';
import {SELECTEDTAB} from '../../../../redux/ActionTypes';

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
          onPress={() => {
            setCurrentPage(1);
            store.dispatch({
              type: SELECTEDTAB,
              payload: {selected: 'USER'},
            });
          }}
          style={[
            styles.container,
            {
              borderColor:
                currentPage == 1 ? theme.colors.red : theme.colors.HomeBg,
              width: dimensions.width / 3,
            },
          ]}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: currentPage == 1 ? 'bold' : '500',
              color: currentPage == 1 ? theme.colors.red : theme.colors.Gray,
              paddingBottom: 7,
            }}>
            User
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentPage(2);
            store.dispatch({
              type: SELECTEDTAB,
              payload: {selected: 'OWNER'},
            });
          }}
          style={[
            styles.container,
            {
              borderColor:
                currentPage == 2 ? theme.colors.red : theme.colors.HomeBg,
              width: dimensions.width / 3,
            },
          ]}>
          <Text
            style={{
              fontSize: 18,
              color: currentPage == 2 ? theme.colors.red : theme.colors.Gray,
              fontWeight: currentPage == 2 ? 'bold' : '500',
              paddingBottom: 7,
            }}>
            Owner
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentPage(3);
            store.dispatch({
              type: SELECTEDTAB,
              payload: {selected: 'DRIVER'},
            });
          }}
          style={[
            styles.container,
            {
              borderColor:
                currentPage == 3 ? theme.colors.red : theme.colors.HomeBg,
              width: dimensions.width / 3,
            },
          ]}>
          <Text
            style={{
              fontSize: 18,
              color: currentPage == 3 ? theme.colors.red : theme.colors.Gray,
              fontWeight: currentPage == 3 ? 'bold' : '500',
              paddingBottom: 7,
            }}>
            Driver
          </Text>
        </TouchableOpacity>
      </View>
      {currentPage == 1 ? (
        <User navigation={navigation} />
      ) : currentPage == 2 ? (
        <Owner navigation={navigation} />
      ) : (
        <Driver navigation={navigation} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // paddingHorizontal: 50,
    alignItems: 'center',
    backgroundColor: theme.colors.HomeBg,
    paddingVertical: 15,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    borderBottomWidth: 4,
  },
});
