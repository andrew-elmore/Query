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


export default {
  uploadCsvData,
};
