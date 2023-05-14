import { SET_DRAWER } from './types';

const defaultState = {
  showDrawer: false,
  drawerChildren: null,
};

export default function globalReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_DRAWER:
      return { ...state, setDrawer: action.payload };
    case SET_DRAWER_CHILDREN:
      return {
        ...state,
        drawerChildren: action.payload,
      };
    default:
      return state;
  }
}
