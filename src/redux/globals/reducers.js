import {
  SET_CALLER,
  SET_CALLING,
  SET_DRAWER,
  SET_DRAWER_CHILDREN,
  SET_INCOMING_CALL,
  SET_LOCAL_STREAM,
  SET_ON_CALL,
  SET_OUTGOING_CALL,
  SET_PEER,
  SET_POPUP_CHILDREN,
  SET_REMOTE_PEER,
  SET_REMOTE_STREAM,
  SET_SHOW_POPUP,
  SET_SOCKET,
} from './types';

const defaultState = {
  drawer: false,
  drawerChildren: null,
  localStream: null,
  onCall: false,

  outgoingCall: null,
  incomingCall: null,
  caller: false,
  remoteStream: null,
  localStream: null,

  socket: null,
  peer: null,
  calling: false,

  showPopup: false,
  popupChildren: null,
  remotePeer: null,
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

    case SET_SHOW_POPUP:
      return { ...state, showPopup: action.payload };
    case SET_POPUP_CHILDREN:
      return {
        ...state,
        popupChildren: action.payload,
      };
    case SET_SOCKET:
      return { ...state, socket: action.payload };
    case SET_PEER:
      return { ...state, peer: action.payload };
    case SET_CALLING:
      return { ...state, calling: action.payload };

    case SET_OUTGOING_CALL:
      return { ...state, outgoingCall: action.payload };
    case SET_INCOMING_CALL:
      return { ...state, incomingCall: action.payload };
    case SET_CALLER:
      return { ...state, caller: action.payload };
    case SET_REMOTE_STREAM:
      return { ...state, remoteStream: action.payload };
    case SET_REMOTE_PEER:
      return { ...state, remotePeer: action.payload };

    default:
      return state;
  }
};
