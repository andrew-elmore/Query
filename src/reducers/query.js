import getTestData from "./../tests/defaultData"
import Query from "./../domain/Query"
import ResultArray from "../domain/ResultArray"
import MatchArray from "../domain/MatchArray"
const sliceName = 'query'

const initState = {
  query: new Query(getTestData(sliceName).query),
  results: new ResultArray(),
  matches: new MatchArray(),
  data: 0,
  progress: null,
  pendingRequestCount: 0,
  fulfilledRequestCount: 0
}

const name = 'QUERY'
export default (state = initState, action) => {
  switch (action.type) {
    case 'OVERIDE':
      return {
        ...action.payload[sliceName],
        ...state
      }
    case 'INIT':
      return {
        ...state,
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
    case "AIRTABLE_RUN_QUERY_PENDING":
      return {
        ...state,
        pendingRequestCount: action.meta.pendingRequestCount
      }
    case `AIRTABLE_RUN_QUERY_FULFILLED`:
      const newResults = state.results.add(
        {
          csvId: action.meta.queryToken.csvId,
          queryId: action.meta.queryToken.queryId,
          matches: action.payload.data.records.map(r => ({...r.fields, id: r.id})),
          table: action.meta.queryToken.table
        }
      )
      if (state.fulfilledRequestCount === state.pendingRequestCount) {
        return {
          ...state,
          results: newResults,
          progress: null,
        }
      } else {
        return {
          ...state,
          results: newResults,
          fulfilledRequestCount: state.fulfilledRequestCount + 1,
        }
      }
    case `${name}_RESOLVE`:
      console.log(':~:', state.query.resolveQuery(action.payload, state.results))
      return {
        ...state,
      }
  
    default:
      return state;
  }
}