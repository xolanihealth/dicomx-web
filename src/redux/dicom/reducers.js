import { SET_ENABLED_ELEMENT, SET_STACK, SET_VIEWPORT } from './types';
import cornerstone from 'cornerstone-core';
const initialState = {
  stack: {
    imageIds: [],
    currentImageIndex: 0,
  },
  viewPort: cornerstone.getDefaultViewport(null, undefined),
  enabledElement: null,
};

const dicomReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case SET_STACK:
      return {
        ...state,
        stack: data,
      };
    case SET_VIEWPORT:
      return {
        ...state,
        viewPort: data,
      };
    case SET_ENABLED_ELEMENT:
      return {
        ...state,
        enabledElement: data,
      };

    default:
      return state;
  }
};

export default dicomReducer;
