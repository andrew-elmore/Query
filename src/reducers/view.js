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
    case `UPLOAD_SET`:
      newCsvFields = state.csvFields || []
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
    case `QUERY_SET_TABLES`:
      const airtableFields = {}
      action.payload.forEach((tableData) => {
        tableData.fields.forEach((field) => {
          airtableFields[field.name] = true
        })
      })

      return {
        ...state,
        airtableFields: Object.keys(airtableFields)
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