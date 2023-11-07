// import {
//   generateHeader, API, AIRTABLE_API
// } from './utils';

import AirtableUtils from './AirtableUtils';

const name = 'DOWNLOAD'

export function setAirtableFields (payload) {
  return {
    type: `${name}_SET_AIRTABLE_FIELDS`,
    payload
  }
}

export default {
  setAirtableFields,
  link: AirtableUtils.link({ baseName: 'DOWNLOAD' }),
};
