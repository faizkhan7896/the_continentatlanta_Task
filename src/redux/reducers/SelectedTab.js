import {SELECTEDTAB} from '../ActionTypes';

const initialState = {};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case SELECTEDTAB:
      return {...state, ...action.payload};

    default:
      return state;
  }
}

export default authReducer;
