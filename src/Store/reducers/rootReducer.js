import { combineReducers } from 'redux';

import tradesReducer from './tradesReducer';
import apiErrorReducer from './apiErrorReducer';

const reducers = {
  trades: tradesReducer,
  apiError: apiErrorReducer
};

export default combineReducers(reducers);
