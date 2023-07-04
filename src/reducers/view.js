import getTestData from "./../tests/defaultData"

const sliceName = 'view'

const initState = getTestData(sliceName) || {
  view: {},
  airtableFields: [],
  csvFields: [],
}

const name = "VIEW"

export default (state = initState, action) => {
  let newAirtableFields
  let newCsvFields
  let newView
  switch (action.type) {
    case 'OVERIDE':
      return {
        ...action.payload[sliceName],
        ...state
      }
    case `UPLOAD_SET`:
      newCsvFields = state.csvFields || []
      console.log(action.payload)
      action.payload.forEach((record) => {
        Object.keys(record.originalFields).forEach((field) => {
          if (newCsvFields.indexOf(field) === -1) {
            newCsvFields.push(field)
          }
        })
      })
      return {
        ...state,
        csvFields: newCsvFields
      }
    case `AIRTABLE_RUN_QUERY_FULFILLED`:
      newAirtableFields = state.AirtableFields || []
      action.payload.data.records.forEach((record) => {
        Object.keys(record.fields).forEach((field) => {
          if (newAirtableFields.indexOf(field) === -1) {
            newAirtableFields.push(field)
          }
        })
      })
      return {
        ...state,
        airtableFields: newAirtableFields
      }
    case `${name}_UPDATE`:
      return {
        ...state,
        view:  {...state.view, [action.payload.field]: action.payload.value}
      }
    default:
      return state;
    }
}