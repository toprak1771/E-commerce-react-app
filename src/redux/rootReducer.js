import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/reducer';
import basketReducer from './basket/reducer';
import { combineReducers } from 'redux'

const rootReducer= combineReducers({
  user:userReducer,
  basket:basketReducer
});

export default rootReducer;
