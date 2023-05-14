import { SET_ENABLED_ELEMENT, SET_STACK, SET_VIEWPORT } from './types';

export const setStack = (data) => ({
  type: SET_STACK,
  data,
});

export const setViewPort = (data) => ({
  type: SET_VIEWPORT,
  data,
});

export const setEnabledElement = (data) => ({
  type: SET_ENABLED_ELEMENT,
  data,
});
