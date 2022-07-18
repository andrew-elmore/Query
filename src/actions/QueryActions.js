// import {
//   generateHeader, API
// } from './utils';

export function updateQuery (payload) {
  return {
    type: 'QUERY_UPDATE',
    payload
  }
}


export default {
  updateQuery,
};
