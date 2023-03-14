// import {
//   generateHeader, API, AIRTABLE_API
// } from './utils';

import AirtableUtils from './AirtableUtils';


export function updateQuery (payload) {
  return {
    type: 'QUERY_UPDATE',
    payload
  }
}

export function addQuery (payload) {
  return {
    type: 'QUERY_ADD',
    payload
  }
}

export function removeQuery (payload) {
  return {
    type: 'QUERY_REMOVE',
    payload
  }
}

export function runQuery (payload) {
  return {
    type: 'QUERY_RUN',
    payload
  }
}

export function runApiQuery (payload) {
  return {
    type: 'QUERY_API_RUN',
    payload:  AirtableUtils.run({ baseName: 'Query' })(payload)
  }
}

export default {
  updateQuery,
  addQuery,
  removeQuery,
  runQuery
};
