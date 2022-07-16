import getTestData from "../tests/testData/data"
import CsvRecordArray from "../domain/CsvRecordArray"
import CsvRecord from "../domain/CsvRecord"


const initState = getTestData('upload') || {
  records: new CsvRecordArray()
}

const name = 'UPLOAD'
export default (state = initState, action) => {
  switch (action.type) {
    case `${name}_SET`:
      return {
        ...state,
        records: new CsvRecordArray(action.payload)
      }
  
    default:
      return state;
  }
}