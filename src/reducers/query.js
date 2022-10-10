import getTestData from "./../tests/defaultData"
import Query from "./../domain/Query"
import ResultArray from "../domain/ResultArray"

const sliceName = 'query'

const initState = getTestData(sliceName) || {
  query: new Query(),
  results: new ResultArray()
}

const name = 'QUERY'
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
        query: new Query(action.payload)
      }
    case `${name}_UPDATE`:
      return {
        ...state,
        query: state.query.updateQuery(action.payload)
      }
  
    case `${name}_ADD`:
      return {
        ...state,
        query: state.query.addQuery(action.payload)
      }
  
    case `${name}_REMOVE`:
      return {
        ...state,
        query: state.query.removeQuery(action.payload)
      }

    case `${name}_RUN`:
      return {
        ...state,
        results: new ResultArray(action.payload)
      }
  
    default:
      return state;
  }
}