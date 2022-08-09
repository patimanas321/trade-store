import { SHOW_API_ERROR, HIDE_API_ERROR } from '../actionTypes';

const INITIAL_STATE = {
  message: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SHOW_API_ERROR: {
    return {
      message: action.data
    };
  }

  case HIDE_API_ERROR:
    return INITIAL_STATE;

  default: return state;
  }
};

export default reducer;
