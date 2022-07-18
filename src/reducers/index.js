import { combineReducers } from 'redux';

import appState from './appState'
import upload from './upload';
import query from './query';

export default combineReducers({
  appState,
  upload,
  query
})

