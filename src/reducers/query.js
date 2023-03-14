import getTestData from "./../tests/defaultData"
import Query from "./../domain/Query"
import ResultArray from "../domain/ResultArray"

const sliceName = 'query'

const initState = getTestData(sliceName) || {
  query: new Query(),
  results: new ResultArray(),
  progress: null
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
    case `AIRTABLE_RUN_QUERY_FULFILLED`:
      console.log(':~:', __filename.split('/').pop(), 'method', 'action.meta.progress * 100', action.meta.progress * 100)
      return {
        ...state,
        progress: action.meta.progress * 100,

      }
  
    default:
      return state;
  }
}