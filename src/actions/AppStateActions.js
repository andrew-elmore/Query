// import {
//   generateHeader, API
// } from './utils';


export function setTab (tab) {
  return {
    type: 'SET_TABLE',
    payload: tab
  }
}

export function init ({tables, base}) {
  return {
    type: 'INIT',
    payload: {tables, base}
  }
}

export function addRecords (payload) {
  return {
    type: 'ADD_RECORDS',
    payload
  }
}


export default {
  init,
  setTab,
  addRecords
};
