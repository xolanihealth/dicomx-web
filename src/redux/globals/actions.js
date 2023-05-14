import { SET_DRAWER, SET_DRAWER_CHILDREN } from './types';

export const setDrawer = (payload) => ({
  type: SET_DRAWER,
  payload,
});

export const setDrawerChildren = (payload, onDismiss) => ({
  type: SET_DRAWER_CHILDREN,
  payload,
  onDismiss: onDismiss || (() => {}),
});
