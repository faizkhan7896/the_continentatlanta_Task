import {ENDTIME, LOGIN, SIGNOUT, SIGNUP, UPDATEPROFILE} from '../ActionTypes';

const initialState = {};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case ENDTIME:
      return {...state, ...action.payload};

    default:
      return state;
  }
}

export default authReducer;
