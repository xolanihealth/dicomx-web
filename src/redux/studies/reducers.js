import { SET_STUDIES } from './types';

const initialState = {
  studies: [],
};

const studiesReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case SET_STUDIES:
      return {
        ...state,
        studies: data,
      };

    default:
      return state;
  }
};

export default studiesReducer;
