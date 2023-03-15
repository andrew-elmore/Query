import getTestData from "./../tests/defaultData"
import Query from "./../domain/Query"
import ResultArray from "../domain/ResultArray"
import MatchArray from "../domain/MatchArray"
const sliceName = 'query'

// const initState = getTestData(sliceName) || {
//   query: new Query(),
//   results: new ResultArray(),
//   matches: new MatchArray(),
//   progress: null
// }
const initState = {
  query: getTestData(sliceName).query,
  results: new ResultArray(),
  matches: new MatchArray(),
  data: 0,
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

    case `AIRTABLE_RUN_QUERY_FULFILLED`:
      const newResults = state.results.add(
        {
          csvId: action.meta.queryToken.csvId,
          queryId: action.meta.queryToken.queryId,
          matches: action.payload.data.records.map(r => r.fields.TL_ID2)
        }
      )
      if (action.meta.progress < 1) {
        return {
          ...state,
          results: newResults,
          progress: action.meta.progress * 100
        }
      } else {
        return {
          ...state,
          matches: state.matches.runMatches(newResults, state.query),
          progress: null,
          results: new ResultArray()
        }
      }
  
    default:
      return state;
  }
}