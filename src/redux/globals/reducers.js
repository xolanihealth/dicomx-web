import { SET_DRAWER, SET_DRAWER_CHILDREN, SET_LOCAL_STREAM, SET_ON_CALL } from './types';

const defaultState = {
  drawer: false,
  drawerChildren: null,
  localStream: null,
  onCall: false,
};

export const globalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_DRAWER:
      return { ...state, drawer: action.payload };
    case SET_DRAWER_CHILDREN:
      return {
        ...state,
        drawerChildren: action.payload,
      };
    case SET_LOCAL_STREAM:
      return {
        ...state,
        localStream: action.payload,
      };
    case SET_ON_CALL:
      return {
        ...state,
        onCall: action.payload,
      };
    default:
      return state;
  }
};
