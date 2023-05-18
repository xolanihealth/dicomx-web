import { SET_CONTACTS } from './types';

const initialState = {
  contacts: [],
};

const usersReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case SET_CONTACTS:
      return {
        ...state,
        contacts: data,
      };

    default:
      return state;
  }
};

export default usersReducer;
