// import {
//   generateHeader, API
// } from './utils';

export function uploadCsvData (data) {
  const payload = data.map((records) => {
    return {originalFields: records}
  })
  return {
    type: 'UPLOAD_SET',
    payload
  }
}

export function update (payload) {
  return {
    type: 'UPDATE_CSV',
    payload
  }
}


export default {
  uploadCsvData,
  update,
};
