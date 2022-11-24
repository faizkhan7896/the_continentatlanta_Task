import {combineReducers} from 'redux';
import auth from './auth';
import SelectedTab from './SelectedTab';
import endtime from './endtime';

export default combineReducers({
  auth: auth,
  SelectedTab: SelectedTab,
  EndTime: endtime,
});
