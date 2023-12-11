// import {
//   generateHeader, API, AIRTABLE_API
// } from './utils';

import AirtableUtils from './AirtableUtils';


export function setQuery (payload) {
  return {
    type: 'QUERY_SET',
    payload
  }
}

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

export function queryReset (payload) {
  return {
    type: 'QUERY_RESET',
    payload
  }
}

export function updateResult (payload) {
  return {
    type: 'QUERY_UPDATE_RESULT',
    payload
  }
}

export function setQueryTables (payload) {
  return {
    type: 'QUERY_SET_TABLES',
    payload
  }
}

export default {
  setQuery,
  updateQuery,
  addQuery,
  removeQuery,
  runQuery,
  updateResult,
  setQueryTables,
  queryReset,
  runApiQuery: AirtableUtils.run({ baseName: 'QUERY' }),
};
