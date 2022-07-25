import getTestData from "./../tests/defaultData"
import CsvRecordArray from "../domain/CsvRecordArray"
import CsvRecord from "../domain/CsvRecord"

const sliceName = 'upload'

const initState = getTestData(sliceName) || {
  records: new CsvRecordArray()
}

const name = 'UPLOAD'
export default (state = initState, action) => {
  switch (action.type) {
    case 'OVERIDE':
      return {
        ...action.payload[sliceName],
        ...state
      }
    case `${name}_SET`:
      return {
        ...state,
        records: new CsvRecordArray(action.payload)
      }
  
    default:
      return state;
  }
}