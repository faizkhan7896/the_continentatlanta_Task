import Toast from 'react-native-toast-message';
import _ from 'lodash';

export const ShowToast = (msg, type = 'success', otherProps = {}) =>
  Toast.show({text1: msg, type, ...otherProps});
