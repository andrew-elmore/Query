import getTestData from "./../tests/defaultData"
import AirtableDownloadField from "./../domain/AirtableDownloadField"
import AirtableDownloadFieldArray from "./../domain/AirtableDownloadFieldArray"
import ResultArray from "../domain/ResultArray"
const sliceName = 'download'

const defaultState = {
  ...getTestData(sliceName) 
}

const initState = {
  fileName: '',
  airtableFields: new AirtableDownloadFieldArray([]),
  csvFields: []
}

const name = 'DOWNLOAD'
export default (state = {...initState, ...defaultState}, action) => {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
      }

    case `${name}_SET_AIRTABLE_FIELDS`:
      return {
        ...state,
        airtableFields: new AirtableDownloadFieldArray(action.payload)
      }
    case `LINK_FULFILLED`:
      return {
        ...state,
        // airtableFields: state.airtableFields.setLinkedFieldsById(action.meta.id, action.payload.data.fields)
      }
    default:
      return state;
  }
}