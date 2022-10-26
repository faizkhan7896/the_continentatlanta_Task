import {combineReducers} from 'redux';
import auth from './auth';
import SelectedTab from './SelectedTab';

export default combineReducers({
  auth: auth,
  SelectedTab: SelectedTab,
});
