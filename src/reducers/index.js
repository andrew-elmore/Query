import { combineReducers } from 'redux';

import appState from './appState'
import upload from './upload';

export default combineReducers({
  appState,
  upload
})

