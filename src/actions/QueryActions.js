// import {
//   generateHeader, API
// } from './utils';

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

export default {
  updateQuery,
  addQuery,
  removeQuery,
  runQuery
};
