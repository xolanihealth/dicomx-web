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

export const setDrawer = (payload) => ({
  type: SET_DRAWER,
  payload,
});

export const setDrawerChildren = (payload) => ({
  type: SET_DRAWER_CHILDREN,
  payload,
});

export const setLocalStream = (payload) => ({
  type: SET_LOCAL_STREAM,
  payload,
});

export const setOnCall = (payload) => ({
  type: SET_ON_CALL,
  payload,
});

export const setOutgoingCall = (payload) => ({
  type: SET_OUTGOING_CALL,
  payload,
});

export const setIncomingCall = (payload) => ({
  type: SET_INCOMING_CALL,
  payload,
});

export const setCaller = (payload) => ({
  type: SET_CALLER,
  payload,
});

export const setRemoteStream = (payload) => ({
  type: SET_REMOTE_STREAM,
  payload,
});

export const setSocket = (payload) => ({
  type: SET_SOCKET,
  payload,
});

export const setPeer = (payload) => ({
  type: SET_PEER,
  payload,
});

export const setCalling = (payload) => ({
  type: SET_CALLING,
  payload,
});

export const togglePopup = (payload) => ({
  type: SET_SHOW_POPUP,
  payload,
});

export const setPopupChildren = (payload, onDismiss) => ({
  type: SET_POPUP_CHILDREN,
  payload,
});

export const setRemotePeer = (payload) => ({
  type: SET_REMOTE_PEER,
  payload,
});
