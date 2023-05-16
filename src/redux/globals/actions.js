import { SET_DRAWER, SET_DRAWER_CHILDREN, SET_LOCAL_STREAM, SET_ON_CALL } from './types';

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
