import { combineReducers } from 'redux';

import appState from './appState'
import upload from './upload';
import query from './query';
import view from './view';
import download from './download';

export default combineReducers({
  appState,
  upload,
  query,
  view,
  download
})

