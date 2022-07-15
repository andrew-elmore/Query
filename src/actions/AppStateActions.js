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



export default {
  init,
  setTab
};
